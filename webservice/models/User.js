const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  citizenId: {
    type: String,
    required: [true, "Please add Citizen ID"],
    unique: true,
    maxlength: [13, "Citizen ID can not be more than 13 digits"],
  },
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
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please add a phone number"],
  },
  isGuide: {
    type: Boolean,
  },
  bankName: {
    type: String,
  },
  bankAccount: {
    type: String,
  },
  remainingAmount: {
    type: Number,
  },
  licenseId: {
    type: String,
    //unique: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
