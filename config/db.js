import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URL || "mongodb://127.0.0.1:27017/E-commerce",
      {
        useNewUrlParser: trsue,
        useUnifiedTopology: true,
      }
    );
    console.log(`Connected to MongoDB successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error in connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
