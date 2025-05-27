import { Button,Chip,Table,TableBody,TableCell,TableContainer,TableHead,TableRow, useTheme,Paper, Rating,
} from "@mui/material";
import { useGetSingleCourseByTeacherQuery } from "../../app/api/createCourseApi";
import { Link } from "react-router-dom";

const courseTableHeader = [
  "Student Name",
  "Email",
  "Enrollment Status",
  "Rating",
  "Manage Student"
];

interface EnrolltableProp{
    courseId:string|undefined
}

function EnrolledStudentTable({courseId}:EnrolltableProp) {
    const theme=useTheme()
    const {data:courseDataForTeacher,error,isError,isSuccess}=useGetSingleCourseByTeacherQuery({courseId})
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
            {courseTableHeader.map((header) => (
              <TableCell
                key={header}
                sx={{ fontWeight: "bold", color: "white"}}
              >
                {header.toUpperCase()}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {courseDataForTeacher?.courseDetails.enrolledStudents.map((student, index) => (
            <TableRow
              key={index}
              hover
              sx={{
                backgroundColor: index % 2 === 0 ? theme.palette.secondary.main : theme.palette.secondary.dark,
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <TableCell>{student.name}</TableCell>
              <TableCell>
                <Chip
                  label={student.enrollmentStatus}
                  color={
                   student.enrollmentStatus === "PASSED"
                      ? "success"
                      : student.enrollmentStatus === "FAILED"
                      ? "warning"
                      : "default"
                  }
                  size="small"
                  variant="filled"
                />
              </TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{<Rating
                    value={student.courseRating?student.courseRating:0}
                    readOnly

              />}</TableCell>
              <TableCell sx={{display:"flex", gap:1}}>
                  <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ textTransform: "none" }}
                  component={Link}
                  to={`/manage-student-by-teacher/${student.studentId}`}
                >
                  Student Settings
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default EnrolledStudentTable
