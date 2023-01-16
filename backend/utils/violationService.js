const Violation = require('../models/Violation')

const getViolations = async () => {
	return Violation.find({})
}

module.exports = {
	getViolations,
}
