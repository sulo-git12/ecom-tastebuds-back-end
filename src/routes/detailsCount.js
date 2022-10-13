const express = require("express");
const DetailCountRouter = express.Router();
const foodOutletModel = require("../models/foodOutlet");
const orderModel = require("../models/order");
const userModel = require("../models/user");

// Get all food outlets Count
DetailCountRouter.get("/outlets", async (req, res) => {
  try {
    let foodOutlets = await foodOutletModel.estimatedDocumentCount();
    res.status(200).send({foodOutlets});
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get all Orders Count
DetailCountRouter.get("/orders", async (req, res) => {
    try {
      let orders = await orderModel.count();
      res.status(200).send({orders});
    } catch (err) {
      return res.status(500).send(`Error: ${err.message}`);
    }
  });

  // Get all Users Count
DetailCountRouter.get("/users", async (req, res) => {
    try {
      let users = await userModel.count();
      res.status(200).send({users});
    } catch (err) {
      return res.status(500).send(`Error: ${err.message}`);
    }
  });


module.exports = DetailCountRouter;
