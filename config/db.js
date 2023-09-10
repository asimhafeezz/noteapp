// database.js

const { Sequelize } = require("sequelize")
const { logger } = require("../utils")

// create sequelize instance
const sequelize = new Sequelize({
	dialect: process.env.DB_DIALECT,
	database: process.env.DB_DATABASE,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT),
	logging: false,
})

const connectDB = async () => {
	try {
		await sequelize.authenticate()
		logger.log("Database connected!")
		if (process.env.NODE_ENV === "development") {
			await syncDB()
		}
	} catch (error) {
		logger.log(error.message)
	}
}

const syncDB = async () => {
	try {
		const existingTables = await sequelize.showAllSchemas() // Fetch existing tables
		if (existingTables.length === 0) {
			// If no tables exist, synchronize the database
			await sequelize.sync()
			logger.log("Database & tables created!")
		} else {
			logger.log("Tables already exist, skipping synchronization.")
		}
	} catch (error) {
		logger.error(`Error synchronizing the database: ${error}`)
	}
}

module.exports = {
	connectDB,
	sequelize,
}
