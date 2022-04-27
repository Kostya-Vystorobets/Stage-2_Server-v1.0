const mongoose = require('mongoose');
const { BadRequest } = require('../error-handler/error-exception');

const validateId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw BadRequest(`ID: ${id} Invalid.`);
    }
};

module.exports = { validateId };
