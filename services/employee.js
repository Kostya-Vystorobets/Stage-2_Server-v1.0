const Employee = require('../models/Employee')
const Department = require('../models/Department')


const getById = async (id) => {
        return Employee.findById(id)
}
const deleteById = async (id) => {
        return Employee.remove(id)

}
const create = async (departmentId, employee) => {
        console.log(departmentId)
        const newEmployee = new Employee({
                userName: employee.userName,
                description: employee.description
        })
        return newEmployee.save()
                .then(employee => {
                        return Department.findOneAndUpdate(
                                departmentId,
                                { $push: { employees: employee._id } },
                                { new: true, useFindAndModify: false }
                        );
                })
}
const updeteById = async (id, employee) => {
        return Employee.findOneAndUpdate(id, employee)
}

module.exports = {
        getById,
        deleteById,
        create,
        updeteById
}