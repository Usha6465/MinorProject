const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    groups: {
      type: Array,
      info: {
        groupId: { type: String, unique: true },
        groupCreater: String,
        groupName: String,
        groupLocation: String,
        groupDescription: String,
      },
    },
    events: {
      type: Array,
      info: {
        eventId: String,
        eventName: String,
        eventPublicDetails: String,
        eventPresentationDetails: String,
        eventWorkshopDetails: String,
        eventCategory: String,
        eventLocation: String,
        eventDate: String,
        eventUrl: String,
        eventMode: String,
      },
    },
  },
  {
    collection: "usersData",
  }
);

const usermodel = mongoose.model("User", User);
module.exports = usermodel;
