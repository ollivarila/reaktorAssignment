import axios from 'axios'

export const getViolations = async () => {
	const url =
		process.env.NODE_ENV === 'production'
			? '/api/violations'
			: 'http://localhost:3001/api/violations'
	return axios
		.get(url)
		.then(res => res.data)
		.catch(err => null)
}
