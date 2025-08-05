import { useSelector } from "react-redux";
import {
  Box, Typography, Avatar, useTheme, Divider, alpha, Button, Drawer, IconButton, useMediaQuery,
} from "@mui/material";

import '@fontsource/orbitron/400.css';
import '@fontsource/orbitron/800.css';
import '@fontsource/roboto-slab/400.css';
import {
  HowToRegOutlined, LiveTvTwoTone, PersonAddAlt1Outlined, TrendingDownOutlined, TrendingUpOutlined, AddCircleOutlineTwoTone, Circle, BadgeOutlined, EmailOutlined, PendingOutlined, BoltOutlined, AddTaskOutlined, ArrowDropDownCircleOutlined, MenuOutlined, CloseOutlined,
  Dashboard,
  NotificationAddOutlined,
  NotificationAddTwoTone,
  ManageAccounts,
  ManageAccountsOutlined,
  Thunderstorm,
  Bolt,
} from "@mui/icons-material";
import { RootState } from "../../app/store";

import { Typewriter } from "react-simple-typewriter";
import {
  OverallStats,
  useFetchAllEnrolledCoursesByStudentQuery,
} from "../../app/api/studentDashApis";

import { useGetStudentProfileQuery } from "../../app/api/userApi";
import ApprovedCoursesCards, { getLessonStatsAnalytics } from "./DashCards/ApprovedCoursesCards";
import LessonProgressCard from "./DashCards/LessonProgressCard";
import BarChartMainDash from "./DashCharts/BarChartMaindash";
import { formatTimeGlobel } from "./TimeTracker/ActiveTimeClock";

export const defaultLessonStats: OverallStats = {
  totalAssignments: 0,
  submittedAssignments: 0,
  totalMCQs: 0,
  submittedMCQs: 0,
  totalLabs: 0,
  totalLessons: 0,
  submittedLabs: 0,
};

const settingsOptions = [
  {
    name: "Approved Courses",
    path: "/all-enrolled-courses-settings",
    icon: <AddTaskOutlined sx={{ fontSize: 18, color: "success.light", }} />,
  },
  {
    name: "Pending Enrollments",
    path: "/all-pending-courses-settings",
    icon: <PendingOutlined sx={{ fontSize: 18, }} />,
  },
  {
    name: "Enroll In A Course",
    path: "/enroll-in-a-course",
    icon: <ArrowDropDownCircleOutlined sx={{ fontSize: 18, color: "primary.main" }} />,
  },
];

