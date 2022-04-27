const jwt = require('jsonwebtoken');
const ErrorException = require('../error-handler/error-exception');

const verifyAuth = (request, response, next) => {
    try {
        if (request.path === '/api/v1/user/login') {
            next();
        } else {
            const bearerToken = request.headers.authorization;
            console.log(bearerToken);
            const token = bearerToken.slice(7);
            if (token) {
                const decoded = jwt.verify(token, process.env.jwt_key);
                request = decoded;
                next();
            } else {
                throw ErrorException.Unauthenticated('Access denied. Token not provided');
            }
        }
    } catch (error) {
        throw ErrorException.Unauthenticated('Invalid token');
    }
};

module.exports = {
    verifyAuth
};
