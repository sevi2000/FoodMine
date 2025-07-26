import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { FoodModel } from "../models/food.model";
import { sample_foods } from "../data";

const router = Router();

router.get("/seed", asyncHandler(
  async (req, res) => {
    const foodCount = await FoodModel.countDocuments();
    if(foodCount > 0) {
      res.send("Seed is already done!");
      return;
    }
    await FoodModel.create(sample_foods); 
    res.send("Seed Is Done!");
  }
));

router.get("/", asyncHandler(
  async (req, res) => {
    const foods = await FoodModel.find();
    console.log("Served / sent food :", foods);
    res.send(foods);
  }
));

router.get("/search/:searchTerm", asyncHandler(
  async (req, res) => {
    const searchRegex: RegExp = new RegExp(req.params.searchTerm, 'i');
    const foods = await FoodModel.find({name: {$regex:searchRegex}});
    console.log("FOODS IN SEARCH BEFORE BEING SENT", foods);
    res.send(foods);
    console.log("Served /search/", req.params.searchTerm," sent food :", foods);
  }
));


router.get("/tags", asyncHandler(
async (req, res) => {
  const tags = await FoodModel.aggregate([
    {
      $unwind: '$tags'
    },
    {
      $group: {
        _id: '$tags',
        count: {$sum: 1}
      }
    },
    {
      $project: {
        _id: 0,
        name: '$_id',
        count: '$count'
      }
    }
  ]).sort(
    {
      count: -1
    }
  );

  const all = {
    name: 'All',
    count: await FoodModel.countDocuments()
  }
  tags.unshift(all);
  res.send(tags);
  console.log("Served /tags", " sent tags:", tags);
}
));

router.get("/tag/:tagName", asyncHandler(
  async (req, res) => {
  const foods = await FoodModel.find({tags: req.params.tagName});
  res.send(foods);
  console.log("Served /tag/",req.params.tagName," sent food :", foods);
}));

router.get("/:foodId", asyncHandler(
  async (req, res) => {
  const foodId: string = req.params.foodId;
  const food = await FoodModel.findById(foodId);
  res.send(food);
}));

export default router;