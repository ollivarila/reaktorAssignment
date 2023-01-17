const violationService = require('../utils/violationService')
const { getDroneData, getPilotData } = require('../utils/violationHelper')
const Violation = require('../models/Violation')

const getFieldValue = (data, fieldName) => {
	const field = data.filter(data => data.name === fieldName).pop()
	return field.elements[0].text
}

const parseDroneData = droneData => {
	const droneXObj = getFieldValue(droneData, 'positionX')
	const droneYObj = getFieldValue(droneData, 'positionY')

	const droneX = parseInt(droneXObj, 10)
	const droneY = parseInt(droneYObj, 10)

	return {
		droneX,
		droneY,
	}
}

const calculateDistanceFromNest = (droneX, droneY) => {
	const x = 250000
	const y = 250000

	const dX = Math.abs(droneX - x)
	const dY = Math.abs(droneY - y)

	const distance = Math.sqrt(dX * dX + dY * dY)

	return distance / 1000
}

const checkIfViolates = droneData => {
	const { droneX, droneY } = parseDroneData(droneData)
	return calculateDistanceFromNest(droneX, droneY)
}

const createViolation = async (droneData, distance) => {
	const serialNumber = getFieldValue(droneData, 'serialNumber')

	const exists = await Violation.findOne({ serialNumber: serialNumber })

	if (exists) {
		if (distance < exists.closestDistance) {
			exists.closestDistance = distance
		}
		exists.currentDistance = distance
		await exists.save()
		return
	}

	const pilotData = await getPilotData(serialNumber)

	if (!pilotData) {
		console.log('Pilot not found, skipping')
		return
	}

	const { firstName, lastName, phoneNumber, email } = pilotData

	const name = `${firstName} ${lastName}`

	const violation = new Violation({
		serialNumber,
		name,
		email,
		phone: phoneNumber,
		currentDistance: distance,
		closestDistance: distance,
	})

	await violation.save()
}

const updateExisting = async (distance, droneData) => {
  const serialNumber = getFieldValue(droneData, 'serialNumber')

  await Violation.findOneAndUpdate({ serialNumber }, { currentDistance: distance })
}

const checkNewViolations = async (dronesData) => {

	const violations = []

	dronesData.forEach(drone => {
		const distance = checkIfViolates(drone.elements)
		if (distance < 100) {
			violations.push({ droneData: drone.elements, distance })
		} else {
      updateExisting(distance, drone.elements)
    }
	})

	await Promise.all(
		violations.map(async violation => {
			await createViolation(violation.droneData, violation.distance)
		}),
	)
}

const checkOldViolations = async (dronesData = []) => {
	const violations = await Violation.find({})


	violations.forEach(violation => {
		const now = new Date(Date.now())
		const lastSeen = new Date(violation.updatedAt)
		const TEN_MINUTES = 600_000
		const dTime = now.getTime() - lastSeen.getTime()
		if (dTime >= TEN_MINUTES) {
			console.log('Violation more than ten minutes old')
			violation.remove()
		}

    // if(dronesData.filter(data => {
    //   return violation.serialNumber === getFieldValue(data.elements, 'serialNumber')
    // }).length > 0) {
    //   violation.updatedAt = new Date(Date.now())
    //   violation.save()
    // }

	})
}

const checkViolations = async () => {
  const dronesData = await getDroneData()
	await checkNewViolations(dronesData)
	await checkOldViolations(dronesData)
}

module.exports = checkViolations
