import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import adminRoute from "./routes/adminRoute.js";
import AppError from "./utils/appError.js";
import globelErrorHandling from "./controllers/errorController.js";
import publicRoute from "./routes/publicRoute.js";
import morgan from "morgan";
import cors from "cors";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT;
const app = express();

// uncaughtException
process.on("uncaughtException", (err) => {
  console.log("UNHANDLED Exception! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// unhandled Rejection
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_DB, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("mongoose connect successfully");
  }
});

app.use("/api/v1/admin/", adminRoute);
app.use("/api/v1/user/", publicRoute);
app.get("/", (req, res) => {
  res.send("Hello india");
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.url} on this server`, 404));
});
app.use(globelErrorHandling);

const server = app.listen(PORT, () => {
  console.log(`Blog App listening on port ${PORT}!`);
});
