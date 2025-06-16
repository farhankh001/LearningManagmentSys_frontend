import { Box, Typography } from '@mui/material'
import React from 'react'
import FeaturesBoxes from './FeaturesBoxes'
import CourseMiniCards from './CourseMiniCards'

function ProductSection() {
  return (
    <Box sx={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3}}>
        <Box sx={{textAlign:"center"}}>
            <Typography variant='h3' fontWeight={800} sx={{  color:"text.primary"}}>
                We Offer A Wide Range of <Box component="span" sx={{
                 background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
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
