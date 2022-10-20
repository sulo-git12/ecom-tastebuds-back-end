const express = require("express");
const async = require("async");
const favFoodOutletRouter = express.Router();
const favFoodOutletModel = require("../models/favFoodOutlet");
const foodOutetModel = require("../models/foodOutlet");

// Insert favorite food outlet detail
favFoodOutletRouter.post("/", async (req, res) => {
  try {
    //Check mandatory value userId
    if (!req.body.userId) {
      let errorObj = {
        message: "UserId is required.",
        status: "SYSTEM ERROR",
      };
      return res.status(400).send(errorObj);
    }

    //Check mandatory value foodOutletId
    if (!req.body.foodOutletId) {
      let errorObj = {
        message: "foodOutlet Id is required.",
        status: "SYSTEM ERROR",
      };
      return res.status(400).send(errorObj);
    }

    //Check outlet is alredy added
    let checkExistfavOutlet = await favFoodOutletModel.findOne({
      userId: req.body.userId,
      foodOutletId: req.body.foodOutletId,
    });

    if (checkExistfavOutlet) {
      let errorObj = {
        message: "This outlet data alredy added.",
        status: "ALREDY EXIST",
      };
      return res.status(400).send(errorObj);

      // console.log("This outlet data data alredy added.");
    }

    //Insert favorite outlet data
    let favFoodOutlet = new favFoodOutletModel({
      userId: req.body.userId,
      foodOutletId: req.body.foodOutletId,
    });

    const newFavFoodOutlet = await favFoodOutlet.save();
    res.status(200).send(newFavFoodOutlet);

    // console.log("Inserted outlet data.");
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get favorite food outlets details by user id
favFoodOutletRouter.get("/:userId", async (req, res) => {
  try {
    // let favFoodOutlets = await favFoodOutletModel.findById(req.params.userId);
    let favFoodOutlets = await favFoodOutletModel
      .find({
        userId: req.params.userId,
      })
      .sort({
        createdDateTime: "desc",
      });

    if (favFoodOutlets.length === 0) {
      let errorObj = {
        message:
          "The given user does not match any favorite outlet on our system",
        statusCode: "NOT FOUND",
      };

      return res.status(404).send(errorObj);
    }

    //If has user wise favorite outlet, then get outlet details
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

    if (!foodOutlets) {
      let errorObj = {
        message:
          "The given food outlet Id by favorite list but, does not match any food outlet on our system",
        statusCode: "NOT FOUND",
      };

      return res.status(404).send(errorObj);
    }

    res.status(200).send(foodOutlets);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Delete favorite food outlet by userId & outletId
favFoodOutletRouter.delete("/:userId/:outletId", async (req, res) => {
  try {
    //Check outlet is alredy added in the system
    let checkExistfavOutlet = await favFoodOutletModel.findOne({
      userId: req.params.userId,
      foodOutletId: req.params.outletId,
    });

    if (!checkExistfavOutlet) {
      let errorObj = {
        message:
          "The given user Id & outlet Id does not match any favorite outlet on our system",
        statusCode: "SYSTEM ERROR : NOT FOUND",
      };
      return res.status(404).send(errorObj);
    }

    //Delete favorite outlet
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
