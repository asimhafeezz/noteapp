const router = require("express").Router()
const { register, login } = require("../controllers/user")
const {
	validateRegisterUserPayload,
	validateLoginUserPayload,
} = require("../schema")

router.post("/register", validateRegisterUserPayload, register)
router.post("/login", validateLoginUserPayload, login)

module.exports = router
