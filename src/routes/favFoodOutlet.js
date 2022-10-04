const express = require("express");
const favFoodOutletRouter = express.Router();
const userModel = require("../models/user");
const foodOutletModel = require("../models/foodOutlet");

// Get favorite food outlet by user id
favFoodOutletRouter.get("/", async (req, res) => {
  try {
    let favFoodOutlets = "test 01";

    res.status(200).send(favFoodOutlets);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

module.exports = favFoodOutletRouter;
