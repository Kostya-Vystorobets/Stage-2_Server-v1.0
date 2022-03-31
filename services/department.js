const Department = require('../models/Department');

const getAll = async () => {
    return Department.find()
}

const getById = async (id) => {
    const departmentById = Department.findById(id)
    return departmentById.populate("employees")

}
const deleteById = async (id) => {
    return Department.remove(id)

}
const create = async (department) => {
    const newDepartment = new Department({
        name: department.name,
        description: department.description,
    })
    return newDepartment.save()
}
const updeteById = async (id, department) => {
    return Department.findByIdAndUpdate(id, department)
}

module.exports = {
    getAll,
    getById,
    deleteById,
    create,
    updeteById
}