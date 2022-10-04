const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//Config .env
dotenv.config();

// Crete a Express Framework
const app = express();

// Declare a PORT
const PORT = process.env.APP_RUNNING_PORT || 3000;

//Add Routes
const foodOutletRouter = require("./src/routes/foodOutlet");
const favFoodOutletRouter = require("./src/routes/favFoodOutlet");

// Add Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/food_outlets", foodOutletRouter);
app.use("/api/favourite_food_outlets", favFoodOutletRouter);

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
