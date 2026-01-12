const mongoose = require("mongoose");

const zekrActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  count: {
    type: Number,
    required: true,
    min: 1
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ZekrActivity", zekrActivitySchema);
