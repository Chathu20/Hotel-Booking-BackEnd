import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import userRouter from "./routes/usersRoute.js";
import galleryItemRouter from "./routes/galleryItemRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import roomRouter from "./routes/roomRoute.js";
import bookingRouter from "./routes/bookingRoute.js";
import feedbackRouter from "./routes/feedbackRoute.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return next();
  const token = authHeader.split(" ")[1];
  try { req.user = jwt.verify(token, process.env.JWT_KEY); }
  catch (e) { console.log("Invalid token"); }
  next();
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to the database"))
  .catch(() => console.log("❌ Database connection failed"));

app.use("/api/users",    userRouter);
app.use("/api/gallery",  galleryItemRouter);
app.use("/api/category", categoryRouter);
app.use("/api/rooms",    roomRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/feedback", feedbackRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));