module.exports = class ErrorException extends Error {
    status;
    errors;
    constructor(status, message) {
        super(message);
        this.status = status;
    }
    static BadRequest(message) {
        return new ErrorException(400, message);
    }
    static AsyncError(message) {
        return new ErrorException(400, message);
    }
    static Unauthenticated() {
        return new ErrorException(401, 'User not authorized.');
    }
    static NotFound() {
        return new ErrorException(404, 'Page with this URI was not found.');
    }
};
