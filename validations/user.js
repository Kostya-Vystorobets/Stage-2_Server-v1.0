const Joi = require('joi');
const ApplicationError = require('../errors/applicationError');

const validUserCreate = async (data) => {
    try {
        const schema = Joi.object({
            username: Joi.string().alphanum().min(2).max(30).required(),
            password: Joi.string().min(8).max(15).required(),
        });
        await schema.validateAsync(data);
    } catch (error) {
        logger.error(error);
        throw new ApplicationError(error);
    };

};

module.exports = { validUserCreate };