import React, { useState, useEffect } from 'react'
import HeaderBar from './components/HeaderBar'
import { Container, Typography, Grid } from '@mui/material'
import { getViolations } from './utils'
import ViolationCard from './components/ViolationCard'
import ViolationSkeleton from './components/ViolationSkeleton'

const sortViolations = violations => {
	if (!violations) {
		return null
	}

	return violations.sort((a, b) => {
		const aDate = new Date(a.updatedAt)
		const bDate = new Date(b.updatedAt)

		return bDate.getTime() - aDate.getTime()
	})
}

function App() {
	const [violations, setViolations] = useState(null)

	useEffect(() => {
		getViolations().then(data => setViolations(data))
		const inteval = setInterval(async () => {
			const data = await getViolations()
			const sorted = sortViolations(data)
			setViolations(sorted)
		}, 2000)

		return () => clearInterval(inteval)
	}, [])

	const skeletons = []

	if (!violations) {
		for (let i = 0; i < 50; i++) {
			skeletons.push(<ViolationSkeleton key={i} />)
		}
	}

	return (
		<>
			<HeaderBar />
			<Container
				sx={{
					marginTop: '10px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<Typography variant="h2" gutterBottom>
					Violations in the past 10 minutes
				</Typography>
				<Grid container spacing={2} sx={{ justifyContent: 'center' }}>
					{violations
						? violations.map(violation => (
								<ViolationCard key={violation.id} {...violation} />
						  ))
						: skeletons}
				</Grid>
			</Container>
		</>
	)
}

export default App
