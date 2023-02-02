const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const logger = require('morgan')
const mongoose = require('mongoose')

const apiRoute = require('./routes/api')

const app = express()

//connect mongodb atlas
const mongo_uri = "mongodb+srv://root:tourist7@tourister.zr7ni4z.mongodb.net/test";
mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, { useNewUrlParser : true});

//mongodb error handler
mongoose.connection.on('error', err => 
    {
        console.error('MongoDB error', err);
    }
)


// logger middleware
app.use(logger('dev'))

// use express router
app.use('/api', apiRoute)

app.get('/', async (req, res, next) => {
    console.log("Hello SE2 Project !!")
    return res.json({ message : "Hello World"})
})


// Error handler
/**
   * errorHandler
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   * @param {import('express').NextFunction} next 
   */
const errorHandler = (err, req, res, next) => {
    const statusCode = err?.code || err?.status || 500;
  
    return res.status(statusCode).json({
      code: statusCode,
      message: err?.message || 'Error'
    });
}
app.use(errorHandler)


const PORT = process.env.PORT || 2000;
app.listen(PORT, () => 
    {
        console.log(`Server is running on PORT ${PORT}`);
    }
)