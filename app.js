const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

//Config .env
dotenv.config();

// Crete a Express Server
const app = express();

// Declare a PORT
const PORT = process.env.APP_RUNNING_PORT;

// Add Middlewares
app.use(express.json());

// APP ROUTES
// app.use("/yyy/xx", testRoutes);

//Mongo DB Connections
// mongoose
//   .connect(process.env.MONGO_DB_CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Successfully connected to mongodb !"))
//   .catch((err) => console.log(`Error has occured: ${err}`));

// Check runing port
app.listen(PORT, () => {
  console.log(`Successfully runing on Port : ${PORT}`);
});
