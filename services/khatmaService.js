const mongoose = require("mongoose");
const Khatma = require("../models/khatamModel");
const KhatmaProgress = require("../models/khatmaProgressModel");
const User = require("../models/userModel");
const GlobalStats = require("../models/globalStatsModel");
const asyncHandler = require("express-async-handler");


/* =========================
   Helpers
========================= */

const getTotalCountByMode = (mode) => {
  switch (mode) {
    case "juz":
      return 30;
    case "hizb":
      return 60;
    case "page":
      return 604;
    default:
      return null;
  }
};

/* =========================
   Create Khatma
========================= */

exports.createKhatma =asyncHandler(async (req, res, next) => {
  try {
    const { userId, title, mode } = req.body;

    if (!userId || !mode) {
      return res.status(400).json({ message: "بيانات غير مكتملة" });
    }

    const totalCount = getTotalCountByMode(mode);
    if (!totalCount) {
      return res.status(400).json({ message: "نظام الختمة غير صالح" });
    }

    const khatma = await Khatma.create({
      userId,
      title,
      mode,
      totalCount
    });

    res.status(201).json(khatma);
  } catch (error) {
    next(error);
  }
});

/* =========================
   Add Progress
========================= */

exports.addProgress = asyncHandler(async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { index } = req.body;
    const { id: khatmaId } = req.params;

    if (typeof index !== "number") {
      return res.status(400).json({ message: "رقم الجزء غير صالح" });
    }

    const khatma = await Khatma.findById(khatmaId).session(session);

    if (!khatma) {
      return res.status(404).json({ message: "الختمة غير موجودة" });
    }

    if (khatma.isCompleted) {
      return res.status(400).json({ message: "الختمة مكتملة بالفعل" });
    }

    await KhatmaProgress.create(
      [{
        khatmaId: khatma._id,
        userId: khatma.userId,
        index
      }],
      { session }
    );

    khatma.completedCount += 1;

    let completedNow = false;

    if (khatma.completedCount === khatma.totalCount) {
      khatma.isCompleted = true;
      khatma.completedAt = new Date();
      completedNow = true;
    }

    await khatma.save({ session });

    await User.findByIdAndUpdate(
      khatma.userId,
      {
        $inc: {
          totalPartsRead: 1,
          totalKhatmasCompleted: completedNow ? 1 : 0
        },
        lastActivityAt: new Date()
      },
      { session }
    );

    await GlobalStats.findByIdAndUpdate(
      "GLOBAL",
      {
        $inc: {
          totalPartsRead: 1,
          totalCompletedKhatmas: completedNow ? 1 : 0
        },
        updatedAt: new Date()
      },
      { upsert: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    res.json({
      success: true,
      isCompleted: khatma.isCompleted
    });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    if (error.code === 11000) {
      return res.status(409).json({
        message: "الجزء ده متسجل قبل كده"
      });
    }

    next(error);
  }
});

/* =========================
   Get User Khatmas
========================= */

exports.getUserKhatmas = asyncHandler(async (req, res, next) => {
  try {
    const { userId } = req.params;

    const khatmas = await Khatma.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    const result = khatmas.map(khatma => ({
      ...khatma,
      progressPercentage: Math.round(
        (khatma.completedCount / khatma.totalCount) * 100
      )
    }));

    res.json(result);
  } catch (error) {
    next(error);
  }
});

/* =========================
   Get Single Khatma Details
========================= */

exports.getKhatmaDetails = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    const khatma = await Khatma.findById(id).lean();
    if (!khatma) {
      return res.status(404).json({ message: "الختمة غير موجودة" });
    }

    const progress = await KhatmaProgress.find({ khatmaId: id })
      .select("index completedAt -_id")
      .sort({ index: 1 })
      .lean();

    res.json({
      ...khatma,
      progress,
      progressPercentage: Math.round(
        (khatma.completedCount / khatma.totalCount) * 100
      )
    });
  } catch (error) {
    next(error);
  }
});
