const { errorHandler } = require('../errors/errorHandler');

const errorHandlerMiddleware = (error, request, response) => {
    errorHandler(response, error)
};

module.exports = {
    errorHandlerMiddleware
}