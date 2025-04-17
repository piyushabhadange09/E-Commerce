import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/AuthMiddleware.js";
import {
  brainTreePaymentController,
  brainTreeTokenController,
  createOrderController,
  CreateProductController,
  deleteProductController,
  getProductController,
  getProductPhotoController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  relatedProductController,
  searchProductController,
  UpadteProductController,
} from "../Controller/ProductController.js";
import formidable from "express-formidable";
const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  CreateProductController
);
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  UpadteProductController
);
router.get("/get-product", getProductController);
router.get("/get-product/:slug", getSingleProductController);
router.get("/get-product-photo/:id", getProductPhotoController);
router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//filter products
router.post("/product-filters", productFilterController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payment routes
//token route
router.get("/braintree/token", brainTreeTokenController);

//payment route
// router.post("/braintree/payment", requireSignIn, brainTreePaymentController);
router.post("/braintree/payment", requireSignIn, createOrderController);
export default router;
