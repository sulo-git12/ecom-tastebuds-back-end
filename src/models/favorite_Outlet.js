const mongoose = require("mongoose");
//Favorite_Outlet Collection
const favorite_OutletSchema = new mongoose.Schema({
  userNo: {
    type: Number,
    require: true,
  },
  outletNo: {
    type: Number,
    require: true,
  },
  itmeNo: { type: String },
  createdDateTime: {
    type: Date,
    default: Date.now,
    require: true,
  },
});
const Favorite_Outlet = mongoose.model(
  "Favorite_Outlet",
  favorite_OutletSchema
);
module.exports = Favorite_Outlet;
