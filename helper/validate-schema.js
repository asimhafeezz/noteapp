const validateSchema = (schema, property = "") => {
	return (req, res, next) => {
		const { error } = schema?.validate(req[property], { abortEarly: false })
		if (error) {
			const errors = error.details.map(detail => {
				const message = detail.message.replace(/['"]/g, "")
				return `${message}`
			})
			res
				.status(400)
				.json({ success: false, message: "Validation error", errors })
		} else {
			next()
		}
	}
}

module.exports = { validateSchema }
