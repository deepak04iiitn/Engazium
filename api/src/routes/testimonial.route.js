import express from "express";
import { verifyToken, verifyAdmin } from "../middlewares/verifyUser.js";
import {
  createTestimonial,
  getApprovedTestimonials,
  getMyTestimonial,
  updateMyTestimonial,
  deleteMyTestimonial,
  getAllTestimonials,
  updateTestimonialStatus,
  deleteTestimonial,
} from "../controllers/testimonial.controller.js";

const router = express.Router();

// Public — get approved testimonials for landing page
router.get("/", getApprovedTestimonials);

// Authenticated user routes
router.post("/", verifyToken, createTestimonial);
router.get("/mine", verifyToken, getMyTestimonial);
router.put("/mine", verifyToken, updateMyTestimonial);
router.delete("/mine", verifyToken, deleteMyTestimonial);

// Admin routes
router.get("/admin/all", verifyToken, verifyAdmin, getAllTestimonials);
router.patch("/admin/:id/status", verifyToken, verifyAdmin, updateTestimonialStatus);
router.delete("/admin/:id", verifyToken, verifyAdmin, deleteTestimonial);

export default router;

