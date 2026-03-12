import express from "express";
import {createBooking,getAllBookings,createBookingUsingCategory, retrieveBookingByDate} from "../controllers/bookingControllers.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/", getAllBookings);
bookingRouter.post("/category", createBookingUsingCategory);
bookingRouter.get("/date/:date", retrieveBookingByDate);

export default bookingRouter;