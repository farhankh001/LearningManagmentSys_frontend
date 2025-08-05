import { Box, Typography, Chip, useTheme, Rating, CardMedia, Button, alpha, CircularProgress } from "@mui/material";
import { CheckCircle, Cancel, UpdateSharp, Forward, AddCircleOutlineOutlined, Send, People, Settings } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { EnrolledStudent, LessonWithFlags, useGetSingleCourseByTeacherQuery } from '../../app/api/createCourseApi';
import ReusableTable from "../../components/Table/CourseTable";
import { MRT_ColumnDef } from "material-react-table";
import toast from "react-hot-toast";

import { FILEURLPRE } from "../../components/other/Defaulturl";

import { useEffect } from "react";

import 'react-calendar-heatmap/dist/styles.css';
import EnrollmentTrendHeatmap from "../dashboards/Charts/Heatmap";
import { FaUser } from "react-icons/fa";
import { useApproveEnrollmentMutation } from "../../app/api/teacherDashApis";

const coourseSettings: MRT_ColumnDef<LessonWithFlags>[] = [
  {
    header: 'Created At',
    accessorKey: 'createdAt',
    Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(),
  },
  {
    header: 'Lesson title',
    accessorKey: 'title',
    size: 250,
  },
  {
    header: 'Has Mcq Quiz',
    accessorKey: 'has_mcq_quiz',
    size: 150,
    Cell: ({ cell }) => {
      const value = cell.getValue<boolean>()
      return <Chip
        label={value === true ? "Has Quiz" : "No quiz"}
        color={
          cell.getValue<boolean>() === true
            ? 'success'
            : cell.getValue<boolean>() === false
              ? 'warning'
              : 'default'
        }
        variant="filled"
        size="small"
        sx={{
          px: { xs: 0.5, sm: 1.5 },
          color: "text.primary",
          fontSize: { xs: '0.7rem', sm: '0.8rem' }
        }}
      />
    },
  },
  {
    header: 'Has Lab',
    accessorKey: 'has_lab',
    size: 160,
    Cell: ({ cell }) => {
      const value = cell.getValue<boolean>()
      return <Chip
        label={value === true ? "Has Lab" : "No Lab"}
        color={
          cell.getValue<boolean>() === true
            ? 'success'
            : cell.getValue<boolean>() === false
              ? 'error'
              : 'default'
        }
        sx={{
          px: { xs: 0.5, sm: 1.5 },
          fontSize: { xs: '0.7rem', sm: '0.8rem' }
        }}
        variant="filled"
        size="small"
      />
    },
  },
  {
    header: 'Has Assignment',
    accessorKey: 'has_assignment',
    size: 160,
    Cell: ({ cell }) => {
      const value = cell.getValue<boolean>()
      return <Chip
        label={value === true ? "Has Assignment" : "No Assignment"}
        color={
          cell.getValue<boolean>() === true
            ? 'success'
            : cell.getValue<boolean>() === false
              ? 'error'
              : 'default'
        }

        variant="filled"
        size="small"
        sx={{
          p: { xs: 0.2, sm: 0.5 },
          fontSize: { xs: '0.7rem', sm: '0.8rem' }, color: "text.primary"
        }}
      />
    },
  },
  {
    header: 'Settings',
    accessorKey: 'id',

    Cell: ({ cell }) => {
      const lessonId = cell.getValue();
      return (
        <Button
          component={Link}
          to={`/lesson-settings/${lessonId}`}
          variant="contained"
          startIcon={<Settings sx={{ fontSize: '14px !important' }} />}
          sx={{

            borderRadius: 3,
            background: "primary.main",
            fontSize: "0.75rem",
            fontWeight: 500,


          }}
        >
          Settings
        </Button>
      );
    },
  }
];

const enrolledStdTeacherDashColumns: MRT_ColumnDef<EnrolledStudent>[] = [
  {
    header: 'Enrollment Date',
    accessorKey: 'enrollmentDate',
    Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(),
  },
  {
    header: 'Std Name',
    accessorKey: 'name',
    size: 180,
  },
  {
    header: 'Std Email',
    accessorKey: 'email',
    size: 180,
  },
  {
    header: 'Enrollment Status',
    accessorKey: 'enrollmentStatus',

    Cell: ({ cell }) => (
      <Chip
        label={cell.getValue<string>()}
        color={
          cell.getValue<string>() === 'Inprogress'
            ? 'success'
            : cell.getValue<string>() === 'Failed'
              ? 'warning'
              : 'default'
        }

        variant="filled"
        size="small"
      />
    ),
  },

  {
    header: 'Approval Status',
    accessorKey: 'enrollmentApprovalStatus',

  },
  {
    header: 'View Profile',
    accessorKey: 'enrollmentId',

    Cell: ({ cell }) => {
      const enrollmentId = cell.getValue();
      return (
        <Button
          component={Link}
          to={`/handle-enrollment-approval/${enrollmentId}`}
          startIcon={<Settings sx={{ fontSize: '14px !important' }} />}
          variant="contained"
          sx={{

            borderRadius: 3,
            background: "primary.main",
            fontSize: "0.75rem",
            fontWeight: 500,


          }}
        >
          Progress
        </Button>
      );
    },
  }
];




