const ApplicationError = require('./applicationError');

const errorHandler = (response, error) => {
    console.log(error.status)
    console.log({ message: error.message })
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