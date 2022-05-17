const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: [true, 'Please add all text value']
    },
    description: {
        type: String,
        required: [true, 'Please add all text value']
    },
    quantity:{type:Number,
        required: [true, 'Please add all text value']
    },
    _createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User',
    }



})
const Product= mongoose.model('Product', productSchema)

module.exports = Product;