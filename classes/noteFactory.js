const { PERSONAL_NOTE, WORK_NOTE, errorMessages } = require("../constants")

class Note {
	constructor(title, type, content, userId) {
		this.title = title
		this.type = type
		this.content = content
		this.userId = userId
	}
}

class PersonalNote extends Note {
	constructor(title, content, userId) {
		super(title, PERSONAL_NOTE, content, userId)
	}
}

class WorkNote extends Note {
	constructor(title, content, userId) {
		super(title, WORK_NOTE, content, userId)
	}
}

class NoteFactory {
	create(type, title, content, userId) {
		switch (type) {
			case PERSONAL_NOTE:
				return new PersonalNote(title, content, userId)
			case WORK_NOTE:
				return new WorkNote(title, content, userId)
			default:
				throw new Error(`${errorMessages.INVALID_NOTE_TYPE}: ${type}`)
		}
	}
}

module.exports = new NoteFactory()
