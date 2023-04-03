const express = require('express');
const { verifyToken } = require('../services/jwtService');
const User = require('../models/User');
const { tryCatchMongooseService } = require('../utils/utils');
const ApiErrorResponse = require('../exception/ApiErrorResponse');
const Notification = require('../models/Notification');

const WithdrawController = {
      /**
   * deleteProgramById
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async userWithdrawCash(req, res, next) {
    const result = await tryCatchMongooseService(async () => {
        const token = req.headers.authorization.split(" ")[1] || req.cookies.jwt;
        const user  = verifyToken(token);
        if(!user) throw new ApiErrorResponse("unauthorized", 401);
        const { amount } = req.body;

        setTimeout(async () => {
            try {
                await User.findByIdAndUpdate(user._id, { $inc: { remainingAmount: -amount } })
                const withdraw_noti = new Notification({
                    user: user._id,
                    type: "coin",
                    title: "Withdraw Request Completed",
                    message: `Yout withdraw request for ${amount} baht has been completed`,
                    isRead: false,
                });
                await withdraw_noti.save()
            }
            catch {
                const withdraw_error_noti = new Notification({
                    user: user._id,
                    type: "coin",
                    title: "Withdraw Request Rejected",
                    message: `Yout withdraw request for ${amount} baht has been rejected`,
                    isRead: false,
                });
                await withdraw_error_noti.save()
            }
        }, 1000 * 10);

        const withdraw_request_noti = new Notification({
            user: user._id,
            type: "coin",
            title: "Withdraw Request Created",
            message: `You have requested to withdraw ${amount} baht. Please wait for the admin to approve your request.`,
            isRead: false,
        });
        withdraw_request_noti.save();

        return {
            code: 200,
            message: "withdraw request created. please wait for confirmation."
        }
    });
    res.json(result);
  },
}

module.exports = WithdrawController;