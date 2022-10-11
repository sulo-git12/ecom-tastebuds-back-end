const dotenv = require("dotenv");
const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
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
const UserManageRouter = require("./src/routes/userManage");

//Add Middleware Path
const logger = require("./src/middlewares/logger");

//AWS S3 Server
const imageServerRoute = require("./src/aws/ImageServer");

// Add Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/api/outlets", foodOutletRouter);
app.use("/api/foods", foodItemRouter);
app.use("/api/orders", MyOrderRouter);
app.use("/api/orders/items", MyOrderItemRouter);
app.use("/api/users", UserManageRouter);
app.use("/api/s3Server", imageServerRoute);

const swaggerDefinition = {
  info: {
    title: "TasteBuds Food Delivery System APIs",
    version: "1.0.0",
  },
  host: "localhost:8088",
  basePath: "/",
};

// Options for swagger documentations
const options = {
  swaggerDefinition,
  apis: ["./docs/**/*.yaml"],
};
// Initialize the swagger documentations
const swaggerSpec = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/api/s3Server", imageServerRoute);
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
