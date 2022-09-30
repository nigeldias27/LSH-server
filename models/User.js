const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role:{
        ref:'Role',
        type: mongoose.Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('User', dataSchema)