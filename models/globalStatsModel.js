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

  azkarCounters: {
    SUBHAN_ALLAH: { type: Number, default: 0 },
    ALHAMDULILLAH: { type: Number, default: 0 },
    ALLAHU_AKBAR: { type: Number, default: 0 },
    ASTAGHFIRULLAH: { type: Number, default: 0 },
    SALAT_AL_NABI: { type: Number, default: 0 },
    OTHER: { type: Number, default: 0 }
  },


  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("GlobalStats", globalStatsSchema);
