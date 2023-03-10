import express from "express";
import {
  createPost,
  getPost,
  updatePost,
  deletePost,
  getAllPost,
} from "../controllers/postController.js";
import {
  createUser,
  getAllUser,
  getUser,
  deleteUser,
} from "../controllers/userController.js";
import { adminLogin, adminSignup } from "../controllers/adminController.js";

const router = express.Router();

// adminlogin

router.route("/login").post(adminLogin);
router.route("/signup").post(adminSignup);

// post Controler
router.route("/post").get(getAllPost).post(createPost);
router.route("/post/:postId").get(getPost).delete(deletePost).put(updatePost);
// user Controler
router.route("/user").get(getAllUser).post(createUser);
router.route("/user/:userId").get(getUser).delete(deleteUser);

export default router;
