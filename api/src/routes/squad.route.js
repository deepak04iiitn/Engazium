import express from "express";
import { verifyToken } from "../middlewares/verifyUser.js";
import {
  createSquad,
  getSquads,
  getSquadById,
  joinSquad,
  leaveSquad,
  getMySquads,
  deleteSquad,
  getSquadBySlug,
  acceptSquadRules,
} from "../controllers/squad.controller.js";

const router = express.Router();

// Public route — browse squads (no auth needed)
router.get("/", getSquads);

// All routes below require authentication
router.use(verifyToken);

// User's own squad memberships
router.get("/my/memberships", getMySquads);

// Squad CRUD
router.post("/", createSquad);
router.get("/:id", getSquadById);
router.get("/niche/:niche/slug/:slug", getSquadBySlug);
router.delete("/:id", deleteSquad);

// Join / Leave
router.post("/:id/join", joinSquad);
router.post("/:id/leave", leaveSquad);

// Accept squad rules
router.post("/:id/accept-rules", acceptSquadRules);

export default router;

