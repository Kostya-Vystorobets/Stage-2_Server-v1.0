const Joi = require('joi');
const ApplicationError = require('../errors/applicationError');

const validUserCreate = async (data) => {
    try {
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        });
        await schema.validateAsync(data);
    } catch (error) {
        logger.error(error);
        throw new ApplicationError(error);
    };

};

module.exports = { validUserCreate };