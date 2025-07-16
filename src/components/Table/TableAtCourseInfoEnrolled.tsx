
import {
  Button,

  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  Paper,

  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { CourseTeacher } from "../../app/api/studentDashApis";

const courseTableHeader = [
  "Teacher Name",
  "Email",
  "Profile",
  "Access Teacher",
];

interface CourseTableForStudentProp{
    courseTeacher:CourseTeacher[]|undefined
}
function TableAtCourseInfoEnrolled({courseTeacher}:CourseTableForStudentProp) {
  const theme = useTheme();
  console.log(courseTeacher)
//  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
          {courseTeacher&&courseTeacher.map((courseTeacher, index) => (
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
              <TableCell>{courseTeacher?.name}</TableCell>
              <TableCell>{courseTeacher.email}</TableCell>
              <TableCell><Avatar src={courseTeacher.profile_url} sx={{width:30,height:30}}/></TableCell>
              <TableCell sx={{display:"flex", gap:1}}>
                  <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ textTransform: "none" }}
                  component={Link}
                  to={`/get-single-course-by-enrolled-student/${courseTeacher.id}`}
                >
                    View Teacher Profile
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableAtCourseInfoEnrolled;



