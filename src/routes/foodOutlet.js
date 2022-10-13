const express = require("express");
const foodOutletRouter = express.Router();
const foodOutletModel = require("../models/foodOutlet");

// Insert food outlet details
foodOutletRouter.post("/", async (req, res) => {
  try {
    const foodOutlet = new foodOutletModel({
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

    const newFoodOutlet = await foodOutlet.save();
    res.status(200).send("Successfully Inserted!");
    // res.status(200).send(newFoodOutlet);
  } catch (err) {
    return res.status(500).send(err.errors);
  }
});

// Get all food outlets details
foodOutletRouter.get("/", async (req, res) => {
  try {
    let foodOutlets = await foodOutletModel.find();

    res.status(200).send(foodOutlets);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get all food outlets Count
foodOutletRouter.get("/", async (req, res) => {
  try {
    let foodOutlets = await foodOutletModel.estimatedDocumentCount();
    res.status(200).send(foodOutlets);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get food outlet details by outlet Id
foodOutletRouter.get("/:outletId", async (req, res) => {
  try {
    // let outlet = await foodOutletModel.findById(req.params.outletId);
    let foodOutlet = await foodOutletModel.findOne({
      outletNo: req.params.outletId,
    });

    if (!foodOutlet) {
      let errorObj = {
        message:
          "The given food outlet Id does not match any food outlet on our system",
        statusCode: "NOT FOUND",
      };

      return res.status(404).send(errorObj);
    }

    res.status(200).send(foodOutlet);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

//update food outlet item details by outlet Id
foodOutletRouter.put("/:outletId", async (req, res) => {
  try {
    let foodOutlet = await foodOutletModel.findOne({
      outletNo: req.params.outletId,
    });
    if (!foodOutlet) {
      let errorObj = {
        message: "The given food outlet Id does not exist",
        statusCode: "NOT FOUND",
      };
      return res.status(404).send(errorObj);
    } else {
      let c = 0;
      if (foodOutlet.name != req.body.name) {
        foodOutlet.name = req.body.name;
        c++;
      }
      if (foodOutlet.description != req.body.description) {
        foodOutlet.description = req.body.description;
        c++;
      }
      if (foodOutlet.imageUrl != req.body.imageUrl) {
        foodOutlet.imageUrl = req.body.imageUrl;
        c++;
      }
      if (foodOutlet.email != req.body.email) {
        foodOutlet.email = req.body.email;
        c++;
      }
      if (foodOutlet.contactNo != req.body.contactNo) {
        foodOutlet.contactNo = req.body.contactNo;
        c++;
      }
      if (c > 0) {
        let updateFoodOutlet = await foodOutlet.save();
        // res.status(200).send(updateFoodOutlet);
        res.status(200).send("Successfully Updated!");
      }
    }
  } catch (ex) {
    return res.status(500).send(`Error: ${ex.message}`);
  }
});

// Delete food outlet details by item Id
foodOutletRouter.delete("/:outletId", async (req, res) => {
  let foodOutlet = await foodOutletModel.findOne({
    outletNo: req.params.outletId,
  });
  if (!foodOutlet) {
    return res.status(404).send("Invalid outlet ID");
  }
  try {
    const deleteFoodOutlet = await foodOutletModel.deleteOne({
      outletNo: req.params.outletId,
    });
    //res.status(200).json(deleteFoodOutlet);
    res.status(200).send("Successfully Deleted!");
  } catch (ex) {
    return res.status(500).send(`Error: ${ex.message}`);
  }
});

module.exports = foodOutletRouter;
