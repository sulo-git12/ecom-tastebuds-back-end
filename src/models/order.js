const mongoose = require("mongoose");

// Item Field
const itemField = mongoose.Schema(
  {
    itmeNo: { type: Number, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true, min: 1, max: 1000 },
    grossAmount: { type: Number, required: true, min: 1 },
    discountAmount: { type: Number, required: true },
    netAmount: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema({
  orderId: { type: Number, required: true, unique: true, maxlength: 10 },
  userNo: { type: Number, required: true },
  outletNo: { type: Number, required: true },
  item: itemField,
  totalAmount: { type: Number, required: true, min: 1 },
  payMethod: { type: String, required: true },
  deliveryMethod: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
  createdDateTime: { type: Date, default: Date.now() },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
