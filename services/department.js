const Department = require('../models/Department');
const validate = require('../validations/generalValidation');

const getAll = async () => {
    return Department.find().sort("name");
}

const getById = async (departmentId) => {
    await validate.validateId(departmentId);
    const department = Department.findById(departmentId);
    if (!department) {
        throw new ApplicationError('The department with this ID was not found', 400)
    }
    return department.populate("employees");
}

const deleteById = async (departmentId) => {
    await validate.validateId(departmentId);
    return Department.remove(departmentId);
}

const create = async (department) => {
    const newDepartment = new Department({
        name: department.name,
        description: department.description,
    })
    return newDepartment.save();
}

const updeteById = async (departmentId, department) => {
    await validate.validateId(departmentId);
    return Department.findByIdAndUpdate(
        departmentId,
        {
            description: department.description,
            updated_at: Date.now()
        },
        {
            new: true
        });
}

module.exports = {
    getAll,
    getById,
    deleteById,
    create,
    updeteById
}