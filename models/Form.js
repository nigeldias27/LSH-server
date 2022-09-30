const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    form_inputs:[],
    gotorole:{
        ref:'Role',
        type: mongoose.Schema.Types.ObjectId
    },
    role:{
        ref:'Role',
        type: mongoose.Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('Form', dataSchema)