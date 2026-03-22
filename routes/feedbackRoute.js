import express from "express";
import { getAllFeedbacks, deleteFeedback } from "../controllers/feedbackController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Admin فقط
router.get("/", verifyToken, getAllFeedbacks);
router.delete("/:id", verifyToken, deleteFeedback);

export default router;