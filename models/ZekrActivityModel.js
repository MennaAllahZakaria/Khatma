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
      "سُبْحانَ اللهِ وَبِحَمْدِهِ، سُبْحانَ اللهِ العَظِيمِ",
      "اللهُ أَكبَرُ",
      "لا إلهَ إلا اللهُ وَحدَهُ لا شريكَ لهُ، لهُ الملكُ ولهُ الحَمدُ وهوَ على كلِّ شيءٍ قديرٌ.",
      "أستغفرُ اللهَ العَظِيمَ",
      "سُبْحانَ اللهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدادَ كَلِماتِهِ",
      "الحمدُ لله",
      "اللّهُمَّ لكَ الحمدُ كما ينبغي لجلالِ وجهكَ وعظيمِ سلطانِكَ",
      "اللّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
      "اخرى"
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
