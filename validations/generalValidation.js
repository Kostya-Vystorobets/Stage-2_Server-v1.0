const mongoose = require('mongoose');
const ErrorException = require('../error-handler/error-exception');

const validateId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw ErrorException.AsyncError(`ID: ${id} Invalid.`);
    }
};

module.exports = { validateId };
