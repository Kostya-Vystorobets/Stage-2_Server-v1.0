const Department = require('../models/Department');
const validate = require('../validations/generalValidation');
const { BadRequest } = require('../error-handler/error-exception');

const getAll = async (request) => {
    const count = await Department.count();
    const name = request.query.name;
    const offset = request.query.offset || 0;
    const limit = request.query.limit || count;
    if (name) {
        const department = await Department.find({ name: name }).select('-employees');
        if (!department[0]) {
            throw BadRequest(`Department with the name ${name} not found.`);
        }
        return { data: department };
    }
    if (!name) {
        const departments = await Department.find()
            .select('-employees')
            .sort('name')
            .skip(offset)
            .limit(limit);
        if (!departments) {
            throw BadRequest('There are no existing departments.');
        }
        return { count: count, data: departments };
    }
};

const getById = async (departmentId) => {
    await validate.validateId(departmentId);
    const department = await Department.findById(departmentId);
    if (!department) {
        throw BadRequest('The department with this ID was not found');
    }
    return department.populate('employees');
};

const deleteById = async (departmentId) => {
    await validate.validateId(departmentId);
    const department = await Department.findById(departmentId);
    if (!department) {
        throw BadRequest('The department with this ID was not found');
    }
    if (department.employees.length !== 0) {
        throw ErrorException.BadRequest(
            'Unable to delete a department. The department contains employees.'
        );
    } else {
        await department.remove();
    }
};

const create = async (department) => {
    const сheckName = await Department.findOne({ name: department.name });
    if (сheckName) {
        throw BadRequest('The department with this Name already exists.');
    }
    const newDepartment = new Department({
        name: department.name,
        description: department.description
    });
    return newDepartment.save();
};

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
        }
    );
};

module.exports = {
    getAll,
    getById,
    deleteById,
    create,
    updeteById
};
