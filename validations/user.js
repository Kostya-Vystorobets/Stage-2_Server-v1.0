const Joi = require('joi');
const AppError = require('../errors/applicationError');
const logger = require('../logger/logger');

const validUserCreate = async (data) => {
    try {
        const schema = Joi.object({
            userName: Joi.string().required(),
            password: Joi.string().required()
        });
        await schema.validateAsync(data);
    } catch (error) {
        logger.error(error);
        throw new AppError(error);
    }
};

module.exports = { validUserCreate };
