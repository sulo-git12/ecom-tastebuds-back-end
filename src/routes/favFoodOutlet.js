const express = require("express");
const async = require("async");
const favFoodOutletRouter = express.Router();
const favFoodOutletModel = require("../models/favFoodOutlet");
const foodOutetModel = require("../models/foodOutlet");

// Insert favorite food outlet detail
favFoodOutletRouter.post("/", async (req, res) => {
  try {
    const favFoodOutlet = new favFoodOutletModel({
      userId: req.body.userId,
      foodOutletId: req.body.foodOutletId,
    });

    const newFavFoodOutlet = await favFoodOutlet.save();
    res.status(200).send(newFavFoodOutlet);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get favorite food outlets details by user id
favFoodOutletRouter.get("/:userId", async (req, res) => {
  try {
    // let favFoodOutlets = await favFoodOutletModel.findById(req.params.userId);
    let favFoodOutlets = await favFoodOutletModel.find({
      userId: req.params.userId,
    });

    let foodOutlets = await async.map(favFoodOutlets, async (outlet) => {
      return await foodOutetModel
        .findOne({ outletNo: outlet.foodOutletId })
        .select({
          outletNo: 1,
          name: 1,
          address: 1,
          opening: 1,
          rating: 1,
          imageUrl: 1,
          isActive: 1,
        });
    });

    res.status(200).send(foodOutlets);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Delete favorite food outlet by userId & outletId
favFoodOutletRouter.delete("/:userId/:outletId", async (req, res) => {
  try {
    let deletedFavFoodOutlet = await favFoodOutletModel.findOneAndDelete({
      userId: req.params.userId,
      foodOutletId: req.params.outletId,
    });

    res.status(200).send(deletedFavFoodOutlet);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

module.exports = favFoodOutletRouter;
