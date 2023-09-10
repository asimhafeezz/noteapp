const joi = require("joi")
const { validateSchema } = require("../helper")

const email = joi.string().email().required()
const password = joi.string().min(5).required()

// schema for the creation of a user
const registerUserSchema = joi.object({
	username: joi.string().required(),
	email,
	password,
})

// schema for the login of a user
const loginUserSchema = joi.object({
	email,
	password,
})

module.exports = {
	validateRegisterUserPayload: validateSchema(registerUserSchema, "body"),
	validateLoginUserPayload: validateSchema(loginUserSchema, "body"),
}
