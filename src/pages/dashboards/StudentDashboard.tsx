import  { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Box, Typography,Avatar,Chip, useTheme,ListItem,ListItemButton,Divider,ListItemIcon,ListItemText,Button,} from "@mui/material";
import {  AccountCircle, Forward, Insights, Celebration, Thunderstorm, Pending, ApprovalRounded } from '@mui/icons-material';
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";
import CourseTable from "../../components/Table/CourseTable";
import { MRT_ColumnDef } from "material-react-table";
import { EnrolledCourse, useFetchAllEnrolledCoursesByStudentQuery,} from "../../app/api/studentDashApis";
import { FILEURLPRE } from "../../components/other/Defaulturl";
import {BorderLinearProgress} from "../../test/feature"
import ApprovedCoursesCards from "./DashCards/ApprovedCoursesCards";
import SecondaryMiniCards from "./DashCards/SecondaryMiniCards";
import { StudyTimeTracker } from "./TimeTracker/StudyTimeTracker";
import ActiveTimeClock from "./TimeTracker/ActiveTimeClock";
import { FaBolt } from "react-icons/fa";
import { PieChartDashComparison } from "./DashCards/DashPieChartCompVsTotal";
import PieChartDash from "./Charts/PieChartDash";
import BarChartDash from "./Charts/BarChartDash";
import RadialChartDash from "./Charts/RadialChartDash";
import EnrollOptionCourses from "./DashCards/EnrollOptionCourses";
import MainTopBlueCard from "./DashCards/MainTopBlueCard";
import Lottie from "lottie-react";
import heroAnimation from "../../assets/Animation - 1750247662202.json";
import { setEnrolledCourses, setPendingCourses } from "../../app/slices/courseSlice";
import PieChartWithoutHole from "./Charts/PieChartWithOutHole";


// export interface EnrolledCourse {
//   enrollmentId: string;
//   enrollmentDate: string;
//   enrollmentStatus: string;
//   course: CourseInfo;
//   teacher: Teacher | null;
// }


