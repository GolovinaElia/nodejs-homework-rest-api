const { AuthService } = require("../../src/services")
const { HttpCode } = require("../../src/helpers/constants")
const serviceAuth = new AuthService()

const logout = async (req, res, next) => {
  const id = req.user.id
  await serviceAuth.logout(id)
  return res.status(HttpCode.NO_CONTENT).json({
    status: "success",
    code: HttpCode.NO_CONTENT,
  })
}

module.exports = logout
