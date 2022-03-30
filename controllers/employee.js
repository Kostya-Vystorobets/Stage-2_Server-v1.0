const service = require('../services/employee')

const getById = async (request, response, next) => {
    try {
        console.log(request)
        const employee = await service.getById({ _id: request.params.id })
        return response.send(employee)
    } catch (error) {
        next(error)
    }
}
const deleteById = async (request, response, next) => {
    try {
        const employee = await service.deleteById({ _id: request.params.id })
        return response.send(employee)
    } catch (error) {
        next(error)
    }
}
const create = async (request, response, next) => {
    try {

        const employee = await service.create(request.params.id, request.body)
        return response.send(employee)
    } catch (error) {
        next(error)
    }
}
const updeteById = async (request, response, next) => {
    try {
        const employee = await service.updeteById(
            { _id: request.params.id },
            { $set: request.body },
            { new: true }
        )
        return response.send(employee)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getById,
    deleteById,
    create,
    updeteById
}