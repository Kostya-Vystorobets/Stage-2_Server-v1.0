const ApplicationError = require("./applicationError");
const NotFoundError = require("./notFoundError");

const errorHandler = (response, error) => {
    if (error instanceof ApplicationError) {
        response.status(error.status).send({ message: error.message });
        return
    }
    if (error instanceof NotFoundError) {
        response.status(error.status).send({ message: error.message });
        return;
    }
    response.status(500).send({
        success: false,
        massage: error.message ? error.massage : error
    })
}

module.exports = {
    errorHandler
}