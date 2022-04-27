const Joi = require('joi');
const ErrorException = require('../error-handler/error-exception');
const logger = require('../logger/logger');

const validDepartmentCreate = async (data) => {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required()
        });
        await schema.validateAsync(data);
    } catch (error) {
        throw ErrorException.BadRequest(error.details[0].message);
    }
};

const validDepartmentUpdete = async (data) => {
    try {
        const schema = Joi.object({
            description: Joi.string()
        });
        await schema.validateAsync(data);
    } catch (error) {
        logger.error(error);
        throw ErrorException.BadRequest(error.details[0].message);
    }
};

module.exports = { validDepartmentCreate, validDepartmentUpdete };
