import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import adminRoute from "./routes/adminRoute.js";
import AppError from "./utils/appError.js";
import globelErrorHandling from "./controllers/errorController.js";

dotenv.config({ path: ".env" });
const PORT = process.env.PORT;
const app = express();

mongoose.connect(process.env.MONGO_DB, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("mongoose connect successfully");
  }
});

app.use("/api/admin/", adminRoute);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.url} on this server`, 404));
});
app.use(globelErrorHandling);

app.listen(PORT, () => {
  console.log(`Blog App listening on port ${PORT}!`);
});
