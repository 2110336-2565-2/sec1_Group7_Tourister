const express = require('express')
const ApiErrorResponse = require('../exception/ApiErrorResponse')
const User = require("../models/User")
const { tryCatchMongooseService } = require('../utils/utils')
const bcrypt = require('bcrypt')

const UserController = {
    /**
     * getUserById
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async getUserById(req, res, next) {
        const result = await tryCatchMongooseService( async () => {
            const userId = req.params.id
            const user = await User.findById(userId)

            return {
                code: 200,
                data: user,
                message: "",
            }
        })
        res.json(result)
    },

    /**
     * getAllUsers
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async getAllUsers(req, res, next) {
        const result = await tryCatchMongooseService(async () => {
            const users = await User.find({})

            return {
                code: 200,
                data: users,
                message: "",
            }
        })
        res.json(result)
    },

    /**
     * createUser
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async createUser(req, res, next) {
        const result = await tryCatchMongooseService(async () => {
            const payload = req.body
            if(!payload.email || !payload.password) throw new ApiErrorResponse("please specify email and password", 400)
            const checkDupeUser = await User.findOne({ email: payload.email })
            if(checkDupeUser) throw new ApiErrorResponse("email already in use", 406)
            payload.password = bcrypt.hashSync(payload.password, 10)
            const user = new User(payload);
            await user.save()
            return {
                code: 201,
                data: user, 
                message: "user created"
            }
        })
        res.json(result)
    },

    /**
     * updateUserById
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async updateUserById(req, res, next) {
        const result = await tryCatchMongooseService(async () => {
            const userId = req.params.id
            const payload = req.body
            await User.findByIdAndUpdate(userId, { $set: payload })
            const updatedUser = await User.findById(userId)
            return {
                code: 204,
                data: updatedUser,
                message: "user updated"
            }
        }) 
        res.json(result)
    },

    /**
     * deleteUserById
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async deleteUserById(req, res, next) {
        const result = await tryCatchMongooseService (async () => {
            const userId = req.params.id
            const user = await User.findByIdAndDelete(userId)

            return {
                code: 200,
                data: user,
                message: "user deleted",
            }
        })
        res.json(result)
    },

}

module.exports = UserController