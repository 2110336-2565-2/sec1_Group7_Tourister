const mongoose = require("mongoose");
const User = require("./User");

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
    // startTime: {
    //     type: String,
    //     required: [true, 'Please add start time']
    // },
    // endTime: {
    //     type: String,
    //     required: [true, 'Please add end time']
    // },
    max_participant: {
        type: Number,
        required: [true, 'Please add max participant']
    },
    num_participant: {
        type: Number,
        default: 0
    },
    meetLocation: {
        type: String,
    },
    descriptionOfMeetLocation: {
        type: String
    },
    guide: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, 'Please add a guide']
    },
    attractions: {
        type: [new mongoose.Schema({ 
            place: String,
            place_description: String,
            place_imageUrl: String,
        }, {_id: false})]
    },
    imageUrl: {
        type: String
    },
    language: {
        type: String
    },
    endLocation: {
        type: String
    },
    descriptionOfEndLocation: {
        type: String
    },
    pending_participant: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    accepted_participant: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    declined_participant: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    published : {
        type : Boolean,
        default : true
    }
})

module.exports = mongoose.model("Program", ProgramSchema);
