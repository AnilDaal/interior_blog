import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  discreption: String,
  image: String,
});

const Post = mongoose.model("Post", postSchema);
export default Post;
