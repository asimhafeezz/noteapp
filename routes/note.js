const router = require("express").Router()
const {
	createNote,
	deleteNote,
	getAllNotes,
	getNote,
	updateNote,
} = require("../controllers/note")

const { protect } = require("../middlewares")
const {
	validateCreateNotePayload,
	validateGetNoteParams,
	validateUpdateNotePayload,
	validateUpdateNoteParams,
	validateDeleteNoteParams,
} = require("../schema")

// protect all routes
router.use(protect)

// routes
router.route("/").post(validateCreateNotePayload, createNote).get(getAllNotes)
router
	.route("/:id")
	.get(validateGetNoteParams, getNote)
	.put(validateUpdateNoteParams, validateUpdateNotePayload, updateNote)
	.delete(validateDeleteNoteParams, deleteNote)

module.exports = router
