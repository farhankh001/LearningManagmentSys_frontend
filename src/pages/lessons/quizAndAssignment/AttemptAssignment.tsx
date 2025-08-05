import {
  alpha,
  Box,
  CircularProgress,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useGetAssignmentForStudentQuery } from '../../../app/api/lessonApi'
import AssignmentSubmissionFormProvider from '../../../components/Forms/FormProviders/AssignmentSubmissionProvider'
import { StudyTimeTracker } from '../../dashboards/TimeTracker/StudyTimeTracker'
import { Circle } from '@mui/icons-material'

function AttemptAssignment() {
  const { lessonId } = useParams()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const {
    data: assignmentIncomingData,
    isLoading: assignmentIncomingLoading,
  } = useGetAssignmentForStudentQuery({ lessonId })

  if (assignmentIncomingLoading) {
    return (
      <Box
        sx={{
          width: '100%',

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: "100%", mb: 10
      }}
    >
      {assignmentIncomingData?.courseId && <StudyTimeTracker courseId={assignmentIncomingData?.courseId} />}
      <Typography variant="body2" fontWeight={550} sx={{ color: theme.palette.text.secondary, mb: 2, mt: 3, ml: 2 }}>{`Dashboard / Course / Lesson / Attempt Assignment`}</Typography>

      <Box
        sx={{
          width: "90%",
          display: 'flex',
          flexDirection: 'column',
          mx: 2, my: 2,
          gap: 2,
        }}
      >

        {/* Title */}
        <Box sx={{ ml: 2 }}>
          <Box sx={{ display: "flex", mb: 1 }}>  <Typography variant="caption" fontWeight={500} sx={{
            background: alpha(theme.palette.primary.main, 0.3), color: theme.palette.text.secondary, px: 1.5, py: 0.4, borderRadius: 2.5, fontSize: "0.67rem", display: "flex", gap: 1.5, alignItems: "center"
          }}><Circle sx={{
            fontSize: 6,
            color: theme.palette.primary.main,
            boxShadow: `0 0 6px 2px ${theme.palette.primary.main}`,
            borderRadius: '50%',
            background: theme.palette.primary.main
          }} /> <span>{assignmentIncomingData?.activationStatus}</span></Typography></Box>
          <Typography
            variant="body1"
            fontWeight={500}
            sx={{
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.2rem' },
              textShadow: `0 0 12px ${theme.palette.warning.light}`,
              wordBreak: "break-word"
            }}
          >
            {assignmentIncomingData?.title}
          </Typography>

        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 2, ml: 2,
            alignItems: "center"
          }}
        > <Typography
          variant="caption"
          sx={{
            px: 2,
            py: 0.5,
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.error.main, 0.2),
            border: `1px solid  ${alpha(theme.palette.error.main, 0.4)}`,
            fontWeight: 600,

            textAlign: 'center',
          }}
        >
            Time Limit: {assignmentIncomingData?.timeLimit} mins
          </Typography>
          <Typography
            variant="caption"
            sx={{
              px: 2,
              py: 0.5,
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            Total Score: {assignmentIncomingData?.totalScore}
          </Typography>



          <Typography
            variant="caption"
            sx={{
              px: 2,
              py: 0.5,
              borderRadius: 2,
              backgroundColor: alpha(theme.palette.success.main, 0.2),
              border: `1px solid  ${alpha(theme.palette.success.main, 0.4)}`,
              fontWeight: 600,

              textAlign: 'center',
            }}
          >
            Passing Score: {assignmentIncomingData?.passingScore}
          </Typography>
        </Box>

        {/* Instructions */}
        <Box sx={{ ml: 2 }}>
          <Typography
            variant="caption"
            sx={{ color: theme.palette.text.secondary }}
          >
            INSTRUCTIONS
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {assignmentIncomingData?.description}
          </Typography>
        </Box>

        {/* Metadata */}



        {/* Questions */}
        <Box sx={{ ml: 2 }}>
          <Typography
            variant="caption"
            sx={{ color: theme.palette.text.secondary }}
          >
            QUESTIONS
          </Typography>
          <Box
            sx={{
              mt: 1,
              color: theme.palette.text.primary,
              fontSize: '1rem',
              '& img': {
                maxWidth: '100%',
              },
              '& p': {
                marginBottom: '0.5rem',
              },
            }}
            dangerouslySetInnerHTML={{
              __html: assignmentIncomingData?.questions || '',
            }}
          />
        </Box>
      </Box>

      {/* Submission Form */}
      <Box sx={{ width: '90%', ml: 4 }}>
        <AssignmentSubmissionFormProvider lessonId={lessonId} />
      </Box>
    </Box>
  )
}

export default AttemptAssignment
