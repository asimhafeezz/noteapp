const { DataTypes } = require("sequelize")
const { sequelize } = require("../config")
const User = require("./user")
const { PERSONAL_NOTE, WORK_NOTE } = require("../constants")

const Note = sequelize.define("Note", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	type: {
		type: DataTypes.ENUM(PERSONAL_NOTE, WORK_NOTE),
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: User,
			key: "id",
		},
	},
})

Note.belongsTo(User, { foreignKey: "userId" })

module.exports = Note
