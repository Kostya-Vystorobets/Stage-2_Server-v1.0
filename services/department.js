const Department = require('../models/Department');
const logger = require("../logger/dev-logger")

const getAll = async () => {
    return Department.find().sort("name");
}

const getById = async (departmentId) => {
    const departmentById = Department.findById(departmentId)
    return departmentById.populate("employees")

}
const deleteById = async (departmentId) => {
    return Department.remove(departmentId)

}
const create = async (department) => {
    const newDepartment = new Department({
        name: department.name,
        description: department.description,
    })
    return newDepartment.save()
}
const updeteById = async (departmentId, department) => {
    return Department.findByIdAndUpdate(
        departmentId,
        {
            name: department.name,
            description: department.description,
            updated_at: Date.now()
        },
        {
            new: true
        })
}

module.exports = {
    getAll,
    getById,
    deleteById,
    create,
    updeteById
}