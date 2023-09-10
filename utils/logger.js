class Logger {
	constructor() {
		if (Logger.instance == null) {
			this.logs = []
			Logger.instance = this
		}
		return Logger.instance
	}

	log(message) {
		this.logs.push(message)
		console.log(`log: ${message}`)
	}

	error(message) {
		this.logs.push(message)
		console.error(`error: ${message}`)
	}

	printLogCount() {
		console.log(`${this.logs.length} Logs`)
	}

	getAllLogs() {
		return this.logs
	}
}

module.exports = new Logger()
