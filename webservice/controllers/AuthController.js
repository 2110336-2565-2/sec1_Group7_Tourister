const ApiErrorResponse = require('../exception/ApiErrorResponse')
const User = require("../models/User")
const { tryCatchMongooseService } = require('../utils/utils')
const bcrypt = require('bcrypt')
const { createToken, verifyToken } = require('../services/jwtService')

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
                const userData = user.toJSON()
                delete userData.draft
                delete userData.password
                delete userData.image
                const token = createToken(userData)
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
        console.log("login result", result)
        res.json(result)
    },

    /**
     * verifyToken
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async userVerifyToken(req, res, next) {
        const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1] || req.body.token;
        let result = undefined
        const role = req.params.role
        const data = verifyToken(token)
        let role_match = role == null
        if(data != null && role != null) {
            if(role != 'guide' && role != 'tourist') role_match = true
            else role_match = (data.isGuide && role == 'guide') || (!data.isGuide && role == 'tourist')
            console.log(role, data.isGuide)
        }
        if(data != null && role_match) 
        {
            let user = await User.findById(data._id)
            delete user.password
            delete user.draft
            
            result = {
                code: 200,
                data: user,
                message: "token authorized"
            }
        }
        else result = {
            code: 401,
            message: "token unauthorized"
        }
        res.json(result)
    }
}

module.exports = AuthController