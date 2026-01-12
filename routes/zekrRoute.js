const express = require("express");

const {
    addZekr
} = require("../services/zekrService");
const { zekrRateLimit } = require("../middleware/zekrRateLimit");

const router = express.Router();
// ================= ZEKR - ADD ZEKR =================
router.post(
    "/add",
    zekrRateLimit,
    addZekr
);
module.exports = router;