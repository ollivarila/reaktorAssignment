const mongoose = require('mongoose')

const violationSchema = new mongoose.Schema(
	{
		name: String,
		email: String,
		phone: String,
		currentDistance: Number,
		closestDistance: Number,
		visible: Boolean,
	},
	{ timestamps: true },
)

module.exports = mongoose.model('Violation', violationSchema)
