const { UserService } = require("../../src/services")
const { HttpCode } = require("../../src/helpers/constants")
const serviceUser = new UserService()

const registration = async (req, res, next) => {
  const { name, email, password } = req.body
  const user = await serviceUser.findByEmail(email)
  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      data: "Conflict",
      message: "Email in use",
    })
  }
  try {
    const newUser = await serviceUser.create({
      name,
      email,
      password,
    })
    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        subscription: newUser.subscription,
        avatar: newUser.avatar,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = registration
