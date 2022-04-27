const Joi = require('joi');
const ErrorException = require('../error-handler/error-exception');

const validUserCreate = async (data) => {
    try {
        const schema = Joi.object({
            userName: Joi.string().required(),
            password: Joi.string().required()
        });
        await schema.validateAsync(data);
    } catch (error) {
        throw ErrorException.BadRequest(error.details[0].message);
    }
};

module.exports = { validUserCreate };
