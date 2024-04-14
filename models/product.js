const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName: {
        required: true,
        trim: true,
        type: String,
    },
    description: {
        required: true,
        trim: true,
        type: String,
    },
    quantity: {
        trim: true,
        required: true,
        type: Number
    },
    imageUrls: [
        {
            type: String,
            // trim: true,
            required: true
        }
    ],
    price: {
        trim: true,
        required: true,
        type: Number
        },
    category: {
        required: true,
        trim: true,
        type: String,
    },
    userId: {
        trim: true,
        type: String,
    }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product