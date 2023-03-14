import Admin from "../models/adminModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// admin login

const adminLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const adminData = await Admin.findOne({ email });
  // if (adminData.isVerified) {
  //   next(new AppError("Email not verify", 401));
  // }
  if (!adminData) {
    next(new AppError("Admin not found", 401));
  }
  const securePassword = bcrypt.compare(password, adminData.password);
  if (!securePassword) {
    next(new AppError("invalid password", 401));
  }
  const token = jwt.sign({ user: adminData }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  res.status(201).json({
    status: "success",
    data: token,
  });
});

const adminSignup = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new AppError("Please fill all field", 401));
  }
  const salt = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(password, salt);
  const adminData = await Admin.create({
    email,
    password: securePassword,
  });
  // send mail to the email
  res.status(201).json({
    status: "success",
    data: adminData,
  });
});

export { adminSignup, adminLogin };
