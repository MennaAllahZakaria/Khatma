const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },

  totalKhatmasCompleted: {
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

  lastActivityAt: {
    type: Date
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
