const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

//Config .env
dotenv.config();

// Crete a Express Framework
const app = express();

// Declare a PORT
const PORT = process.env.APP_RUNNING_PORT || 3000;

//Add Routes
const outletRouter = require("./src/routes/outlet");
const food_itemRouter = require("./src/routes/food_Item");

// Add Middlewares
app.use(express.json());
app.use("/outlets", outletRouter);
app.use("/foods", food_itemRouter);

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
