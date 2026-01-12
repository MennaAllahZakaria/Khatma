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

  azkarCounters: {
    SUBHAN_ALLAH: { type: Number, default: 0 },
    ALHAMDULILLAH: { type: Number, default: 0 },
    ALLAHU_AKBAR: { type: Number, default: 0 },
    ASTAGHFIRULLAH: { type: Number, default: 0 },
    SALAT_AL_NABI: { type: Number, default: 0 },
    OTHER: { type: Number, default: 0 }
  },


  lastActivityAt: {
    type: Date
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
