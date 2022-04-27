const Joi = require('joi');
const { BadRequest } = require('../error-handler/error-exception');

const validDepartmentCreate = async (data) => {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required()
        });
        await schema.validateAsync(data);
    } catch (error) {
        throw BadRequest(error.details.shift().message);
    }
};

const validDepartmentUpdete = async (data) => {
    try {
        const schema = Joi.object({
            description: Joi.string()
        });
        await schema.validateAsync(data);
    } catch (error) {
        throw BadRequest(error.details.shift().message);
    }
};

module.exports = { validDepartmentCreate, validDepartmentUpdete };