const settingsOptions=[
    {
        name:"Pending Requests",
        path:"/all-pending-courses-settings",
        icon:<Pending />
    }, 
     {
        name:"All Approved Courses",
        path:"/all-enrolled-courses-settings",
        icon:<ApprovalRounded />
    }, 
     {
        name:"Enroll In Course",
        path:"/enroll-in-a-course",
        icon:<AccountCircle/>
    }, 

]
function StudentDashboard() {
  const user = useSelector((state: RootState) => (state as RootState).auth.user);
  const theme=useTheme()
   const dispatch=useDispatch()
  const {data:stdDashData,isError,isFetching,isSuccess:stdDashDataIsSuccess,error,isLoading}=useFetchAllEnrolledCoursesByStudentQuery(null)
 
  useEffect(() => {
  if (stdDashData && stdDashData.enrollments?.approved) {
    dispatch(setEnrolledCourses({
      courses: stdDashData.enrollments.approved,
      enrollmentSummary: stdDashData.summary
    }));
  }

  if (stdDashData && stdDashData.enrollments?.pending) {
    dispatch(setPendingCourses({
      courses: stdDashData.enrollments.pending,
      enrollmentSummary: stdDashData.summary
    }));
  }
}, [stdDashDataIsSuccess, stdDashData, isLoading, dispatch]);
  if (!user) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">Please login to view dashboard</Typography>
      </Box>
    );
  }

  if(user.role!=="Student"){
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">You are not authorized to access this page.</Typography>
      </Box>
    );
  }
   
  const { name, email, profile_picture, email_verified,role } = user;

  return (
    <Box sx={{width:"100%",display:"flex",gap:0,flexDirection:{xs:"column-reverse",md:"row"},maxWidth:"100%",mb:5}}>
    
   <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    >
      <Lottie
        animationData={heroAnimation}
        loop
        autoplay
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
     
    </Box>









        {/*right controller with all course info*/}
  <Box sx={{width:{xs:"95%",md:"70%",lg:"80%"},display:"flex",flexDirection:"column",mt:{
    xs:2,md:0
  },pl:{
    xs:1,md:4,lg:8
  },pr:{
    xs:1,md:2,lg:4
  },zIndex:1}}>

     <Box sx={{display:"flex",gap:2,flexDirection:{xs:"column",md:"row"}}}>
      
      <Box
      sx={{
        background: "linear-gradient(135deg,rgb(107, 91, 255) 0%,rgb(95, 68, 128) 100%)",
        borderRadius: "20px",
        color: "#fff",
        padding: 4,
        position: "relative",
        overflow: "hidden",
        width: {
          xs:"95%",
          md:"60%",
          lg:"70%"
        },
      }}>
       
      <MainTopBlueCard/>
       
    </Box>
     <Box sx={{height:"255px",width:{
      xs:"95%",md:"40%",lg:"30%"
     }}}>
      <RadialChartDash overAllProgressPercentage={stdDashData?.summary.overallProgressPercentage??0} title="Progress Across All Courses"/>
     </Box>
     </Box>


    <Box sx={{mt:3,width:{xs:"95%",md:"100%"}}}>
        <Typography sx={{display:'flex',alignItems:"center",gap:1,mb:1, background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",WebkitBackgroundClip: "text",WebkitTextFillColor: "transparent",}} variant="h6" fontWeight={600}><span>Continue Learning</span> <Forward sx={{color:theme.palette.warning.light}}/></Typography>
        <ApprovedCoursesCards  courses={stdDashData?.enrollments.approved.slice(0,2)}/>
    </Box>


      {
    (stdDashData?.enrollments.approved.length??0)<=2?<Box sx={{marginTop:3}}>
         <Typography sx={{display:'flex',alignItems:"center",gap:2,mb:1, background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",WebkitBackgroundClip: "text",WebkitTextFillColor: "transparent",}} variant="h6" fontWeight={600}><span>Explore Our Courses</span> <Insights  sx={{color:theme.palette.warning.light}} /></Typography>
      <EnrollOptionCourses/></Box>:<Box sx={{marginTop:3,}}>
        <Typography sx={{display:'flex',mb:1,alignItems:"center",gap:2,background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",WebkitBackgroundClip: "text",WebkitTextFillColor: "transparent",}} variant="h6" fontWeight={600}><span>More Enrolled Courses</span> <Insights  sx={{color:theme.palette.warning.light}}/></Typography>
          <SecondaryMiniCards courses={stdDashData?.enrollments.approved.slice(2,5)}/>
    </Box>
  }

   <Box sx={{mt:3}}>
    <Typography sx={{display:'flex',alignItems:"center",gap:1,mb:1, background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",WebkitBackgroundClip: "text",WebkitTextFillColor: "transparent",}} variant="h6" fontWeight={600}><span>Course Statistics</span> <Forward sx={{color:theme.palette.warning.light}}/></Typography>
</Box>
    <Box sx={{display:"grid",width:"100%",height:{
      xs:"150vh",md:"660px",lg:'330px'
    },gridTemplateColumns:{xs:"1fr",md:"1fr 1fr",lg:"28% 37% 30%"},alignItems:"center",justifyContent:"center",gap:3,flexDirection:{
      xs:"column",md:"row"
    }}}>

      <Box sx={{height:"100%",}}>
        <PieChartWithoutHole completed={stdDashData?.summary.completed??0} inprogress={stdDashData?.summary.inProgress??0} totalEnrolled={stdDashData?.summary.totalEnrolled??0} label1="Total" label2="Completed" label3="In Progress" title="Enrollment Information"/>
      </Box>
     
     <Box sx={{height:"100%"}}>
      <BarChartDash data={
    [ {name: 'Enrolled', value: stdDashData?.summary.totalEnrolled??0 },
    {name: 'Approved', value: stdDashData?.summary.totalApproved??0 },
    {name: 'Pending', value: stdDashData?.summary.totalPending??0 },
    {name:'Rejected',value:Math.max((stdDashData?.summary.totalEnrolled??0) - (stdDashData?.summary.totalApproved??0 )- (stdDashData?.summary.totalPending??0))}
]}   colors={{
  'Enrolled': '#6366F1', // Indigo
  'Approved': '#10B981',        // Emerald
  'Pending': '#F59E0B',    // Amber
  'Rejected':"#e1774b"
}}  legendItems={
  [
    {label: 'Enrolled', value: stdDashData?.summary.totalEnrolled??0 },
    {label: 'Approved', value: stdDashData?.summary.totalApproved??0 },
    {label: 'Pending', value: stdDashData?.summary.totalPending??0 },
    {label:'Rejected',value:Math.max((stdDashData?.summary.totalEnrolled??0) - (stdDashData?.summary.totalApproved??0 )- (stdDashData?.summary.totalPending??0))}
  ]
    } title={"Enrollment Summery"} />
     </Box>
    
    <Box sx={{height:"100%"}}>
    <PieChartDashComparison data={[
    { name: 'Completed', value: stdDashData?.summary.totalCompletedLessonsWithMcq??0 },
    { name: 'Remaining', value: (stdDashData?.summary.totalLessonsWithMcq??0) - (stdDashData?.summary.totalCompletedLessonsWithMcq??0) },
  ]}  />
   </Box>
    </Box>
     

  

  </Box>












   
    <Box sx={{minWidth:{xs:"95%",md:"30%",lg:"20%"},maxWidth:"100%",pl:2,pr:2,display:"flex",flexDirection:"column",gap:3,mr:4}}>
        
    {/*profile box*/}
    <Box sx={{backgroundImage:
                    "radial-gradient(ellipse at 20% 40%, rgba(92, 196, 252, 0.76) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(255, 181, 131, 0.53) 0%, transparent 60%)",padding:3,display:"flex",flexDirection:"column",gap:0.5,borderRadius:4,alignItems:"center",justifyContent:"center",border:"1px solid",borderColor:theme.palette.divider}}>
       <Avatar  src={`${FILEURLPRE}/${profile_picture}`}  sx={{width:"150px",height:"150px"}}/>
       <Typography variant="body1" fontWeight={600}  sx={{display:"flex",alignItems:"center",gap:1}}>
          WELCOME BACK<Celebration/>
        </Typography>
       <Typography variant="body1" fontWeight={600} sx={{}}>
        {name.split(" ")[0].toUpperCase()}
       </Typography>
       
    </Box>
    
    {/*stat box*/}
    <Box sx={{
             boxShadow: 2,
             borderRadius: 4,
             px: 2.2,
             py: 1.4,
             backgroundColor: theme.palette.primary.dark,
            border:"1px solid",borderColor:theme.palette.divider
                  }}
              >   
         
     <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:0.6,}}>
      <Typography variant="caption" fontWeight={600}> <FaBolt/> Active Study Hours Clock</Typography>
       <ActiveTimeClock/>
     </Box>
      </Box>
{/*pie box*/}

          <Box  sx={{backgroundColor:theme.palette.primary.dark,border:"1px solid",borderColor:theme.palette.divider,padding:3,display:"flex",flexDirection:"column",gap:2,borderRadius:4,alignItems:"center"}}>
             
            <Thunderstorm/>
                 {[
              { label: '% Course Approval',  value: ((stdDashData?.summary.totalApproved ?? 0) /((stdDashData?.summary.totalEnrolled ?? 1)) * 100), order: 1 },
              { label: '% Course Completion',   value: (((stdDashData?.summary.completed ?? 0) / (stdDashData?.summary.totalEnrolled ?? 1)) * 100),order: 2},
              { label: '% OverAll Progress', value:stdDashData?.summary.overallProgressPercentage, order: 3 },
                      ].map(({ label, value, order }) => (
                        <Box key={label} sx={{ mb: 1,width:"100%"}}>
                                <Typography variant="subtitle1" color="text.secondary">
                                  {label}
                                </Typography>
                                <BorderLinearProgress variant="determinate" value={value} order={order} />
                        </Box>
                            ))}

              </Box>
    {/*settings box*/}
    
     <Box >
          <Box sx={{background:theme.palette.background.paper,display:"flex",flexDirection:"column", }}>
          <Typography variant="body1" fontWeight={700} sx={{backgroundColor:theme.palette.primary.main,padding:1,color:"white"}}>
                    Settings
            </Typography>
            <Box sx={{display:"flex",flexDirection:"column",background:theme.palette.primary.dark,border:"1px solid",borderColor:theme.palette.divider}}>
                   {
                    settingsOptions.map((item)=><Box  key={item.name}>
                            <ListItem disablePadding>
                            <ListItemButton  component={Link} to={item.path}>
                                <ListItemIcon >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText >
                                    {item.name}
                                </ListItemText>
                          </ListItemButton>
                          </ListItem>
                          <Divider/>
                          </Box>)
                   }
                   </Box>
              </Box>
              </Box>
        
  </Box>
   
        

</Box>
  );
}

export default StudentDashboard;

