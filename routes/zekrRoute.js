const express = require("express");

const {
    addZekr,
    getAllowedZekrTypes
} = require("../services/zekrService");
const { zekrRateLimit } = require("../middleware/zekrRateLimit");

const router = express.Router();
// ================= ZEKR - ADD ZEKR =================
router.post(
    "/add",
    zekrRateLimit,
    addZekr
);
// ================= ZEKR - GET ALLOWED ZEKR TYPES =================
router.get(
    "/allowed-types",
    getAllowedZekrTypes
);
module.exports = router;