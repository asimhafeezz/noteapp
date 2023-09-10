const express = require("express")
const dotenv = require("dotenv")
dotenv.config()

const { redisClient, connectDB } = require("./config")
const { user, note } = require("./routes")
const { logger } = require("./utils")
const app = express()

app.use(express.json())

// server is listening
app.get("/", (_, res) => {
	res.send("Note App Server is listening..")
})

//routes
app.use("/api/v1/user", user)
app.use("/api/v1/note", note)

const port = process.env.PORT || 5000

app.listen(port, async () => {
	logger.log(`Server running on port ${port}`)
	await connectDB()
	await redisClient.connect()
})
