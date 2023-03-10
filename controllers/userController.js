import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const createUser = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const { name, email, comment } = req.body;
  const userData = await User.create({ name, email, comment, postId });
  if (!userData) {
    next(new AppError("User not found", 401));
  }
  res.status(201).json({
    status: "success",
    data: userData,
  });
});

const getUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const UserData = await User.findById(userId);
  if (!UserData) {
    next(new AppError("invalid id", 401));
  }
  res.status(201).json({
    status: "success",
    results: UserData.length,
    data: UserData,
  });
});

const getAllUser = catchAsync(async (req, res, next) => {
  const UserData = await User.find();
  if (!UserData) {
    next(new AppError("invalid id", 401));
  }
  res.status(201).json({
    status: "success",
    results: UserData.length,
    data: UserData,
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { UserId } = req.params;
  const UserData = await User.findByIdAndDelete(UserId);
  if (!UserData) {
    next(new AppError("invalid id", 401));
  }
  res.status(201).json({
    status: "success",
    data: UserData,
  });
});

export { createUser, getAllUser, getUser, deleteUser };
