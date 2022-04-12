const Employee = require('../models/Employee')
const Department = require('../models/Department')

const getById = (employeeId) => {
    const employee = Employee.findById(employeeId)
    if (!employee) {
        throw new ApplicationError(`The employee with ID ${employeeId} was not found`, 400)
    }
    return employee
}
const deleteById = async (departmentId, employeeId) => {
    const deleteEmployee = await Employee.deleteOne({ employeeId })
    console.log(deleteEmployee)
    await Department.findOneAndUpdate(
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
    await Department.findOneAndUpdate(
        { _id: departmentId },
        { $push: { employees: savedEmployee._id } },
        { new: true, useFindAndModify: false }
    )
    return savedEmployee;
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