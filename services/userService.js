const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

exports.createUser = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name || name.trim().length < 2) {
    res.status(400);
    throw new Error("الاسم غير صالح");
  }

  const user = await User.create({
    name: name.trim()
  });

  res.status(201).json({
    status: "success",
    data: {
    userId: user._id,
    name: user.name
    }
  });
});

exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404).json({
      status: "fail",
      message: "user not found",
    });
  }

  res.status(201).json({
    status: "success",
    data: {
    id: user._id,
    name: user.name,
    totalKhatmasCompleted: user.totalKhatmasCompleted,
    totalPartsRead: user.totalPartsRead,
    totalAzkarCount: user.totalAzkarCount,
    lastActivityAt: user.lastActivityAt,
    createdAt: user.createdAt
    }
  });
});

exports.updateLastActivity = async (userId) => {
  await User.findByIdAndUpdate(userId, {
    lastActivityAt: new Date()
  });
};
