import React from 'react';
import { Skeleton, Box, Grid } from '@mui/material';

const ViolationSkeleton = () => {
  const width = 280
  const height = 10
  return (
    <Grid item xs={4}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Skeleton variant='rounded' width={width} height={height}/>
        <Skeleton variant='rounded' width={width} height={height}/>
        <Skeleton variant='rounded' width={width} height={height}/>
        <Skeleton variant='rounded' width={width} height={height}/>
        <Skeleton variant='rounded' width={width} height={height}/>
        <Skeleton variant='rounded' width={width} height={height}/>
      </Box>
    </Grid>
  )
}
 
export default ViolationSkeleton;