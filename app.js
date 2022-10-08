const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

//Config .env
dotenv.config();

//Logger Middelware
const logger = require("./src/middlewares/logger");

// Crete a Express Framework
const app = express();

// Declare a PORT
const PORT = process.env.APP_RUNNING_PORT || 3000;

//Add Routes
const outletRouter = require("./src/routes/outlet");
const food_itemRouter = require("./src/routes/food_Item");
const orderRouter = require("./src/routes/order");

// Add Middlewares
app.use(express.json());
<<<<<<< HEAD
<<<<<<< HEAD
app.use("/outlets", outletRouter);
app.use("/foods", food_itemRouter);
=======

// APP ROUTES
// app.use("/yyy/xx", testRoutes);

// Mongo DB Connections
mongoose
  .connect(process.env.MONGO_DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to mongodb !"))
  .catch((err) => console.log(`Error has occured: ${err}`));
>>>>>>> b172ca198e628886ba74b4deb7ec51707bdd40ba
=======
app.use("/api/outlets", outletRouter);
app.use("/foods", food_itemRouter);
app.use("/api/orders", orderRouter);
>>>>>>> 0d22a69 (Created Order Model and Route)

// Check runing port
app.listen(PORT, () => {
  console.log(`Successfully runing on Port : ${PORT}`);
});

// Mongo DB Connections
mongoose
  .connect(process.env.MONGO_DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to mongodb !"))
  .catch((err) => console.log(`Error has occured: ${err}`));
