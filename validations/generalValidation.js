const mongoose = require('mongoose');
const ApplicationError = require('../errors/applicationError');
const logger = require('../logger/logger');

const validateId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        logger.warn(`ID: ${id} Invalid.`);
        throw new ApplicationError(`ID: ${id} Invalid.`, 400);
    }
}

module.exports = { validateId };