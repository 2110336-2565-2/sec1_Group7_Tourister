/**
 * custom logger
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function Log(req, res, next) {
    if(req.cookies != null) console.log("cookies found: \n", req.cookies)

    return next()
}

module.exports = Log