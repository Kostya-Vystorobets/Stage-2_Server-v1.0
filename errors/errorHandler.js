const ApplicationError = require('./applicationError');

const errorHandler = (error, request, response, next) => {
    if (error instanceof ApplicationError) {
        response.status(error.status).send({ message: error.message });
        return;
    }
    response.status(500).send({
        success: false,
        massage: error.message ? error.massage : error
    });
};

module.exports = {
    errorHandler
};