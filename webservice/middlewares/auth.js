const { verifyToken } = require('../services/jwtService')

const AuthMiddleware = {
    /**
     * authenticate login
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async authUser(req, res, next) {
        const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
        //console.log('authing user', token)
        if(verifyToken(token)) return next()
        else {
            console.log('unauth', verifyToken(token))
            return res.json({
                code: 403,
                message: "forbidden request",
            })
        }
    },
    
    /**
     * authenticate login as tourist
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async authTourist(req, res, next) {
        const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
        const user = verifyToken(token)
        if(user && !user.isGuide) return next()
        else return res.json({
            code: 403,
            message: "forbidden request",
        })
    },

    /**
     * authenticate login as guide
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
    async authGuide(req, res, next) {
        const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
        const user = verifyToken(token)
        if(user && user.isGuide) return next()
        return res.json({
            code: 403,
            message: "forbidden request",
        })
    }
    
}

module.exports = AuthMiddleware