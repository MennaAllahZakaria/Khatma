const express = require("express");

const {
    createKhatma,
    addProgress,
    getUserKhatmas,
    getKhatmaDetails,

} = require("../services/khatmaService");
const router = express.Router();
// ================= KHATMA - CREATE KHATMA =================
router.post(
    "/",
    createKhatma
);
// ================= KHATMA - ADD PROGRESS =================
router.post(
    "/progress",
    addProgress
);
// ================= KHATMA - GET USER KHATMAS =================
router.get(
    "/user/:userId",
    getUserKhatmas
);
// ================= KHATMA - GET KHATMA DETAILS BY ID =================
router.get(
    "/:id",
    getKhatmaDetails
);
module.exports = router;