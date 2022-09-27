const mongoose = require("mongoose");
//Favorite_Outlet Collection
const Favorite_OutletSchema = mongoose.Schema({
  userNo: {
    type: Number,
    require: true,
  },
  outletNo: {
    type: Number,
    require: true,
  },
  itmeNo: [String],
  createdDateTime: {
    type: Date,
    default: Date.now,
    require: true,
  },
});

module.exports = mongoose.model("favorite_Outlet", Favorite_OutletSchema);
