const mongoose = require("mongoose");
const ZekrActivity = require("../models/ZekrActivityModel");
const User = require("../models/userModel");
const GlobalStats = require("../models/globalStatsModel");

const MAX_ZEKR_PER_REQUEST = 1000;

/* =========================
   Add Zekr (Final)
========================= */

exports.addZekr = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, count } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId مطلوب" });
    }

    if (
      typeof count !== "number" ||
      count <= 0 ||
      count > MAX_ZEKR_PER_REQUEST
    ) {
      return res.status(400).json({
        message: `عدد الذكر يجب أن يكون بين 1 و ${MAX_ZEKR_PER_REQUEST}`
      });
    }

    const userExists = await User.exists({ _id: userId }).session(session);
    if (!userExists) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    await ZekrActivity.create(
      [{
        userId,
        count
      }],
      { session }
    );

    await User.findByIdAndUpdate(
      userId,
      {
        $inc: { totalAzkarCount: count },
        lastActivityAt: new Date()
      },
      { session }
    );

    await GlobalStats.findByIdAndUpdate(
      "GLOBAL",
      {
        $inc: { totalAzkarCount: count },
        updatedAt: new Date()
      },
      { upsert: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      added: count
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};
