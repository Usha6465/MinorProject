const mongoose = require("mongoose");

const Fundraising = new mongoose.Schema({
  fundraising: {
    hash: { type: String, required: true },
    information: {
      type: Array,
      fundRaisingEventId: { type: String, required: true },
      fundRaisingEventName: { type: String, required: true },
      fundRaisingEventDescription: { type: String, required: true },
      fundRaisingEventFundGoal: { type: Number, required: true },
      fundRaisingEventFundRaised: { type: Number, required: true },
      fundRaisingDocument: { type: String, required: true },
      createdBy: { type: String, required: true },
      createdAt: { type: String, required: true },
    },
  },
});

const fundraising = mongoose.model("Fundraising", Fundraising);
module.exports = fundraising;
