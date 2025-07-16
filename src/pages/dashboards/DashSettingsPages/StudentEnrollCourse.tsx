import { Box, useTheme } from '@mui/material'
import CoursesWithTeacher from '../DashCards/CoursesWithTeacher'


function StudentEnrollCourse() {
  const theme=useTheme()
  return (
    <Box>
      <CoursesWithTeacher bgc={theme.palette.primary.dark} />
    </Box>
  )
}

export default StudentEnrollCourse
