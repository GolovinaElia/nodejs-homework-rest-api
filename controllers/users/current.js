const { UserService } = require("../../src/services")
const { HttpCode } = require("../../src/helpers/constants")
const serviceUsers = new UserService()

const current = async (req, res, next) => {
  try {
    const userId = req.user.id
    const result = await serviceUsers.findById(userId)
    if (!result) {
      res.status(HttpCode.UNAUTHORIZED).json({
        status: HttpCode.UNAUTHORIZED,
        message: "Not authorized",
      })
    }
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        email: result.email,
        subscription: result.subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = current
