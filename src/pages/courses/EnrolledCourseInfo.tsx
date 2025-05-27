import {Box, Typography,Avatar,Chip, useTheme,ListItem,ListItemButton,Divider,ListItemIcon,ListItemText,Rating,LinearProgress, Alert, CircularProgress, Button,} from "@mui/material";
import { CheckCircle, Cancel, Create, UpdateSharp, Info, Email } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'
import DisplayLessonAndAssignment from '../lessons/DisplayLessonAndAssignment';
import { useGetSingleCourseByEnrolledStudentQuery } from "../../app/api/studentDashApis";
import TableAtCourseInfoEnrolled from "../../components/Table/TableAtCourseInfoEnrolled";

function EnrolledCourseInfo() {
    const {courseId}=useParams()
    const {data:enrolledCourse,error,isError,isSuccess,isLoading}=useGetSingleCourseByEnrolledStudentQuery({courseId})
    const theme=useTheme()
   
  if (!courseId) {
          return (
              <Typography variant='h3' sx={{ height: "70vh", width: "100%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  course not found.
              </Typography>
          );
      } 
    
 if (isError) {
         return (
             <Typography variant='h1' sx={{ height: "70vh", width: "100%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                 {isError && error && 'data' in error &&
                     <Alert severity="error" sx={{ mb: 2 }}>
                         {JSON.stringify((error.data as any).error)}
                     </Alert>
                 }
             </Typography>
         );
     }
 
  if (isLoading) {
         return (
             <Box sx={{ height: "70vh", width: "100%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                 <CircularProgress />
             </Box>
         );
     }
  return (
   <Box sx={{display:'flex',alignItems:"center",justifyContent:"center",flexDirection:"column",width:"100%",gap:1}}>
        {/* avatar with username etc */}
         {/* <Typography variant="h5" fontWeight={600} sx={{fontStyle:"italic",mt:3}}>Course and Instructor Info</Typography> */}
        <Box sx={{display:"flex", flexDirection:{xs:"column",sm:"column",md:"column",lg:"row"}, alignItems:"center",justifyContent:"center",padding:1,gap:1,width:"100%"}}>
        
             <Box sx={{background:theme.palette.background.paper,width:"80%",boxShadow:`-1.5px 4px 2px  rgba(0, 0, 0, 0.39)`, borderRadius:2,display:"flex",flexDirection:{xs:"column",sm:"column",md:"row"},alignItems:"center",justifyContent:"center",p:{xs:2,sm:2,md:1},gap:{
              xs:1,sm:1,md:5
             }}}>
           <Avatar src={enrolledCourse?.course_thumbnail} sx={{
              width:50,
              height: 50,
            }}/>
              <Typography variant="h6" sx={{textAlign:"center"}}>
          {enrolledCourse?.title}
        </Typography>
         <Box sx={{display:"flex" ,flexDirection:"row",gap:2, alignItems:"center"}}>
             <Chip
                icon={enrolledCourse?.activationStatus ? <CheckCircle /> : <Cancel />}
                label={ enrolledCourse?.activationStatus? "Active" : "Not Active"}
                color={enrolledCourse?.activationStatus? "success" : "error"}
                size="small"
                  />
          </Box>
          <Rating
          value={enrolledCourse?.avgRating?enrolledCourse.avgRating:0}
          precision={0.5}
          readOnly
          />
         </Box>
        {/* <Typography variant="h4" fontWeight={600} sx={{fontStyle:"italic",mt:3}}>Instructor Info</Typography> */}
           {enrolledCourse?.courseTeacherInfo&&enrolledCourse.courseTeacherInfo.map((courseTeacher)=> <Box sx={{background:theme.palette.background.paper,width:"80%",boxShadow:`-1.5px 4px 2px  rgba(0, 0, 0, 0.39)`, borderRadius:2,display:"flex",flexDirection:{xs:"column",sm:"column",md:"row"},alignItems:"center",justifyContent:"center",p:{xs:2,sm:2,md:1},gap:{
              xs:1,sm:1,md:10
             }}}>
         
          <Avatar src={courseTeacher?.profile_url} sx={{
              width:50,
              height: 50,
            }}/>
              <Typography variant="h6" sx={{textAlign:"center"}}>
          {courseTeacher?.name}
        </Typography>
        <Typography sx={{display:"flex",alignItems:"center",justifyContent:"center",gap:1}}>
          <Email sx={{color:theme.palette.success.light}}/> {courseTeacher.email}
        </Typography>
        <Button variant="contained">
            Details
        </Button>
        </Box>)}
         </Box>
       
  <Typography variant="h4" fontWeight={600} sx={{fontStyle:"italic",mt:3}}>Course Lessons</Typography>

      <Box sx={{width:{xs:"95%",sm:"95%",md:"80%",lg:"80% "}}}>
        <DisplayLessonAndAssignment lessons={enrolledCourse?.lessons}/>
      </Box>
   </Box>

   

  )
}

export default EnrolledCourseInfo
