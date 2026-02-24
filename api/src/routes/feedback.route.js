import express from "express";
import { verifyToken } from "../middlewares/verifyUser.js";
import { createFeedback } from "../controllers/feedback.controller.js";

const router = express.Router();

router.post("/", verifyToken, createFeedback);

export default router;

