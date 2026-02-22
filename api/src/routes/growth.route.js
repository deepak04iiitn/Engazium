import express from "express";
import { verifyToken } from "../middlewares/verifyUser.js";
import {
  submitGrowthSnapshot,
  getCheckInStatus,
  getGrowthHistory,
  getGrowthAchievements,
} from "../controllers/growth.controller.js";

const router = express.Router();

// Public — landing page achievements
router.get("/achievements", getGrowthAchievements);

// Protected routes
router.use(verifyToken);

router.post("/snapshot", submitGrowthSnapshot);
router.get("/check-in-status", getCheckInStatus);
router.get("/history", getGrowthHistory);

export default router;

