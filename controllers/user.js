const service = require('../services/user');
const validation = require('../validations/user')

const login = async (request, response, next) => {
    try {
        const token = await service.login(request);
        return response.send(token);
    } catch (error) {
        next(error);
    }
};

const create = async (request, response, next) => {
    try {
        await validation.validUserCreate(request.body);
        const user = await service.create(request.body);
        return response.send(user);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
    create
};