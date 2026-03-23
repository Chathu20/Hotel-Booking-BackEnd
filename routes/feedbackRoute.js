import express from "express";
import {
  createFeedback,
  getApprovedFeedbacks,
  getAllFeedbacks,
  updateFeedbackStatus,
  deleteFeedback,
} from "../controllers/feedbackController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Public — no auth needed
router.get("/approved", getApprovedFeedbacks);

// Customer — must be logged in
router.post("/", verifyToken, createFeedback);

// Admin only
router.get("/",       verifyToken, getAllFeedbacks);
router.patch("/:id",  verifyToken, updateFeedbackStatus);
router.delete("/:id", verifyToken, deleteFeedback);

export default router;