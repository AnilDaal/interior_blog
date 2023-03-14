import express from "express";
import {
  getSinglePost,
  getAllPost,
  getSinglePostComment,
} from "../controllers/postController.js";
import { createUser } from "../controllers/userController.js";

const router = express.Router();

router.route("/post/").get(getAllPost);
router.route("/post/:postId/").get(getSinglePost).post(createUser);
router.route("/post/:postId/comment/").get(getSinglePostComment);

export default router;
