const service = require('../services/employee');
const validation = require('../validations/employee')

const getById = async (request, response, next) => {
    try {
        const employee = await service.getById({ _id: request.params.id });
        return response.send(employee);
    } catch (error) {
        console.log(error)
        // next(error);
    }
};

const deleteById = async (request, response, next) => {
    try {
        const data = await service.deleteById(request.params.departmentId, request.params.id);
        return response.send(data);
    } catch (error) {
        next(error);
    }
};
const create = async (request, response, next) => {
    try {
        await validation.validEmployeeCreate(request.body);
        const employee = await service.create(request.params.departmentId, request.body);
        return response.send(employee);
    } catch (error) {
        next(error);
    }
};
const updeteById = async (request, response, next) => {
    try {
        await validation.validEmployeeUpdete(request.body);
        const employee = await service.updeteById(request.params.id, request.body);
        return response.send(employee);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getById,
    deleteById,
    create,
    updeteById
};