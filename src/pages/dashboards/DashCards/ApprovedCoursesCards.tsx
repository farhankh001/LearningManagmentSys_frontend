import { Box, Button, Chip, LinearProgress, Typography, useTheme } from "@mui/material"
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
   <Box sx={{width:"100%",display:"grid",gridTemplateColumns:{xs:"1fr",lg:"1fr 1fr"},gap:3,maxWidth:"100%"}}>

    {courses?.map((course,index)=><Box sx={{backgroundColor:theme.palette.background.paper,border:"1px solid" ,borderColor:theme.palette.divider,borderRadius:4
}} >
  <Box sx={{display:"flex",flexDirection:"row",gap:2,border:"1px solid",borderColor:theme.palette.divider, padding:1,background:theme.palette.primary.dark,borderRadius:4}}>
 <Box component={"img"} src={`${FILEURLPRE}/${course.course.thumbnail}`} sx={{width:{xs:"90px",md:"170px",lg:"200px"},height:{xs:"75px",md:"100px",lg:"120px"},objectFit:"cover",borderRadius:4}}/>
  <Box sx={{width:"100%",display:"flex",flexDirection:"column",gap:1}}>
     <Typography variant="caption" sx={{display:{
      xs:"none",lg:"flex"
     },gap:1, alignItems:"center",color:"grey"}}>
                <Book sx={{color:theme.palette.text.primary,fontSize:16}}/> 
                Course 
            </Typography>
          
            <Typography variant="body2"   sx={{
             fontSize: {
             xs: '0.7rem', // for extra-small screens
              sm: '0.8rem',     // for small
              md: '1rem',  // for medium and up
            },
         
          }}>
            
            {course.course.title.toUpperCase()}
            </Typography>
             <Box sx={{display:"flex",gap:2}}>

            <Chip label={course.course.category} variant='outlined' color="info" size='small' sx={{fontSize:10,pl:2,pr:2}}/>
            <Chip label={course.course.language}  variant='outlined' color="warning" size='small' sx={{fontSize:10,pl:2,pr:2}}/>
                        
           </Box>
         <Box sx={{display:'flex',flexDirection:"column",width:"100%",gap:0.5}}>
             <Typography variant="caption">Progress: <span>{course.progress.percentage}%</span></Typography>
              <BorderLinearProgress value={course.progress.percentage} order={5} variant="determinate" />
        </Box>
  </Box>

  </Box>
   
   <Box sx={{ml:3,display:"flex",alignItems:"center",gap:0.5,padding:0.5}}>
    <EmojiEvents sx={{color:theme.palette.primary.main,fontSize:{
      xs:10,lg:16
    },backgroundColor:theme.palette.text.primary,borderRadius:1,border:"1px solid",borderColor:theme.palette.primary.main}}/>
    <Typography variant="caption" sx={{fontSize:{
      xs:"10px",lg:"13px"
    }}}>
        {limitWords(course.course.subtitle,5)}
    </Typography>
    <Button size="small" component={Link} to={`/get-single-course-by-enrolled-student/${course.course.id}`} sx={{fontSize:{
      xs:"9px",lg:"11px"
    },color:theme.palette.warning.light}}>Continue Learning <Forward sx={{fontSize:15}}/></Button>
   </Box>
    </Box>
)}
   </Box>
  )
}

export default ApprovedCoursesCards
