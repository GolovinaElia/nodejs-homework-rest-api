const { UserService } = require("../../src/services")
const { HttpCode } = require("../../src/helpers/constants")
const serviceUsers = new UserService()

const current = async (req, res, next) => {
  try {
    const userId = req.user.id
    const user = await serviceUsers.getCurrentUser(userId)
    if (!user) {
      res.status(HttpCode.UNAUTHORIZED).json({
        status: HttpCode.UNAUTHORIZED,
        message: "Not authorized",
      })
    }
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        user,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = current
