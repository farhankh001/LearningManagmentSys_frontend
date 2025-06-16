import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, Box, Card, CardMedia, Chip, CircularProgress, Typography, useTheme ,Button, Stack} from '@mui/material'
import { Link } from 'react-router-dom'
import { EnrolledCourse, EnrolledCoursesApproved } from '../../../app/api/studentDashApis';
import { FILEURLPRE } from '../../../components/other/Defaulturl';
import { AutoStories, BookSharp, Forward, MenuBook } from '@mui/icons-material';



const limitWords = (str: string, limit: number) => {
  const words = str.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return str;
};

interface ApprovedCourseCardProps{
    courses:EnrolledCoursesApproved[]|undefined
}
function SecondaryMiniCards({courses}:ApprovedCourseCardProps) {
    const theme=useTheme()
  return (
   <Box  sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr ', md: '1fr 1fr 1fr ',lg:"1fr 1fr 1fr 1fr" },
            gap: { xs: 2, md: 3},
            justifyContent: 'center',
            pl:{xs:1, sm:1,  md:2, lg:4, xl:4
             },pr:{  xs:1, sm:1, md:2,  lg:4, xl:4
      } }} >
        
    {courses&&courses.map(course=><Card component={Link} to={`/single-course-details/${course.course.id}`} sx={{
        width: 270,
        minHeight: 315,
        maxHeight:335,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow:`-1.5px 4px 2px ${theme.palette.secondary.light}`,
        margin:2,
        textDecoration: 'none',
        backgroundColor:theme.palette.grey[100],
        border:"0.5px solid",
        borderColor:theme.palette.divider,
        justifyContent:"space-between"
        

}}>
       <Box sx={{padding:1, backgroundColor:theme.palette.background.paper,border:"1px solid",borderColor:theme.palette.divider,borderRadius:4}}>
        <CardMedia component={"img"} src={`${FILEURLPRE}/${course.course.thumbnail}`} sx={{
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
                   {limitWords(course.course.title, 6)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color:theme.palette.text.primary,
                    opacity: 0.75,
                    display: '-webkit-box',
                    
                  }}
                >
                    {limitWords(course.course.subtitle, 6)}
                </Typography>
                </Box>
                   <Box sx={{display:"flex",gap:2,mb:0.5,mt:1.5,ml:1,mr:1}}>
          <Chip label={course.course.activationStatus} variant='outlined' color="info" size='small' sx={{fontSize:10}}/>
          <Chip label={course.course.language}  variant='outlined' color="warning" size='small' sx={{fontSize:10}}/>
        </Box>
       </Box>
        <Box sx={{display:"flex",alignItems:'center',justifyContent:"space-between",padding:1.5}}>
                  <Box  sx={{display:"flex",flexDirection:"row",gap:0.8,}}>
                    <Typography variant='caption'  sx={{
                    color:theme.palette.text.primary,
                    opacity: 0.75,
                    
                  }}>
                    Progress: 
                  </Typography>
                    <CircularProgress
                    variant="determinate"
            value={course.progress.percentage}
            size={22}
            thickness={7}
            color="success"
        />
                  <Typography variant='caption'  sx={{
                    color:theme.palette.text.primary,
                    opacity: 0.75,
                    
                  }} >{course.progress.percentage}%</Typography>
                  </Box>
                  <Button variant='text' size='small' component={Link} to={`/get-single-course-by-enrolled-student/${course.course.id}`} sx={{fontSize:11}}>
                    Continue <Forward sx={{fontSize:15}}/>
                  </Button>
                </Box>
          
    </Card>)}
   </Box>
  )
}

export default SecondaryMiniCards
