const mongoose = require('mongoose')
const checkViolations = require('../controllers/violationController')
const dotenv = require('dotenv')

dotenv.config()

const onStartUp = async () => {
	setInterval(checkViolations, 2000)
	await mongoose
		.connect(process.env.MONGODB_URI)
		.then(() => console.log('Connected to MongoDB'))
		.catch(err => console.log('Error connecting to MongoDB', err.message))
}

module.exports = { onStartUp }
