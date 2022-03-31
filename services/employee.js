const Employee = require('../models/Employee')
const Department = require('../models/Department')


const getById = (id) => {
        return Employee.findById(id)
}
const deleteById = async (employeeId) => {
        return Employee.deleteOne({ employeeId })

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
const updeteById = (id, employee) => {
        return Employee.findOneAndUpdate(id, employee)
}

module.exports = {
        getById,
        deleteById,
        create,
        updeteById
}