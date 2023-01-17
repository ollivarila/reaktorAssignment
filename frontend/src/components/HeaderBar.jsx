import React from 'react'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import WrongLocationIcon from '@mui/icons-material/WrongLocation'

const HeaderBar = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<WrongLocationIcon sx={{ marginRight: '10px' }} /> 
					<Typography variant="h6" sx={{ flexGrow: 1}}>Project Birdnest</Typography>
          <Typography variant="h6" sx={{ justifySelf: 'center' }}>Olli Varila 2023</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default HeaderBar
