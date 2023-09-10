const PERSONAL_NOTE = "PERSONAL"
const WORK_NOTE = "WORK"

// error messages
const errorMessages = {
	INVALID_NOTE_TYPE: "Invalid note type",
	INVALID_CREDENTIALS: "Invalid credentials",
	USER_NOT_FOUND: "User not found",
	NOTE_NOT_FOUND: "Note not found",
	EMAIL_ALREADY_EXISTS: "Email already exists",
	INVALID_TOKEN: "Unauthorized: Invalid token!",
}

module.exports = {
	PERSONAL_NOTE,
	WORK_NOTE,
	errorMessages,
}
