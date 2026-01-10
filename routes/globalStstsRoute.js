const express = require("express");
const {
    getGlobalStats
} = require("../services/globalStatsService");
const router = express.Router();
// ================= GLOBAL STATS - GET GLOBAL STATS =================
router.get(
    "/",
    getGlobalStats
);
module.exports = router;