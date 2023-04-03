const mongoose = require("mongoose");
const User = require("./User");

const NotificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please add a user"],
  },
  type: {
    type: String,
    enum: [
      "newrequest",
      "accrequest",
      "decrequest",
      "nexttrip",
      "endtrip",
      "coin",
      "payment",
      "refund",
      "cancel"
    ],
    required: [true, "Please add a notification type"],
  },
  title: {
    type: String,
    required: [true, "Please add a notification title"],
  },
  message: {
    type: String,
  },
  notifyTime: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Notification", NotificationSchema);
