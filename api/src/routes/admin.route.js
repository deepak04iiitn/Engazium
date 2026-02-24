import express from "express";
import { verifyToken, verifyAdmin } from "../middlewares/verifyUser.js";
import {
  getAllUsers,
  getUserById,
  deleteUser,
  toggleAdminStatus,
  getAllSquads,
} from "../controllers/admin.controller.js";
import { getAdminFeedback, updateFeedbackStatus } from "../controllers/feedback.controller.js";

const router = express.Router();

// All admin routes require authentication + admin privileges
router.use(verifyToken, verifyAdmin);

// Users management
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id/toggle-admin", toggleAdminStatus);
router.get("/squads", getAllSquads);
router.get("/feedback", getAdminFeedback);
router.patch("/feedback/:id/status", updateFeedbackStatus);

export default router;

