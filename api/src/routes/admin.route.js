import express from "express";
import { verifyToken, verifyAdmin } from "../middlewares/verifyUser.js";
import {
  getAllUsers,
  getUserStats,
  getUserById,
  deleteUser,
  toggleAdminStatus,
  getAllSquads,
  getSquadDetails,
  deleteSquadAsAdmin,
  removeSquadMemberAsAdmin,
  setSquadUserBlockStatus,
  transferSquadOwnership,
} from "../controllers/admin.controller.js";
import { getAdminFeedback, updateFeedbackStatus } from "../controllers/feedback.controller.js";

const router = express.Router();

// All admin routes require authentication + admin privileges
router.use(verifyToken, verifyAdmin);

// Users management
router.get("/users", getAllUsers);
router.get("/users/stats", getUserStats);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id/toggle-admin", toggleAdminStatus);
router.get("/squads", getAllSquads);
router.get("/squads/:id", getSquadDetails);
router.delete("/squads/:id", deleteSquadAsAdmin);
router.delete("/squads/:id/members/:userId", removeSquadMemberAsAdmin);
router.patch("/squads/:id/members/:userId/block", setSquadUserBlockStatus);
router.patch("/squads/:id/transfer-ownership", transferSquadOwnership);
router.get("/feedback", getAdminFeedback);
router.patch("/feedback/:id/status", updateFeedbackStatus);

export default router;

