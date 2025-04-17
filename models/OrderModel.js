import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        //works as forgein key which points to the prrimary key of product table
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
