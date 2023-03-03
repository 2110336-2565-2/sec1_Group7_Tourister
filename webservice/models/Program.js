const mongoose = require("mongoose");
const User = require("./User");

const ProgramSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a program name']
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    startDate: {
        type: Date,
        required: [true, 'Please add start date']
    },
    endDate: {
        type: Date,
        required: [true, 'Please add end date']
    },
    startTime: {
        type: String,
        //required: [true, 'Please add start time']
    },
    endTime: {
        type: String,
        //required: [true, 'Please add end time']
    },
    province: {
        type: String,
        required: [true, 'Please add province']
    },
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
        required: [true, 'Please add meeting location']
    },
    descriptionOfMeetLocation: {
        type: String
    },
    guide: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, 'Please add a guide']
    },
    // attractions: {
    //     type: [new mongoose.Schema({ 
    //         location: {
    //             type : String,
    //             require : true
    //         },
    //         province: String,
    //         image: String,
    //         admissionsIncluded : {
    //             type : Boolean,
    //             default: false
    //         },
    //         visitDate : Date,
    //         //id: String,
    //         //name: String,
    //         //option: String,
    //         // file: Buffer,
    //     }, {_id: false})]
    // },
    dayTrips: {
        type: [new mongoose.Schema({ 
            date: {
                type : Date,
                require : true
            },
            attractions:{
                type: [new mongoose.Schema({ 
                    location: {
                        type : String,
                        require : true
                    },
                    province: {
                        type : String,
                        require : true
                    },
                    time: {
                        type : String,
                        require : true
                    },
                    option: {
                        type : String,
                        require : true
                    },
                    image: String,
                    // file: File | undefined
                }, {_id: false})]}
        }, {_id: false})]
    },
    image: {
        type: String
    },
    language: {
        type: [String]
    },
    endLocation: {
        type: String
    },
    descriptionOfEndLocation: {
        type: String
    },
    published : {
        type : Boolean,
        default : true
    },
    status :{
        type : String,
        enum : ['ongoing','upcoming','complete','cancel'],
        default : 'upcoming'
    }
})

module.exports = mongoose.model("Program", ProgramSchema);
