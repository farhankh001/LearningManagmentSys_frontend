import { useSelector } from "react-redux";
import { Box, Typography, Avatar, Chip, useTheme, Button, CircularProgress, alpha, } from "@mui/material";
import { CheckCircle, Cancel, AccountCircle, Group, MenuBook, AttachMoney, Stars, BadgeOutlined, EmailOutlined, Circle, AutoStoriesTwoTone, AddCircleOutlineTwoTone, Api, People, PeopleOutline, PeopleTwoTone, PeopleOutlineOutlined, HowToRegOutlined, Pending, PersonAddAlt1Outlined, Forward, ForwardOutlined, LiveTvTwoTone, MilitaryTechTwoTone, TrendingDownOutlined, TrendingUpOutlined } from '@mui/icons-material';
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";
import { useCheckTeacherApprovalStatusQuery, useFetchAllCreatedCoursesByTeacherQuery } from "../../app/api/teacherDashApis";

import { MRT_ColumnDef } from "material-react-table";
import { FILEURLPRE } from "../../components/other/Defaulturl";
import ReusableTable from "../../components/Table/CourseTable";

import DailyEnrollmentChart from "./Charts/TendLineChart";

export interface CourseTeacherDashType {
  id: string,
  title: string,
  activationStatus: string,
  createdAt: string,
  totalEnrollments: number,
  totalAcceptedEnrollments: number,
  totalPendingEnrollments: number,
  totalRejectedEnrollments: number
}

const courseTeacherDashColumns: MRT_ColumnDef<CourseTeacherDashType>[] = [
  {
    header: 'Created At',
    accessorKey: 'createdAt',
    Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(),
    size: 140
  },
  {
    header: 'Title',
    accessorKey: 'title',
    enableGlobalFilter: true,
    size: 270
  },

  {
    header: 'Activation Status',
    accessorKey: 'activationStatus',
    size: 140,
    Cell: ({ cell }) => (
      <Chip
        label={cell.getValue<string>()}
        icon={cell.getValue<string>() === 'Active'
          ? <CheckCircle sx={{
            fontSize: 7,
            color: "#33D375",
            boxShadow: `0 0 6px 2px "#33D375"`,
            borderRadius: '50%',
            background: "#33D375"
          }} />
          : cell.getValue<string>() === 'Inactive'
            ? <Cancel sx={{
              fontSize: 7,
              color: "#d33333ff",
              boxShadow: `0 0 6px 2px "#d33333ff"`,
              borderRadius: '50%',
              background: "#d33333ff"
            }} />
            : <Api sx={{
              fontSize: 7,
              color: "#3353d3ff",
              boxShadow: `0 0 6px 2px "#3353d3ff"`,
              borderRadius: '50%',
              background: "#3353d3ff"
            }} />}
        color={
          cell.getValue<string>() === 'Active'
            ? 'success'
            : cell.getValue<string>() === 'Inactive'
              ? 'warning'
              : 'default'
        }
        sx={{ px: 0.5, background: alpha("#33D375", 0.6), border: "1px solid", borderColor: alpha("#33D375", 0.6) }}
        variant="filled"
        size="small"

      />
    ),
  },
  {
    header: 'Total Enrollemnts',
    accessorKey: 'totalEnrollments',
    size: 120,
    Cell: ({ cell }) => {
      const value = cell.getValue<number>()
      return <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <PeopleOutlineOutlined sx={{ color: "primary.main", fontSize: 21 }} />
        <Typography fontWeight={900} sx={{ color: "primary.main" }}>{value}</Typography>

      </Box>
    }
  },

  {
    header: 'Accepted',
    accessorKey: 'totalAcceptedEnrollments',
    size: 120,
    Cell: ({ cell }) => {
      const value = cell.getValue<number>()
      return <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <HowToRegOutlined sx={{ color: "success.light", fontSize: 21 }} />
        <Typography fontWeight={600} sx={{ color: "success.light" }}>{value}</Typography>

      </Box>
    }
  },
  {
    header: 'Pending',
    accessorKey: 'totalPendingEnrollments',
    size: 120,
    Cell: ({ cell }) => {
      const value = cell.getValue<number>()
      return <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <PersonAddAlt1Outlined sx={{ color: "warning.light", fontSize: 21 }} />
        <Typography fontWeight={600} sx={{ color: "warning.light" }}>{value}</Typography>

      </Box>
    }
  },


  {
    header: 'Manage Course',
    accessorKey: 'id',
    Cell: ({ cell }) => {
      const courseId = cell.row.original.id;
      return (
        <Button
          endIcon={<Forward />}
          component={Link}
          to={`/course-settings/${courseId}`}
          variant="outlined"
          size="small"
        >
          Settings
        </Button>
      );
    },
  }

];

