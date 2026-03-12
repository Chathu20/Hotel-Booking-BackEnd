import Booking from "../models/booking.js";
import Room from "../models/room.js";
import { isCustomerValid } from "./userController.js";

//-------------------New Booking Function--------------------
export function createBooking(req, res) {
  if (!isCustomerValid(req)) {
    res.status(403).json({
      message: "Forbidden",
    });
    return;
  }

  const startingId = 1200;

  Booking.countDocuments({})
    .then((count) => {
      const newId = startingId + count + 1;
      const newBooking = new Booking({
        bookingId: newId,
        roomId: req.body.roomId,
        email: req.user.email,
        start: req.body.start,
        end: req.body.end,
      });

      newBooking
        .save()
        .then((result) => {
          res.json({
            message: "Booking Created Successfully",
            result: result,
          });
        })
        .catch((err) => {
          res.json({
            message: "Booking Creation Failed",
            error: err,
          });
          console.log("one");
        });
    })
    .catch((err) => {
      res.json({
        message: "Booking Creation Failed",
        error: err,
      });
      console.log("Two");
    });
}

//-------------------Get All Bookings--------------------
export function getAllBookings(req, res) {
  Booking.find()
    .then((result) => {
      res.json({
        message: "All bookings",
        result: result,
      });
    })
    .catch((err) => {
      res.json({
        message: "Failed to get all bookings",
        error: err,
      });
    });
}

//-------------------Retrieve Booking By Date--------------------
export function retrieveBookingByDate(req, res) {
  const start = req.body.start;
  const end = req.body.end;

  Booking.find({
    start: {
      $gte: start,
    },
    end: {
      $lt: new Date(end),
    },
  })
    .then((result) => {
      res.json({
        message: "Filtered bookings",
        result: result,
      });
    })
    .catch((err) => {
      res.json({
        message: "Failed to get filtered bookings",
        error: err,
      });
    });
}

//-------------------Create Booking Using Category--------------------
export async function createBookingUsingCategory(req, res) {
  if (!isCustomerValid(req)) {
    res.status(403).json({
      message: "Forbidden",
    });
    return;
  }

  try {
    const { category, start, end } = req.body;

    if (!category || !start || !end) {
      return res.status(400).json({
        message: "Invalid input. Category, start, and end dates are required.",
      });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (startDate >= endDate) {
      return res.status(400).json({
        message: "Invalid date range. Start date must be earlier than end date.",
      });
    }

    const overlappingBookings = await Booking.find({
      $or: [{ start: { $lt: endDate }, end: { $gt: startDate } }],
    });

    const occupiedRooms = overlappingBookings.map((booking) => booking.roomId);

    const availableRooms = await Room.find({
      roomId: { $nin: occupiedRooms },
      category: category,
    });

    if (availableRooms.length === 0) {
      return res.status(404).json({
        message: "No available rooms in the selected category for the given dates.",
      });
    }

    const startingId = 1200;
    const bookingCount = await Booking.countDocuments();
    const newBookingId = startingId + bookingCount + 1;

    const newBooking = new Booking({
      bookingId: newBookingId,
      roomId: availableRooms[0].roomId,
      email: req.user.email,
      status: "pending",
      start: startDate,
      end: endDate,
    });

    const savedBooking = await newBooking.save();

    return res.status(201).json({
      message: "Booking created successfully",
      booking: savedBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({
      message: "Booking creation failed",
      error: error.message,
    });
  }
}