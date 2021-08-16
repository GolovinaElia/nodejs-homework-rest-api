const { UserService } = require("../../src/services")
const EmailService = require("../../src/services/email")
const { HttpCode } = require("../../src/helpers/constants")
const serviceUser = new UserService()
const emailService = new EmailService()

const repeatVerify = async (req, res, next) => {
  const { email } = req.body
  if (!email) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: {
        message: "Missing required field email",
      },
    })
  }

  try {
    const user = await serviceUser.findByEmail(email)

    if (user) {
      const { email, verify, verifyToken } = user
      if (verify) {
        return res.status(HttpCode.BAD_REQUEST).json({
          status: "error",
          code: HttpCode.BAD_REQUEST,
          data: {
            message: "Verification has already been passed",
          },
        })
      }

      await emailService.sendEmail(verifyToken, email)
      return res.json({
        status: "success",
        code: HttpCode.OK,
        data: {
          message: "Verification email sent",
        },
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = repeatVerify
