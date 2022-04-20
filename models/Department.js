const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
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
    },
    employees: [
        {
            type: Schema.Types.ObjectId,
            select: true,
            ref: 'employees'
        }
    ]
});

module.exports = mongoose.model('departments', departmentSchema);
