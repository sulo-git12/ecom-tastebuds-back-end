const mongoose = require("mongoose");

const Food_price_field = mongoose.Schema(
  {
    price: {
      type: Number,
      require: true,
    },
    discount: {
      type: Number,
      require: true,
    },
  },
  { _id: false }
);

const FoodItemSchema = mongoose.Schema({
  outletNo: {
    type: Number,
    require: true,
  },
  itmeNo: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  price: Food_price_field,
  description: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
    require: true,
  },
  createdDateTime: {
    type: Date,
    default: Date.now,
    require: true,
  },
});
module.exports = mongoose.model("food_item", FoodItemSchema);
