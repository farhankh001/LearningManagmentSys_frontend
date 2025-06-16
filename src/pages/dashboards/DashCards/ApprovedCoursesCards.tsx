import { Box, Button, LinearProgress, Typography, useTheme } from "@mui/material"
import { EnrolledCourse, EnrolledCoursesApproved } from "../../../app/api/studentDashApis"
import { FILEURLPRE } from "../../../components/other/Defaulturl"
import {  Book, EmojiEvents, Forward } from "@mui/icons-material"
import { BorderLinearProgress } from "../../../test/feature"
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
   <Box sx={{width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:3,padding:2}}>

    {courses?.map((course,index)=><Box sx={{backgroundColor:theme.palette.background.paper,border:"1px solid" ,borderColor:theme.palette.divider,borderRadius:4
}} >
  <Box sx={{display:"flex",flexDirection:"row",gap:2,border:"1px solid",borderColor:theme.palette.divider, padding:1,background:theme.palette.grey[100],borderRadius:4}}>
 <Box component={"img"} src={`${FILEURLPRE}/${course.course.thumbnail}`} sx={{width:"100x",height:"100px",objectFit:"cover",borderRadius:4}}/>
  <Box sx={{width:"100%",display:"flex",flexDirection:"column",gap:1}}>
            <Typography variant="caption" sx={{display:"flex",gap:1, alignItems:"center",color:"grey"}}>
                <Book sx={{color:theme.palette.text.primary,fontSize:16}}/> 
                Course 
            </Typography>
            <Typography variant="body1" fontWeight={600}>
            
            {course.course.title.toUpperCase()}
            </Typography>
         <Box sx={{display:'flex',flexDirection:"column",width:"100%",gap:0.5}}>
             <Typography variant="caption">Progress: <span>{course.progress.percentage}%</span></Typography>
              <BorderLinearProgress value={course.progress.percentage} order={5} variant="determinate" />
        </Box>
  </Box>

  </Box>
   
   <Box sx={{ml:3,display:"flex",alignItems:"center",gap:0.5,padding:0.5}}>
    <EmojiEvents sx={{color:theme.palette.primary.main,fontSize:16,backgroundColor:theme.palette.text.primary,borderRadius:1,border:"1px solid",borderColor:theme.palette.primary.main}}/>
    <Typography variant="caption" sx={{fontSize:"13px"}}>
        {limitWords(course.course.subtitle,12)}
    </Typography>
    <Button size="small" component={Link} to={`/get-single-course-by-enrolled-student/${course.course.id}`} sx={{fontSize:"11px"}}>Continue Learning <Forward sx={{fontSize:15}}/></Button>
   </Box>
    </Box>
)}
   </Box>
  )
}

export default ApprovedCoursesCards
