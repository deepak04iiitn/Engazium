import express from "express";
import { verifyToken } from "../middlewares/verifyUser.js";
import {
  createPost,
  getSquadPosts,
  getMyPostCount,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

// All post routes require authentication
router.use(verifyToken);

router.post("/", createPost);
router.get("/squad/:squadId", getSquadPosts);
router.get("/my-count/:squadId", getMyPostCount);
router.delete("/:id", deletePost);

export default router;

