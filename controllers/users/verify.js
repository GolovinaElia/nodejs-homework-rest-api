const { UserService } = require("../../src/services")
const { HttpCode } = require("../../src/helpers/constants")
const serviceUser = new UserService()

const verify = async (req, res, next) => {
  try {
    const user = await serviceUser.verify(req.params)
    if (user) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        message: "Verification successful",
      })
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: HttpCode.NOT_FOUND,
        message: "User not found",
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = verify