export const PersonalDetails = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => {
  const theme = useTheme()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0 }}>
      <Typography
        variant="caption"
        sx={{
          color: theme.palette.text.primary,
          display: 'flex',
          alignItems: 'center',
          gap: 1,

          flexWrap: 'wrap'
        }}
      >
        {icon}<span>{label}</span>
      </Typography>
      <Typography
        variant='body2'
        fontWeight={100}
        sx={{
          wordBreak: 'break-word',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {value}
      </Typography>
    </Box>
  )
}

function TeacherDashboard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const theme = useTheme()
  const { data: teacherDashData, isError: isErrorAllCoursesFetch, isLoading: isFetchingAllCoursesFetch, error: errorAllCoursesFetch } = useFetchAllCreatedCoursesByTeacherQuery(null)
  const { data: teacherApprovalStatus, isError: approvalIsError, isLoading: approvalLoading, error: approvalError } = useCheckTeacherApprovalStatusQuery()

  if (isFetchingAllCoursesFetch || approvalLoading) {
    return (
      <Box sx={{
        width: "100%",
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <CircularProgress />
      </Box>
    );
  }

  const isAnyError = isErrorAllCoursesFetch || approvalIsError

  const errorMessage =
    (errorAllCoursesFetch && "data" in errorAllCoursesFetch && (errorAllCoursesFetch.data as any).error) ||
    (approvalError && "data" in approvalError && (approvalError.data as any).error)

  if (teacherApprovalStatus?.status === "Pending") {
    return (
      <Box sx={{
        width: "100%",
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        justifyContent: "center",
        alignItems: "center",
        px: 2
      }}>
        <Box sx={{
          width: { xs: "95%", sm: "80%", md: "60%", lg: "50%" },
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          gap: 3
        }}>
          <Typography variant="h5" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
            You are not approved teacher yet. Your request is pending
          </Typography>
          <Chip color="warning" label="Pending" variant="outlined" size="medium" />
        </Box>
      </Box>
    )
  }

  if (isAnyError) {
    return (
      <Box sx={{ p: { xs: 2, sm: 4 }, textAlign: 'center' }}>
        <Typography variant="h5" color="error" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
          Something went wrong while loading the dashboard.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {typeof errorMessage === 'string' ? errorMessage : 'Unknown error occurred.'}
        </Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
          Please login to view dashboard
        </Typography>
      </Box>
    );
  }

  if (teacherApprovalStatus?.status === "pending") {
    return (
      <Box sx={{
        width: "100%",
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        justifyContent: "center",
        alignItems: "center",
        px: 2
      }}>
        <Box sx={{
          width: { xs: "95%", sm: "80%", md: "60%", lg: "50%" },
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          gap: 3
        }}>
          <Typography variant="h5" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
            You are not approved teacher yet. Your request is pending
          </Typography>
          <Chip color="warning" label="Pending" variant="outlined" size="medium" />
        </Box>
      </Box>
    )
  }

  if (teacherApprovalStatus?.status === "Rejected") {
    return (
      <Box sx={{
        width: "100%",
        height: "70vh",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: { xs: 2, sm: 4 }
      }}>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}>
          Your Request was rejected. Stay around admin may change his mind in future.
        </Typography>
        <Chip color="error" label="Rejected" variant="outlined" size="medium" />
      </Box>
    )
  }

  if (user.role !== "Teacher" || teacherApprovalStatus?.status !== "Approved") {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error" sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
          You are not authorized to access this page.
        </Typography>
      </Box>
    );
  }

  const { name, profile_picture, role, email } = user;
  const analytics = [
    {
      title: "Total Courses",
      icon: <LiveTvTwoTone sx={{ color: "primary.main" }} />,
      desc: "Total courses created by current teacher",
      value: teacherDashData?.totalCourses,
      color: theme.palette.primary.main
    },
    {
      title: "Approved Enrollments",
      icon: <HowToRegOutlined sx={{ color: "success.light" }} />,
      desc: "Total approved across all courses",
      value: teacherDashData?.totalApprovedEnrollments,
      color: theme.palette.success.light
    },
    {
      title: "Pending enrollments",
      icon: <PersonAddAlt1Outlined sx={{ color: "warning.light" }} />,
      desc: "Across all courses pending requests.",
      value: teacherDashData?.totalPendingEnrollments,
      color: theme.palette.warning.light
    },
    {
      title: "Most popular course",
      icon: <TrendingUpOutlined sx={{ color: "success.light" }} />,
      desc: `${teacherDashData?.mostPopularCourse?.title}`,
      value: teacherDashData?.mostPopularCourse?.totalEnrollments,
      color: theme.palette.success.light
    },
    // {
    //   title: "Least popular course",
    //   icon: <TrendingDownOutlined sx={{ color: "error.main" }} />,
    //   desc: `${teacherDashData?.mostUnpopularCourse?.title}`,
    //   value: teacherDashData?.mostUnpopularCourse?.totalEnrollments,
    //   color: theme.palette.error.light
    // },
  ];

  return (
    <Box sx={{
      width: "100%",
      padding: { xs: 1, sm: 2 },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Box sx={{ width: { xs: "100%", sm: "95%", md: "90%" } }}>

        {/* Profile and Header Section */}
        <Box sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: { xs: "center", lg: "flex-start" },
          gap: 2,
          mb: 3
        }}>

          {/* Profile Card */}
          <Box sx={{
            width: { xs: "100%", sm: "80%", md: "60%", lg: "25%" },
            display: "flex",
            flexDirection: "column",
            gap: 1,
            background: alpha(theme.palette.primary.dark, 0.6),
            border: "1px solid",
            borderColor: theme.palette.divider,
            p: 2,
            borderRadius: 4,
            alignItems: "center"
          }}>
            <Avatar
              src={`${FILEURLPRE}/${profile_picture}`}
              sx={{
                width: { xs: "80px", sm: "100px" },
                height: { xs: "80px", sm: "100px" },
                border: "1px solid",
                borderColor: theme.palette.divider
              }}
            />
            <Typography variant="body1" fontWeight={600} sx={{ textAlign: "center" }}>
              {name}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
              <Chip
                icon={teacherApprovalStatus ? <CheckCircle /> : <Cancel />}
                label={teacherApprovalStatus ? "Verified" : "Not Verified"}
                color={teacherApprovalStatus ? "success" : "error"}
                size="small"
              />
              <Chip
                icon={<AccountCircle />}
                label={role}
                color="primary"
                size="small"
              />
            </Box>
          </Box>

          {/* Main Header Card */}
          <Box sx={{
            width: { xs: "100%", lg: "75%" },
            display: "flex",
            flexDirection: "column",
            gap: 2,
            background: "linear-gradient(135deg,rgb(107, 91, 255) 0%,rgb(95, 68, 128) 100%)",
            border: "1px solid",
            borderColor: theme.palette.divider,
            p: { xs: 2, sm: 3 },
            borderRadius: 4
          }}>
            <Box sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: { xs: "flex-start", sm: "space-between" }
            }}>
              <Typography
                variant="h5"
                fontWeight={600}
                sx={{
                  fontSize: { xs: '1.2rem', sm: '1.5rem' },
                  textAlign: { xs: "center", sm: "left" },
                  width: { xs: "100%", sm: "auto" }
                }}
              >
                Teacher Course Management Portal
              </Typography>
              <Button
                startIcon={<AddCircleOutlineTwoTone sx={{
                  fontSize: 10,
                  color: theme.palette.text.primary,
                  borderRadius: '50%',
                }} />}
                sx={{
                  px: 2,
                  py: 1,
                  fontWeight: 500,
                  boxShadow: `0 0 3px 0px ${theme.palette.success.light}`,
                  textTransform: 'none',
                  background: alpha(theme.palette.success.light, 0.6),
                  border: '1px solid',
                  borderRadius: 6,
                  borderColor: theme.palette.divider,
                  color: theme.palette.text.primary,
                  width: { xs: "100%", sm: "auto" }
                }}
                component={Link}
                to={"/create-new-course"}
                size="small"
              >
                Create new course
              </Button>
            </Box>

            {/* Personal Details Grid */}
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
                xl: 'repeat(5, 1fr)'
              },
              gap: { xs: 2, sm: 3 },
              p: { xs: 1, sm: 2 },
              borderRadius: 4
            }}>
              <PersonalDetails
                label='Email'
                value={email}
                icon={<EmailOutlined sx={{ fontSize: 17 }} />}
              />
              <PersonalDetails
                label='Qualifications'
                value={teacherDashData?.teacherQualifications ?? ""}
                icon={<BadgeOutlined sx={{ fontSize: 17 }} />}
              />
              {teacherDashData?.teacherExpertise.map((e, index) => (
                <PersonalDetails
                  key={index}
                  label='Expertise'
                  value={e.category.title ?? ""}
                  icon={<BadgeOutlined sx={{ fontSize: 17 }} />}
                />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Analytics Cards */}
        <Box sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)"
          },
          gap: { xs: 2, sm: 3 },
          mt: 3
        }}>
          {analytics.map((stat, index) => (
            <Box
              key={index}
              sx={{
                border: "1px solid",
                borderColor: alpha(stat.color, 0.2),
                p: { xs: 1.5, sm: 2 },
                background: alpha(stat.color, 0.25),
                borderRadius: 4,
                display: "flex",
                gap: 1,
                justifyContent: "space-between",
                alignItems: "center",
                minHeight: { xs: "auto", sm: "120px" }
              }}
            >
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}>
                  <Circle sx={{
                    fontSize: 10,
                    color: `${stat.color}`,
                    boxShadow: `0 0 6px 2px ${stat.color}`,
                    borderRadius: '50%',
                    background: stat.color
                  }} />
                  <span>{stat.title}</span>
                </Typography>
                <Typography
                  fontWeight={100}
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    display: 'block',
                    mt: 0.5,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                >
                  {stat.desc}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{
                    display: 'flex',
                    alignItems: "center",
                    gap: 1,
                    mt: 1,
                    fontSize: { xs: '1rem', sm: '1.25rem' }
                  }}
                >
                  <Box component={"span"}>{stat.value}</Box>
                  {stat.icon}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Enrollment Chart */}
        <Box sx={{
          mt: 4,
          mb: 4,
          border: '2px solid',
          borderColor: theme.palette.divider,
          p: { xs: 1, sm: 2 },
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}>
          <Typography sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}>
            <Circle sx={{
              fontSize: 10,
              color: theme.palette.primary.main,
              boxShadow: `0 0 6px 2px ${theme.palette.primary.main}`,
              borderRadius: '50%',
              background: theme.palette.primary.main
            }} />
            <span>Enrollment trend across all courses</span>
          </Typography>
          <Box sx={{ width: "100%" }}>
            <DailyEnrollmentChart
              data={teacherDashData?.dailyEnrollmentsTrend ?? []}
              title="Enrollment trend"
            />
          </Box>
        </Box>

        {/* Course Table */}
        <Box sx={{ mt: 4, mb: 4, overflowX: "auto" }}>
          <ReusableTable<CourseTeacherDashType>
            columns={courseTeacherDashColumns}
            data={teacherDashData?.courses ?? []}
            title="Course history"
            label="View your courses"
          />
        </Box>

      </Box>
    </Box>
  );
}

export default TeacherDashboard;