const dotenv = require('dotenv')
dotenv.config()

const dbConfig = {
    MONGODB_URI: process.env.MONGODB_URI
}

module.exports = dbConfig