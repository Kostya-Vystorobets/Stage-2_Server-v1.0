const mongoose = require('mongoose')
const Schema = mongoose.Schema

const departmentSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    created_at: {
        type: String,
        require: true
    },
    updated_at: {
        type: String,
        require: true
    },
    employees: [{
        type: Schema.Types.ObjectId,
    }]
})

module.exports = mongoose.model('departments', departmentSchema)