import { comaprePassword, hashPassword } from "../helper/AuthHelper.js";
import userModels from "../models/userModel.js";
import orderModels from "../models/OrderModel.js";
import JWT from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    // Fetching the data
    const { name, email, password, phone, address, answer } = req.body;

    // Validation of data
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }
    if (!phone) {
      return res.status(400).send({ message: "Phone is required" });
    }
    if (!address) {
      return res.status(400).send({ message: "Address is required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Answer is required" });
    }

    // Checking for existing user
    const existingUser = await userModels.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered, please login.",
      });
    }

    // Hashing the password for saving in the database
    const hashedPassword = await hashPassword(password);

    // Creating a new user
    const user = await new userModels({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
      answer,
    });

    // Save user to database
    await user.save();

    // Sending success response
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log("Error in registering user:", error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if user exists
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Compare password
    const match = await comaprePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        // Use 401 for authentication failure
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
export const ForgotPassword = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    // Validate input fields
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "New Password is required" });
    }

    // Check if user exists
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong email",
      });
    }

    // Verify security answer
    if (user.answer !== answer) {
      return res.status(400).send({
        success: false,
        message: "Security answer is incorrect",
      });
    }

    // Hash new password and update user
    const hashedPassword = await hashPassword(newPassword);
    await userModels.findByIdAndUpdate(user._id, { password: hashedPassword });

    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const testController = (req, res) => {
  res.send("Protected Route");
};

//update profile
export const UpdateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModels.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModels.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//orders display
// export const getOrdersController = async (req, res) => {
//   try {
//     const orders = await orderModel
//       .find({ buyer: req.user._id })
//       .populate("products", "-photo")
//       .populate("buyer", "name");
//     res.json(orders);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error WHile Geting Orders",
//       error,
//     });
//   }
// };

export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModels
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");

    console.log("Fetched Orders from DB:", orders); // Debugging

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting orders",
      error,
    });
  }
};
