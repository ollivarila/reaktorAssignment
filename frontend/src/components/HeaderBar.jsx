import React from 'react'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import WrongLocationIcon from '@mui/icons-material/WrongLocation'

const HeaderBar = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<WrongLocationIcon sx={{ marginRight: '10px' }} />
					<Typography variant="h6">Project Birdnest</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default HeaderBar
