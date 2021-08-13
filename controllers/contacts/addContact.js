const { HttpCode } = require("../../src/helpers/constants")
const { ContactsService } = require("../../src/services")

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    const newContact = await ContactsService.create(userId, req.body)
    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: { newContact },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
