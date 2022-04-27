const Joi = require('joi');
const { BadRequest } = require('../error-handler/error-exception');

const validUserCreate = async (data) => {
    try {
        const schema = Joi.object({
            userName: Joi.string().required(),
            password: Joi.string().required()
        });
        await schema.validateAsync(data);
    } catch (error) {
        throw BadRequest(error.details.shift().message);
    }
};

module.exports = { validUserCreate };
