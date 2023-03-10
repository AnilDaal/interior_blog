import Post from "../models/postModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const createPost = catchAsync(async (req, res, next) => {
  const postData = await Post.create(req.body);
  if (!postData) {
    next(new AppError("post not created", 401));
  }
  res.status(201).json({
    status: "success",
    data: postData,
  });
});

const getPost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const postData = await Post.findById(postId);
  if (!postData) {
    next(new AppError("invalid id", 401));
  }
  res.status(201).json({
    status: "success",
    results: postData.length,
    data: postData,
  });
});

const getAllPost = catchAsync(async (req, res, next) => {
  const postData = await Post.find();
  if (!postData) {
    next(new AppError("invalid id", 401));
  }
  res.status(201).json({
    status: "success",
    results: postData.length,
    data: postData,
  });
});

const updatePost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const { title, discreption, image } = req.body;
  const postData = await Post.findByIdAndUpdate(
    postId,
    {
      $set: {
        title,
        discreption,
        image,
      },
    },
    { new: true }
  );
  if (!postData) {
    next(new AppError("invalid id", 401));
  }
  res.status(201).json({
    status: "success",
    data: postData,
  });
});

const deletePost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const postData = await Post.findByIdAndDelete(postId);
  if (!postData) {
    next(new AppError("invalid id", 401));
  }
  res.status(201).json({
    status: "success",
    data: postData,
  });
});

export { createPost, getPost, getAllPost, updatePost, deletePost };
