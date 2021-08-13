const { AuthService } = require("../../src/services")
const { HttpCode } = require("../../src/helpers/constants")
const serviceAuth = new AuthService()

const login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const userResult = await serviceAuth.login({ email, password })
    if (userResult) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: { ...userResult },
      })
    }
    next({
      status: HttpCode.UNAUTHORIZED,
      message: "Email or password is wrong",
    })
  } catch (error) {
    next(error)
  }
}

module.exports = login
