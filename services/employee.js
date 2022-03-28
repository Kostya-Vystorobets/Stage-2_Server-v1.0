const Employee = require('../models/Employee')

const getById = async (id) => {
        return Employee.findById(id)
}
const deleteById = async (id) => {
        return Employee.remove(id)
}
const create = async (request) => {
        const employee = new Employee({
                name: request.name,
                description: request.description,
        })
        await employee.save()
}
const updeteById = async (id, body) => {
        return Employee.findByIdAndUpdate(id, body)
}

module.exports = {
        getById,
        deleteById,
        create,
        updeteById
}