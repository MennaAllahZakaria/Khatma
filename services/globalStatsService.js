const GlobalStats = require("../models/globalStatsModel");
const asyncHandler = require("express-async-handler");

/* =========================
   Get Global Stats
========================= */

exports.getGlobalStats = asyncHandler(async (req, res, next) => {
  try {
    let stats = await GlobalStats.findById("GLOBAL").lean();

    // First run protection
    if (!stats) {
      stats = await GlobalStats.create({ _id: "GLOBAL" });
    }

    res.json({
      totalCompletedKhatmas: stats.totalCompletedKhatmas,
      totalPartsRead: stats.totalPartsRead,
      totalAzkarCount: stats.totalAzkarCount,
      updatedAt: stats.updatedAt
    });

  } catch (error) {
    next(error);
  }
});
