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
            omise.charges.create({
                amount: chargeAmount,
                currency: 'thb',
                description: `top up ${coins} coins for user ${user._id}`,
                //capture: true,
                card: omiseToken,
            }, (err, charge) => {
                if (err) {
                // Handle error
                console.error(err);
                    result =  {
                        code: 500,
                        message: err,
                        tag: "transaction-failed",
                    }
                } else {
                    // Charge successful
                    console.log(charge);
                    
                    User.findByIdAndUpdate(user._id, { $inc: { remainingAmount: coins } })
                    const updatedUser = User.findById(user._id)

                    result = {
                        code: 200,
                        data: updatedUser,
                        message: "top up successful",
                    }
                }
            });
            return result;
        })
        res.json(result)
    },
}

module.exports = TopUpController;