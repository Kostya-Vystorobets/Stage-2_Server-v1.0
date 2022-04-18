const Joi = require('joi');
const ApplicationError = require('../errors/applicationError');
const logger = require('../logger/logger');

const validDepartmentCreate = async (data) => {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
        });
        await schema.validateAsync(data);
    } catch (error) {
        logger.error(error);
        throw new ApplicationError("validDepartmentCreate");
    };
};

const validDepartmentUpdete = async (data) => {
    try {
        const schema = Joi.object({
            description: Joi.string(),
        });
        await schema.validateAsync(data);
    } catch (error) {
        logger.error(error);
        throw new ApplicationError("validDepartmentUpdete");
    };
};

module.exports = { validDepartmentCreate, validDepartmentUpdete };