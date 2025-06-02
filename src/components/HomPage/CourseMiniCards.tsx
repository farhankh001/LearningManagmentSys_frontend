import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Avatar, Box, Card, CardMedia, Chip, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'


const FILEURLPRE="http://localhost:5000"

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
   <Box  sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr ', md: '1fr 1fr 1fr ',lg:"1fr 1fr 1fr 1fr" },
            gap: { xs: 2, md: 3},
            justifyContent: 'center',
            pl:{xs:1, sm:1,  md:2, lg:4, xl:4
             },pr:{  xs:1, sm:1, md:2,  lg:4, xl:4
      } }} >
        
    {courses&&courses.map(course=><Card component={Link} to={`/single-course-details/${course.id}`} sx={{
        width: 270,
        height: 310,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow:`-1.5px 4px 2px ${theme.palette.secondary.light}`,
        margin:2,
        textDecoration: 'none',
    //      "&:hover": {
    //   transform: "translateY(-4px) scale(1.02)",
    //     boxShadow: `-3px 3px 3px ${theme.palette.primary.main}`,}
}}>
       <CardMedia component={"img"} src={`${FILEURLPRE}/${course.course_thumbnail_url}`} sx={{
            height: 150,
            objectFit: 'cover',}}/>
         <Box sx={{ pl:2,pr:2,pt:1,pb:1, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    mb: 0.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',

                  }}
                >
                   {limitWords(course.title, 7)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color:theme.palette.text.primary,
                    opacity: 0.75,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                    {limitWords(course.subtitle, 8)}
                </Typography>
                </Box>
            <Box sx={{ pl:2, flex: 1, display: 'flex', flexDirection: 'row' ,gap:2,justifyContent:"start",alignItems:"center"}}>
           <Avatar src={course.course_teacher.profile} sx={{ width: 28, height: 28 }} />
           <Typography variant='caption' fontWeight={600}>{course.course_teacher.name}</Typography>
        </Box>
    </Card>)}
   </Box>
  )
}

export default CourseMiniCards
