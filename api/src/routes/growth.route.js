import express from "express";
import { verifyToken } from "../middlewares/verifyUser.js";
import {
  submitGrowthSnapshot,
  getCheckInStatus,
  getGrowthHistory,
  getGrowthAchievements,
  getLiveActivity,
  getLiveUserCount,
} from "../controllers/growth.controller.js";

const router = express.Router();

// Public — landing page
router.get("/achievements", getGrowthAchievements);
router.get("/live-activity", getLiveActivity);
router.get("/live-user-count", getLiveUserCount);

// Protected routes
router.use(verifyToken);

router.post("/snapshot", submitGrowthSnapshot);
router.get("/check-in-status", getCheckInStatus);
router.get("/history", getGrowthHistory);

export default router;