function CourseSettings() {
  const { courseId } = useParams()
  const settingsOptions = [
    {
      name: "Create new lesson",
      path: `/create-new-lesson/${courseId}`,
      icon: <AddCircleOutlineOutlined sx={{ fontSize: '16px !important' }} />
    },
    {
      name: "Edit this course",
      path: `/edit-course/${courseId}`,
      icon: <UpdateSharp sx={{ fontSize: '16px !important' }} />
    },
  ]

  const { data: courseDataForTeacher, error, isError, isLoading } = useGetSingleCourseByTeacherQuery({ courseId })

  const theme = useTheme()
  const [approveEnrollment, { isError: approveStudentIsError, error: approveStudentError, isSuccess: approveStudentSuccess }] = useApproveEnrollmentMutation()
  useEffect(() => {
    if (approveStudentSuccess) {
      setTimeout(() => {
        toast.success("Approved Successfully.")

      }, 1000);
    }
  }, [approveStudentSuccess]);
  useEffect(() => {
    if (approveStudentIsError && approveStudentError && "data" in approveStudentError) {
      toast.error(`${JSON.stringify((approveStudentError.data as any).error)}`)
    }
  }, [approveStudentIsError, approveStudentError])
  useEffect(() => {
    if (isError && error && 'data' in error) {
      console.log(error)
      toast.error(`${JSON.stringify((error.data as any).error)}`)
    }
  }, [error, isError])


  const handleEnrollment = async (enrollmentId: string) => {
    try {
      approveEnrollment({ enrollmentId })
    } catch (error) {
      console.log(error)
    }
  }

  if (!courseId) {
    toast.error("NO course Id was provided")
  }
  const enrolledStdTeacherDashColumnsPending: MRT_ColumnDef<EnrolledStudent>[] = [
    {
      header: 'Enrollment Date',
      accessorKey: 'enrollmentDate',
      Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(),
    },
    {
      header: 'Std Name',
      accessorKey: 'name',

    },
    {
      header: 'Std Email',
      accessorKey: 'email',
      size: 190
    },


    {
      header: 'Approval Status',
      accessorKey: 'enrollmentApprovalStatus',


    },
    {
      header: 'View Profile',
      id: 'view-profile',
      accessorKey: 'enrollmentId',

      Cell: ({ cell }) => {
        const enrollmentId = cell.getValue();
        return (
          <Button
            component={Link}
            to={`/handle-enrollment-approval/${enrollmentId}`}
            variant="contained"
            startIcon={<People sx={{ fontSize: '14px !important' }} />}
            sx={{

              borderRadius: 3,
              background: theme.palette.primary.main,
              fontSize: "0.75rem",
              fontWeight: 500,


            }}
          >
            View Profile
          </Button>
        );
      },
    },
    {
      header: 'Handle Request',
      accessorKey: 'enrollmentId',
      id: 'handle-request',
      Cell: ({ cell }) => {
        const enrollmentId = cell.getValue<string>();
        return (
          <Button
            onClick={() => handleEnrollment(enrollmentId)}
            variant="contained"
            endIcon={<Send sx={{ fontSize: '14px !important' }} />}
            sx={{

              borderRadius: 3,
              background: `linear-gradient(135deg, 
                                   ${theme.palette.success.main} 0%, 
                                   ${theme.palette.success.dark} 100%)`,
              fontSize: "0.75rem",
              fontWeight: 500,


            }}
          >
            Approve
          </Button>
        );
      },
    }
  ];

  if (isLoading) {
    return <Box sx={{ width: "100%", height: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  }
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      px: { xs: 1, sm: 2, md: 3 },
      py: { xs: 2, sm: 1 }
    }}>
      {/* Header Section */}
      <Box sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "flex-start" },
        justifyContent: "center",
        gap: { xs: 2, md: 3 },
        mt: 0
      }}>
        {/* Course Image */}
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          background: theme.palette.background.paper,
          width: { xs: "100%", sm: "80%", md: "60%" },
          boxShadow: `-1.5px 4px 2px rgba(0, 0, 0, 0.39)`,
          borderRadius: 4
        }}>
          <CardMedia
            component={"img"}
            src={`${FILEURLPRE}/${courseDataForTeacher?.courseDetails.course_thumbnail}`}
            sx={{
              height: { xs: 180, sm: 220, md: 230 },
              borderRadius: 4,
              width: "100%",
              objectFit: "cover"
            }}
          />
        </Box>

        {/* Course Info */}
        <Box sx={{
          width: { xs: "100%", sm: "80%", md: "40%" },
          background: alpha(theme.palette.background.paper, 0.4),
          border: "1px solid",
          borderColor: theme.palette.divider,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, sm: 3 },
          borderRadius: 4,
          height: { xs: "auto", md: 230 },
          gap: 2,
          textShadow: `0 0 16px ${theme.palette.warning.light}`,
        }}>
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '1rem', sm: '1.3rem' }
            }}
            fontWeight={600}
          >
            {courseDataForTeacher?.courseDetails.title}
          </Typography>

          <Chip
            icon={courseDataForTeacher?.courseDetails.activationStatus ? <CheckCircle /> : <Cancel />}
            label={courseDataForTeacher?.courseDetails.activationStatus}
            color={courseDataForTeacher?.courseDetails.activationStatus === "Active" ? "success" : "error"}
            size="small"
          />

          <Box sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 1, sm: 2 },
            alignItems: "center", justifyContent: "center",
            width: "100%"
          }}>
            {settingsOptions.map((setting, index) => {
              return (
                <Button
                  key={index}
                  component={Link}
                  to={setting.path}
                  startIcon={setting.icon}
                  sx={{
                    px: { xs: 1.5, sm: 2 },

                    fontWeight: 300,
                    textTransform: 'none',
                    background: theme.palette.text.primary,
                    border: '1px solid',
                    borderRadius: 4,
                    borderColor: theme.palette.divider,
                    color: theme.palette.background.default,
                    width: { xs: "100%", sm: "auto" },
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },

                  }}
                >
                  {setting.name}
                </Button>
              )
            })}
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: "330px", width: "100%", border: "1px solid", borderColor: theme.palette.divider, p: 2, borderRadius: 4, mt: 3, background: alpha(theme.palette.background.paper, 0.4), }}>
        <EnrollmentTrendHeatmap courseData={courseDataForTeacher} />
      </Box>
      {/* Lesson Details Table */}
      <Box sx={{
        width: '100%',
        mt: { xs: 2, sm: 3 },
        mb: 3,
        display: "flex",
        flexDirection: "column"
      }}>
        <Box >
          <ReusableTable<LessonWithFlags>
            columns={coourseSettings}
            data={courseDataForTeacher?.courseDetails.lessons ?? []}
            title="Lesson Details"
            label="To Add Labs and Quizes click Settings"
          />
        </Box>
      </Box>

      {/* Enrolled Students Section */}
      <Typography
        variant="h5"
        fontWeight={600}
        sx={{
          fontStyle: "italic",
          mt: { xs: 2, sm: 5 },
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          textAlign: "center",
          px: { xs: 2, sm: 0 }
        }}
      >
        Enrolled Students In this Course
      </Typography>

      <Box sx={{
        mt: { xs: 2, sm: 3 },
        mb: { xs: 5, sm: 7 },
        width: "100%"
      }}>
        {/* Pending Enrollments */}
        <ReusableTable<EnrolledStudent>
          columns={enrolledStdTeacherDashColumnsPending}
          data={courseDataForTeacher?.courseDetails.pendingStudents ?? []}
          title="Pending Enrollments"
        />

        {/* Approved Enrollments */}
        <Box sx={{ marginTop: { xs: 3, sm: 5 } }}>
          <ReusableTable<EnrolledStudent>
            columns={enrolledStdTeacherDashColumns}
            data={courseDataForTeacher?.courseDetails.approvedStudents ?? []}
            title="Approved Enrollments"
          />
        </Box>
      </Box>
    </Box >
  )
}

export default CourseSettings