const rateLimit = require("express-rate-limit");

exports.zekrRateLimit = rateLimit({
  windowMs: 60 * 1000, // دقيقة
  max: 10, // 10 requests في الدقيقة لكل user
  keyGenerator: (req) => {
    return req.body.userId || req.ip;
  },
  handler: (req, res) => {
    res.status(429).json({
      message: "تم تجاوز الحد المسموح للذكر، حاول بعد دقيقة"
    });
  }
});
