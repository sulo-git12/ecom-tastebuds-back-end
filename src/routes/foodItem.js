const express = require("express");
const foodItemRouter = express.Router();
const foodItemModel = require("../models/foodItem");

//Get all food items
foodItemRouter.get("/", async (req, res) => {
  try {
    let food_items = await foodItemModel.find();

    res.status(200).send(food_items);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get food item details by Item Id
foodItemRouter.get("/:foodId", async (req, res) => {
  try {
    let food = await foodItemModel.findOne({
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

//Get food items by outlet Id
foodItemRouter.get("/store/:outeltId", async (req, res) => {
  try {
    let food = await foodItemModel.find({
      outletNo: req.params.outeltId,
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

//Insert food item
foodItemRouter.post("/", async (req, res) => {
  try {
    const food = new foodItemModel({
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
foodItemRouter.put("/:foodId", async (req, res) => {
  try {
    let food = await foodItemModel.findOne({
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
foodItemRouter.delete("/:foodId", async (req, res) => {
  let food = await foodItemModel.findOne({
    itemNo: req.params.foodId,
  });
  if (!food) {
    return res.status(404).send("Invalid food ID");
  }
  try {
    const deleteFood = await foodItemModel.deleteOne({
      itemNo: req.params.foodId,
    });
    //res.status(200).json(deleteFood);
    res.status(200).send("Successfully Deleted!");
  } catch (ex) {
    return res.status(500).send(`Error: ${ex.message}`);
  }
});

module.exports = foodItemRouter;
