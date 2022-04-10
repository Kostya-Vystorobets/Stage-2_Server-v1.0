const { errorHandler } = require("../errors/errorHandler");

const errorHandlerMiddleware = (error, request, response, next) => {
    errorHandler(response, error)
};

module.exports = {
    errorHandlerMiddleware
}