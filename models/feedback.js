import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true },
    email:    { type: String, required: true },
    message:  { type: String, required: true },
    rating:   { type: Number, default: 5, min: 1, max: 5 },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);