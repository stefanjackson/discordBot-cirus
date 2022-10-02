const mongoose = require('mongoose');

const cirusSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    time: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('price', cirusSchema);