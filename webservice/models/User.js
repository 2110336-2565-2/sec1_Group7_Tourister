const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please add a name"],
  },
  surname: {
    type: String,
    trim: true,
    required: [true, "Please add a surname"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please add an email"],
    match : [
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength : 6
  },
  phoneNumber: {
    type: String,
    required: [true, "Please add a phone number"],
  },
  isGuide: {
    type: Boolean,
    default: false
  },
  remainingAmount: {
    type: Number,
    default:0
  },
  licenseId: {
    type: String,
    required: function() {
      return this.isGuide;
    },
    unique: function() {
      return this.isGuide;
    },
  },
  imageURL: {
    type: String,
  },
  draft:{
    type: Object,
  },
});

module.exports = mongoose.model("User", UserSchema);
