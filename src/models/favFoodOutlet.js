const mongoose = require("mongoose");

const favFoodOutletSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  foodOutletId: { type: String, required: true },
  createdDateTime: { type: Date, default: Date.now() },
});

// Create an instance of model favorite food outlet
const favFoodOutlet = mongoose.model("fav_food_outlets", favFoodOutletSchema);

module.exports = favFoodOutlet;
