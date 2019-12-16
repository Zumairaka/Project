const mongoose = require('mongoose');

var bookingSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    teamSize: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    ground1: {
        type: Boolean,
    },
    ground2: {
        type: Boolean,
    },
    ground3: {
        type: Boolean
    }
});

const bookingModel = mongoose.model('booking', bookingSchema);
module.exports = {bookingModel};