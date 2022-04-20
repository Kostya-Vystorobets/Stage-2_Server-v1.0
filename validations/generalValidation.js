const mongoose = require('mongoose');
const AppError = require('../errors/applicationError');
const logger = require('../logger/logger');

const validateId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        logger.warn(`ID: ${id} Invalid.`);
        throw new AppError(`ID: ${id} Invalid.`, 400);
    }
};

module.exports = { validateId };
