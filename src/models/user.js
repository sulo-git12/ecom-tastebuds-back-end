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

const UserSchema = mongoose.Schema({
  no: {
    type: Number,
    require: true,
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
  },
  username: {
    type: String,
    require: true,
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
    require: true,
  },
  createdDateTime: {
    type: Date,
    default: Date.now,
    require: true,
  },
});
module.exports = mongoose.model("user", UserSchema);
