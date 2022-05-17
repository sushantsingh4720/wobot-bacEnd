const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add a text value']
    },
    lastName: {
        type: String,
        required: [true, 'please add a test value']
    },
    username: {
        type: String,
        required: [true, 'Please add a text value'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a text value']
    },
    accessKey:{
        type:String,
        required: [true, 'Please enter accessKey']
    }


})
module.exports = mongoose.model('Admin', adminSchema)