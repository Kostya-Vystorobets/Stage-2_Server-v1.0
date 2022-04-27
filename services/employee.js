const Employee = require('../models/Employee');
const Department = require('../models/Department');
const { BadRequest } = require('../error-handler/error-exception');
const validate = require('../validations/generalValidation');

const getById = async (employeeId) => {
    await validate.validateId(employeeId);
    const employee = await Employee.findById(employeeId);
    if (!employee) {
        throw BadRequest('The employee with this ID was not found');
    }
    return employee;
};
const deleteById = async (departmentId, employeeId) => {
    await validate.validateId(departmentId);
    await validate.validateId(employeeId);
    const department = await Department.findById(departmentId);
    if (!department) {
        throw BadRequest('The department with this ID was not found');
    }
    const employee = await Employee.findById(employeeId);
    if (!employee) {
        throw BadRequest('The Employee with this ID was not found');
    } else {
        await employee.remove();
    }
    await Department.findOneAndUpdate(
        { _id: departmentId },
        { $pull: { employees: employeeId } },
        { new: true, useFindAndModify: false }
    );
};

const create = async (departmentId, employee) => {
    await validate.validateId(departmentId);
    const сheckDepartmentById = await Department.findById(departmentId);
    if (!сheckDepartmentById) {
        throw BadRequest('The department with this ID was not found.');
    }
    const сheckUserName = await Employee.findOne({
        userName: employee.userName
    });
    if (сheckUserName) {
        throw BadRequest('The employee with this User Name already exists.');
    }
    const сheckEmail = await Employee.findOne({ email: employee.email });
    if (сheckEmail) {
        throw BadRequest('The employee with this Email already exists.');
    }
    const newEmployee = new Employee({
        userName: employee.userName,
        description: employee.description,
        email: employee.email,
        firstName: employee.firstName,
        lastName: employee.lastName
    });
    const savedEmployee = await newEmployee.save();
    await Department.findOneAndUpdate(
        { _id: departmentId },
        { $push: { employees: savedEmployee._id } },
        { new: true, useFindAndModify: false }
    );
    return savedEmployee;
};
const updeteById = async (employeeId, employee) => {
    await validate.validateId(employeeId);
    return Employee.findOneAndUpdate(employeeId, {
        email: employee.email,
        firstName: employee.firstName,
        lastName: employee.lastName,
        updated_at: Date.now()
    });
};

module.exports = {
    getById,
    deleteById,
    create,
    updeteById
};
