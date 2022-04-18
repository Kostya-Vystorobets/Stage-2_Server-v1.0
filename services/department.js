const Department = require('../models/Department');
const validate = require('../validations/generalValidation');
const ApplicationError = require('../errors/applicationError');

const getAll = async (request) => {
    let departments = [];
    const name = request.query.name
    if (name) {
        departments = await Department.find({ name: name }).select('-employees');
        if (!departments) {
            throw new ApplicationError(`Department with the name ${name} not found.`, 404)
        }
    }
    if (!name) {
        departments = await Department.find().select('-employees').sort('name');
        if (!departments) {
            throw new ApplicationError('There are no existing departments.', 404)
        }
    }
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || departments.length;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    if (endIndex < departments.length) {
        results.next = {
            page: page + 1,
            limit: limit
        };
    }
    if (startIndex > 0) {
        results.previos = {
            page: page - 1,
            limit: limit
        };
    }
    results.results = departments.slice(startIndex, endIndex);
    return results;
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