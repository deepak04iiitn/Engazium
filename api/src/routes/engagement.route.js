import express from "express";
import { verifyToken } from "../middlewares/verifyUser.js";
import {
  startEngagement,
  validateEngagement,
  getEngagementStats,
  getSquadEngagementOverview,
} from "../controllers/engagement.controller.js";

const router = express.Router();

// All engagement routes require authentication
router.use(verifyToken);

router.post("/start", startEngagement);
router.post("/validate", validateEngagement);
router.get("/stats/:squadId", getEngagementStats);
router.get("/squad-overview/:squadId", getSquadEngagementOverview);

export default router;

