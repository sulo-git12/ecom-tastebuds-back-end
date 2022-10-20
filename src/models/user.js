const mongoose = require("mongoose");

const address_field = mongoose.Schema(
  {
    home_no: {
      type: String,
      require: true,
    },
    street: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  userNo: {
    type: String,
    require: true,
    unique: true,
  },
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  address: address_field,
  email: {
    type: String,
    require: true,
    unique: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    require: true,
  },
  createdDateTime: {
    type: Date,
    default: Date.now,
    require: true,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