function StudentDashboard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const theme = useTheme();


  const { data: stdDashData } = useFetchAllEnrolledCoursesByStudentQuery(null);
  const { data: studentProfile } = useGetStudentProfileQuery()

  const lessonAnalytics = getLessonStatsAnalytics(stdDashData?.overallStats ?? defaultLessonStats);


  if (!user) {
    return (
      <Box sx={{
        p: { xs: 2, sm: 3 },
        textAlign: 'center',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography
          variant="h5"
          color="error"
          sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
        >
          Please login to view dashboard
        </Typography>
      </Box>
    );
  }

  if (user.role !== "Student") {
    return (
      <Box sx={{
        p: { xs: 2, sm: 3 },
        textAlign: 'center',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography
          variant="h5"
          color="error"
          sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
        >
          You are not authorized to access this page.
        </Typography>
      </Box>
    );
  }

  const approvedCount = stdDashData?.summary?.totalApproved?.count ?? 0;
  const enrolledCount = stdDashData?.summary?.totalEnrolled?.count ?? 0;
  const pendingCount = stdDashData?.summary?.totalPending?.count ?? 0;
  const completedCount = stdDashData?.summary?.completed?.count ?? 0;
  const inProgressCount = stdDashData?.summary?.inProgress?.count ?? 0;

  const analytics = [

    {
      title: "Approved Courses",
      icon: <HowToRegOutlined sx={{ color: "success.light", fontSize: { xs: 18, sm: 25 }, }} />,
      desc: "Total approved enrollments by course teacher.",
      value: `${approvedCount}`,
      color: theme.palette.success.light,
      path: "/all-enrolled-courses-settings"
    },
    {
      title: "Pending Courses",
      icon: <PersonAddAlt1Outlined sx={{ color: "warning.light", fontSize: { xs: 18, sm: 25 } }} />,
      desc: "Across all courses pending enrollment requests.",
      value: pendingCount,
      path: "/all-pending-courses-settings",
      color: theme.palette.warning.light
    },
    {
      title: "Completed Courses",
      icon: <TrendingUpOutlined sx={{ color: "success.light", fontSize: { xs: 18, sm: 25 } }} />,
      desc: `Completed all lessons and marked completed.`,
      value: completedCount,
      path: "/all-enrolled-courses-settings",
      color: theme.palette.success.light
    },

    {
      title: "Total Requests",
      icon: <LiveTvTwoTone sx={{ color: "primary.main", fontSize: { xs: 18, sm: 25 } }} />,
      desc: "Total enrollment requests made by student.",
      value: enrolledCount,
      color: theme.palette.primary.main,
      path: "/all-enrolled-courses-settings",
    },
  ];

  // Unified Sidebar Content Component


  return (
    <Box sx={{ width: "100%", }}>
      <Box sx={{ width: "100%", display: "flex", alignItems: 'center', justifyContent: "space-between", pl: 2, pr: 2, pt: 2, pb: 1.5, background: alpha(theme.palette.primary.dark, 0.75), }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, }}>
          <Box sx={{ height: "10px" }}>
            <Typography variant="body2" fontWeight={600}
              fontFamily="roboto-slab"
              sx={{
                fontSize: "1rem",
                color: theme.palette.success.light,
                textShadow: `0 0 10px rgba(17, 255, 0, 0.5), 0 0 20px rgba(0, 255, 34, 0.4)`,
              }}>
              <Typewriter
                words={[
                  "Master cybersecurity through immersive, real-world simulations",
                  "Crack top certifications with expert-led, structured prep courses",
                  "Learn ethical hacking anytime, with flexible self-paced lessons",
                  "Earn globally recognized certifications and enhance your career",
                  "Build in-demand skills for high-paying cybersecurity roles",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                cursorColor="#157720ff"
                typeSpeed={50}
                deleteSpeed={30}
                delaySpeed={2500} /></Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1.2 }}>
            <Typography variant="h5" fontWeight={600} sx={{ color: theme.palette.text.primary }}>Welcome back {studentProfile?.profile.user.name} to your lms </Typography>


          </Box>

        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: "center", gap: 1 }}><NotificationAddTwoTone sx={{ fontSize: 18 }} /><Typography variant="caption" fontWeight={600}>11</Typography></Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Typography variant="caption" sx={{ background: alpha(theme.palette.success.light, 0.4), color: theme.palette.text.primary, px: 2, py: 0.3, borderRadius: 2.5, fontSize: "0.67rem" }}>Role  | Student</Typography>
            <Typography
              variant="caption"
              sx={{
                background: alpha(theme.palette.success.light, 0.4),
                color: theme.palette.text.primary,
                px: 2,
                py: 0.3,
                borderRadius: 2.5,
                fontSize: "0.67rem"
              }}
            >
              Joining Date | {" "}
              {studentProfile?.profile.createdAt
                ? new Date(studentProfile.profile.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
                : "N/A"}
            </Typography>


          </Box>

        </Box>
      </Box>
      <Divider />


      <Box sx={{ width: "100%", p: 2, display: "flex", gap: 2 }}>
        <Box sx={{ width: "75%" }}>
          {/* <Box> <Typography>Your Learning Statistics</Typography></Box> */}
          <Box>
            <Box sx={{ mt: 0, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", width: "100%", gap: 2 }}>
              {
                lessonAnalytics.map(lesson => <LessonProgressCard {...lesson} />)
              }
            </Box>
          </Box>


          <Box sx={{ mt: 2 }}>
            <ApprovedCoursesCards enrollments={stdDashData?.enrollments.approved} />
          </Box>

          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Box sx={{ height: "260px", width: "40%", background: alpha(theme.palette.primary.dark, 0.75), p: 1, border: "1px solid", borderRadius: 3, borderColor: theme.palette.divider }}>
              <BarChartMainDash
                data={[
                  stdDashData?.summary.totalEnrolled ?? { name: 'Total Enrolled', count: 0 },
                  stdDashData?.summary.totalApproved ?? { name: 'Approved', count: 0 },
                  stdDashData?.summary.totalPending ?? { name: 'Pending', count: 0 }
                ]}
                title="Enrolled Courses Information"
              />

            </Box>
            <Box sx={{ height: "260px", width: "60%", background: alpha(theme.palette.primary.dark, 0.75), p: 1, border: "1px solid", borderRadius: 3, borderColor: theme.palette.divider }}>

            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "25%" }}>
          <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
            <Box sx={{ background: alpha(theme.palette.primary.dark, 0.75), border: "1px solid", borderColor: theme.palette.divider, borderRadius: 3, p: 2.5, display: "flex", flexDirection: "column", alignItems: 'center', gap: 1.2, width: "100%" }}>
              <Bolt />
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 'bold',
                  letterSpacing: '0.1rem',
                  textAlign: "center",
                  color: theme.palette.text.primary, fontSize: "1.7rem"
                }}>

                {formatTimeGlobel((stdDashData?.totalStudyTimeInHours) ?? 0)}
              </Typography>
              <Typography >Active Study Clock</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: "100%", }}>
              <Box sx={{ display: "flex", alignItems: 'center', flexDirection: 'column', background: alpha(theme.palette.primary.dark, 0.75), border: "1px solid", borderColor: theme.palette.divider, borderRadius: 3, width: "50%" }}>
                <Box sx={{ p: 1.5 }}>
                  <Typography variant="caption" fontWeight={600} sx={{ color: theme.palette.text.secondary }}>Inprogress</Typography>
                  <Typography variant="caption" fontWeight={600} sx={{ color: theme.palette.text.secondary }} > Courses</Typography>
                </Box>
                <Typography variant="h5"
                  component="div"
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    letterSpacing: '0.1rem',
                    textAlign: "center",
                    color: theme.palette.warning.light, fontSize: "1.5rem", p: 1, borderTop: "1px solid", borderColor: theme.palette.divider, borderRadius: 3, width: "100%"
                  }}>
                  {inProgressCount}
                </Typography>

              </Box>
              <Box sx={{ display: "flex", alignItems: 'center', flexDirection: 'column', background: alpha(theme.palette.primary.dark, 0.75), border: "1px solid", borderColor: theme.palette.divider, borderRadius: 3, width: "50%" }}>
                <Box sx={{ p: 1.5 }}>
                  <Typography variant="caption" fontWeight={600} sx={{ color: theme.palette.text.secondary }}>Completed</Typography>
                  <Typography variant="caption" fontWeight={600} sx={{ color: theme.palette.text.secondary }} > Courses</Typography>
                </Box>
                <Typography variant="h5"
                  component="div"
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    letterSpacing: '0.1rem',
                    textAlign: "center",
                    color: theme.palette.success.light, fontSize: "1.5rem", p: 1, borderTop: "1px solid", borderColor: theme.palette.divider, borderRadius: 3, width: "100%"
                  }}>
                  {completedCount}
                </Typography>

              </Box>

            </Box>

          </Box>
        </Box>

      </Box>

    </Box >

  );
}

