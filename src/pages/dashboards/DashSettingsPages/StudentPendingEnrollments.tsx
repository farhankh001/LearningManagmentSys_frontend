import { Info} from '@mui/icons-material'
import { Box, Chip, Typography, useTheme } from '@mui/material'
import { EnrolledCourse } from '../../../app/api/studentDashApis'
import CourseTable from '../../../components/Table/CourseTable'
import { MRT_ColumnDef } from 'material-react-table'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import PieChartWithoutHole from '../Charts/PieChartWithOutHole'

import GaugeChartDash from '../Charts/CircularProgressBarDash'
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
    const status=cell.getValue<string>()
    return (
      <Chip 
            label={status} 
            variant='filled' 
            color={ status=== 'APPROVED' ? 'success' : status === 'PENDING' ? 'warning' : 'default'} 
            size='small' 
            sx={{fontSize:10,pl:2,pr:2}}
          />
    );
  },
},

 
];
function StudentPendingEnrollments() {
    const pendingCourses = useSelector((state: RootState) => (state as RootState).courses.pendingCourses);
    const theme=useTheme()
  return (
  <Box sx={{display:"flex",alignItems:"self-start",width:'100%',gap:5,justifyContent:"center",mt:2,}}> 
    
        <Box sx={{width:'63%',display:"flex",flexDirection:'column',gap:3}}>
            <Box sx={{background:theme.palette.primary.dark,padding:2,border:"1px solid",borderRadius:4,borderColor:theme.palette.divider,display:"flex",gap:2}}><Info/><Typography>Wait For Teacher To Approve Your Pending Requests. After Approval You Will Get Access To Course Material.</Typography></Box>
            <CourseTable<EnrolledCourse> columns={courseTeacherDashColumnsPending} data={pendingCourses.courses??[]} title="Pending Enrollments"/>
        </Box>

        <Box sx={{height:"530px",display:"flex",flexDirection:"column",width:"25%",gap:3}}>
       
       <Box sx={{height:"55%"}}> <GaugeChartDash  title='Percentage Approved courses' value={(pendingCourses?.enrollmentSummary.totalApproved.count ?? 0) /((pendingCourses?.enrollmentSummary.totalEnrolled.count ?? 1)) * 100}/></Box>
        <Box sx={{height:"100%"}}>
            <PieChartWithoutHole completed={pendingCourses.enrollmentSummary.totalApproved.count} inprogress={pendingCourses.enrollmentSummary.totalPending.count} totalEnrolled={pendingCourses.enrollmentSummary.totalEnrolled.count}  label1='Total Requests' label2='Approved' label3='Pending' title='Pending Requests Summary'/>
        </Box>
    </Box>
  </Box>
  )
}

export default StudentPendingEnrollments
