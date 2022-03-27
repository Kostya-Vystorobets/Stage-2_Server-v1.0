const service = require('../services/departmen')

const getAll = async (request, response, next) => {
    try {
        const departments = await service.getAll(request.body)
        return response.send(departments);
    } catch (error) {
        next(error)
    }
}
const getById = async (request, response, next) => {
    try {
        const department = await service.getById(request.params.id)
        return response.send(department);
    } catch (error) {
        next(error)
    }
}
const deleteById = async (request, response, next) => {
    try {
        const department = service.deleteById({_id: request.params.id})
        return response.send(department);
    } catch (error) {
        next(error)
    }
}
const create = async (request, response, next) => {
    try {
        const department = await service.create(request.body)
        return response.send(department);
    } catch (error) {
        next(error)
    }
}
const updeteById = async (request, response, next) => {
    try {
        const department = await service.updeteById(request.params.id, request.body, { new: true })
        return response.send(department);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAll,
    getById,
    deleteById,
    create,
    updeteById
}