export default StudentDashboard;







// <Box sx={{
//         width: "100%",
//         display: "grid",
//         gridTemplateColumns: {
//           xs: "1fr",
//           sm: "1fr 1fr",
//           md: "repeat(4, 1fr)",

//         },
//         gap: { xs: 1.5, sm: 2, md: 3 },
//       }}>


//         {analytics.map((stat, index) => (
//           <Box
//             key={index}
//             sx={{
//               border: "1px solid",
//               borderColor: theme.palette.divider,
//               p: { xs: 1.5, sm: 2 },
//               background: alpha(theme.palette.primary.dark, 0.75),
//               borderRadius: { xs: 3, sm: 4 },
//               display: "flex",
//               gap: { xs: 0.5, sm: 1 },
//               justifyContent: "space-between",
//               alignItems: "center",
//               minHeight: { xs: "auto" }
//             }}
//           >
//             <Box sx={{ display: "flex", gap: 2 }}>

//               {stat.icon}



//               <Box>
//                 <Typography variant="body1" fontWeight={650}>{stat.value}</Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: { xs: 0.5, sm: 1 },
//                     fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.8rem' }, color: theme.palette.text.secondary
//                   }}
//                 > {stat.title}
//                 </Typography>

//               </Box>

//             </Box>
//           </Box>
//         ))}
//       </Box>