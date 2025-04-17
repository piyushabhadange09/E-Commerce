import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";

import CategoryRoute from "./Routes/CategoryRoutes.js";
import ProductRoute from "./Routes/ProductRoute.js";

import cors from "cors";
const app = express();

//confugire env
dotenv.config();

//database config
connectDB();
//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", CategoryRoute);
app.use("/api/v1/product", ProductRoute);
app.get("/", (req, res) => {
  res.send("<h1>Welcome to E-commerce App</h1>");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
