const mongoose = require("mongoose");

const item_field = mongoose.Schema(
  {
    itmeNo: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    qty: {
      type: Number,
      require: true,
    },
    grossAmount: {
      type: Number,
      require: true,
    },
    discountAmount: {
      type: Number,
      require: true,
    },
    netAmount: {
      type: Number,
      require: true,
    },
  },
  { _id: false }
);

const OrderSchema = mongoose.Schema({
  orderId: {
    type: Number,
    require: true,
    index: true,
    unique: true,
  },
  userNo: {
    type: Number,
    require: true,
  },
  outletNo: {
    type: Number,
    require: true,
  },
  item: [item_field],
  totalAmount: {
    type: String,
    require: true,
  },
  payment_Method: {
    type: String,
    require: true,
  },
  createdDateTime: {
    type: Date,
    default: Date.now,
    require: true,
  },
});

module.exports = mongoose.model("order", OrderSchema);
