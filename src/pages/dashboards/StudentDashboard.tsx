import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Avatar,
  useTheme,
  ListItem,
  ListItemButton,
  Divider,
  ListItemIcon,
  ListItemText,
  alpha,
} from "@mui/material";
import {
  AccountCircle,
  Forward,
  Insights,
  Celebration,
  Pending,
  ApprovalRounded,
} from "@mui/icons-material";
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";

import {
  useFetchAllEnrolledCoursesByStudentQuery,
} from "../../app/api/studentDashApis";
import { FILEURLPRE } from "../../components/other/Defaulturl";
import { BorderLinearProgress } from "../../test/feature";
import ApprovedCoursesCards from "./DashCards/ApprovedCoursesCards";
import SecondaryMiniCards from "./DashCards/SecondaryMiniCards";
import ActiveTimeClock from "./TimeTracker/ActiveTimeClock";
import { FaBolt } from "react-icons/fa";
import EnrollOptionCourses from "./DashCards/EnrollOptionCourses";
import MainTopBlueCard from "./DashCards/MainTopBlueCard";
import {
  setEnrolledCourses,
  setPendingCourses,
} from "../../app/slices/courseSlice";

import MiniBarChart from "./DashCharts/MiniCards/BarChartMini";
import MiniPieChart from "./DashCharts/MiniCards/PieChartMini";
import MiniRadialChart from "./DashCharts/MiniCards/GaugeMini";

const settingsOptions = [
  {
    name: "Pending Requests",
    path: "/all-pending-courses-settings",
    icon: <Pending />,
  },
  {
    name: "Approved Courses",
    path: "/all-enrolled-courses-settings",
    icon: <ApprovalRounded />,
  },
  {
    name: "Enroll In Course",
    path: "/enroll-in-a-course",
    icon: <AccountCircle />,
  },
];

