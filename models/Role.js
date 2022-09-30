const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    role_name: {
        required: true,
        type: String
    },
    people: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    form_inputs:[],
    gotorole: String
})

module.exports = mongoose.model('Role', dataSchema)