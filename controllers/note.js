const { noteFactory } = require("../classes")
const { redisClient } = require("../config")
const { errorMessages } = require("../constants")
const { Note } = require("../models")

const userCacheKey = userId => `user::${userId}`
const noteCacheKey = noteId => `note::${noteId}`

// Create a new note
const createNote = async (req, res) => {
	const { title, type, content } = req.body

	try {
		const note = noteFactory.create(type, title, content, req.user.id)

		const newNote = await Note.create(note)

		// Store the note in Redis under the user's hash map
		await redisClient.hSet(
			userCacheKey(req.user.id),
			noteCacheKey(newNote.id),
			JSON.stringify(newNote)
		)

		res.json({
			success: true,
			message: "Note created successfully",
			data: newNote,
		})
	} catch (error) {
		res.json({ success: false, message: error.message })
	}
}

// Retrieve all notes
const getAllNotes = async (req, res) => {
	try {
		const userId = req.user.id

		// Check if the notes are cached in Redis
		const cachedNotes = await redisClient.hVals(userCacheKey(req.user.id))

		if (cachedNotes.length === 0) {
			const notes = await Note.findAll({
				where: { userId },
			})

			// Create a Redis transaction using multi()
			const multi = redisClient.multi()

			// Cache the notes in Redis within the transaction
			for (const note of notes) {
				multi.hSet(
					userCacheKey(userId),
					noteCacheKey(note.id),
					JSON.stringify(note)
				)
			}

			// Execute the transaction
			await multi.exec()

			res.json({
				success: true,
				message: "Notes retrieved successfully",
				data: notes,
			})
		} else {
			const parsedNotes = cachedNotes.map(JSON.parse)

			res.json({
				success: true,
				message: "Notes retrieved successfully",
				data: parsedNotes,
			})
		}
	} catch (error) {
		res.json({ success: false, message: error.message })
	}
}

// Retrieve as a specific note
const getNote = async (req, res) => {
	try {
		const noteId = req.params.id
		const userId = req.user.id

		// Check if the note is cached in Redis
		const cachedNote = await redisClient.hGet(
			userCacheKey(userId),
			noteCacheKey(noteId)
		)

		if (cachedNote) {
			const parsedNote = JSON.parse(cachedNote)

			res.json({
				success: true,
				message: "Note retrieved successfully",
				data: parsedNote,
			})
		} else {
			const note = await Note.findOne({
				where: { id: noteId, userId },
			})

			if (!note) {
				throw new Error(errorMessages.NOTE_NOT_FOUND)
			}

			// Cache the note in Redis
			await redisClient.hSet(
				userCacheKey(userId),
				noteCacheKey(noteId),
				JSON.stringify(note)
			)

			res.json({
				success: true,
				message: "Note retrieved successfully",
				data: note,
			})
		}
	} catch (error) {
		res.json({ success: false, message: error.message })
	}
}

// Update a note
const updateNote = async (req, res) => {
	const { title, content, type } = req.body

	try {
		const noteInstance = await Note.findOne({
			where: { id: req.params.id, userId: req.user.id },
		})

		if (!noteInstance) {
			throw new Error(errorMessages.NOTE_NOT_FOUND)
		}

		// Update the note in the database
		const updatedNote = await noteInstance.update({
			title: title || noteInstance.title,
			content: content || noteInstance.content,
			type: type || noteInstance.type,
		})

		// Cache the updated note in Redis
		await redisClient.hSet(
			userCacheKey(req.user.id),
			noteCacheKey(updatedNote.id),
			JSON.stringify(updatedNote)
		)

		res.json({
			success: true,
			message: "Note updated successfully",
			data: updatedNote,
		})
	} catch (error) {
		res.json({ success: false, message: error.message })
	}
}

// Delete a note
const deleteNote = async (req, res) => {
	try {
		const noteInstance = await Note.findOne({
			where: { id: req.params.id, userId: req.user.id },
		})

		if (!noteInstance) {
			throw new Error(errorMessages.NOTE_NOT_FOUND)
		}

		const deletedNote = noteInstance.toJSON()

		await noteInstance.destroy()

		// Remove the note from Redis cache
		await redisClient.hDel(
			userCacheKey(req.user.id),
			noteCacheKey(deletedNote.id)
		)

		res.json({
			success: true,
			message: "Note deleted successfully",
			data: deletedNote,
		})
	} catch (error) {
		res.json({ success: false, message: error.message })
	}
}

module.exports = {
	createNote,
	getAllNotes,
	getNote,
	updateNote,
	deleteNote,
}
