const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
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

module.exports = mongoose.model('users', userSchema)