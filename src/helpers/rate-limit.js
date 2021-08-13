const rateLimit = require("express-rate-limit")
const { HttpCode } = require("./constants")
const { accountlimit } = require("../config/rate-limit.json")

const createAccountLimiter = rateLimit({
  windowMs: accountlimit.windowMs,
  max: accountlimit.max,
  handler: (req, res, next) => {
    res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message:
        "The limit for creating an account within an hour has been exhausted. Try later.",
    })
  },
})

module.exports = { createAccountLimiter }
