const Employee = require('../models/Employee')
const Department = require('../models/Department')
const logger = require("../logger/logger")

const getById = (employeeId) => {
    return Employee.findById(employeeId)
}
const deleteById = async (departmentId, employeeId) => {
    const deleteEmployee = await Employee.deleteOne({ employeeId })
    const deletIdInDepertment = await Department.findOneAndUpdate(
        { _id: departmentId },
        { $pull: { employees: employeeId } },
        { new: true, useFindAndModify: false }
    )
    return deleteEmployee
}

const create = async (departmentId, employee) => {
    const newEmployee = new Employee({
        userName: employee.userName,
        description: employee.description,
        userName: employee.userName,
        email: employee.email,
        firstName: employee.firstName,
        lastName: employee.lastName
    })
    const savedEmployee = await newEmployee.save()
    return Department.findOneAndUpdate(
        { _id: departmentId },
        { $push: { employees: savedEmployee._id } },
        { new: true, useFindAndModify: false }
    )
}
const updeteById = (employeeId, employee) => {
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