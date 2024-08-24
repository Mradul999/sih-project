import express from "express";

import mongoose from "mongoose";

import signupRoute from "./routes/auth.route.js";

import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DATABASE_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

app.use("/api/auth", signupRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
