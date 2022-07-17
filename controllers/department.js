const service = require('../services/department');
const validation = require('../validations/department');

const getAll = async (request, response, next) => {
    try {
        const departments = await service.getAll(request);
        return response.send(departments);
    } catch (error) {
        next(error);
    }
};
const getById = async (request, response, next) => {
    try {
        const department = await service.getById(request.params.id);
        return response.send(department);
    } catch (error) {
        next(error);
    }
};
const deleteById = async (request, response, next) => {
    try {
        const department = await service.deleteById(request.params.id);
        return response.send(department);
    } catch (error) {
        next(error);
    }
};
const create = async (request, response, next) => {
    try {
        await validation.validDepartmentCreate(request.body);
        const department = await service.create(request.body);
        return response.send(department);
    } catch (error) {
        next(error);
    }
};
const updeteById = async (request, response, next) => {
    try {
        await validation.validDepartmentUpdete(request.body);
        const department = await service.updeteById(request.params.id, request.body);
        return response.send(department);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getById,
    deleteById,
    create,
    updeteById,
};
