const mongoose = require('mongoose')

const ratingSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true
    },
    // review: {
    //     type: String,
    //     trim: true
    // }
})

module.exports = ratingSchema