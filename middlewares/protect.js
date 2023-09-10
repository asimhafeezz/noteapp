const jwt = require("jsonwebtoken")
const { errorMessages: errorMsg } = require("../constants")

const protect = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]
		if (!token) {
			throw new Error(errorMsg.INVALID_TOKEN)
		}
		const user = jwt.verify(token, process.env.JWT_SECRET_KEY)
		req.user = user
		next()
	} catch (error) {
		res.json({ success: false, message: error.message })
	}
}

module.exports = protect
