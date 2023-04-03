const express = require("express");
const ApiErrorResponse = require("../exception/ApiErrorResponse");
const Booking = require("../models/Booking");
const { tryCatchMongooseService } = require("../utils/utils");
const bcrypt = require("bcrypt");
const Program = require("../models/Program");
const Notification = require("../models/Notification");
const { verifyToken } = require("../services/jwtService");
const User = require("../models/User");

const BookingController = {
  /**
   * getBookingById
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getBookingById(req, res, next) {
    const result = await tryCatchMongooseService(async () => {
      const bookingId = req.params.id;
      const booking = await Booking.findById(bookingId).populate([
        {
          path: "user",
          select: "name surname phoneNumber image",
        },
        {
          path: "program",
          select: "name",
        },
      ]);

      return {
        code: 200,
        data: booking,
        message: "",
      };
    });
    res.json(result);
  },

  /**
   * getAllBookings
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getAllBookings(req, res, next) {
    const result = await tryCatchMongooseService(async () => {
      const bookings = await Booking.find({}).populate([
        {
          path: "user",
          select: "name surname phoneNumber image",
        },
        {
          path: "program",
          select: "name",
        },
      ]);

      return {
        code: 200,
        count: bookings.length,
        data: bookings,
        message: "",
      };
    });
    res.json(result);
  },

  /**
   * createBooking
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async createBooking(req, res, next) {
    const result = await tryCatchMongooseService(async () => {
      const token = req.headers.authorization.split(" ")[1] || req.cookies.jwt;
      const programId = req.params.programId;
      const user = verifyToken(token);
      if (!user) throw new Error("unauthorized");
      if (!programId) throw new Error("programId is required");

      const dupeBookingByUserId = await Booking.find({
        user: user._id,
        program: programId,
      });
      console.log("dupeBooking",dupeBookingByUserId)
      if (dupeBookingByUserId.length > 0){
        throw new ApiErrorResponse(
          "you already booked this program",
          400,
          "duplicate-booking"
        );
      }

      const balance = (await User.findById(user._id)).remainingAmount;
      const program = await Program.findById(programId);
      if (balance < program.price)
        throw new ApiErrorResponse(
          "not enough balance",
          400,
          "insufficient-balance"
        );
      else {
        await User.findByIdAndUpdate(user._id, {
          remainingAmount: balance - program.price,
        });
      }
      // if((new Date(program.startDate)) < (new Date())) throw new ApiErrorResponse( "program already started", 400, "program-already-started" );

      const payload = req.body;
      payload.program = programId;
      payload.user = user._id;
      const booking = new Booking(payload);
      await booking.save();
      //console.log(booking);

      //Nofify payment
      const noti_payment = new Notification({
        user: user._id,
        type: "payment",
        title: "Payment Complete",
        message: `${program.price} baht is paid to book for ${program.name}`,
      });
      await noti_payment.save();
      //console.log(noti_payment);

      //Nofify guide
      const noti_request = new Notification({
        user: program.guide,
        type: "newrequest",
        title: "New Booking Request",
        message: `${user.name} ${user.surname} requested to join ${program.name}`,
      });
      await noti_request.save();
      //console.log(noti_request);

      return {
        code: 201,
        data: booking,
        message: "booking created",
      };
    });
    res.json(result);
  },

  /**
   * getAllBookings
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getAllBookingsByUserId(req, res, next) {
    const userId = req.params.userId;
    const filterBody = req.query;
    console.log(filterBody);
    let filter = [];
    filter.push({ user: userId });
    if (filterBody.status != null) {
      let statusFilter = [];
      filterBody.status.split(" ").forEach((status) => {
        statusFilter.push({ status: status });
      });
      filter.push({ $or: statusFilter });
    }

    const result = await tryCatchMongooseService(async () => {
      const bookings = await Booking.find({ $and: filter }).populate([
        {
          path: "user",
          select: "name surname phoneNumber image",
        },
        {
          path: "program",
          populate: {
            path: "guide",
            select: "name surname",
          },
          //select: 'name'
        },
      ]);

      return {
        code: 200,
        count: bookings.length,
        data: bookings,
        message: "",
      };
    });
    res.json(result);
  },

  /**
   * getAllBookings
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getAllAcceptedBookingsByProgramId(req, res, next) {
    const programId = req.params.programId;
    const filterBody = req.query;
    console.log(filterBody);
    let filter = [];
    filter.push({ program: programId });
    filter.push({ status: "accepted" });
    // if(filterBody.status != null) {
    //     let statusFilter = []
    //     filterBody.status.split(" ").forEach((status) => {
    //         statusFilter.push({ status: status })
    //     })
    //     filter.push({ $or: statusFilter })
    // }

    const result = await tryCatchMongooseService(async () => {
      const bookings = await Booking.find({ $and: filter }).populate([
        {
          path: "user",
          select: "name surname phoneNumber image",
        },
      ]);

      return {
        code: 200,
        count: bookings.length,
        data: bookings,
        message: "",
      };
    });
    res.json(result);
  },

  /**
   * getAllBookings
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getAllBookingsByProgramId(req, res, next) {
    const programId = req.params.programId;
    const filterBody = req.query;
    console.log(filterBody);
    let filter = [];
    filter.push({ program: programId });
    if (filterBody.status != null) {
      let statusFilter = [];
      filterBody.status.split(" ").forEach((status) => {
        statusFilter.push({ status: status });
      });
      filter.push({ $or: statusFilter });
    }

    const result = await tryCatchMongooseService(async () => {
      const bookings = await Booking.find({ $and: filter }).populate([
        {
          path: "user",
          select: "name surname phoneNumber image",
        },
      ]);

      return {
        code: 200,
        count: bookings.length,
        data: bookings,
        message: "",
      };
    });
    res.json(result);
  },

  /**
   * updateBookingById
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async updateBookingById(req, res, next) {
    const result = await tryCatchMongooseService(async () => {
      const bookingId = req.params.id;
      const payload = req.body;
      await Booking.findByIdAndUpdate(bookingId, { $set: payload });
      const updatedBooking = await Booking.findById(bookingId);
      return {
        code: 204,
        data: updatedBooking,
        message: "booking updated",
      };
    });
    res.json(result);
  },

  /**
   * deleteBookingById
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async deleteBookingById(req, res, next) {
    const result = await tryCatchMongooseService(async () => {
      const bookingId = req.params.id;
      const booking = await Booking.findById(bookingId);
      if(booking.status != "pending") {
        throw new ApiErrorResponse(400, "Booking is not pending");
      }
      await Booking.findByIdAndDelete(bookingId);

      const program = await Program.findById(booking.program);
      await User.findByIdAndUpdate(booking.user, {
        $inc: { remainingAmount: program.price },
      });

      const user = await User.findById(booking.user);

      //notify refund
      const noti_refund = new Notification({
        user: user,
        type: "refund",
        title: "Coin Refunded",
        message: `You booking for ${program.name} is cancelled, ${program.price} baht is refunded`,
      });
      await noti_refund.save();

      //notify guide
      const noti_cancel = new Notification({
        user: program.guide,
        type: "cancel",
        title: "Request Cancelled",
        message: `${user.name} ${user.surname} cancel request for ${program.name}`,
      });
      await noti_cancel.save();

      return {
        code: 200,
        data: booking,
        message: "booking deleted",
      };
    });
    res.json(result);
  },

  /**
   * acceptBookingById
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async acceptBookingById(req, res, next) {
    const result = await tryCatchMongooseService(async () => {
      const bookingId = req.params.id;
      await Booking.findByIdAndUpdate(bookingId, {
        $set: { status: "accepted" },
      });

      const updatedBooking = await Booking.findById(bookingId);
      await Program.findByIdAndUpdate(updatedBooking.program, {
        $inc: { num_participant: 1 },
      });

      //Nofify tourist
      const program = await Program.findById(updatedBooking.program);
      const noti_accept = new Notification({
        user: updatedBooking.user,
        type: "accrequest",
        title: "Request Accepted",
        message: `Your request to join ${program.name} is accepted`,
      });
      await noti_accept.save();
      console.log(noti_accept);

      //Nofify tourist trip
      const now = new Date(); // current time
      const notifyTime = program.startDate < now ? now : program.startDate;
      const noti_trip = new Notification({
        user: updatedBooking.user,
        type: "nexttrip",
        title: "Upcoming Trip",
        message: `${program.name} will start today at ${program.startTime}. Meeting point at ${program.meetLocation}. Get Ready!`,
        notifyTime: notifyTime
      });
      await noti_trip.save();
      console.log(noti_trip);

      //Nofify tourist endtrip
      const noti_endtrip = new Notification({
        user: updatedBooking.user,
        type: "endtrip",
        title: "Finish Trip",
        message: `${program.name} is finish. If you have any problem, please report to contactTourister@gmail.com`,
        notifyTime: new Date(program.endDate.getTime() + 24*60*60*1000),
      });
      await noti_endtrip.save();
      console.log(noti_endtrip);

      return {
        code: 204,
        data: updatedBooking,
        message: "booking accepted",
      };
    });
    res.json(result);
  },

  /**
   * declineBookingById
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async declineBookingById(req, res, next) {
    const result = await tryCatchMongooseService(async () => {
      const bookingId = req.params.id;
      await Booking.findByIdAndUpdate(bookingId, {
        $set: { status: "declined" },
      });
      const updatedBooking = await Booking.findById(bookingId);

      const program = await Program.findById(updatedBooking.program);
      await User.findByIdAndUpdate(updatedBooking.user, {
        $inc: { num_booking: -1, remainingAmount: program.price },
      });

      //Nofify tourist
      const noti_decline = new Notification({
        user: updatedBooking.user,
        type: "decrequest",
        title: "Request Declined",
        message: `Your request to join ${program.name} is declined and ${program.price} baht is refunded`,
      });
      await noti_decline.save();
      console.log(noti_decline);

      return {
        code: 204,
        data: updatedBooking,
        message: "booking declined",
      };
    });
    res.json(result);
  },
};

module.exports = BookingController;
