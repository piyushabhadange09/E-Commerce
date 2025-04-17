import express from "express";
import {
  registerController,
  loginController,
  testController,
  ForgotPassword,
  UpdateProfileController,
  getOrdersController,
} from "../Controller/AuthController.js";
import { isAdmin, requireSignIn } from "../middlewares/AuthMiddleware.js";
const router = express.Router();

//routing
router.post("/register", registerController);

router.post("/login", loginController);

router.get("/test", requireSignIn, isAdmin, testController);

router.post("/forgot-password", ForgotPassword);
//protected User auth route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

//protected Admin auth route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({
    ok: true,
  });
});

//update route
router.put("/profile", requireSignIn, UpdateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);
export default router;
