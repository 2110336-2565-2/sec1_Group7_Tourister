const ApiErrorResponse = require('../exception/ApiErrorResponse')
const User = require("../models/User")
const { tryCatchMongooseService } = require('../utils/utils')
const bcrypt = require('bcrypt')
const { createToken } = require('../services/jwtService')

const AuthController = {
     /**
     * login
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async userLogin(req, res, next) {
        const result = await tryCatchMongooseService (async () => {
            const payload = req.body
            if(!payload.email || !payload.password) throw new ApiErrorResponse("please provide both email and password", 400)
            const user = await User.findOne({ email: payload.email })
            if(!user) throw new ApiErrorResponse("invalid email or password", 401)

            if(! await bcrypt.compare(payload.password, user.password)) {
                throw new ApiErrorResponse("invalid email or password", 401)
            }
            else {
                const token = createToken(user.toJSON())
                return {
                    code: 200,
                    data: user, 
                    token: token,
                    message: "login successful",
                }
            }
        })

        if(result.code == 200){
            // Set the HttpOnly cookie in the response
            res.cookie('jwt', result.token, {
                httpOnly: true,
                maxAge: 3600000, // 1 day in milliseconds
                secure: process.env.NODE_ENV === 'production', // Set to true in production environment
                sameSite: 'strict', // Prevent cross-site request forgery (CSRF) attacks
            });
        }
        res.json(result)
    }
}

module.exports = AuthController