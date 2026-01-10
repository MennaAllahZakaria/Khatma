const mongoose = require("mongoose");

const khatmaProgressSchema = new mongoose.Schema({
  khatmaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Khatma",
    required: true,
    index: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  index: {
    type: Number,
    required: true
  },

  completedAt: {
    type: Date,
    default: Date.now
  }
});

khatmaProgressSchema.index(
  { khatmaId: 1, index: 1 },
  { unique: true }
);

module.exports = mongoose.model("KhatmaProgress", khatmaProgressSchema);
