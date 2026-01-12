const mongoose = require("mongoose");
const ZekrActivity = require("../models/ZekrActivityModel");
const User = require("../models/userModel");
const GlobalStats = require("../models/globalStatsModel");

const MAX_ZEKR_PER_REQUEST = 1000;

const ALLOWED_ZEKR_TYPES = [
  "SUBHAN_ALLAH",
  "ALHAMDULILLAH",
  "ALLAHU_AKBAR",
  "ASTAGHFIRULLAH",
  "SALAT_AL_NABI",
  "OTHER"
];

/* =========================
   Add Zekr (Final Clean)
========================= */

exports.addZekr = async (req, res, next) => {
  let session;

  try {
    const { userId, count, zekrType } = req.body;

    /* ---------- Basic Validation ---------- */

    if (!userId) {
      return res.status(400).json({ message: "userId مطلوب" });
    }

    if (typeof count !== "number" || count < 1 || count > MAX_ZEKR_PER_REQUEST) {
      return res.status(400).json({
        message: `عدد الذكر يجب أن يكون بين 1 و ${MAX_ZEKR_PER_REQUEST}`
      });
    }

    if (!zekrType || !ALLOWED_ZEKR_TYPES.includes(zekrType)) {
      return res.status(400).json({ message: "نوع الذكر غير صالح" });
    }

    /* ---------- Start Transaction ---------- */

    session = await mongoose.startSession();
    session.startTransaction();

    /* ---------- Update User (ownership + existence check) ---------- */

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $inc: {
          totalAzkarCount: count,
          [`azkarCounters.${zekrType}`]: count
        },
        lastActivityAt: new Date()
      },
      { new: true, session }
    );

    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    /* ---------- Save Zekr Activity ---------- */

    await ZekrActivity.create(
      [{
        userId,
        zekrType,
        count
      }],
      { session }
    );

    /* ---------- Update Global Stats ---------- */

    await GlobalStats.findByIdAndUpdate(
      "GLOBAL",
      {
        $inc: {
          totalAzkarCount: count,
          [`azkarCounters.${zekrType}`]: count
        },
        updatedAt: new Date()
      },
      { upsert: true, session }
    );

    /* ---------- Commit ---------- */

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      data: {
        zekrType,
        added: count,
        userTotalAzkar: user.totalAzkarCount
      }
    });

  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    next(error);
  } finally {
    if (session) {
      session.endSession();
    }
  }
};
