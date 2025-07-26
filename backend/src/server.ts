import dotenv from "dotenv"
dotenv.config();

import express, { json, response } from "express"
import cors  from "cors"
import foodRouter from "./routers/food.router";
import userRouter from "./routers/user.router";
import { dbConnect } from "./configs/datebase.config";

dbConnect();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200', // or your deployed frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // if you send cookies/auth headers
}));


app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);

const port: number = 5000; 
app.listen(port, () => {
    console.log("Website served on localhost:" + port);
})