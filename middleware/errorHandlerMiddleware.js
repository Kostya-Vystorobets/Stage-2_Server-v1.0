const { errorHandler } = require('../errors/errorHandler');
const logger = require('../logger/logger');

const errorHandlerMiddleware = (error, request, response) => {
    logger.error(error);
    errorHandler(response, error);
};

module.exports = {
    errorHandlerMiddleware
};