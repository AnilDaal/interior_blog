import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      requied: true,
      minlength: [3, "title have minimum 3 word"],
    },
    discreption: { type: String, required: true },
    image: String,
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
