const mongoose = require("mongoose");

const khatmaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  title: {
    type: String,
    trim: true,
    maxlength: 100
  },

  mode: {
    type: String,
    enum: ["juz", "hizb", "page"],
    required: true
  },

  completedCount: {
    type: Number,
    default: 0
  },

  totalCount: {
    type: Number,
    required: true
  },

  isCompleted: {
    type: Boolean,
    default: false
  },

  completedAt: {
    type: Date
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Khatma", khatmaSchema);
