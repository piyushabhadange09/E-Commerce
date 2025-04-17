import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Ensures no leading/trailing spaces
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures unique emails
      lowercase: true, // Converts emails to lowercase
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Ensure passwords are at least 6 characters
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: Object,
      required: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
export default mongoose.model("users", userSchema);
