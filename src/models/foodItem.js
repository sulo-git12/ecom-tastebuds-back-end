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

const foodItemSchema = new mongoose.Schema({
  outletNo: {
    type: Number,
    require: true,
  },
  itemNo: {
    type: String,
    require: true,
    unique: true,
    maxlength: 10,
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  price: Food_price_field,
  description: {
    type: String,
    minlength: 10,
    require: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
    require: true,
    default: true,
  },
  createdDateTime: {
    type: Date,
    default: Date.now,
    require: true,
  },
});
const foodItem = mongoose.model("Food_item", foodItemSchema);
module.exports = foodItem;
