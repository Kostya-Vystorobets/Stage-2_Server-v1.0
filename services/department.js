const Department = require('../models/Department');

const getAll = async () => {
    return Department.find()
}

const getById = async (id) => {
    console.log(Department)
    return Department.findById(id)
}
const deleteById = async (id) => {
    return Department.remove(id)

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
    return Department.findByIdAndUpdate(id, body)
}

module.exports = {
    getAll,
    getById,
    deleteById,
    create,
    updeteById
}