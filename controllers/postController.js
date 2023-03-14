import Post from "../models/postModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import User from "../models/userModel.js";

const createPost = catchAsync(async (req, res, next) => {
  const postData = await Post.create(req.body);
  if (!postData) {
    return next(new AppError("post not created", 404));
  }
  res.status(201).json({
    status: "success",
    data: postData,
  });
});

const getSinglePost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const postData = await Post.findById(postId);
  if (!postData) {
    return next(new AppError("invalid id", 404));
  }
  res.status(201).json({
    status: "success",
    data: postData,
  });
});

const getAllPost = catchAsync(async (req, res, next) => {
  const postData = await Post.find();
  if (!postData) {
    return next(new AppError("invalid id", 404));
  }
  res.status(201).json({
    status: "success",
    results: postData.length,
    data: postData,
  });
});

const getSinglePostComment = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const allPostComment = await User.find({ postId });
  if (!allPostComment) {
    return next(new AppError("post have no comment", 404));
  }
  res.status(201).json({
    status: "success",
    results: allPostComment.length,
    data: allPostComment,
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
    return next(new AppError("invalid id", 404));
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
    return next(new AppError("invalid id", 404));
  }
  res.status(201).json({
    status: "success",
    data: postData,
  });
});

export {
  createPost,
  getSinglePost,
  getAllPost,
  updatePost,
  deletePost,
  getSinglePostComment,
};
