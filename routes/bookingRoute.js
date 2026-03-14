import express from "express";
import {createBooking,getAllBookings,createBookingUsingCategory, retrieveBookingByDate} from "../controllers/bookingControllers.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/", getAllBookings);
bookingRouter.get("/filter-date", retrieveBookingByDate);
bookingRouter.post("/create-by-category", createBookingUsingCategory);


export default bookingRouter;