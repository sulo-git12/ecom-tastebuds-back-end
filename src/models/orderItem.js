const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  orderNo: { type: String, required: true },
  itmeId: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true, min: 1, max: 1000 },
  grossAmount: { type: Number, required: true, min: 1 },
  discountAmount: { type: Number, required: true },
  netAmount: { type: Number, required: true, min: 1 },
  isActive: { type: Boolean, default: true },
  createdDateTime: { type: Date, default: Date.now() },
});

const OrderItems = mongoose.model("order_items", orderItemSchema);
module.exports = OrderItems;
