const { User } = require("../models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { errorMessages } = require("../constants")

const register = async (req, res) => {
	const { username, email, password } = req.body
	try {
		const existingUser = await User.findOne({ where: { email } })
		if (existingUser) {
			throw new Error(errorMessages.EMAIL_ALREADY_EXISTS)
		}

		const hashedPassword = await bcrypt.hash(password, 15)

		await User.create({
			username,
			email,
			password: hashedPassword,
		})

		res.json({
			success: true,
			message: "User registered successfully",
		})
	} catch (error) {
		res.json({ success: false, message: error.message })
	}
}

const login = async (req, res) => {
	const { email, password } = req.body
	try {
		// check if user exists
		const userInstance = await User.findOne({ where: { email } })
		if (!userInstance) {
			throw new Error(errorMessages.INVALID_CREDENTIALS)
		}
		const user = userInstance.toJSON()

		const matchPass = await bcrypt.compare(password, user.password)
		if (!matchPass) {
			throw new Error(errorMessages.INVALID_CREDENTIALS)
		}

		const token = jwt.sign(user, process.env.JWT_SECRET_KEY)

		res.json({ success: true, message: "User logged in successfully", token })
	} catch (error) {
		res.json({ success: false, message: error.message })
	}
}

module.exports = {
	register,
	login,
}
