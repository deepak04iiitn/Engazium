import express from "express";
import { verifyToken } from "../middlewares/verifyUser.js";
import { createContactMessage, createFeedback } from "../controllers/feedback.controller.js";

const router = express.Router();

router.post("/contact", createContactMessage);
router.post("/", verifyToken, createFeedback);

export default router;

