const express = require("express");
const orderRouter = express.Router();
const orderModel = require("../models/order");

// Insert data
orderRouter.post("/", async (req, res) => {
  try {
    const order = new orderModel({
      orderId: req.body.orderId,
      userNo: req.body.userNo,
      outletNo: req.body.outletNo,
      totalAmount: req.body.totalAmount,
      payMethod: req.body.payMethod,
      deliveryMethod: req.body.deliveryMethod,
      status: req.body.status,
    });

    const newOrder = await order.save();
    res.status(200).send(newOrder);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

//Get data by user id
orderRouter.get("/:userId", async (req, res) => {
  try {
    // let orders = await orderModel.find();

    let orders = await orderModel.aggregate([
      {
        $lookup: {
          from: "food_outlets",
          localField: "outletNo",
          foreignField: "outletNo",
          as: "OutletData",
        },
      },
      {
        $project: {
          _id: 1,
          orderId: 1,
          userNo: 1,
          totalAmount: 1,
          payMethod: 1,
          deliveryMethod: 1,
          status: 1,
          createdDateTime: 1,
          "OutletData.name": 1,
        },
      },
      {
        $unwind: "$OutletData",
      },
      { $match: { userNo: req.params.userId } },
    ]);

    if (!orders) {
      let error = {
        message: "No orders in this user",
        statusCode: "NOT FOUND",
      };

      return res.status(404).send(error);
    }

    res.status(200).send(orders);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

//Delete data
orderRouter.delete("/:orderId", async (req, res) => {
  let order = await orderModel.findOneAndDelete({ orderId:  req.params.orderId });
  res.send(order);
});

module.exports = orderRouter;
