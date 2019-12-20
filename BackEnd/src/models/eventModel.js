const mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    ename: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    }
});

const eventModel = mongoose.model('notification', eventSchema);
module.exports = {eventModel};