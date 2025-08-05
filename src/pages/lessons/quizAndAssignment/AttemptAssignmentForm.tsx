import {
  Box,
  CircularProgress,
  Typography,
  useTheme,
  alpha,
  useMediaQuery,
} from '@mui/material'
import { useEffect, useState } from 'react'
import RichTextInputField from '../../../components/Forms/InputFields/RichTextInputField'
import {
  SubmitHandler,
  useFormContext,
} from 'react-hook-form'
import {
  SubmitQuizByStudentType,
  useSubmitAssignmentByStudentMutation,
} from '../../../app/api/lessonApi'

import toast from 'react-hot-toast'
import { LoadingButton } from '@mui/lab'
import { QuizAndAssignmentFormType } from '../../../types/quizAndAssignment'
import Quiz from '@mui/icons-material/Quiz'

interface AttemptAssignmentProps {
  lessonId: string | undefined
}

function AttemptAssignmentForm({ lessonId }: AttemptAssignmentProps) {
  const { handleSubmit, reset } = useFormContext<QuizAndAssignmentFormType>()
  const [uploadProgress, setUploadProgress] = useState({ document: 0 })
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const [
    submitAssignment,
    {
      isError: submitAssignmentIsError,
      error: submitAssignmentError,
      isSuccess: submitAssignmentSuccess,
      isLoading: submitAssignmentIsLoading,
    },
  ] = useSubmitAssignmentByStudentMutation()

  useEffect(() => {
    if (submitAssignmentSuccess) {
      reset()
      toast.success('Assignment submitted successfully.')
    }
  }, [submitAssignmentSuccess, reset])

  useEffect(() => {
    if (
      submitAssignmentIsError &&
      submitAssignmentError &&
      'data' in submitAssignmentError
    ) {
      console.error(submitAssignmentError)
      toast.error(
        `${JSON.stringify((submitAssignmentError.data as any).error)}`
      )
    }
  }, [submitAssignmentIsError, submitAssignmentError])

  const submitForm: SubmitHandler<QuizAndAssignmentFormType> = async (
    data: QuizAndAssignmentFormType
  ) => {
    try {
      const submitAssignmentData: SubmitQuizByStudentType = {
        solution_text: data.solution_text,
        lessonId: lessonId,
      }
      submitAssignment(submitAssignmentData)
    } catch (error) {
      console.log(error)
    }
  }

  if (submitAssignmentIsLoading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '70vh',
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
        width: '100%',
        display: 'flex',
        justifyContent: 'center',

      }}
    >
      <Box
        sx={{
          width: '100%',


        }}
      >
        <form onSubmit={handleSubmit(submitForm)}>
          <Typography
            variant="h6"
            fontWeight={600}
            textAlign="left"
            mb={2}
            sx={{ color: theme.palette.text.secondary }}
          >
            Assignment Submission Form
          </Typography>

          <RichTextInputField<QuizAndAssignmentFormType>
            isRequired={true}
            label="Assignment Answers"
            name="solution_text"
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              mt: 3,
            }}
          >
            <LoadingButton
              type="submit"
              loading={submitAssignmentIsLoading}
              disabled={submitAssignmentIsLoading}
              size="large"
              variant="outlined"
              startIcon={<Quiz sx={{ fontSize: 18 }} />}
              sx={{
                px: { xs: 1.5, sm: 2 },
                py: 1,
                fontWeight: 600,
                textTransform: 'none',
                background: theme.palette.background.paper,
                border: '1px solid',
                borderRadius: 2,
                borderColor: theme.palette.divider,
                color: theme.palette.text.primary,
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                minWidth: "auto",
                whiteSpace: "nowrap"
              }}
            >
              {submitAssignmentIsLoading
                ? 'Submitting Assignment...'
                : 'Submit Assignment'}
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default AttemptAssignmentForm
