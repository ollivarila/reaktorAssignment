const { getDroneData } = require('./violationHelper')
const Violation = require('../models/Violation')

const checkNewViolations = async () => {
	const droneData = await getDroneData()
	const violations = []

	droneData.forEach(drone => {
		if (checkIfViolates(drone)) {
			violations.push(drone)
		}
	})
}

const checkOldViolations = async () => {}

const updateViolations = async () => {
	await checkNewViolations()
	await checkOldViolations()
}

const getViolations = async () => {
	return Violation.find({})
}

module.exports = {
	updateViolations,
	getViolations,
}
