const Department = require("../models/Department")

module.exports.getAll = function (request, response) {

}
module.exports.getById = function (request, response) {

}
module.exports.deleteById = function (request, response) {

}
module.exports.getAll = function (request, response) {

}
module.exports.create = async function (request, response) {
    const department = new Department({
        name: request.body.name,
        description: request.body.description,
        employee: []
    })
    try {
        await department.save()
        response.status(201).json(department)
    } catch (error) {
        response.status(500).json({ message: error })
    }
}
module.exports.updeteById = function (request, response) {

}