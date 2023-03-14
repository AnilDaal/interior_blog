import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    requied: true,
    minlength: [6, "title have minimum 6 word"],
  },
  discreption: { type: String, required: true },
  image: String,
});

const Post = mongoose.model("Post", postSchema);
export default Post;
