/**
 * custom logger
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function Log(req, res, next) {
    //if(req.cookies) console.log("cookies found: \n", req.cookies)
    console.log("request: ", req.method, req.url, req.headers)
    return next()
}

module.exports = Log