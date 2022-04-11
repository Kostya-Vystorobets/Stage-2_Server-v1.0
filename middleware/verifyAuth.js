const jwt = require('jsonwebtoken');
const ApplicationError = require('../errors/applicationError');
const logger = require('../logger/logger')

const verifyAuth = (request, response, next) => {
    try {
        if (request.path === '/api/v1/user/login') {
            next();
        } else {
            const bearerToken = request.headers.authorization
            const token = bearerToken.slice(7)
            if (token) {
                const decoded = jwt.verify(token, process.env.jwt)
                request = decoded
                next()
            } else {
                logger.warn('Access denied. Token not provided')
                throw new ApplicationError('Access denied. Token not provided', 401)
            }
        }
    } catch (error) {
        logger.warn('Invalid token')
        throw new ApplicationError('Invalid token', 401)
    }
}

module.exports = {
    verifyAuth
}