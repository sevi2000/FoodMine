import  asyncHandler from 'express-async-handler';
import {Router} from "express"
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import { UserModel } from '../models/user.model';

const router = Router();

router.get("/seed", asyncHandler(
  async (req, res) => {
    const userCount = await UserModel.countDocuments();
    if(userCount > 0) {
      res.send("Seed is already done!");
      return;
    }
    await UserModel.create(sample_users); 
    res.send("Seed Is Done!");
  }
));

router.post("/login", asyncHandler(
    async (req, res) => {
        const {email, password}  = req.body;
        console.log("REQ :", req.body);
        const user = await UserModel.findOne({email, password})
        if(user) {
            res.send(generateTokenResponse(user));
        console.log("Served /users/login", user);
        } else {
            const BAD_REQUEST = 400;
            res.status(BAD_REQUEST).send("User name or password is not valid!");
        }
    }
));


const generateTokenResponse = (user:any) => {
    const token = jwt.sign({
        emai:user.email,
        isAdmin:user.isAdmin
    },"SomeRandomText", {
        expiresIn:"30d"
    });
    user.token = token;
    return user;
}

export default router;