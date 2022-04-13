const Joi = require('joi');
const ApplicationError = require('../errors/applicationError');
const logger = require('../logger/logger');

const validEmployeeCreate = async (data) => {
    try {
        const schema = Joi.object({
            userName: Joi.string().alphanum().min(5).max(30).required(),
            email: Joi.string().min(5).max(30).required().email(),
            firstName: Joi.string().min(2).max(30).required(),
            lastName: Joi.string().min(2).max(30).required()
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
            email: Joi.string().min(5).max(30).email(),
            firstName: Joi.string().min(2).max(30),
            lastName: Joi.string().min(2).max(30)
        });
        await schema.validateAsync(data);
    } catch (error) {
        logger.error(error);
        throw new ApplicationError(error);
    }

};

module.exports = { validEmployeeCreate, validEmployeeUpdete };