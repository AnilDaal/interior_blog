import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  comment: String,
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
