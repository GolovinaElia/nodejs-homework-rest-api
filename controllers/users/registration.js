const { UserService } = require("../../src/services")
const EmailService = require("../../src/services/email")
const { HttpCode } = require("../../src/helpers/constants")
const { nanoid } = require("nanoid")
const serviceUser = new UserService()
const emailService = new EmailService()

const registration = async (req, res, next) => {
  const { email, password } = req.body
  const result = await serviceUser.findByEmail(email)
  if (result) {
    return next({
      status: HttpCode.CONFLICT,
      data: "Conflict",
      message: "Email in use",
    })
  }
  const verifyToken = nanoid()
  try {
    await emailService.sendEmail(verifyToken, email)
  } catch (error) {
    return res.status(HttpCode.SERVICE_UNAVAILABLE).json({
      status: "error",
      code: HttpCode.SERVICE_UNAVAILABLE,
      message: error.message,
    })
  }
  try {
    const newUser = await serviceUser.create({
      email,
      password,
      verifyToken,
    })
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = registration
