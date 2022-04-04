const jwt = require('jsonwebtoken');
const ApplicationError = require('../errors/aplicationError');
const logger = require("../logger/dev-logger");

const verifyAuth = (request, response, next) => {
    try {
        if (request.path === "/api/v1/user/login") {
            next();
        } else {
            const token = require.header("x-auth-token")
            if (!token) {
                const decoded = jwt.verify(token, 'dev-jwt')
                request = decoded
                next()
            } else {
                throw new ApplicationError("Access denied. Token not provided", 401)
            }
        }
    } catch (error) {
        throw new ApplicationError("Invalid token", 401)
    }
}

module.exports = {
    verifyAuth
}