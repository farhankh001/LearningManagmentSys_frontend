import  { useState } from "react";
import { useSelector } from "react-redux";
import {Box, Typography,Avatar,Chip, useTheme,ListItem,ListItemButton,Divider,ListItemIcon,ListItemText,Button,} from "@mui/material";
import { CheckCircle, Cancel, AccountCircle, Create, UpdateSharp, StarRate, Group, MenuBook, AttachMoney, School, Error, PunchClock, Security, Forward, Insights } from '@mui/icons-material';
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";
import CourseTable from "../../components/Table/CourseTable";
import { MRT_ColumnDef } from "material-react-table";
import { EnrolledCourse, useFetchAllEnrolledCoursesByStudentQuery, useGetActiveStudyTimeQuery } from "../../app/api/studentDashApis";
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
import EnrolledCourseInfo from "../courses/EnrolledCourseInfo";
import CourseMiniCards from "../../components/HomPage/CourseMiniCards";
import EnrollOptionCourses from "./DashCards/EnrollOptionCourses";
// export interface EnrolledCourse {
//   enrollmentId: string;
//   enrollmentDate: string;
//   enrollmentStatus: string;
//   course: CourseInfo;
//   teacher: Teacher | null;
// }
const courseTeacherDashColumnsPending: MRT_ColumnDef<EnrolledCourse>[] = [

  {
    header: 'Course Title',
    accessorKey: 'course.title',
  },
  {
    header: 'Applied At',
    accessorKey: 'enrollmentDate',
    Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(),
  },
  {
    header: 'Instructor Name',
    accessorKey: 'teacher.name',
  },
   {
    header: 'Instructor Email',
    accessorKey: 'teacher.email',
  },
  {
  header: 'Enrollment Approval',
  accessorKey: 'approvalStatus', // This will *not* work if course is nested like course: { id: string }
  Cell: ({ cell }) => { // Access nested course ID safely
    return (
      <Chip
      label={cell.getValue<string>()}
      color="warning"
      variant="outlined"
      size="small"
    />
    );
  },
},

 
];


const courseTeacherDashColumns: MRT_ColumnDef<EnrolledCourse>[] = [

  {
    header: 'Course Title',
    accessorKey: 'course.title',
  },
  {
    header: 'Applied At',
    accessorKey: 'enrollmentDate',
    Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(),
  },
  {
    header: 'Enrollment Status',
    accessorKey: 'enrollmentStatus',
   Cell: ({ cell }) => (
    <Chip
      label={cell.getValue<string>()}
      color={
        cell.getValue<string>() === 'PASSED'
          ? 'success'
          : cell.getValue<string>() === 'FAILED'
          ? 'warning'
          : 'default'
      }
      variant="outlined"
      size="small"
    />
  ),
  },
  {
    header: 'Instructor Name',
    accessorKey: 'teacher.name',
  },
  
  {
  header: 'Manage Course',
  accessorKey: 'course.id', // This will *not* work if course is nested like course: { id: string }
  Cell: ({ cell }) => {
    const courseId = cell.row.original.course.id; // Access nested course ID safely
    return (
      <Button
        component={Link}
        to={`/get-single-course-by-enrolled-student/${courseId}`}
        variant="contained"
      >
        Details
      </Button>
    );
  },
}

 
];

