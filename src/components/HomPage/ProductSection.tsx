import { Box, Typography } from '@mui/material'
import React from 'react'
import FeaturesBoxes from './FeaturesBoxes'
import CourseMiniCards from './CourseMiniCards'

function ProductSection() {
  return (
    <Box sx={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3}}>
        <Box sx={{textAlign:"center"}}>
            <Typography variant='h3' fontWeight={800} sx={{  color:"text.primary"}}>
                We Offer Wide Range of <Box component="span" sx={{
                 color:"primary.main",
                       display: "inline-block",
                          }}>High Quality Courses</Box>
            </Typography>
        </Box>
        <Box>
            <FeaturesBoxes/>
        </Box>
        <Box>
            <CourseMiniCards/>
        </Box>
    </Box>
  )
}

export default ProductSection
