const Joi = require("joi")
const { HttpCode } = require("../../src/helpers/constants")

const userSchema = Joi.object({
  name: Joi.string().min(2).max(20),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "org", "ca"] },
    })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
})

const validateReg = (req, res, next) => {
  const { error } = userSchema.validate(req.body)
  if (error) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: error.message,
    })
  }
  next()
}

module.exports = {
  validateReg,
}
