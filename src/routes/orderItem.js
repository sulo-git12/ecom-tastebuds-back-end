const express = require("express");
const orderItemRouter = express.Router();
const orderItemModel = require("../models/orderItem");

// Insert data
orderItemRouter.post("/", async (req, res) => {
  try {
    const orderItem = new orderItemModel({
      orderNo: req.body.orderNo,
      itmeId: req.body.itmeId,
      price: req.body.price,
      qty: req.body.qty,
      grossAmount: req.body.grossAmount,
      discountAmount: req.body.discountAmount,
      netAmount: req.body.netAmount,
    });

    const neworderItem = await orderItem.save();
    res.status(200).send(neworderItem);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

//Get data by order id
orderItemRouter.get("/:orderId", async (req, res) => {
  try {
    let orderItems = await orderItemModel.aggregate([
      {
        $lookup: {
          from: "food_items",
          localField: "itmeId",
          foreignField: "itemNo",
          as: "ItemData",
        },
      },
      {
        $project: {
          _id: 1,
          orderNo: 1,
          price: 1,
          qty: 1,
          grossAmount: 1,
          discountAmount: 1,
          netAmount: 1,
          "ItemData.name": 1,
          "ItemData.imageUrl": 1,
        },
      },
      {
        $unwind: "$ItemData",
      },
      {
        $match: { orderNo: req.params.orderId },
      },
    ]);

    if (!orderItems) {
      let error = {
        message: "No orders in this user",
        statusCode: "NOT FOUND",
      };

      return res.status(404).send(error);
    }

    res.status(200).send(orderItems);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

module.exports = orderItemRouter;
