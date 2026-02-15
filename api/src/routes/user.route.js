import express from "express";
import { verifyToken } from "../middlewares/verifyUser.js";
import {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
} from "../controllers/user.controller.js";

const router = express.Router();

// All user routes require authentication
router.use(verifyToken);

router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.put("/change-password", changePassword);
router.delete("/delete-account", deleteAccount);

export default router;

