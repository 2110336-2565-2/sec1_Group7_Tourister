const dotenv = require('dotenv')
dotenv.config()

const appConfig = {
    'development': {
        TOKEN_EXPIRES_IN: '1h'
    },
    'production': {
        TOKEN_EXPIRES_IN: '1h'
    },
}

module.exports=appConfig[process.env.NODE_ENV ?? 'development']