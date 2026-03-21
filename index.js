import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";

// Routes
import userRouter from "./routes/usersRoute.js";
import galleryItemRouter from "./routes/galleryItemRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import roomRouter from "./routes/roomRoute.js";
import bookingRouter from "./routes/bookingRoute.js";

dotenv.config();

const app = express();

//-------------------- Middleware --------------------
app.use(cors());
app.use(express.json()); // 🔥 instead of bodyParser

//-------------------- JWT Middleware --------------------
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(); // no token → continue
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded; // 🔥 IMPORTANT (use everywhere)
  } catch (error) {
    console.log("Invalid token");
  }

  next();
});

//-------------------- Database --------------------
const connectionString = process.env.MONGO_URL;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("✅ Connected to the database");
  })
  .catch(() => {
    console.log("❌ Database connection failed");
  });

//-------------------- Routes --------------------
app.use("/api/users", userRouter);
app.use("/api/gallery", galleryItemRouter);
app.use("/api/category", categoryRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

//-------------------- Server --------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});