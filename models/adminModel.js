import mongoose from "mongoose";
import validator from "validator";

const adminSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "not a valid email"],
  },
  password: String,
  isVerified: { type: Boolean, default: false },
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
