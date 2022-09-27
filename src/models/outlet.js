const mongoose = require("mongoose");

// Outlet Database Schema
const outletSchema = new mongoose.Schema({
  outletNo: { type: Number, required: true, maxlength: 10 },
  name: { type: String, required: true, minlength: 5 },
  address: addressField,
  location: locationField,
  opening: openingField,
  rating: { type: Number, required: true, min: 0, max: 5 },
  contactNo: { type: String, required: true, minlength: 10, maxlength: 10 },
  email: { type: String, required: true },
  description: { type: String, required: false, maxlength: 250 },
  imageUrl: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  createdDateTime: { type: Date, default: Date.now() },
});

// Address Field
const addressField = mongoose.Schema(
  {
    no: { type: String, required: true },
    road: { type: String, required: true },
    city: { type: String, required: true },
  },
  { _id: false }
);

// Location Field
const locationField = mongoose.Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { _id: false }
);

// Opening Field
const openingField = mongoose.Schema(
  {
    days: { type: String, required: true },
    hours: { type: String, required: true },
  },
  { _id: false }
);

// Create an instance of model Outlet
const Outlet = mongoose.model("Outlet", outletSchema);

// Save the new model Outlet, passing a callback
// Outlet.save((err) => {
//   if (err) return handleError(err);
// });

module.exports = Outlet;
