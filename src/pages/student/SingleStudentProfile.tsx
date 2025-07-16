import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApproveEnrollmentMutation, useGetSingleStudentByEnrollmentIdQuery, useRejectEnrollmentMutation } from '../../app/api/teacherDashApis'
import { Box, Typography, Chip, CircularProgress, Button, Card, CardMedia, useTheme } from '@mui/material'
import { FaGraduationCap, } from 'react-icons/fa'
import { ArtTrack, Quiz, Insights, SupportAgent } from '@mui/icons-material'

import toast from 'react-hot-toast'


const instructions = [
  { icon: ArtTrack, text: 'Full access to create  courses' },
  { icon: Quiz, text: 'Access to create quizzes and assessments' },
  { icon: Insights, text: 'Track progress and achievements' },
  { icon: SupportAgent, text: 'Access to mark quiz.' },
  { icon: Insights, text: 'Access to view students enrolled in courses' },

];



function SingleStudentPending() {
  const { enrollmentId } = useParams()
  console.log(enrollmentId)
  const navigate = useNavigate()
  const { data: StudentData, isLoading: isLoadingStudentData, isError: isStudentDataError, } = useGetSingleStudentByEnrollmentIdQuery({ enrollmentId })
  const [rejectEnrollment, { isError: rejectStudentIsError, error: rejectStudentError, isSuccess: rejectStudentIsuccess }] = useRejectEnrollmentMutation()
  const [approveEnrollment, { isError: approveStudentIsError, error: approveStudentError, isSuccess: approveStudentSuccess }] = useApproveEnrollmentMutation()
  const theme = useTheme()
  useEffect(() => {
    if (approveStudentSuccess) {
      setTimeout(() => {
        toast.success("Approved Successfully.")
        navigate('/teacher-dash');
      }, 1000);
    }
  }, [approveStudentSuccess, navigate]);
  useEffect(() => {
    if (rejectStudentIsuccess) {
      setTimeout(() => {
        toast.success("Request Rejected Successfully.")
        navigate('/admin-dash');
      }, 1000);
    }
  }, [rejectStudentIsuccess, navigate]);
  useEffect(() => {
    if (approveStudentIsError && approveStudentError && "data" in approveStudentError) {
      toast.error(`${JSON.stringify((approveStudentError.data as any).error)}`)
    }
  }, [approveStudentIsError, approveStudentError])

  // Show error if rejecting teacher failed
  useEffect(() => {
    if (rejectStudentIsError && rejectStudentError && "data" in rejectStudentError) {
      toast.error(`${JSON.stringify((rejectStudentError.data as any).error)}`)
    }
  }, [rejectStudentIsError, rejectStudentError])
  const approveHandle = async () => {
    try {
      approveEnrollment({ enrollmentId })
    } catch (error) {
      console.log(error)
    }
  }
  const rejectHandle = async () => {
    try {
      rejectEnrollment({ enrollmentId })
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoadingStudentData) {
    return (
      <Box sx={{ width: "100%", height: "70vh", alignItems: "center", justifyContent: "center" }}><CircularProgress /></Box>
    )
  }

  if (isStudentDataError || !StudentData) {
    console.log(isStudentDataError)
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6" color="error">Failed to load student data.</Typography>
      </Box>
    )
  }

  return (<Box sx={{ width: "90%", display: "flex", height: "70vh", alignItems: "center", justifyContent: "center", flexDirection: "row", }}>
    <Box>
      {instructions.map((benefit, index) => {
        const Icon = benefit.icon;
        return (
          <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Icon color="primary" />
            <Typography variant="body1" fontWeight={500}>
              {benefit.text}
            </Typography>
          </Box>
        );
      })}
    </Box>
    <Card
      sx={{
        width: 290,
        height: 370,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow: `-1.5px 4px 2px ${theme.palette.secondary.light}`,
        margin: 2,
        backgroundColor: theme.palette.background.paper,
        // border: `1px solid`,


      }}
    >

      <Box sx={{ position: 'relative', boxShadow: `0 1.5px 4px ${theme.palette.secondary.dark}` }}>
        <CardMedia
          component="img"
          src={"/images/avatars/2.jpg"}  //teacherData.user.profile_picture?teacherData.user.profile_picture: "/images/avatars/4.jpg"  -->do this on server
          alt={StudentData.user.name}
          sx={{
            height: 150,
            objectFit: 'cover',

          }}
        />

      </Box>


      {/* Card Content */}
      <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: '1rem',
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 0.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          Name:  {StudentData.user.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.primary,
            opacity: 0.75,
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          Education Level: {StudentData.education_level}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.primary,
            opacity: 0.75,
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          Email: {StudentData.user.email}
        </Typography>

        {/* button info */}
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 3 }}>
          <Button variant='outlined' sx={{ color: theme.palette.text.primary }} onClick={approveHandle}>Approve</Button>
          <Button variant='outlined' sx={{ color: theme.palette.text.primary }} onClick={rejectHandle}>Reject</Button>
        </Box>

        {/* Footer row */}
        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: theme.palette.text.primary, }}>
            <FaGraduationCap size={20} color={theme.palette.text.primary} />
            <Typography variant="caption" sx={{ color: theme.palette.text.primary }}>{StudentData.enrollmentStatus}</Typography>
          </Box>

          <Chip
            label={StudentData.interests[0]}
            size="small"
            sx={{
              backgroundColor: '#E5E7EB',
              fontSize: '0.8rem',
              height: '22px',
              borderRadius: '12px',
              fontWeight: 600,
              color: "black"
            }}
          />
        </Box>
      </Box>
    </Card>
  </Box>
  )
}

export default SingleStudentPending
