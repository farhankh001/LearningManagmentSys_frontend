import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { EnrolledCourse } from "../../app/api/studentDashApis";

const courseTableHeader = [
  "Course Title",
  "Enrollment Status",
  "Instructor Name",
  "Instructor Email",
  "Enrollment Date",
  "Access Course",
];

interface CourseTableForStudentProp{
    courses:EnrolledCourse[]|undefined
}

function CourseTableForStudentDash({courses}:CourseTableForStudentProp) {
  const theme = useTheme();
 console.log(courses)
 const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
      <Table size="medium">
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
          {courses&&courses.map((course, index) => (
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
              <TableCell>{course.course.title}</TableCell>
              <TableCell>
                <Chip
                  label={course.enrollmentStatus}
                  color={
                    course.enrollmentStatus === "PASSED"
                      ? "success"
                      : course.enrollmentStatus === "FAILED"
                      ? "warning"
                      : "default"
                  }
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{course.teacher?.name}</TableCell>
              <TableCell>{course.teacher?.email}</TableCell>
              <TableCell>{course.enrollmentDate}</TableCell>
              <TableCell sx={{display:"flex", gap:1}}>
                  <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ textTransform: "none" }}
                  component={Link}
                  to={`/get-single-course-by-enrolled-student/${course.course.id}`}
                >
                    Continue Learning
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CourseTableForStudentDash;