const settingsOptions=[
    {
        name:"Create Course test",
        path:"/create-new-course",
        icon:<Create />
    }, 

]
function StudentDashboard() {
  const user = useSelector((state: RootState) => (state as RootState).auth.user);
  const theme=useTheme()
  const {data:stdDashData,isError,isFetching,isSuccess,error}=useFetchAllEnrolledCoursesByStudentQuery(null)
 
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
    <Box sx={{width:"100%",display:"flex",gap:2}}>
      <StudyTimeTracker/>
{/*left controller with setting profile and stats*/}
<Box sx={{minWidth:"18%",maxWidth:"18%",background:theme.palette.background.paper,p:2,display:"flex",flexDirection:"column",gap:3}}>
        <Typography variant="h5" fontWeight={700} sx={{display:"flex",alignItems:"center",gap:1}}>
          Student Dash <Forward/>
        </Typography>
    {/*profile box*/}
    <Box sx={{backgroundColor:theme.palette.grey[100],padding:2,display:"flex",flexDirection:"column",gap:2,borderRadius:4}}>

       <Box sx={{display:"flex",alignItems:"center",justifyContent:"start",gap:2}}>
       <Avatar  src={`${FILEURLPRE}/${profile_picture}`}/>
        {/* <Security sx={{ background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",fontSize:20}}/> */}
       
       <Typography variant="body1" sx={{display:"flex",gap:1}}>
        <School/>
        {name}
       </Typography>
       </Box>

       <Box sx={{display:"flex",gap:2}}>
        <Chip label="Student" variant="outlined" size="small" sx={{padding:1}} color="success"/>
        <Chip label="Verified" variant="outlined" size="small" sx={{padding:1}} color="warning" />
       </Box>

    </Box>
    
    {/*stat box*/}
    <Box sx={{
             boxShadow: 2,
             borderRadius: 4,
             px: 2.2,
             py: 1.4,
             backgroundColor: theme.palette.grey[100],
            border:"1px solid",borderColor:theme.palette.divider
                  }}
              >   
         
     <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:0.6,}}>
      <Typography variant="caption" fontWeight={600}> <FaBolt/> Active Study Hours Clock</Typography>
       <ActiveTimeClock/>
     </Box>
      </Box>
{/*pie box*/}
 <Box sx={{height:"320px"}}>
      <RadialChartDash overAllProgressPercentage={stdDashData?.summary.overallProgressPercentage??0} title="Over All Progress Across All Courses"/>
     </Box>

    {/*settings box*/}
    
     <Box>
          <Box sx={{background:theme.palette.background.paper,display:"flex",flexDirection:"column", }}>
          <Typography variant="body1" fontWeight={700} sx={{backgroundColor:theme.palette.primary.main,padding:1,color:"white"}}>
                    Settings
            </Typography>
            <Box sx={{display:"flex",flexDirection:{xs:"column",sm:"row",md:"row",lg:"column"},background:theme.palette.grey[100]}}>
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
   

        {/*right controller with all course info*/}
  <Box sx={{width:"100%",display:"flex",flexDirection:"column",pr:5}}>
   
    <Box sx={{pl:1.5,pr:1.5}}>
        <Typography sx={{display:'flex',alignItems:"center",gap:1,}} variant="h6" fontWeight={600}><span>Continue Learning</span> <Forward/></Typography>
        <ApprovedCoursesCards  courses={stdDashData?.enrollments.approved.slice(0,2)}/>
    </Box>

   <Box sx={{pl:1.5,pr:1.5,mt:2,mb:0,pb:0}}>
    <Typography sx={{display:'flex',alignItems:"center",gap:2}} variant="h6" fontWeight={600}><span>Progress Statistics</span> <Insights/></Typography>
</Box>
    <Box sx={{display:"flex",width:"100%",height:'380px',alignItems:"center",justifyContent:"center",gap:3,padding:3}}>

      <Box sx={{height:"100%",width:"33%"}}>
        <PieChartDash completed={stdDashData?.summary.completed??0} inprogress={stdDashData?.summary.inProgress??0} totalEnrolled={stdDashData?.summary.totalEnrolled??0} label1="Total Enrolled" label2="Completed" label3="In Progress" title="Enrollment Information"/>
      </Box>
     
     <Box sx={{height:"100%",width:"33%"}}>
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
    
    <Box sx={{height:"100%",width:"30%"}}>
    <PieChartDashComparison data={[
    { name: 'Completed', value: stdDashData?.summary.totalCompletedLessonsWithMcq??0 },
    { name: 'Remaining', value: (stdDashData?.summary.totalLessonsWithMcq??0) - (stdDashData?.summary.totalCompletedLessonsWithMcq??0) },
  ]}  />
   </Box>
    </Box>
     
  {
    (stdDashData?.enrollments.approved.length??0)<=2?<Box sx={{marginTop:3,pl:1.5,pr:1.5}}>
         <Typography sx={{display:'flex',alignItems:"center",gap:2,mb:1}} variant="h6" fontWeight={600}><span>Explore Our Courses</span> <Insights/></Typography>
      <EnrollOptionCourses/></Box>:<Box sx={{marginTop:3,pl:1.5,pr:1.5}}>
        <Typography sx={{display:'flex',alignItems:"center",gap:2}} variant="h6" fontWeight={600}><span>More Enrolled Courses</span> <Insights/></Typography>
          <SecondaryMiniCards courses={stdDashData?.enrollments.approved.slice(2,5)}/>
    </Box>
  }
   <Box sx={{pl:1.5,pr:1.5,mt:3}}>
     <Typography sx={{display:'flex',alignItems:"center",gap:2,mb:1}} variant="h6" fontWeight={600}><span>All Courses</span> <Insights/></Typography>
   </Box>
  <Box sx={{display:'flex',marginTop:3,pl:3,pr:3}}>
    
    <CourseTable<EnrolledCourse> columns={courseTeacherDashColumns} data={stdDashData?.enrollments.approved??[]} title="All Courses"/>
  </Box>
  <Box sx={{pl:1.5,pr:1.5,mt:3}}>
     <Typography sx={{display:'flex',alignItems:"center",gap:2,mb:1}} variant="h6" fontWeight={600}><span>Pending Requests</span> <Insights/></Typography>
   </Box>
  <Box sx={{display:'flex',marginTop:3,pl:3,pr:3,mb:3}}>
    
    <CourseTable<EnrolledCourse> columns={courseTeacherDashColumnsPending} data={stdDashData?.enrollments.pending??[]} title="Pending Enrollments"/>
  </Box>

  </Box>

    
        

</Box>
  );
}

export default StudentDashboard;

