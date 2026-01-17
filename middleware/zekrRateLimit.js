const rateLimit = require("express-rate-limit");

exports.zekrRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  keyGenerator: (req, res) => {
    if (req.user && req.user.id) {
      return `user:${req.user.id}`;
    }

    return rateLimit.ipKeyGenerator(req, res);
  },
  handler: (req, res) => {
    res.status(429).json({
      message: "تم تجاوز الحد المسموح للذكر، حاول بعد دقيقة"
    });
  }
});
