const express = require("express");
const orderRouter = express.Router();
const orderModel = require("../models/order");

// Insert order details
orderRouter.post("/", async (req, res) => {
  try {
    const order = new orderModel({
      orderId: req.body.orderId,
      userNo: req.body.userNo,
      outletNo: req.body.outletNo,
      item: {
        itmeNo: req.body.item.itmeNo,
        price: req.body.item.price,
        qty: req.body.item.qty,
        grossAmount: req.body.item.grossAmount,
        discountAmount: req.body.item.discountAmount,
        netAmount: req.body.item.netAmount,
      },
      totalAmount: req.body.totalAmount,
      payMethod: req.body.payMethod,
      deliveryMethod: req.body.deliveryMethod,
    });

    const newOrder = await order.save();
    res.status(200).send(newOrder);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get all orders details
orderRouter.get("/", async (req, res) => {
  try {
    let orders = await orderModel.find();

    res.status(200).send(orders);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get order details by order Id
orderRouter.get("/:orderId", async (req, res) => {


  try {
    let order = await orderModel.findOne({
      orderId: parseInt(req.params.orderId)
    }); 
    if (!order) {
      let errorObj = {
        message: "The given order Id does not match any order on our system",
        statusCode: "NOT FOUND",
      };

      return res.status(404).send(errorObj);
    }

    res.status(200).send(order);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

orderRouter.delete("/", async (req, res) => {
  let order = await orderModel.findOneAndDelete({ orderId: req.body.orderId });
  res.send(order);
});


module.exports = orderRouter;