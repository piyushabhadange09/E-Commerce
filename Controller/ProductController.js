import { error } from "console";
import ProductModel from "../models/ProductModel.js";
import fs from "fs";
import slugify from "slugify";
import { create } from "domain";
import { compareSync } from "bcrypt";
import { json } from "stream/consumers";
import CategoryModel from "../models/CategoryModel.js";
import braintree from "braintree";
import OrderModel from "../models/OrderModel.js";
import dotenv from "dotenv";

dotenv.config();
//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const CreateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // Input validation
    if (!name) return res.status(400).send({ error: "Name is required" });
    if (!description)
      return res.status(400).send({ error: "Description is required" });
    if (!price) return res.status(400).send({ error: "Price is required" });
    if (!category)
      return res.status(400).send({ error: "Category is required" });
    if (!quantity)
      return res.status(400).send({ error: "Quantity is required" });
    if (photo && photo.size > 1000000) {
      return res.status(400).send({ error: "Photo should be less than 1 MB" });
    }

    // Create new product
    const product = new ProductModel({
      ...req.fields,
      slug: slugify(name),
    });

    // Handle photo upload
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating Product",
      error,
    });
  }
};

export const getProductController = async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      total: products.length,
      success: true,
      message: "All Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting all products",
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error,
    });
  }
};

export const getProductPhotoController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While getting product photo",
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    console.log("Deleting product with id:", req.params.id);
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

export const UpadteProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // Input validation
    if (!name) return res.status(400).send({ error: "Name is required" });
    if (!description)
      return res.status(400).send({ error: "Description is required" });
    if (!price) return res.status(400).send({ error: "Price is required" });
    if (!category)
      return res.status(400).send({ error: "Category is required" });
    if (!quantity)
      return res.status(400).send({ error: "Quantity is required" });
    if (photo && photo.size > 1000000) {
      return res.status(400).send({ error: "Photo should be less than 1 MB" });
    }

    // Update existing product
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    // Handle photo update
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Updating Product",
      error,
    });
  }
};

//filters
export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) {
      args.category = checked;
    }
    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }
    const products = await ProductModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while filtering product",
      error,
    });
  }
};

//prodcut count
export const productCountController = async (req, res) => {
  try {
    const total = await ProductModel.estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message, // Send only the error message for security
      message: "Error in product count",
    });
  }
};

export const productListController = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await ProductModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

//similar product
export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await ProductModel.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting related products",
      error,
    });
  }
};

//gte product by category
export const productCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    const products = await ProductModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while getting product category wise",
      error,
    });
  }
};

//brain tree token controller api
export const brainTreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        res.status(500).send({
          success: false,
          message: "Error generating Braintree token",
          error: err,
        });
      } else {
        res.status(200).send({
          success: true,
          clientToken: response.clientToken,
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Server error in Braintree token generation",
      error,
    });
  }
};

export const brainTreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;

    if (!cart || !nonce) {
      return res.status(400).json({
        success: false,
        message: "Cart items and payment nonce are required.",
      });
    }

    let total = cart.reduce((sum, item) => sum + item.price, 0); // Better sum calculation

    gateway.transaction.sale(
      {
        amount: total.toFixed(2), // Ensure it is in correct decimal format
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async (err, result) => {
        if (err) {
          console.error("Braintree Error:", err);
          return res
            .status(500)
            .json({ success: false, message: "Payment failed", error: err });
        }

        if (result.success) {
          try {
            const order = await new OrderModel({
              products: cart,
              payment: result.transaction,
              buyer: req.user._id,
            }).save();

            res.json({
              success: true,
              message: "Payment successful, order created",
              order,
            });
          } catch (saveError) {
            console.error("Order Save Error:", saveError);
            res.status(500).json({
              success: false,
              message: "Order save failed",
              error: saveError,
            });
          }
        } else {
          res.status(400).json({
            success: false,
            message: "Transaction failed",
            error: result,
          });
        }
      }
    );
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({
      success: false,
      message: "Error while processing Braintree payment",
      error,
    });
  }
};

export const createOrderController = async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart items are required to create an order.",
      });
    }

    let total = cart.reduce((sum, item) => sum + item.price, 0); // Calculate total price

    try {
      const order = await new OrderModel({
        products: cart,
        payment: {
          amount: total.toFixed(2),
          status: "Pending", // Since there's no actual payment
          transactionId: null,
        },
        buyer: req.user._id,
      }).save();

      res.json({
        success: true,
        message: "Order created successfully.",
        order,
      });
    } catch (saveError) {
      console.error("Order Save Error:", saveError);
      res.status(500).json({
        success: false,
        message: "Order save failed",
        error: saveError,
      });
    }
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({
      success: false,
      message: "Error while creating order",
      error,
    });
  }
};
