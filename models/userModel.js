import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: [true, "Email allready registred"],
    validate: [validator.isEmail, "not a valid email"],
  },
  comment: String,
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
