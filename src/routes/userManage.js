const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../models/user");

// Insert New User Details
userRouter.post("/", async (req, res) => {
  try {
    let hashData = await bcrypt.genSalt(12);
    let hashedPw = await bcrypt.hash(req.body.password, hashData);
    const user = new userModel({
      userNo: req.body.userNo,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      address: {
        home_no: req.body.item.home_no,
        street: req.body.item.street,
        city: req.body.item.city,
      },
      email: req.body.email,
      username: req.body.username,
      password: hashedPw,
      imageUrl: req.body.imageUrl,
      isActive: req.body.isActive,
    });

    const newUser = await user.save();
    // res.status(200).send(newUser);
    res.status(200).send("User Insert Successfully!");
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get all users details
userRouter.get("/", async (req, res) => {
  try {
    let users = await userModel.find();

    res.status(200).send(users);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

// Get user details by user No
userRouter.get("/:userNo", async (req, res) => {
  try {
    let user = await userModel.findOne({
      userNo: parseInt(req.params.userNo),
    });
    if (!user) {
      let errorObj = {
        message: "The given userNo does not match in our system",
        statusCode: "NOT FOUND",
      };

      return res.status(404).send(errorObj);
    }

    res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(`Error: ${err.message}`);
  }
});

//update User Details by User No
userRouter.put("/:userNo", async (req, res) => {
  try {
    let user = await userModel.findOne({
      userNo: req.params.userNo,
    });
    if (!user) {
      let errorObj = {
        message: "The given UserNo does not exist",
        statusCode: "NOT FOUND",
      };
      return res.status(404).send(errorObj);
    } else {
      let c = 0;
      if (user.first_name != req.body.first_name) {
        user.first_name = req.body.first_name;
        c++;
      }
      if (user.last_name != req.body.last_name) {
        user.last_name = req.body.last_name;
        c++;
      }
      if (user.address.home_no != req.body.address.home_no) {
        user.address.home_no = req.body.address.home_no;
        c++;
      }
      if (user.address.street != req.body.address.street) {
        user.address.street = req.body.address.street;
        c++;
      }
      if (user.address.city != req.body.address.city) {
        user.address.city = req.body.address.city;
        c++;
      }
      if (user.email != req.body.email) {
        user.email = req.body.email;
        c++;
      }

      if (user.imageUrl != req.body.imageUrl) {
        user.imageUrl = req.body.imageUrl;
        c++;
      }

      if (user.isActive != req.body.isActive) {
        user.isActive = req.body.isActive;
        c++;
      }

      if (c > 0) {
        let UpdateFood = await food.save();
        // res.status(200).send(UpdateFood);
        res.status(200).send("Record Update Successfully!");
      }
    }
  } catch (ex) {
    return res.status(500).send(`Error: ${ex.message}`);
  }
});

//Delete User
userRouter.delete("/", async (req, res) => {
  let user = await userModel.findOneAndDelete({ userNo: req.body.userNo });
  res.send(user);
});

// Delete User details by UserNo
userRouter.delete("/:userNo", async (req, res) => {
  let user = await userModel.findOne({
    userNo: req.params.userNo,
  });
  if (!user) {
    return res.status(404).send("Invalid User No");
  }
  try {
    const deleteFood = await userModel.deleteOne({
      userNo: req.params.userNo,
    });
    //res.status(200).json(deleteFood);
    res.status(200).send("Record Delete Successfully!");
  } catch (ex) {
    return res.status(500).send(`Error: ${ex.message}`);
  }
});

module.exports = userRouter;
