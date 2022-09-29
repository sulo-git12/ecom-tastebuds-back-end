const express = require("express");
const food_itemRouter = express.Router();
const food_itemModel = require("../models/food_Item");

//Get all food items
food_itemRouter.get("/", async (req, res) => {
  try {
    let food_items = await food_itemModel.find();

    res.status(200).send(food_items);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get food item details by Item Id
food_itemRouter.get("/:foodId", async (req, res) => {
  try {
    let food = await food_itemModel.findOne({
      itemNo: req.params.foodId,
    });

    if (!food) {
      let errorObj = {
        message: "The given food Id does not exist",
        statusCode: "NOT FOUND",
      };
      return res.status(404).send(errorObj);
    }

    res.status(200).send(food);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

///Insert food item
food_itemRouter.post("/", async (req, res) => {
  try {
    const food = new food_itemModel({
      outletNo: req.body.outletNo,
      itemNo: req.body.itemNo,
      name: req.body.name,
      price: {
        price: req.body.price.price,
        discount: req.body.price.discount,
      },
      description: req.body.description,
      rating: req.body.rating,
      imageUrl: req.body.imageUrl,
      isActive: req.body.isActive,
    });

    const newOFood = await food.save();
    //res.status(200).send(newOFood);
    res.status(200).send("Successfully Inserted!");
  } catch (ex) {
    return res.status(500).send(`Error: ${ex.message}`);
  }
});

//update food item details by Item Id
food_itemRouter.put("/:foodId", async (req, res) => {
  try {
    let food = await food_itemModel.findOne({
      itemNo: req.params.foodId,
    });
    if (!food) {
      let errorObj = {
        message: "The given food Id does not exist",
        statusCode: "NOT FOUND",
      };
      return res.status(404).send(errorObj);
    } else {
      let c = 0;
      if (food.name != req.body.name) {
        food.name = req.body.name;
        c++;
      }
      if (food.rating != req.body.rating) {
        food.rating = req.body.rating;
        c++;
      }
      if (food.price.price != req.body.price.price) {
        food.price.price = req.body.price.price;
        c++;
      }
      if (food.price.discount != req.body.price.discount) {
        food.price.discount = req.body.price.discount;
        c++;
      }
      if (food.isActive != req.body.isActive) {
        food.isActive = req.body.isActive;
        c++;
      }
      if (c > 0) {
        let UpdateFood = await food.save();
        // res.status(200).send(UpdateFood);
        res.status(200).send("Successfully Updated!");
      }
    }
  } catch (ex) {
    return res.status(500).send(`Error: ${ex.message}`);
  }
});
// Delete food item details by item Id
food_itemRouter.delete("/:foodId", async (req, res) => {
  let food = await food_itemModel.findOne({
    itemNo: req.params.foodId,
  });
  if (!food) {
    return res.status(404).send("Invalid food ID");
  }
  try {
    const deleteFood = await food_itemModel.deleteOne({
      itemNo: req.params.foodId,
    });
    //res.status(200).json(deleteFood);
    res.status(200).send("Successfully Deleted!");
  } catch (ex) {
    return res.status(500).send(`Error: ${ex.message}`);
  }
});

module.exports = food_itemRouter;
