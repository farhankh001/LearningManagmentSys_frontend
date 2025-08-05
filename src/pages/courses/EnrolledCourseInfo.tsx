import { Box, Typography, Avatar, Chip, useTheme, Alert, CircularProgress, CardMedia, alpha, Divider, } from "@mui/material";
import { Forward, Celebration, Thunderstorm, Explore, BadgeOutlined, EmailOutlined, Circle } from '@mui/icons-material';

import { useParams } from 'react-router-dom'
import DisplayLessonAndAssignment from '../lessons/DisplayLessonAndAssignment';
import { useGetSingleCourseByEnrolledStudentQuery } from "../../app/api/studentDashApis";


import { FILEURLPRE } from "../../components/other/Defaulturl";

import QuizPerformanceLineChart from "../dashboards/Charts/QuizPerformanceLineChart";

import { StudyTimeTracker } from "../dashboards/TimeTracker/StudyTimeTracker";

import { PersonalDetails } from "../dashboards/TeacherDashboard";
import BarChartMainDash from "../dashboards/DashCharts/BarChartMaindash";
import ActiveTimeClock from "../dashboards/TimeTracker/ActiveTimeClock";
import LessonProgressCard from "../dashboards/DashCards/LessonProgressCard";
import { getLessonStatsAnalytics } from "../dashboards/DashCards/ApprovedCoursesCards";
import { defaultLessonStats } from "../dashboards/StudentDashboard";

function EnrolledCourseInfo() {
  const { courseId } = useParams()
  const { data: enrolledCourse, error, isError, isLoading } = useGetSingleCourseByEnrolledStudentQuery({ courseId })
  const theme = useTheme()
  const lessonStats = getLessonStatsAnalytics(enrolledCourse?.stats ?? defaultLessonStats)
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
  console.log(enrolledCourse)
  //quiz over all percentage numbers:


  return (
    <Box sx={{ width: "100%", display: "flex", gap: 0, flexDirection: "row" }}>
      <StudyTimeTracker courseId={courseId} />
      <Box sx={{ width: "77.5%", my: 4, ml: 2, }}>
        <Typography variant="body2" fontWeight={550} sx={{ color: theme.palette.text.secondary }}>{`Dashboard / Courses / ${enrolledCourse?.category}`}</Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 4, }}>
          <Box sx={{ display: "flex", ml: 2 }}>  <Typography variant="caption" fontWeight={500} sx={{
            background: alpha(theme.palette.primary.main, 0.3), color: theme.palette.text.secondary, px: 1.5, py: 0.4, borderRadius: 2.5, fontSize: "0.67rem", display: "flex", gap: 1.5, alignItems: "center"
          }}><Circle sx={{
            fontSize: 6,
            color: theme.palette.primary.main,
            boxShadow: `0 0 6px 2px ${theme.palette.primary.main}`,
            borderRadius: '50%',
            background: theme.palette.primary.main
          }} /> <span>{enrolledCourse?.activationStatus}</span></Typography></Box>
          <Typography variant="h6" sx={{ ml: 2 }}>
            {enrolledCourse?.title}: {enrolledCourse?.subtitle}
          </Typography>
          <Box sx={{ ml: 2 }}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Typography variant="caption" sx={{ background: alpha(theme.palette.background.paper, 1), color: theme.palette.text.primary, px: 2, py: 0.3, borderRadius: 2.5, fontSize: "0.67rem" }}>{enrolledCourse?.category}</Typography>

            <Typography
              variant="caption"
              sx={{
                background: alpha(theme.palette.background.paper, 1),
                color: theme.palette.text.primary,
                px: 2,
                py: 0.3,
                borderRadius: 2.5,
                fontSize: "0.67rem"
              }}
            >
              Joining Date | {" "}
              {enrolledCourse?.enrollmentDate
                ? new Date(enrolledCourse.enrollmentDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
                : "N/A"}
            </Typography>
          </Box>
            <Box sx={{ mt: 2, ml: 0.2 }}>
              <Typography

                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                  fontSize: "0.9rem"
                }}
              >
                Course Created By  {" "}
                {
                  enrolledCourse?.courseTeacherInfo[0].name

                } {" "} At  {" "}
                {enrolledCourse?.enrollmentDate
                  ? new Date(enrolledCourse.courseCreatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                  : "N/A"}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ width: "100%", my: 1 }} />
          <Box sx={{ display: "flex", gap: 2, alignItems: 'center', justifyContent: "center", ml: 2 }}>
            <Box sx={{ width: "60%", height: "230px" }}>
              <Box sx={{ display: "flex", gap: 0.5, flexDirection: 'column' }}>
                <Typography variant="body2" fontWeight={600} sx={{ color: theme.palette.text.secondary }}>Lesson Description</Typography>
                <Typography variant="body1" sx={{ fontSize: "0.95rem" }}>{enrolledCourse?.description}</Typography>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" fontWeight={600} sx={{ color: theme.palette.text.secondary }}>Course Teacher</Typography>
                <Box>
                  <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: '1fr 1fr',
                      md: 'repeat(3, 1fr)',

                    },
                    gap: { xs: 2, sm: 2 },

                    borderRadius: 4
                  }}>
                    <PersonalDetails
                      label='Name'
                      value={enrolledCourse?.courseTeacherInfo[0].name || "No name provided"}
                      icon={<EmailOutlined sx={{ fontSize: 15 }} />}
                    />
                    <PersonalDetails
                      label='Email'
                      value={enrolledCourse?.courseTeacherInfo[0].email || "No email provided"}
                      icon={<EmailOutlined sx={{ fontSize: 15 }} />}
                    />
                    <PersonalDetails
                      label='Qualifications'
                      value={enrolledCourse?.courseTeacherInfo[0].qualifications || "No qualification provided"}
                      icon={<BadgeOutlined sx={{ fontSize: 15 }} />}
                    />

                  </Box>
                </Box>
              </Box>



            </Box>
            <Box sx={{ width: "40%" }}>
              <CardMedia component="img" src={`${FILEURLPRE}/${enrolledCourse?.course_thumbnail}`} sx={{ height: "230px", border: "1px solid", borderColor: theme.palette.divider, borderRadius: 4 }} />
            </Box>

          </Box>
          <Divider sx={{ width: "100%", my: 1 }} />
          <Box sx={{ display: "flex", gap: 1.5, flexDirection: "column", }}>
            <DisplayLessonAndAssignment lessons={enrolledCourse?.lessons} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: "22.5%", display: "flex", flexDirection: "column", alignItems: "flex-start", my: 4, mr: 4, ml: 2 }}>
        <ActiveTimeClock courseId={courseId} />
        <Box sx={{
          width: "100%", mt: 2
        }}>
          <Box sx={{ mt: 0, display: "grid", gridTemplateColumns: "1fr", width: "100%", gap: 1 }}>
            {
              lessonStats?.map(lesson => <LessonProgressCard {...lesson} />)
            }
          </Box>
        </Box>
      </Box>

    </Box >



  )
}

export default EnrolledCourseInfo
