const Joi = require('joi');
const AppError = require('../errors/applicationError');
const logger = require('../logger/logger');

const validDepartmentCreate = async (data) => {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required()
        });
        await schema.validateAsync(data);
    } catch (error) {
        logger.error(error);
        throw new AppError('validDepartmentCreate');
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
        throw new AppError('validDepartmentUpdete');
    }
};

module.exports = { validDepartmentCreate, validDepartmentUpdete };
