import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const adminAuth = catchAsync(async (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  if (token) {
    let tokenData = jwt.verify(token, process.env.SECRET_KEY);
    req.adminData = tokenData.user;
  } else {
    next(new AppError("token not fonnd", 401));
  }
  console.log("helo");
  next();
});

export default adminAuth;
