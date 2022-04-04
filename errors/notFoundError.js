const ApplicationError = require("./aplicationError");

module.exports = class NotFoundError extends ApplicationError {
    constructor(msg) {
        super(msg, 404);
    }
}