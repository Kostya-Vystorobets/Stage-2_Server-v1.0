const { errorHandler } = require("../errors/errorHandler");
const logger = require("../logger/dev-logger")

const errorHandlerMiddleware = (error, request, response, next) => {
    errorHandler(response, error)
};

module.exports = {
    errorHandlerMiddleware
}