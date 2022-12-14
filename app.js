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
const foodItemRouter = require("./src/routes/foodItem");
const favFoodOutletRouter = require("./src/routes/favFoodOutlet");
const MyOrderRouter = require("./src/routes/order");
const MyOrderItemRouter = require("./src/routes/orderItem");

// Add Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/food_outlets", foodOutletRouter);
app.use("/api/food_items", foodItemRouter);
app.use("/api/favourite_food_outlets", favFoodOutletRouter);
app.use("/api/my_orders", MyOrderRouter);
app.use("/api/my_order_items", MyOrderItemRouter);

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
