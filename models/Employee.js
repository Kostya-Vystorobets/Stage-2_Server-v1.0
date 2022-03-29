const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
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
    }
})

module.exports = mongoose.model('employees', employeeSchema)