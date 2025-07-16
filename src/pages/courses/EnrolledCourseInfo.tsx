import {Box, Typography,Avatar,Chip, useTheme, Alert, CircularProgress, CardMedia,} from "@mui/material";
import {  Forward, Celebration, Thunderstorm,  Explore } from '@mui/icons-material';

import { useParams } from 'react-router-dom'
import DisplayLessonAndAssignment from '../lessons/DisplayLessonAndAssignment';
import { useGetSingleCourseByEnrolledStudentQuery } from "../../app/api/studentDashApis";


import { FILEURLPRE } from "../../components/other/Defaulturl";

import QuizPerformanceLineChart from "../dashboards/Charts/QuizPerformanceLineChart";
import PieChartDash from "../dashboards/Charts/PieChartDash";
import RadialChartDash from "../dashboards/Charts/RadialChartDash";
import { BorderLinearProgress } from "../../test/feature";
import { StudyTimeTracker } from "../dashboards/TimeTracker/StudyTimeTracker";

function EnrolledCourseInfo() {
    const {courseId}=useParams()
    const {data:enrolledCourse,error,isError,isLoading}=useGetSingleCourseByEnrolledStudentQuery({courseId})
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
//quiz over all percentage numbers:
const total = enrolledCourse?.stats.quizScores?.reduce((sum, val) => sum + val, 0) ?? 0;
const count = enrolledCourse?.stats.quizScores?.length ?? 1;
const overallPercentage = total / count;
  return (
   <Box sx={{width:"100%",display:"flex",gap:0,flexDirection:{xs:"column-reverse",md:"row"},maxWidth:"100%"}}>
      <StudyTimeTracker/>
      
       

  {/*right section*/}
<Box sx={{width:{xs:"95%",md:"70%",lg:"80%"},display:"flex",flexDirection:"column",mt:{
    xs:2,md:0
  },pl:{
    xs:1,md:4,lg:8,
  },pr:{
    xs:1,md:2,lg:6
  }}}>
   <Box sx={{display:"flex",gap:2,flexDirection:{xs:"column",md:"row"}}}>
    <Box sx={{width:"65%",border:"1px solid",borderColor:theme.palette.divider,borderRadius:4}}>
       <CardMedia component={"img"} src={`${FILEURLPRE}/${enrolledCourse?.course_thumbnail}`} sx={{
                height: "250px", 
                borderRadius:4,
                objectFit: 'cover',}}/>
    </Box>
      <Box sx={{display:"flex",flexDirection:"column",width:"35%",padding:3,borderRadius:4,border:"1px solid",  borderColor:theme.palette.divider,alignItems:"center",justifyContent:"center",  backgroundImage:
                    "radial-gradient(ellipse at 20% 40%, rgba(92, 196, 252, 0.76) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(255, 181, 131, 0.53) 0%, transparent 60%)",}}>
       
        <Typography variant="h5" fontWeight={650}>
        {enrolledCourse?.title}
        </Typography>
         
         <Box sx={{display:"flex",gap:2,mb:0.5,mt:1.5,ml:1,mr:1}}>
                   <Chip label={enrolledCourse?.category} variant='filled' color="success" size='medium' sx={{fontSize:11,pl:2,pr:2,color:"white",fontWeight:600}}/>
                   <Chip label={enrolledCourse?.language}  variant='filled' color="warning" size='medium' sx={{fontSize:11,pl:2,pr:2,color:"white",fontWeight:600}}/>
          </Box>
      </Box>
   </Box>

      <Box sx={{mt:3,width:"100%",mb:3,display:"flex",flexDirection:"column",gap:1,padding:1,
               
      }}>
        <Typography sx={{display:'flex',alignItems:"center",gap:2,mb:1, background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",WebkitBackgroundClip: "text",WebkitTextFillColor: "transparent",}} variant="h6" fontWeight={600}><span>Explore Course Lessons</span> <Explore  sx={{color:theme.palette.warning.light}} /></Typography>
      <DisplayLessonAndAssignment  lessons={enrolledCourse?.lessons} />
    </Box>
  <Typography sx={{display:'flex',alignItems:"center",gap:1,mb:1, background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",WebkitBackgroundClip: "text",WebkitTextFillColor: "transparent",}} variant="h6" fontWeight={600}><span>Course Statistics</span> <Forward sx={{color:theme.palette.warning.light}}/></Typography>
         {/*stats section*/}
    <Box sx={{display:"grid",width:"100%",height:{
      xs:"150vh",md:"660px",lg:'315px'
    },gridTemplateColumns:{xs:"1fr",md:"1fr 1fr",lg:"30% 25% 41%"},alignItems:"center",justifyContent:"center",gap:3,flexDirection:{
      xs:"column",md:"row"
    },mb:5}}>
      
      <Box sx={{height:"100%"}}>
        <PieChartDash completed={enrolledCourse?.stats.completedLessons??0} totalEnrolled={enrolledCourse?.stats.totalLessons??0} inprogress={(enrolledCourse?.stats.totalLessons??0) - (enrolledCourse?.stats.completedLessons??0)} label1="Total" label2="Completed" label3="Remaining" title="Lesson Completion info"/>
      </Box>
     
     <Box sx={{height:"100%"}}>
      <RadialChartDash overAllProgressPercentage={enrolledCourse?.stats.progressPercentage??0} title="Over All Completion of this course"/>
     </Box>
    <Box sx={{height:"100%"}}>
      <QuizPerformanceLineChart  scores={enrolledCourse?.stats.quizScores??[]} title="Performance Over View Accross All Lessons" />
     </Box>
    </Box>
    


  </Box>








  <Box sx={{minWidth:{xs:"95%",md:"30%",lg:"20%"},maxWidth:"100%",pr:2,display:"flex",flexDirection:"column",gap:3,mr:4}}>
          <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
              <Box sx={{backgroundImage:
                    "radial-gradient(ellipse at 20% 40%, rgba(92, 196, 252, 0.76) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(255, 181, 131, 0.53) 0%, transparent 60%)",padding:3,display:"flex",flexDirection:"column",gap:0.5,borderRadius:4,alignItems:"center",justifyContent:"center"}}>
                    <Avatar  src={`${FILEURLPRE}/${enrolledCourse?.courseTeacherInfo[0].profile_url}`}  sx={{width:"150px",height:"150px",border:"1px solid",borderColor:theme.palette.divider}}/>
                    <Typography variant="body1" fontWeight={600}  sx={{display:"flex",alignItems:"center",gap:1}}>
                       COURSE TEACHER<Celebration/>
                     </Typography>
                    <Typography variant="body1" fontWeight={600} sx={{}}>
                     {enrolledCourse?.courseTeacherInfo[0].name.split(" ")[0].toUpperCase()}
                    </Typography>
                    
                 </Box>

              <Box  sx={{backgroundColor:theme.palette.primary.dark,border:"1px solid",borderColor:theme.palette.divider,padding:3,display:"flex",flexDirection:"column",gap:2,borderRadius:4,alignItems:"center"}}>
                <Thunderstorm/> 
                 {[
                    { label: '% Progress', value:enrolledCourse?.stats.progressPercentage, order: 1 },
                    { label: '% Result Last Quiz', value: enrolledCourse?.stats.quizScores[enrolledCourse.stats.quizScores.length-1], order: 2 },
                    { label: '% Result Across All Quizes', value: overallPercentage, order: 3 },
                      ].map(({ label, value, order }) => (
                        <Box key={label} sx={{ mb: 1,width:"100%"}}>
                                <Typography variant="subtitle1" color="text.secondary">
                                  {label}
                                </Typography>
                                <BorderLinearProgress variant="determinate" value={value} order={order} />
                        </Box>
                            ))}

              </Box>
          </Box>
      </Box>


   </Box>

   

  )
}

export default EnrolledCourseInfo
