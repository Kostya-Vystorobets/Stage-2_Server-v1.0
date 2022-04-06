const ApplicationError = require("./applicationError");

module.exports = class NotFoundError extends ApplicationError {
    constructor(msg) {
        super(msg, 404);
    }
}