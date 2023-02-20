const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref : 'User',
        required: true
    },
    program: {
        type: mongoose.Schema.ObjectId,
        ref : 'Program',
        required: true
    },
    request: {
        type: String,
    },
    createdAt: {
        type: Date,
        default : Date.now
    },
    status : {
        type : String,
        enum : ['pending','accepted','declined'],
        default : 'pending'
    }
});

module.exports=mongoose.model('Booking',BookingSchema);