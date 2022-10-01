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

export default mongoose.model('Role', dataSchema)
//module.exports = mongoose.model('Role', dataSchema)