const express = require('express');
const { verifyToken } = require('../services/jwtService');
const Omise = require('omise');
const User = require('../models/User');
const { tryCatchMongooseService } = require('../utils/utils');
const ApiErrorResponse = require('../exception/ApiErrorResponse');

const omise = Omise({
    publicKey: process.env.OMISE_PUBLIC_KEY,
    secretKey: process.env.OMISE_SECRET_KEY,
})

const TopUpController = {
    /**
     * updateBookingById
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async topUpCoins(req, res, next) {
        const result = await tryCatchMongooseService(async () => {
            const token = req.headers.authorization.split(" ")[1] || req.cookies.jwt;
            const user  = verifyToken(token);
            if(!user) throw new ApiErrorResponse("invalid token", 401);
            const { omiseToken, omiseSource, chargeAmount, coins } = req.body;
            console.log("omiseToken", omiseToken)
            console.log("omiseSource", omiseSource)

            // Create a charge with Omise
            let result = {}
            try {
                const charges = await omise.charges.create({
                    amount: chargeAmount,
                    currency: 'thb',
                    description: `top up ${coins} coins for user ${user._id}`,
                    //capture: true,
                    card: omiseToken,
                });
                console.log("charges", charges)
                result = {
                    code: 200,
                    message: "top up successful",
                }
            }
            catch(err) {
                console.log("err", err)
                result = {
                    code: 200,
                    message: "top up failed",
                    tag: "transaction-failed"
                }
            }
            finally {
                await User.findByIdAndUpdate(user._id, { $inc: { remainingAmount: coins } })
                const updatedUser = await User.findById(user._id)
                result.data = updatedUser
                return result
            }
        })
        res.json(result)
    },
}

module.exports = TopUpController;