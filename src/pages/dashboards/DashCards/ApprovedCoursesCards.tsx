import { Box, Button, Chip, LinearProgress, Typography, useTheme } from "@mui/material"
import { EnrolledCoursesApproved } from "../../../app/api/studentDashApis"
import { FILEURLPRE } from "../../../components/other/Defaulturl"
import {  Forward } from "@mui/icons-material"

import { Link } from "react-router-dom"
interface ApprovedCourseCardProps{
    courses:EnrolledCoursesApproved[]|undefined
}
export const limitWords = (str: string, limit: number) => {
  const words = str.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return str;
};
function ApprovedCoursesCards({courses}:ApprovedCourseCardProps) {
    const theme=useTheme()
    if(courses?.length===0){
        return <Box sx={{height:"40vh",display:"flex",alignItems:"center",justifyContent:"center"}} >
            <Typography variant="h4"> No Content To Show Yet Enroll in a Course</Typography>
        </Box>
    }
  return (
   <Box sx={{width:"100%",display:"grid",gridTemplateColumns:{xs:"1fr",lg:"1fr 1fr"},gap:3,maxWidth:"100%"}}>

    {courses?.map((course,_)=><Box sx={{backgroundColor:theme.palette.background.paper,border:"1px solid" ,borderColor:theme.palette.divider,borderRadius:4
}} >
  <Box sx={{display:"flex",flexDirection:"row",gap:2,border:"1px solid",borderColor:theme.palette.divider, padding:1,background:theme.palette.primary.dark,borderRadius:4}}>
 <Box component={"img"} src={`${FILEURLPRE}/${course.course.thumbnail}`} sx={{width:{xs:"90px",md:"170px",lg:"200px"},height:{xs:"75px",md:"80px",lg:"93px"},objectFit:"cover",borderRadius:4}}/>
  <Box sx={{width:"100%",display:"flex",flexDirection:"column",gap:1.5}}>
     {/* <Typography variant="caption" sx={{color:"grey"}}>
                Course 
            </Typography> */}
          
            <Typography variant="body2" fontWeight={200}  sx={{
             fontSize: {
            
            },
         
          }}>
            
            {course.course.title}
            </Typography>
             <Box sx={{display:"flex",gap:2}}>

            <Chip label={course.course.category} variant='filled' color="error" size='small' sx={{fontSize:9,pl:1,pr:1,color:theme.palette.text.primary}}/>
            <Chip label={course.course.language}  variant='filled' color="warning" size='small' sx={{fontSize:10,pl:1,pr:1,color:theme.palette.text.primary}}/>
                        
           </Box>
         <Box sx={{display:'flex',flexDirection:"column",width:"100%",gap:0.5}}>
             <Typography variant="caption">Progress: <span>{course.progress.percentage}%</span></Typography>
              <LinearProgress
  variant="determinate"
  value={course.progress.percentage}
  sx={{
    
    '& .MuiLinearProgress-bar': {
      backgroundColor: theme.palette.success.light, // actual bar color
    },
  }}
/>

        </Box>
  </Box>

  </Box>
   
   <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:0.5,px:3,py:0.5}}>
    
    <Typography variant="caption" sx={{fontSize:{
      xs:"10px",lg:"13px"
    },display:"flex",alignItems:"center",gap:1}}>
       <span> {limitWords(course.course.subtitle,5)}</span>
    </Typography>
    <Button size="small" component={Link} to={`/get-single-course-by-enrolled-student/${course.course.id}`} sx={{fontSize:{
      xs:"9px",lg:"11px"
    },color:theme.palette.warning.light}}>Continue Learning <Forward sx={{fontSize:15,ml:0.5}}/></Button>
   </Box>
    </Box>
)}
   </Box>
  )
}

export default ApprovedCoursesCards
