const dotenv = require('dotenv')
dotenv.config()

const appConfig = {
    'DEV': {

    },
    'PRD': {

    },
}

module.exports=appConfig[process.env.NODE_ENV ?? 'DEV']