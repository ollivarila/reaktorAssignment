import React, { useState, useEffect } from 'react'
import HeaderBar from './components/HeaderBar'
import { Container, Typography } from '@mui/material'
import { getViolations } from './utils'

function App() {
	const [violations, setViolations] = useState(null)

	useEffect(() => {
		const inteval = setInterval(async () => {
			const data = await getViolations()
			setViolations(data)
		}, 2000)

		return () => clearInterval(inteval)
	}, [])

	console.log(violations)

	return (
		<>
			<HeaderBar />
			<Container>
				<Typography variant="h2">Violations in the past 10 minutes</Typography>
			</Container>
		</>
	)
}

export default App
