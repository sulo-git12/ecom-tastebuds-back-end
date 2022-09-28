const express = require("express");
const outletRouter = express.Router();
const outletModel = require("../models/outlet");

// Insert outlet details
outletRouter.post("/", async (req, res) => {
  try {
    const outlet = new outletModel({
      outletNo: req.body.outletNo,
      name: req.body.name,
      address: {
        no: req.body.address.no,
        street: req.body.address.street,
        city: req.body.address.city,
      },
      location: {
        latitude: req.body.location.latitude,
        longitude: req.body.location.longitude,
      },
      opening: {
        days: req.body.opening.days,
        hours: req.body.opening.hours,
      },
      type: req.body.type,
      rating: req.body.rating,
      contactNo: req.body.contactNo,
      email: req.body.email,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      isActive: req.body.isActive,
    });

    const newOutlet = await outlet.save();
    res.status(200).send(newOutlet);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get all outlets details
outletRouter.get("/", async (req, res) => {
  try {
    let outlets = await outletModel.find();

    res.status(200).send(outlets);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get outlet details by outlet Id
outletRouter.get("/:outletId", async (req, res) => {
  try {
    let outlet = await outletModel.findById({ outletNo: parseInt(req.params.outletId)});

    if (outlet) {
      res.status(200).send(outlet);
    } else if (!outlet) {
      return res
        .status(404)
        .send(
          "NOT FOUND : The given Outlet Id does not match any ninjas on our system"
        );
    }
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

module.exports = outletRouter;
