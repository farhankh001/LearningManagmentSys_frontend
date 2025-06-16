import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Avatar, Box, Button, Card, CardMedia, Chip, CircularProgress, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'

import { FILEURLPRE } from '../other/Defaulturl'
import { AutoStories, Forward } from '@mui/icons-material'

const limitWords = (str: string, limit: number) => {
  const words = str.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return str;
};
function CourseMiniCards() {
    const courses=useSelector((state:RootState)=>state.courses.allCourses)
    const theme=useTheme()
 return (
   <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",mt:10}}>
    <Typography variant='h3' fontWeight={600} sx={{mb:2}}>
      Explore Our Courses
    </Typography>
    <Box  sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr ', md: '1fr 1fr 1fr ',lg:"1fr 1fr 1fr" },
            gap: { xs: 2, md: 3},
            justifyContent: 'center',
            pl:{xs:1, sm:1,  md:2, lg:4, xl:4
             },pr:{  xs:1, sm:1, md:2,  lg:4, xl:4},
             
             }} >
        
    {courses&&courses.map(course=><Card component={Link} to={`/single-course-details/${course.id}`} sx={{
        width: 270,
        minHeight: 320,
        maxHeight:350,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        // boxShadow:`-1.5px 4px 2px ${theme.palette.secondary.light}`,
        margin:2,
        textDecoration: 'none',
        backgroundColor:theme.palette.grey[100],
        border:"0.5px solid",
        borderColor:theme.palette.divider,
        justifyContent:"space-between"
    //      "&:hover": {
    //   transform: "translateY(-4px) scale(1.02)",
    //    boxShadow: '0 0 5px 2px  rgb(255, 155, 40)',
      
    // },

}}>
       <Box sx={{padding:1, backgroundColor:theme.palette.background.paper,border:"1px solid",borderColor:theme.palette.divider,borderRadius:4,}}>
        <CardMedia component={"img"} src={`${FILEURLPRE}/${course.course_thumbnail_url}`} sx={{
            height: 100,
            borderRadius:4,
            objectFit: 'cover',}}/>
       
         <Box sx={{ display: 'flex', flexDirection: 'column',m:2}}>
                <AutoStories sx={{fontSize:18}}/>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                 

                  }}
                >
                   {limitWords(course.title, 6)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color:theme.palette.text.primary,
                    opacity: 0.75,
                    display: '-webkit-box',
                    
                  }}
                >
                    {limitWords(course.subtitle, 4)}
                </Typography>
                </Box>
                   <Box sx={{display:"flex",gap:2,mb:0.5,mt:1.5,ml:1,mr:1}}>
          <Chip label={course.sales_category} size='small' variant='outlined' color="info" sx={{fontSize:10,pl:1,pr:1 }}/>
          <Chip label={course.language} size='small' variant='outlined' color="warning" sx={{fontSize:10,pl:1,pr:1}}/>
        </Box>
       </Box>
        <Box sx={{display:"flex",alignItems:'center',justifyContent:"space-between",padding:1.5}}>
            
                  <Button variant='text' size='small' sx={{fontSize:11}}>
                    Learin More Details <Forward sx={{fontSize:15}}/>
                  </Button>
                </Box>
          
    </Card>)}
   </Box>
   </Box>
  )
}

export default CourseMiniCards
