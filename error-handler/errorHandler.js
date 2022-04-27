const ErrorException = require('./error-exception');
const logger = require('../logger/logger');

const errorHandler = (error, request, response, next) => {
    logger.error(error);
    if (error instanceof ErrorException) {
        response.status(error.status).send({ message: error.message });
        return;
    }
    logger.error(error);
    response.status(500).send({
        success: false,
        massage: error.message ? error.massage : error
    });
};

module.exports = {
    errorHandler
};
