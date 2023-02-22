const express = require('express')
const ApiErrorResponse = require('../exception/ApiErrorResponse')
const Booking = require("../models/Booking")
const { tryCatchMongooseService } = require('../utils/utils')
const bcrypt = require('bcrypt')

const BookingController = {
    /**
     * getBookingById
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async getBookingById(req, res, next) {
        const result = await tryCatchMongooseService( async () => {
            const bookingId = req.params.id
            const booking = await Booking.findById(bookingId).populate([{
                path:'user',
                select: 'name surname phoneNumber imageUrl'
            },{
                path:'program',
                select: 'name'
            }])

            return {
                code: 200,
                data: booking,
                message: "",
            }
        })
        res.json(result)
    },

    /**
     * getAllBookings
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async getAllBookings(req, res, next) {
        const result = await tryCatchMongooseService(async () => {
            const bookings = await Booking.find({}).populate([{
                path:'user',
                select: 'name surname phoneNumber imageUrl'
            },{
                path:'program',
                select: 'name'
            }])

            return {
                code: 200,
                count : bookings.length,
                data: bookings,
                message: "",
            }
        })
        res.json(result)
    },

    /**
     * createBooking
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async createBooking(req, res, next) {
        const result = await tryCatchMongooseService(async () => {
            const payload = req.body
            const booking = new Booking(payload);
            await booking.save()
            console.log(booking)
            return {
                code: 201,
                data: booking, 
                message: "booking created"
            }
        })
        res.json(result)
    },

    /**
     * updateBookingById
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async updateBookingById(req, res, next) {
        const result = await tryCatchMongooseService(async () => {
            const bookingId = req.params.id
            const payload = req.body
            await Booking.findByIdAndUpdate(bookingId, { $set: payload })
            const updatedBooking = await Booking.findById(bookingId)
            return {
                code: 204,
                data: updatedBooking,
                message: "booking updated"
            }
        }) 
        res.json(result)
    },

    /**
     * deleteBookingById
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async deleteBookingById(req, res, next) {
        const result = await tryCatchMongooseService (async () => {
            const bookingId = req.params.id
            const booking = await Booking.findByIdAndDelete(bookingId)

            return {
                code: 200,
                data: booking,
                message: "booking deleted",
            }
        })
        res.json(result)
    },

    /**
     * acceptBookingById
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
     async acceptBookingById(req, res, next) {
        const result = await tryCatchMongooseService(async () => {
            const bookingId = req.params.id
            await Booking.findByIdAndUpdate(bookingId, { $set: {status:"accepted"} })
            const updatedBooking = await Booking.findById(bookingId)
            return {
                code: 204,
                data: updatedBooking,
                message: "booking accepted"
            }
        }) 
        res.json(result)
    },

    /**
     * declineBookingById
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
     async declineBookingById(req, res, next) {
        const result = await tryCatchMongooseService(async () => {
            const bookingId = req.params.id
            await Booking.findByIdAndUpdate(bookingId, { $set: {status:"declined"} })
            const updatedBooking = await Booking.findById(bookingId)
            return {
                code: 204,
                data: updatedBooking,
                message: "booking declined"
            }
        }) 
        res.json(result)
    },
}

module.exports = BookingController