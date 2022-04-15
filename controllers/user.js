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
        const employee = await service.create(request.params.departmentId, request.body);
        return response.send(employee);
    } catch (error) {
        next(error);
    }
};

const logout = async (request, response, next) => {
    try {
        const token = await service.logout(request);
        return response.send(token);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    login,
    create
};