function StudentDashboard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { data: stdDashData, isSuccess, isLoading } = useFetchAllEnrolledCoursesByStudentQuery(null);

  useEffect(() => {
    if (stdDashData?.enrollments?.approved) {
      dispatch(setEnrolledCourses({
        courses: stdDashData.enrollments.approved,
        enrollmentSummary: stdDashData.summary,
      }));
    }

    if (stdDashData?.enrollments?.pending) {
      dispatch(setPendingCourses({
        courses: stdDashData.enrollments.pending,
        enrollmentSummary: stdDashData.summary,
      }));
    }
  }, [stdDashData, isSuccess, isLoading, dispatch]);

  if (!user) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">Please login to view dashboard</Typography>
      </Box>
    );
  }

  if (user.role !== "Student") {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">You are not authorized to access this page.</Typography>
      </Box>
    );
  }

  const { name, profile_picture } = user;

  // 🛡 Fallbacks
  const approvedCount = stdDashData?.summary?.totalApproved?.count ?? 0;
  const enrolledCount = stdDashData?.summary?.totalEnrolled?.count ?? 1;
  const pendingCount = stdDashData?.summary?.totalPending?.count ?? 0;
  const completedCount = stdDashData?.summary?.completed?.count ?? 0;
  const inProgressCount = stdDashData?.summary?.inProgress?.count ?? 0;
  const overallProgress = stdDashData?.summary?.overallProgressPercentage?.count ?? 0;
  const completedMcqCount = stdDashData?.summary?.totalCompletedLessonsWithMcq?.count ?? 0;
  const totalMcqLessonsCount = stdDashData?.summary?.totalLessonsWithMcq?.count ?? 1;

  return (
    <Box>
      <Box sx={{
        width: "100%",
        display: "flex",
        gap: 0,
        flexDirection: { xs: "column-reverse", md: "row" },
        maxWidth: "100%",
        mb: 5,
        justifyContent: "center"
      }}>
        {/* Main content area */}
        <Box sx={{
          width: { xs: "95%", md: "70%", lg: "95%" },
          display: "flex",
          flexDirection: "column",
          mt: { xs: 2, md: 0 },
          pl: { xs: 1, md: 4, lg: 8 },
          pr: { xs: 1, md: 2, lg: 4 },
          zIndex: 1
        }}>


          <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" }, mt: 0 }}>
            <Box sx={{
              background: "linear-gradient(135deg,rgb(107, 91, 255) 0%,rgb(95, 68, 128) 100%)",
              borderRadius: "20px",
              color: "#fff",
              padding: 4,
              border: "1px solid",
              borderColor: theme.palette.divider,
              width: { xs: "95%", md: "60%", lg: "70%" },
              height: "150px"
            }}>
              <MainTopBlueCard />
            </Box>

            <Box sx={{
              background: alpha(theme.palette.primary.dark, 0.5),
              padding: 3,
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              borderRadius: 4,
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid",
              borderColor: theme.palette.divider,
              height: "150px",
              width: { xs: "95%", md: "40%", lg: "30%" }
            }}>
              <Avatar src={`${FILEURLPRE}/${profile_picture}`} sx={{ width: "70px", height: "70px" }} />
              <Typography variant="body1" fontWeight={600} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                WELCOME BACK <Celebration />
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {name.split(" ")[0].toUpperCase()}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: { xs: "95%", md: "100%", }, mt: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{
              display: 'flex',
              alignItems: "center",
              gap: 1,
              mb: 2,
              background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              <span>Continue Learning</span> <Forward sx={{ color: theme.palette.warning.light }} />
            </Typography>
            <ApprovedCoursesCards courses={stdDashData?.enrollments?.approved?.slice(0, 2)} />
          </Box>
          {(stdDashData?.enrollments?.approved?.length ?? 0) <= 2 ? (
            <Box sx={{ marginTop: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{
                display: 'flex',
                alignItems: "center",
                gap: 2,
                mb: 1,
                background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                <span>Explore Our Courses</span> <Insights sx={{ color: theme.palette.warning.light }} />
              </Typography>
              <Typography>Click on Enrol in a Course in Settings.</Typography>
            </Box>
          ) : (
            <Box sx={{ marginTop: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{
                display: 'flex',
                alignItems: "center",
                gap: 2,
                mb: 1,
                background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                <span>More Enrolled Courses</span> <Insights sx={{ color: theme.palette.warning.light }} />
              </Typography>
              <SecondaryMiniCards courses={stdDashData?.enrollments?.approved?.slice(2, 5)} />
            </Box>
          )}

          <Box sx={{ mt: 3, mb: 2 }}>
            <Typography variant="h6" fontWeight={600} sx={{
              display: 'flex',
              alignItems: "center",
              gap: 1,
              mb: 1,
              background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              <span>Course information</span> <Forward sx={{ color: theme.palette.warning.light }} />
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Box sx={{
                height: "230px", width: "335px", p: 1.5, display: "flex", gap: 0.5, flexDirection: "column", alignItems: "center",
                background: alpha(theme.palette.primary.dark, 0.5), border: "1px solid", borderRadius: 4, borderColor: theme.palette.divider
              }}>
                <Typography variant="body2" fontWeight={200}>Approval summary</Typography>
                <MiniBarChart data={[
                  { name: "Enrolled", count: enrolledCount },
                  { name: "Approved", count: approvedCount },
                  { name: "Pending", count: pendingCount }
                ]} />
              </Box>

              <Box sx={{
                height: "235px", width: "370px", p: 1.5, display: "flex", gap: 0.5, flexDirection: "column", alignItems: "center",
                background: alpha(theme.palette.primary.dark, 0.5), border: "1px solid", borderRadius: 4, borderColor: theme.palette.divider
              }}>
                <Typography variant="body2" fontWeight={200}>Completion summary</Typography>
                <MiniPieChart data={[
                  { name: "Completed", count: completedCount },
                  { name: "In Progress", count: inProgressCount },
                  { name: "Total Enrolled", count: enrolledCount }
                ]} />
              </Box>

              <Box sx={{
                height: "230px", width: "335px", p: 1.5, display: "flex", gap: 0.5, flexDirection: "column", alignItems: "center",
                background: alpha(theme.palette.primary.dark, 0.5), border: "1px solid", borderRadius: 4, borderColor: theme.palette.divider
              }}>
                <Typography variant="body2" fontWeight={200}>Percentage Progress In Courses</Typography>
                <MiniRadialChart value={(completedMcqCount / totalMcqLessonsCount) * 100} />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Sidebar */}
        <Box sx={{
          minWidth: { xs: "95%", md: "30%", lg: "20%" },
          maxWidth: "100%", pl: 2, pr: 2, display: "flex",
          flexDirection: "column", gap: 3, mr: 4
        }}>
          <Box sx={{
            boxShadow: 2, borderRadius: 4, px: 2.2, py: 1.4,
            backgroundColor: theme.palette.primary.dark,
            border: "1px solid", borderColor: theme.palette.divider
          }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0.6 }}>
              <Typography variant="caption" fontWeight={600}>
                <FaBolt /> Active Study Hours Clock
              </Typography>
              <ActiveTimeClock />
            </Box>
          </Box>

          <Box sx={{
            backgroundColor: theme.palette.primary.dark,
            border: "1px solid", borderColor: theme.palette.divider,
            px: 3, py: 2, display: "flex", flexDirection: "column",
            gap: 2, borderRadius: 4, alignItems: "center"
          }}>
            {[
              { label: '% Course Approval', value: (approvedCount / enrolledCount) * 100, order: 1 },
              { label: '% Course Completion', value: (completedCount / enrolledCount) * 100, order: 2 },
              { label: '% OverAll Progress', value: overallProgress, order: 3 },
            ].map(({ label, value, order }) => (
              <Box key={label} sx={{ mb: 1, width: "100%", display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  {value.toFixed(1)} {label}
                </Typography>
                <BorderLinearProgress variant="determinate" value={value ?? 0} order={order} sx={{ height: 5.5, borderRadius: 2 }} />
              </Box>
            ))}
          </Box>

          <Box>
            <Box sx={{ background: theme.palette.background.paper, display: "flex", flexDirection: "column" }}>
              <Typography variant="body1" fontWeight={700} sx={{
                backgroundColor: theme.palette.primary.main,
                padding: 1,
                color: "white"
              }}>
                Settings
              </Typography>
              <Box sx={{
                display: "flex", flexDirection: "column",
                background: theme.palette.primary.dark,
                border: "1px solid", borderColor: theme.palette.divider
              }}>
                {settingsOptions.map((item) => (
                  <Box key={item.name}>
                    <ListItem disablePadding>
                      <ListItemButton component={Link} to={item.path}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText>{item.name}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default StudentDashboard;
