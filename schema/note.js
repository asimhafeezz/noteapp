const joi = require("joi")
const { validateSchema } = require("../helper")
const { PERSONAL_NOTE, WORK_NOTE } = require("../constants")

const title = joi.string()
const content = joi.string()
const type = joi.string().valid(PERSONAL_NOTE, WORK_NOTE)

// schema for the creation of a note
const createNoteSchema = joi.object({
	title: title.required(),
	content: content.required(),
	type: type.required(),
})

// schema for the update of a note
const updateNoteSchema = joi.object({
	title,
	content,
	type,
})

// schema for update of a note params (id)
const updateNoteParamsSchema = joi.object({
	id: joi.number().required(),
})

// scehma for the retrieval of a note
const getNoteSchema = joi.object({
	id: joi.number().required(),
})

// schema for the deletion of a note
const deleteNoteSchema = joi.object({
	id: joi.number().required(),
})

module.exports = {
	validateCreateNotePayload: validateSchema(createNoteSchema, "body"),
	validateUpdateNotePayload: validateSchema(updateNoteSchema, "body"),
	validateUpdateNoteParams: validateSchema(updateNoteParamsSchema, "params"),
	validateGetNoteParams: validateSchema(getNoteSchema, "params"),
	validateDeleteNoteParams: validateSchema(deleteNoteSchema, "params"),
}
