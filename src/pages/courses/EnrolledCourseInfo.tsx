import {Box, Typography,Avatar,Chip, useTheme,ListItem,ListItemButton,Divider,ListItemIcon,ListItemText,Rating,LinearProgress, Alert, CircularProgress, Button, Card, CardMedia,} from "@mui/material";
import { CheckCircle, Cancel, Create, UpdateSharp, Info, Email, School, Forward, Book, Forward10 } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'
import DisplayLessonAndAssignment from '../lessons/DisplayLessonAndAssignment';
import { useGetSingleCourseByEnrolledStudentQuery } from "../../app/api/studentDashApis";
import TableAtCourseInfoEnrolled from "../../components/Table/TableAtCourseInfoEnrolled";

import { FILEURLPRE } from "../../components/other/Defaulturl";
import { FaUniversity } from "react-icons/fa";
import { limitWords } from "../dashboards/DashCards/ApprovedCoursesCards";
import QuizPerformanceLineChart from "../dashboards/Charts/QuizPerformanceLineChart";
import PieChartDash from "../dashboards/Charts/PieChartDash";
import RadialChartDash from "../dashboards/Charts/RadialChartDash";


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
     console.log(enrolledCourse?.stats.quizScores)
  return (
   <Box sx={{display:'flex',flexDirection:"row",width:"100%",gap:1}}>
      {/*left box*/}
      <Box sx={{maxWidth:"18%",width:"18%",backgroundColor:theme.palette.background.paper,padding:2,display:"flex",flexDirection:"column",gap:2}}>

             <Typography variant="body1" fontWeight={650} sx={{display:"flex",alignItems:"center",gap:1}}>Teacher Information <Forward/></Typography> 

           <Box sx={{backgroundColor:theme.palette.grey[100],padding:2,display:"flex",flexDirection:"column",gap:2,borderRadius:4}}>
          
                 <Box sx={{display:"flex",alignItems:"center",justifyContent:"start",gap:2}}>
                 <Avatar  src={`${FILEURLPRE}/${enrolledCourse?.courseTeacherInfo[0].profile_url}`}/>
                  {/* <Security sx={{ background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",fontSize:20}}/> */}
                 
                <Box sx={{display:"flex",flexDirection:"column",gap:1}}>
                   <Typography variant="body2" sx={{display:"flex",gap:1,alignItems:"center"}} fontWeight={650}>
                  <FaUniversity size={15}/>
                  {enrolledCourse?.courseTeacherInfo[0].name}
                 </Typography>
                 <Typography variant="body2" sx={{display:"flex",gap:1,alignItems:"center"}} fontWeight={650}>
                  <Email sx={{fontSize:16}}/>
                  {enrolledCourse?.courseTeacherInfo[0].email}
                 </Typography>
                </Box>
                 </Box>
          
                 <Box sx={{display:"flex",gap:2}}>
                  <Chip label="Teacher" variant="outlined" size="small" sx={{padding:1}} color="success"/>
                  <Chip label="Verified" variant="outlined" size="small" sx={{padding:1}} color="warning" />
                 </Box>
          
            </Box>
               <Typography variant="body1" fontWeight={650} sx={{display:"flex",alignItems:"center",gap:1}}>Course Information <Forward/></Typography>
             <Card  sx={{
        width: 240,
        minHeight: 280,
        maxHeight:300,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow:`-1.5px 4px 2px ${theme.palette.secondary.light}`,
        textDecoration: 'none',
        backgroundColor:theme.palette.grey[100],
        border:"0.5px solid",
        borderColor:theme.palette.divider

}}>
       <Box sx={{backgroundColor:theme.palette.background.paper,border:"1px solid",borderColor:theme.palette.background.default,borderRadius:4}}>
        <CardMedia component={"img"} src={`${FILEURLPRE}/${enrolledCourse?.course_thumbnail}`} sx={{
            height: "100px",
            borderRadius:4,
            objectFit: 'cover',}}/>
       
         <Box sx={{ display: 'flex', flexDirection: 'column',m:1.5}}>
          
           <Typography variant="caption" sx={{display:"flex",gap:1, alignItems:"center",color:"grey"}}>
                  <Book sx={{color:theme.palette.text.primary,fontSize:16}}/> 
                          Course 
            </Typography>
            <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                 

                  }}
                >
                   {limitWords(enrolledCourse?.title??"", 4)}
              </Typography>
              <Typography
                  variant="body2"
                  sx={{
                    color:theme.palette.text.primary,
                    opacity: 0.75,
                    display: '-webkit-box',
                    
                  }}
                >
                    {limitWords(enrolledCourse?.subtitle??"", 5)}
                </Typography>
                </Box>
                   <Box sx={{display:"flex",gap:2,mb:1,mt:1.5,ml:1,mr:1}}>
          <Chip label={enrolledCourse?.activationStatus} size='small' sx={{fontSize:10}}/>
          <Chip label={enrolledCourse?.language} size='small' sx={{fontSize:10}}/>
        </Box>
       </Box>
       <Box sx={{textAlign:"center"}}>
        <Button sx={{fontSize:10,margin:0.2}} component={Link} to={`/enrolled-course-more-info/${enrolledCourse?.id}`}>
           View More Information about course <Forward sx={{fontSize:15}}/>
        </Button>
       </Box>
          
    </Card>
          
           
      </Box>
       

  {/*right section*/}
    <Box sx={{width:"100%"}} >
      <Box sx={{width:"95%",pl:2,pr:2,mb:3}}>
      <DisplayLessonAndAssignment  lessons={enrolledCourse?.lessons} />
    </Box>
         {/*stats section*/}
    <Box sx={{display:"flex",width:"95%",height:'330px',alignItems:"center",justifyContent:"center",gap:3,pl:2,pr:2,pb:2}}>
      <Box sx={{height:"100%",width:"30%"}}>
        <PieChartDash completed={enrolledCourse?.stats.completedLessons??0} totalEnrolled={enrolledCourse?.stats.totalLessons??0} inprogress={(enrolledCourse?.stats.totalLessons??0) - (enrolledCourse?.stats.completedLessons??0)} label1="Completed" label2="Total" label3="Remaining" title="Lesson Completion info"/>
      </Box>
     
     <Box sx={{height:"100%",width:"21%"}}>
      <RadialChartDash overAllProgressPercentage={enrolledCourse?.stats.progressPercentage??0} title="Over All Completion of this course"/>
     </Box>
    <Box sx={{height:"100%",width:"46%"}}>
      <QuizPerformanceLineChart  scores={enrolledCourse?.stats.quizScores??[]} title="Performance Over View Accross All Lessons" />
     </Box>
    </Box>
    
      </Box>
   </Box>

   

  )
}

export default EnrolledCourseInfo
