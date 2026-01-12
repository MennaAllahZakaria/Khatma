const mongoose = require("mongoose");

const zekrActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  zekrType: {
    type: String,
    enum: [
      "SUBHAN_ALLAH",
      "ALHAMDULILLAH",
      "ALLAHU_AKBAR",
      "ASTAGHFIRULLAH",
      "SALAT_AL_NABI",
      "OTHER"
    ],
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
