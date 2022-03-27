const Department = require('../models/Department');


const getAll = async () => {
    const departments = await Department.find()
    return departments;
}

const getById = async (id) => {
        const department = await Department.findById(id)
        return department;
}
const deleteById = async (id) => {
    const department = await Department.remove(id)
    return department;
        
}
const create = async (body) => {
    const department = new Department({
        name: body.name,
        description: body.description,
        employee: []
    })
    await department.save()
}
const updeteById = async (id, body) => {
        const updateDepartment = await Department.findByIdAndUpdate(id, body)
        return updateDepartment;
}

module.exports = {
    getAll,
    getById,
    deleteById,
    create,
    updeteById
}