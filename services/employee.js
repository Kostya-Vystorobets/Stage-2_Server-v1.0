const Employee = require('../models/Employee');
const Department = require('../models/Department');
const ApplicationError = require('../errors/applicationError');
const validate = require('../validations/generalValidation')

const getById = async (employeeId) => {
    await validate.validateId(employeeId)
    const employee = await Employee.findById(employeeId)
    if (!employee) {
        throw new ApplicationError('The employee with this ID was not found', 404)
    }
    return employee
}
const deleteById = async (departmentId, employeeId) => {
    await validate.validateId(departmentId)
    await validate.validateId(employeeId)
    const deleteEmployee = await Employee.deleteOne({ employeeId })
    await Department.findOneAndUpdate(
        { _id: departmentId },
        { $pull: { employees: employeeId } },
        { new: true, useFindAndModify: false }
    )
    return deleteEmployee
}

const create = async (departmentId, employee) => {
    await validate.validateId(departmentId);
    const сheckDepartmentById = await Department.findById(departmentId);
    if (!сheckDepartmentById) {
        throw new ApplicationError('The department with this ID was not found.', 404)
    }
    const сheckUserName = await Employee.findOne({ userName: employee.userName });
    if (сheckUserName) {
        throw new ApplicationError('The employee with this User Name already exists.', 404)
    }
    const сheckEmail = await Employee.findOne({ email: employee.email });
    if (сheckEmail) {
        throw new ApplicationError('The employee with this Email already exists.', 400)
    }
    const newEmployee = new Employee({
        userName: employee.userName,
        description: employee.description,
        email: employee.email,
        firstName: employee.firstName,
        lastName: employee.lastName
    });
    const savedEmployee = await newEmployee.save()
    await Department.findOneAndUpdate(
        { _id: departmentId },
        { $push: { employees: savedEmployee._id } },
        { new: true, useFindAndModify: false }
    )
    return savedEmployee;
}
const updeteById = async (employeeId, employee) => {
    await validate.validateId(employeeId)
    return Employee.findOneAndUpdate(
        employeeId,
        {
            email: employee.email,
            firstName: employee.firstName,
            lastName: employee.lastName,
            updated_at: Date.now()
        },
        {
            new: true
        })
}

module.exports = {
    getById,
    deleteById,
    create,
    updeteById
}