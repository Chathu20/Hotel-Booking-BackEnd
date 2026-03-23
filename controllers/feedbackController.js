import Feedback from "../models/feedback.js";

// POST /api/feedback  (logged-in user)
export const createFeedback = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Please login to submit feedback." });
    }
    const { message, rating } = req.body;
    if (!message?.trim()) {
      return res.status(400).json({ message: "Message is required." });
    }
    const name  = `${req.user.firstName || ""} ${req.user.lastName || ""}`.trim() || req.user.email;
    const email = req.user.email;

    await new Feedback({
      name, email,
      message: message.trim(),
      rating:  rating || 5,
      approved: false,
    }).save();

    res.status(201).json({ message: "Review submitted! It will appear after admin approval." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit feedback." });
  }
};

// GET /api/feedback/approved  (public)
export const getApprovedFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ approved: true }).sort({ createdAt: -1 });
    res.json({ feedbacks });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch approved feedbacks." });
  }
};

// GET /api/feedback  (admin only)
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json({ feedbacks });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch feedbacks." });
  }
};

// PATCH /api/feedback/:id  (admin — approve or hide)
export const updateFeedbackStatus = async (req, res) => {
  try {
    await Feedback.findByIdAndUpdate(req.params.id, { approved: req.body.approved });
    res.json({ message: `Feedback ${req.body.approved ? "approved" : "hidden"}.` });
  } catch (err) {
    res.status(500).json({ message: "Update failed." });
  }
};

// DELETE /api/feedback/:id  (admin only)
export const deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: "Feedback deleted." });
  } catch (err) {
    res.status(500).json({ message: "Delete failed." });
  }
};