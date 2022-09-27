const express = require("express");
const outletRouter = express();
const outletModel = require("../models/outlet");

// Get All Outlets details
outletRouter.get("/api/outlets", async (req, res) => {
  try {
    let outlets = await outletModel.find();

    res.status(200).send(outlets);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// Get Outlet details by Outlet Id
outletRouter.get("/api/outlets:outletId", async (req, res) => {
  try {
    let outlets = await outletModel.findById(req.params.outletId);

    if (order) {
      res.status(200).send(order);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = outletRouter;
