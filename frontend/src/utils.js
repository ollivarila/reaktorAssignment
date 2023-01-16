import axios from 'axios'

export const getViolations = async () => {
	const url = 'http://localhost:3001/api/violations'
	return axios
		.get(url)
		.then(res => res.data)
		.catch(err => null)
}
