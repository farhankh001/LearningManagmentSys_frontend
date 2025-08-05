import { Box, Button, Chip, Typography, useTheme, alpha, CardMedia, LinearProgress, } from "@mui/material"
import { EnrollmentData, LessonStats } from "../../../app/api/studentDashApis"
import { FILEURLPRE } from "../../../components/other/Defaulturl"
import { AssignmentTwoTone, CheckCircleOutlineOutlined, Circle, LiveHelpTwoTone, MoreTimeOutlined, ScienceTwoTone, } from "@mui/icons-material"

import { Link } from "react-router-dom"
interface ApprovedCourseCardProps {
  enrollments: EnrollmentData[] | undefined
}
import {
  ScienceOutlined,
  AssignmentTurnedInOutlined,
  LiveHelpOutlined,

} from "@mui/icons-material";
import { JSX } from "react"
import LessonProgressCard from "./LessonProgressCard"

export const getLessonStatsAnalytics = (stats: LessonStats) => {
  const theme = useTheme();

  const makeStat = (
    title: string,
    icon: JSX.Element,
    total: number,
    completed: number,
    color: string
  ) => {
    const safeTotal = total > 0 ? total : 1; // avoid division by zero
    const percentage = Math.round((completed / safeTotal) * 100);

    return {
      title,
      icon,
      percentage,
      completed,
      total,
      color,
    };
  };

  return [
    makeStat(
      "Labs",
      <ScienceTwoTone sx={{ color: theme.palette.info.main, fontSize: { xs: 12, sm: 14, md: 22 } }} />,
      stats.totalLabs || 0,
      stats.submittedLabs || 0,
      theme.palette.primary.main
    ),
    makeStat(
      "Assignments",
      <AssignmentTwoTone sx={{ color: theme.palette.primary.main, fontSize: { xs: 12, sm: 14, md: 22 } }} />,
      stats.totalAssignments || 0,
      stats.submittedAssignments || 0,
      theme.palette.primary.main
    ),
    makeStat(
      "Quizes",
      <LiveHelpTwoTone sx={{ color: theme.palette.warning.main, fontSize: { xs: 12, sm: 14, md: 22 } }} />,
      stats.totalMCQs || 0,
      stats.submittedMCQs || 0,
      theme.palette.warning.main
    ),
  ];
};

export const limitWords = (str: string, limit: number) => {
  const words = str.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return str;
};

function ApprovedCoursesCards({ enrollments }: ApprovedCourseCardProps) {
  const theme = useTheme()

  if (enrollments?.length === 0) {
    return (
      <Box sx={{
        height: { xs: "30vh", sm: "35vh", md: "40vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 3, md: 4 },
        textAlign: "center"
      }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem", lg: "2.125rem" },
            lineHeight: { xs: 1.3, sm: 1.4 }
          }}
        >
          No Content To Show Yet Enroll in a Course
        </Typography>
      </Box>
    )
  }


  return (
    <Box sx={{
      width: "100%",
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        sm: "1fr",
        md: "1fr",
        lg: "1fr 1fr 1fr",

      },
      gap: { xs: 2, sm: 2, md: 2 },
      maxWidth: "100%",
      px: { xs: 1, sm: 2, md: 0 }
    }}>
      {enrollments &&
        enrollments.map((enrollment, index) => {
          const analytics = getLessonStatsAnalytics(enrollment.lessonStats);
          const totalAll = enrollment.lessonStats.totalLabs + enrollment.lessonStats.totalAssignments + enrollment.lessonStats.totalMCQs;
          const completedAll = enrollment.lessonStats.submittedLabs + enrollment.lessonStats.submittedAssignments + enrollment.lessonStats.submittedMCQs;
          const overallPercentage = Math.round((completedAll / (totalAll || 1)) * 100);
          return (
            <Box
              key={index}
              component={Link}
              to={`/get-single-course-by-enrolled-student/${enrollment.course.id}`}
              sx={{
                border: "1px solid",
                borderRadius: { xs: 3, sm: 4 },
                borderColor: theme.palette.divider,
                background: alpha(theme.palette.primary.dark, 0.75),
                display: "flex", justifyContent: "space-between", flexDirection: 'column',
                maxWidth: "100%",
                overflow: "hidden", textDecoration: "none"
              }}
            >
              <Box>
                <Box sx={{
                  display: "flex",

                  width: "100%",
                  flexDirection: { xs: "column", sm: "row" },
                  minHeight: { xs: "auto", sm: "150px" }
                }}>
                  <CardMedia
                    component={"img"}
                    src={`${FILEURLPRE}/${enrollment.course.thumbnail}`}
                    sx={{
                      objectFit: "cover",

                      borderRadius: { xs: 3, sm: 4 },

                      height: { xs: "120px", sm: "150px", md: "140px" },
                      width: "100%",
                      flexShrink: 0
                    }}
                  />

                </Box>
                {/* Title and metadata section */}
                <Box sx={{ mx: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Typography variant="caption" sx={{ background: alpha(theme.palette.primary.main, 0.4), color: theme.palette.text.primary, px: 1.5, py: 0.3, borderRadius: 2, fontSize: "0.6rem" }}>{enrollment.course.category}</Typography>
                  <Box sx={{ display: "flex", gap: 0.5, alignItems: "flex-start" }}>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: "0.65rem", fontWeight: 600 }}>Total lessons</Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.warning.light, fontWeight: 600 }}>{enrollment.lessonStats.totalLessons}</Typography>
                  </Box>
                </Box>
                <Box sx={{
                  display: "flex",
                  py: 1.5, px: 2.5, flexDirection: "column"
                }}>

                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{
                      fontSize: { xs: "0.9rem", sm: "1rem", md: "1rem" },
                      lineHeight: { xs: 1.3, sm: 1.4 },
                      wordBreak: "break-word",
                      hyphens: "auto", color: theme.palette.text.primary
                    }}
                  >
                    {limitWords(enrollment.course.title, 8)}
                  </Typography>

                </Box>
              </Box>

              <Box
                sx={{
                  mx: 2,
                  mt: 1,
                  mb: 3,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <LinearProgress
                  variant="determinate"
                  value={overallPercentage}
                  sx={{ flex: 1, color: theme.palette.info.light }} // or width: '100%'
                />
                <Typography variant="caption" sx={{ color: theme.palette.info.light }}>{overallPercentage}%</Typography>
              </Box>

            </Box>
          )
        })
      }
    </Box>
  )
}

export default ApprovedCoursesCards