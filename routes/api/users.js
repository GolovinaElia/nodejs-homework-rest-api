const express = require("express")
const router = express.Router()
const { users: ctrl } = require("../../controllers")
const { validateReg } = require("../../validate/schemas/validateUsers")
const guard = require("../../src/helpers/guard")
const { createAccountLimiter } = require("../../src/helpers/rate-limit")

router.post("/signup", createAccountLimiter, validateReg, ctrl.registration)
router.post("/login", validateReg, ctrl.login)
router.post("/logout", guard, ctrl.logout)
router.get("/current", guard, ctrl.current)

module.exports = router
