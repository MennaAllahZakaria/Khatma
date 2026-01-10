const mongoose = require("mongoose");

const globalStatsSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: "GLOBAL"
  },

  totalCompletedKhatmas: {
    type: Number,
    default: 0
  },

  totalPartsRead: {
    type: Number,
    default: 0
  },

  totalAzkarCount: {
    type: Number,
    default: 0
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("GlobalStats", globalStatsSchema);
