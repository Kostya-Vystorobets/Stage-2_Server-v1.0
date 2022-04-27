const Joi = require('joi');
const ErrorException = require('../error-handler/error-exception');

const validEmployeeCreate = async (data) => {
    try {
        const schema = Joi.object({
            userName: Joi.string().min(5).required(),
            email: Joi.string().required().email(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required()
        });
        await schema.validateAsync(data);
    } catch (error) {
        throw ErrorException.BadRequest(error.details[0].message);
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
        throw ErrorException.BadRequest(error.details[0].message);
    }
};

module.exports = { validEmployeeCreate, validEmployeeUpdete };
