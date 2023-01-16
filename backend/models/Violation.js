const mongoose = require('mongoose')

const violationSchema = new mongoose.Schema(
	{
		serialNumber: String,
		name: String,
		email: String,
		phone: String,
		currentDistance: Number,
		closestDistance: Number,
	},
	{ timestamps: true },
)

violationSchema.set('toJSON', {
	transform: (doc, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.createdAt
	},
})
module.exports = mongoose.model('Violation', violationSchema)
