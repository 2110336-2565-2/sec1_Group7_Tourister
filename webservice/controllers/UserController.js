const express = require('express')
const ApiErrorResponse = require('../exception/ApiErrorResponse')
const User = require("../models/User")
const { tryCatchMongooseService } = require('../utils/utils')
const bcrypt = require('bcrypt')
const { uploadImage } = require('../services/uploadImageService')

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
            if(!payload.email) throw new ApiErrorResponse("please specify email", 400)
            const checkDupeUser = await User.findOne({ email: payload.email })
            if(checkDupeUser) throw new ApiErrorResponse("email already in use", 406)
            if(!payload.password) throw new ApiErrorResponse("please specify password", 400)
            if(!payload.name) throw new ApiErrorResponse("please specify name", 400)
            if(!payload.surname) throw new ApiErrorResponse("please specify surname", 400)
            if(!payload.phoneNumber) throw new ApiErrorResponse("please specify phone number", 400)
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

    /**
     * upload profile pic
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async uploadUserProfilePic(req, res, next) {
        const result = await tryCatchMongooseService (async () => {
            const userId = req.params.id
            const imgFile = req.file
            console.log(imgFile)            

            const uploadResult = await uploadImage(imgFile)
            if(uploadResult.status === 'failed' || uploadResult.response?.image?.url == null) {
                console.log(uploadResult)
                throw new ApiErrorResponse("upload failed: " + uploadResult.message, 500)
            }

            const imgUrl = uploadResult.response.image.url
            const user = await User.findByIdAndUpdate(userId, { $set: { profilePic: imgUrl } }, { new: true })

            return {
                code: 200,
                data: user,
                message: "profile pic updated",
            }
        })
        res.json(result)
    },

}

module.exports = UserController