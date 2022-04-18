const Joi = require('joi');
const ApplicationError = require('../errors/applicationError');
const logger = require('../logger/logger');

const validEmployeeCreate = async (data) => {
    try {
        const schema = Joi.object({
            userName: Joi.string().required(),
            email: Joi.string().required().email(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required()
        });
        await schema.validateAsync(data);
    } catch (error) {
        logger.error(error);
        throw new ApplicationError(error);
    }

};

const validEmployeeUpdete = async (data) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email(),
            firstName: Joi.string(),
            lastName: Joi.string()
        });
        await schema.validateAsync(data);
    } catch (error) {
        logger.error(error);
        throw new ApplicationError(error);
    }

};

module.exports = { validEmployeeCreate, validEmployeeUpdete };