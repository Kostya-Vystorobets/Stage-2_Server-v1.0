const Department = require('../models/Department');
const validate = require('../validations/generalValidation');
const ApplicationError = require('../errors/applicationError');

const getAll = async (request) => {
    const count = await Department.count();
    const name = request.query.name;
    const offset = request.query.offset || 0;
    const limit = request.query.limit || count;
    if (name) {
        const department = await Department.find({ name: name }).select('-employees');
        if (!department[0]) {
            throw new ApplicationError(`Department with the name ${name} not found.`, 404)
        }
        return { data: department }
    }
    if (!name) {
        const departments = await Department.find().select('-employees').sort('name').skip(offset).limit(limit);
        if (!departments) {
            throw new ApplicationError('There are no existing departments.', 404)
        }
        return { count: count, data: departments }
    }
}

const getById = async (departmentId) => {
    await validate.validateId(departmentId);
    const department = await Department.findById(departmentId);
    if (!department) {
        throw new ApplicationError('The department with this ID was not found', 404)
    }
    return department.populate('employees');
}

const deleteById = async (departmentId) => {
    await validate.validateId(departmentId);
    const department = await Department.findById(departmentId);
    if (!department) {
        throw new ApplicationError('The department with this ID was not found', 404)
    }
    if (department.employees.length !== 0) {
        throw new ApplicationError('Unable to delete a department. The department contains employees.', 404)
    } else {
        await department.remove();
    }
}

const create = async (department) => {
    const сheckName = await Department.findOne({ name: department.name });
    if (сheckName) {
        throw new ApplicationError('The department with this Name already exists.', 404)
    }
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