const Employee = require('../models/Employee')
// const service = require('./department')

const getById = async (request, response) => {
        const employee = await Employee.find({ _id: request.params.id })
        return employee
}
const deleteById = async (request, response) => {
        const employee = await Employee.remove({ _id: request.params.id })
        return employee
}
const create = async (request, response) => {
        const employee = new Employee({
                name: request.name,
                description: request.description,
        })
        // const departmen = service.updeteById(request.params.id, request)
        // return departmen
}
const updeteById = async (request, response) => {
        const employee = await Employee.findOneAndUpdate(
                { _id: request.params.id },
                { $set: request.body },
                { new: true }
        )
        return employee
}

module.exports = {
        getById,
        deleteById,
        create,
        updeteById
}