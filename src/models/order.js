const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userNo: { type: String, required: true },
  outletNo: { type: String, required: true },
  totalAmount: { type: Number, required: true, min: 1 },
  payMethod: { type: String, required: true },
  deliveryMethod: { type: String, required: true },
  status: { type: String, required: false },
  isActive: { type: Boolean, default: true },
  createdDateTime: { type: Date, default: Date.now() },
});

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
