const Joi = require("joi")
const { HttpCode } = require("../../src/helpers/constants")

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "org", "ca"] },
    })
    .required(),
  phone: Joi.string().min(2).max(20).required(),
  favorite: Joi.boolean().required(),
})

const contactUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(20).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ru", "ua"] },
    })
    .optional(),
  phone: Joi.string().min(2).max(20),
  favorite: Joi.boolean().optional(),
})

const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const validateAddContact = (req, res, next) => {
  const { error } = contactSchema.validate(req.body)
  if (error) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: error.message,
    })
  }
  next()
}
const validateUpdateContact = (req, res, next) => {
  const { error } = contactUpdateSchema.validate(req.body)
  if (error) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: error.message,
    })
  }
  next()
}

const validateUpdateStatusContact = (req, res, next) => {
  const { error } = updateStatusContactSchema.validate(req.body)
  if (error) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: "missing field favorite ",
    })
  }
  next()
}
module.exports = {
  validateAddContact,
  validateUpdateContact,
  validateUpdateStatusContact,
}
