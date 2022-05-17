const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
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
    }

})
module.exports = mongoose.model('User', userSchema)