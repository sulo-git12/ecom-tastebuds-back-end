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
    let outlet = await outletModel.findOne({
      outletNo: req.params.outletId,
    });

    if (!outlet) {
      let errorObj = {
        message: "The given Outlet Id does not match any outlet on our system",
        statusCode: "NOT FOUND",
      };

      return res.status(404).send(errorObj);
    }

    res.status(200).send(outlet);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

//update outlet item details by outlet Id
outletRouter.put("/:outletId", async (req, res) => {
  try {
    let outlet = await outletModel.findOne({
      outletNo: req.params.outletId,
    });
    if (!outlet) {
      let errorObj = {
        message: "The given outlet Id does not exist",
        statusCode: "NOT FOUND",
      };
      return res.status(404).send(errorObj);
    } else {
      let c = 0;
      if (outlet.name != req.body.name) {
        outlet.name = req.body.name;
        c++;
      }
      if (outlet.address.no != req.body.address.no) {
        outlet.address.no = req.body.address.no;
        c++;
      }
      if (outlet.address.street != req.body.address.street) {
        outlet.address.street = req.body.address.street;
        c++;
      }
      if (outlet.address.city != req.body.address.city) {
        outlet.address.city = req.body.address.city;
        c++;
      }
      if (outlet.location.latitude != req.body.location.latitude) {
        outlet.location.latitude = req.body.location.latitude;
        c++;
      }
      if (outlet.location.longitude != req.body.location.longitude) {
        outlet.location.longitude = req.body.location.longitude;
        c++;
      }
      if (outlet.rating != req.body.rating) {
        outlet.rating = req.body.rating;
        c++;
      }
      if (outlet.contactNo != req.body.contactNo) {
        outlet.contactNo = req.body.contactNo;
        c++;
      }
      if (outlet.isActive != req.body.isActive) {
        outlet.isActive = req.body.isActive;
        c++;
      }
      if (c > 0) {
        let UpdateOutlet = await outlet.save();
        // res.status(200).send(UpdateOutlet);
        res.status(200).send("Successfully Updated!");
      }
    }
  } catch (ex) {
    return res.status(500).send(`Error: ${ex.message}`);
  }
});
// Delete outlet details by item Id
outletRouter.delete("/:outletId", async (req, res) => {
  let outlet = await outletModel.findOne({
    outletNo: req.params.outletId,
  });
  if (!outlet) {
    return res.status(404).send("Invalid outlet ID");
  }
  try {
    const deleteOutlet = await outletModel.deleteOne({
      outletNo: req.params.outletId,
    });
    //res.status(200).json(deleteOutlet);
    res.status(200).send("Successfully Deleted!");
  } catch (ex) {
    return res.status(500).send(`Error: ${ex.message}`);
  }
});

module.exports = outletRouter;
