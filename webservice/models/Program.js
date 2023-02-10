const mongoose = require('mongoose');
const User = require('./User');

const ProgramSchema = new mongoose.Schema({
    programId: {
        type: String,
        required: [true,'Please add Program ID'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Please add a program name']
    },
    description: {
        type: String,
    },
    startDate: {
        type: Date,
        required: [true, 'Please add start date']
    },
    endDate: {
        type: Date,
        required: [true, 'Please add end date']
    },
    max_participant: {
        type: Number,
        required: [true, 'Please add max participant']
    },
    num_participant: {
        type: Number,
        required: true,
        default: 0
    },
    meetLocation: {
        type: String,
    },
    guide: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, 'Please add a guide']
    },
    location: {
        type: [String]
    },
    imageUrl: {
        type: String
    }
})

module.exports = mongoose.model('Program', ProgramSchema);