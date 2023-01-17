import React from 'react'
import { Card, Box, Typography, Grid, Zoom, Fade } from '@mui/material'
import { Person, Email, LocalPhone } from '@mui/icons-material'

const IconAndValue = ({ icon, value }) => (
	<div style={{ display: 'flex', gap: '2px' }}>
		{icon} {value}
	</div>
)

const ViolationCard = ({
	name,
	email,
	phone,
	closestDistance,
	currentDistance,
	updatedAt,
}) => {
	const now = new Date(Date.now())
	const updatedDate = new Date(updatedAt)
	const lastSeenSeconds = (
		(now.getTime() - updatedDate.getTime()) /
		1000
	).toFixed(0)
	const lastSeenMinutes = (lastSeenSeconds / 60).toFixed(0)

	const lastSeen = lastSeenSeconds > 60 ? lastSeenMinutes : lastSeenSeconds
	const unit = lastSeenSeconds > 60 ? 'min' : 's'

	return (
		<Grid item xs={12} sm={6} md={4}>
			<Zoom in>
				<Card
					sx={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
					<Box>
						<IconAndValue icon={<Person />} value={name} />
						<IconAndValue icon={<Email />} value={email} />
						<IconAndValue icon={<LocalPhone />} value={phone} />
					</Box>
					<Box>
						<Typography>Closest: {closestDistance.toFixed(0)} m</Typography>
						<Typography>Current: {currentDistance.toFixed(0)} m</Typography>
					</Box>
					<Box>
						<Typography sx={{ justifySelf: 'start' }}>
							~ {lastSeen} {unit} ago
						</Typography>
					</Box>
				</Card>
			</Zoom>
		</Grid>
	)
}

export default ViolationCard
