const Department = require("../models/Department")
const errorHandler = require("../utils/errorHandler")

const getAll = (request, response) => {

}
const getById = (request, response) => {

}
const deleteById = (request, response) => {

}
const create = async (request, response) => {
    const department = new Department({
        name: request.body.name,
        description: request.body.description,
        employee: []
    })
    try {
        await department.save()
        response.status(201).json(department)
    } catch (error) {
        errorHandler(response, error)
    }
}
const updeteById = (request, response) => {

}

module.exports = {
    getAll,
    getById,
    deleteById,
    create,
    updeteById
}