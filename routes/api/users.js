const express = require("express")
const router = express.Router()
const { users: ctrl } = require("../../controllers")
const {
  validateReg,
  validateVer,
} = require("../../validate/schemas/validateUsers")
const guard = require("../../src/helpers/guard")
const { createAccountLimiter } = require("../../src/helpers/rate-limit")
const upload = require("../../src/helpers/upload")

router.post("/signup", createAccountLimiter, validateReg, ctrl.registration)
router.post("/login", validateReg, ctrl.login)
router.post("/logout", guard, ctrl.logout)
router.get("/current", guard, ctrl.current)
router.patch("/avatars", guard, upload.single("avatar"), ctrl.avatars)
router.get("/verify/:verificationToken", ctrl.verify)
router.post("/verify", validateVer, ctrl.repeatVerify)

module.exports = router
