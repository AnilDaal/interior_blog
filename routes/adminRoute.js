import express from "express";
import adminAuth from "../middleware/auth.js";
import {
  createPost,
  getSinglePost,
  updatePost,
  deletePost,
  getAllPost,
  getSinglePostComment,
} from "../controllers/postController.js";
import {
  getAllUser,
  getUser,
  deleteUser,
} from "../controllers/userController.js";
import { adminLogin, adminSignup } from "../controllers/adminController.js";

const router = express.Router();

// adminlogin

router.route("/login").post(adminLogin);
router.route("/signup").post(adminSignup);
// router.route("/isverify").post(verifyEmail)

// post Controler
router.route("/post").get(adminAuth, getAllPost).post(adminAuth, createPost);
router
  .route("/post/:postId")
  .get(adminAuth, getSinglePost)
  .delete(adminAuth, deletePost)
  .put(adminAuth, updatePost);
router.route("/post/:postId/comment").get(adminAuth, getSinglePostComment);
// user Controler
router.route("/user").get(adminAuth, getAllUser);
router
  .route("/user/:userId")
  .get(adminAuth, getUser)
  .delete(adminAuth, deleteUser);

export default router;
