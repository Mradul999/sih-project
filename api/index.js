import express from "express";

import mongoose from "mongoose";

import signupRoute from "./routes/auth.route.js";
import addproductRoute from "./routes/product.route.js";
import otpRoute from "./routes/sendotp.route.js";

import paymentRoute from "./routes/payment.route.js";

import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DATABASE_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

app.use("/api/auth", signupRoute);
app.use("/api/product", addproductRoute);
app.use("/api/otp", otpRoute);
app.use("/api/payment", paymentRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
