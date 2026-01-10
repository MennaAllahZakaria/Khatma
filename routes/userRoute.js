const express = require("express");

const {
  createUser,
  getUser
} = require("../services/userService");

const router = express.Router();

// ================= USER - CREATE USER =================
router.post(
  "/",
  createUser
);
// ================= USER - GET USER BY ID =================
router.get(
  "/:id",
    getUser 
);
module.exports = router;