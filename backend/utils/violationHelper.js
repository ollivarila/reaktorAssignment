const axios = require('axios').default
const convert = require('xml-js')

const getData = () => {
	const url = 'https://assignments.reaktor.com/birdnest/drones'
	return axios
		.get(url)
		.then(res => res.data)
		.catch(err => null)
}

const getPilotData = async serialNumber => {
	const url = `https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`
	return axios
		.get(url)
		.then(res => res.data)
		.catch(err => null)
}

const getDroneData = async () => {
	const xml = await getData()
	if (!xml) {
		throw new Error('ERROR: request failed')
	}
	const data = convert.xml2js(xml, { compact: false })
	const report = data.elements[0].elements
	const drones = report.filter(item => item.name === 'capture').pop().elements

	return drones
}

module.exports = {
	getDroneData,
	getPilotData,
}
