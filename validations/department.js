const Joi = require('joi');
const ApplicationError = require('../errors/applicationError');

const validDepartmentCreate = async (data) => {
    try {
        const schema = Joi.object({
            name: Joi.string().alphanum().min(5).max(30).required(),
            description: Joi.string().min(5).max(100).required(),
        });
        await schema.validateAsync(data);
    } catch (error) {
        logger.error(error);
        throw new ApplicationError(error);
    };

};

const validDepartmentUpdete = async (data) => {
    try {
        const schema = Joi.object({
            description: Joi.string().min(5).max(100),
        });
        await schema.validateAsync(data);
    } catch (error) {
        logger.error(error);
        throw new ApplicationError(error);
    };

};

module.exports = { validDepartmentCreate, validDepartmentUpdete };