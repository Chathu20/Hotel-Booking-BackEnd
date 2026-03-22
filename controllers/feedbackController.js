import Feedback from "../models/feedback.js";

// Get all feedbacks (Admin)
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json({ feedbacks });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch feedbacks" });
  }
};

// Delete feedback
export const deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: "Feedback deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};