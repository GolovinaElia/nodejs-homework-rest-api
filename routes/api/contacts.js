const express = require("express")
const router = express.Router()
const { contacts: ctrl } = require("../../controllers")
const {
  validateAddContact,
  validateUpdateContact,
  validateUpdateStatusContact,
} = require("../../validate/schemas/validateContacts")
const guard = require("../../src/helpers/guard")

router.get("/", guard, ctrl.listContacts)

router.get("/:contactId", guard, ctrl.getContactById)

router.post("/", express.json(), guard, validateAddContact, ctrl.addContact)

router.delete("/:contactId", guard, ctrl.removeContact)

router.put(
  "/:contactId",
  guard,
  express.json(),
  validateUpdateContact,
  ctrl.updateContact
)

router.patch(
  "/:contactId/favorite",
  guard,
  express.json(),
  validateUpdateStatusContact,
  ctrl.updateStatusContact
)

module.exports = router
