const {
	validateRegisterUserPayload,
	validateLoginUserPayload,
} = require("./user")

const {
	validateCreateNotePayload,
	validateUpdateNotePayload,
	validateUpdateNoteParams,
	validateGetNoteParams,
	validateDeleteNoteParams,
} = require("./note")

module.exports = {
	// user
	validateRegisterUserPayload,
	validateLoginUserPayload,
	// note
	validateCreateNotePayload,
	validateUpdateNotePayload,
	validateUpdateNoteParams,
	validateGetNoteParams,
	validateDeleteNoteParams,
}
