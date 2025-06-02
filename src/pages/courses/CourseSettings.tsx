import {Box, Typography,Avatar,Chip, useTheme,ListItem,ListItemButton,Divider,ListItemIcon,ListItemText,Rating,LinearProgress, CardMedia, Button,} from "@mui/material";
import { CheckCircle, Cancel, Create, UpdateSharp } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { EnrolledStudent, useGetSingleCourseByTeacherQuery } from '../../app/api/createCourseApi';
import DisplayLessonAndAssignment from '../lessons/DisplayLessonAndAssignment';
import ReusableTable from "../../components/Table/CourseTable";
import { MRT_ColumnDef } from "material-react-table";
import toast from "react-hot-toast";

import { FILEURLPRE } from "../../components/other/Defaulturl";


const enrolledStdTeacherDashColumnsPending: MRT_ColumnDef<EnrolledStudent>[] = [

  {
    header: 'Std Name',
    accessorKey: 'name',
  },
  {
    header: 'Approval Status',
    accessorKey: 'enrollmentStatus',
   Cell: ({ cell }) => (
    <Chip
      label={cell.getValue<string>()}
      color={
        cell.getValue<string>() === 'INPROGRESS'
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
    header: 'Std Email',
    accessorKey: 'email',
  },
  {
    header: 'Course Rating',
    accessorKey: 'courseRating',
    Cell: ({ cell }) => {
      return <Rating
      readOnly
      value={cell.getValue<number>()}
      precision={0.5}
      />

     
    },
  },
   {
  header: 'Handle Request',
  accessorKey: 'enrollmentId', // This will *not* work if course is nested like course: { id: string }
  Cell: ({ cell }) => {
    const enrollmentId = cell.getValue(); // Access nested course ID safely
    return (
      <Button
        component={Link}
        to={`/handle-enrollment-approval/${enrollmentId}`}
        variant="contained"
      >
        View Profile
      </Button>
    );
  },
}
 
];

const enrolledStdTeacherDashColumns: MRT_ColumnDef<EnrolledStudent>[] = [

  {
    header: 'Std Name',
    accessorKey: 'name',
  },
  {
    header: 'Enrollment Status',
    accessorKey: 'enrollmentStatus',
   Cell: ({ cell }) => (
    <Chip
      label={cell.getValue<string>()}
      color={
        cell.getValue<string>() === 'INPROGRESS'
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
    header: 'Std Email',
    accessorKey: 'email',
  },
  {
    header: 'Course Rating',
    accessorKey: 'courseRating',
    Cell: ({ cell }) => {
      return <Rating
      readOnly
      value={cell.getValue<number>()}
      precision={0.5}
      />

     
    },
  },
   {
  header: 'View Details',
  accessorKey: 'id', // This will *not* work if course is nested like course: { id: string }
  Cell: ({ cell }) => {
    const courseId = cell.getValue(); // Access nested course ID safely
    return (
      <Button
        component={Link}
        to={`/course-settings/${courseId}`}
        variant="contained"
      >
        View Profile
      </Button>
    );
  },
}
 
];




function CourseSettings() {
    const {courseId}=useParams()
    const settingsOptions=[
    {
        name:"Edit This Course",
        path:`/edit-course/${courseId}`,
        icon:<UpdateSharp />
    },
    {
        name:"Create New Lesson",
        path:`/create-new-lesson/${courseId}`,
        icon:<Create />
    }, 
   
]

    const {data:courseDataForTeacher,error,isError,isSuccess}=useGetSingleCourseByTeacherQuery({courseId})
    console.log(courseDataForTeacher)
    if(isError &&error && 'data' in error){
      console.log(error)
      toast.error(`${JSON.stringify((error.data as any).error)}`)
          }  

    const theme=useTheme()
    
    if(!courseId){
      toast.error("NO course Id was provided")
    }
    console.log(courseDataForTeacher)
  return (
  <Box sx={{padding:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
     <Typography variant="h4" fontWeight={600} sx={{fontStyle:"italic",mt:1}}>Course Settings</Typography>
       <Box sx={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,mt:3}}>
        <Box sx={{background:theme.palette.background.paper,width:{xs:"95%",sm:"95%",md:"80%",lg:"80% "},display:"flex",flexDirection:"column", boxShadow:`-1.5px 4px 2px  rgba(0, 0, 0, 0.39)`}}>
           <Typography variant="h6" sx={{backgroundColor:theme.palette.primary.main,padding:1,color:"white"}}>
             Settings
           </Typography>
           <Box sx={{display:"flex",flexDirection:{xs:"column",sm:"row",md:"row",lg:"row"}}}>
            {
             settingsOptions.map((item)=><Box  key={item.name}>
                     <ListItem disablePadding sx={{borderRight:"1px solid",borderColor:theme.palette.primary.main}}>
                     <ListItemButton  component={Link} to={item.path}>
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
         {/* avatar with username etc */}
         <Box sx={{display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"center",gap:1,background:theme.palette.background.paper,width:{xs:"95%",sm:"95%",md:"80%",lg:"80% "},boxShadow:`-1.5px 4px 2px  rgba(0, 0, 0, 0.39)`,borderRadius:4,pb:3}}>
           <CardMedia
           component={"img"}
           src={`${FILEURLPRE}/${courseDataForTeacher?.courseDetails.course_thumbnail}`}
           sx={{height:150,borderRadius:4}}
           />
               <Typography variant="h4" fontWeight={600}>
           {courseDataForTeacher?.courseDetails.title}
         </Typography>
            <Rating
            value={courseDataForTeacher?.courseDetails.avgRating}
            readOnly
            precision={0.5}
           />
          <Chip
                 icon={courseDataForTeacher?.courseDetails.activationStatus ? <CheckCircle /> : <Cancel />}
                 label={courseDataForTeacher?.courseDetails.activationStatus}
                 color={courseDataForTeacher?.courseDetails.activationStatus==="ACTIVE" ?"success" : "error"}
                 size="medium"
           />
           
           
         </Box>
   
     </Box>
      <Typography variant="h4" fontWeight={600} sx={{fontStyle:"italic",mt:3}}>Course Lessons</Typography>
     <Box sx={{width:{xs:"95%",sm:"95%",md:"80%",lg:"80% "},mt:1,mb:3,display:"flex",flexDirection:"column"}}>
     <DisplayLessonAndAssignment lessons={courseDataForTeacher?.courseDetails.lessons}/>
     </Box>
     <Typography variant="h4" fontWeight={600} sx={{fontStyle:"italic",mt:3}}>Enrolled Studens In this Course</Typography>
     <Box sx={{mt:1,mb:10}}>
      <ReusableTable<EnrolledStudent> columns={enrolledStdTeacherDashColumnsPending} data={courseDataForTeacher?.courseDetails.pendingStudents??[]} title="Pending Enrollments" />
     <Box sx={{marginTop:5}}>
       <ReusableTable<EnrolledStudent> columns={enrolledStdTeacherDashColumns} data={courseDataForTeacher?.courseDetails.approvedStudents??[]} title="Approved Enrollments" />
     </Box>
     </Box>
   </Box>

  )
}

export default CourseSettings
