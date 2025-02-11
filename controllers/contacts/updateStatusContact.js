const { HttpCode } = require("../../src/helpers/constants")
const { ContactsService } = require("../../src/services")
const { ErrorHandler } = require("../../src/helpers/ErrorHandler")

const updateStatusContact = async (req, res, next) => {
  const { body } = req
  const { contactId } = req.params
  try {
    const userId = req.user.id
    const updatedContact = await ContactsService.updateStatusContact(
      userId,
      contactId,
      body
    )

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: { updatedContact },
    })
  } catch (error) {
    next(new ErrorHandler(HttpCode.NOT_FOUND, "Not found", error.message))
  }
}

module.exports = updateStatusContact
