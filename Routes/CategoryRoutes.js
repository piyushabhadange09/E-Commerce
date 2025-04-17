import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/AuthMiddleware.js";
import {
  CreateCategoryController,
  deleteCategeoryController,
  getAllCategoriesController,
  getSingleCategoryController,
  UpdateCategoryController,
} from "../Controller/CategoryController.js";
const router = express.Router();

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  CreateCategoryController
);
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  UpdateCategoryController
);
router.get("/get-category/:slug", getSingleCategoryController);
router.get("/categories", getAllCategoriesController);
router.delete("/delete-category/:id", deleteCategeoryController);
export default router;
