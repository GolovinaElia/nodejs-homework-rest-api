const { HttpCode } = require("../../src/helpers/constants")
const { ContactsService } = require("../../src/services")

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contacts = await ContactsService.listContacts(userId, req.query)
    res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { ...contacts } })
  } catch (error) {
    next(error)
  }
}

module.exports = listContacts
