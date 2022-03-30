const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    // id: {
    //     type: Schema.Types.ObjectId,
    //     require: true
    // },
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    created_at: {
        type: Date,
        require: true,
        default: () => Date.now()
    },
    updated_at: {
        type: Date,
        require: true,
        default: () => Date.now()
    }
})

module.exports = mongoose.model('employees', employeeSchema)