import { Forward, Info, Insights } from '@mui/icons-material'
import { Box, Button, Chip, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import React from 'react'
import { EnrolledCourse } from '../../../app/api/studentDashApis'
import CourseTable from '../../../components/Table/CourseTable'
import { MRT_ColumnDef } from 'material-react-table'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import GaugeChartDash from '../Charts/CircularProgressBarDash'
import PieChartWithoutHole from '../Charts/PieChartWithOutHole'





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
      label={cell.getValue<string>().toLocaleLowerCase()}
      color={
        cell.getValue<string>() === 'PASSED'
          ? 'success'
          : cell.getValue<string>() === 'FAILED'
          ? 'error'
          : 'warning'
      }
      variant="outlined"
      size="small"
      sx={{pl:1.5,pr:1.5,fontSize:13}}
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
        variant="outlined"
       sx={{pl:1.5,pr:1.5,fontSize:13}}
      >
      <span>More Details</span>  <Forward sx={{fontSize:14,ml:1}}/>
      </Button>
    );
  },
}

 
];

function StudentAllEnrolledCourses() {
    const enrolledCourses = useSelector((state: RootState) => (state as RootState).courses.enrolledCourses);
    const theme=useTheme()
  return (
     <Box sx={{display:"flex",alignItems:"self-start",width:'100%',gap:5,justifyContent:"center",mt:2,}}> 
    
        <Box sx={{width:'63%',display:"flex",flexDirection:'column',gap:3}}>
            <Box sx={{background:theme.palette.primary.dark,padding:2,border:"1px solid",borderRadius:4,borderColor:theme.palette.divider,display:"flex",gap:2}}><Info/><Typography>This is a list of all approved courses you have access to.</Typography></Box>
            <CourseTable<EnrolledCourse> columns={courseTeacherDashColumns} data={enrolledCourses.courses??[]} title="All Approved Courses"/>
        </Box>

        <Box sx={{height:"530px",display:"flex",flexDirection:"column",width:"25%",gap:3}}>
       
       <Box sx={{height:"55%"}}> <GaugeChartDash  title='Percentage Completed Courses' value={enrolledCourses.enrollmentSummary.overallProgressPercentage}/></Box>
        <Box sx={{height:"100%"}}>
            <PieChartWithoutHole completed={enrolledCourses.enrollmentSummary.completed} inprogress={enrolledCourses.enrollmentSummary.inProgress} totalEnrolled={enrolledCourses.enrollmentSummary.totalEnrolled}  label1='Enrolled' label2='Completed' label3='Inprogress' title='Course Completion Summary'/>
        </Box>
    </Box>
  </Box>
  )
}

export default StudentAllEnrolledCourses
