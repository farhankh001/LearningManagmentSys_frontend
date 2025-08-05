
import { useGetLabForStudentQuery } from '../../../app/api/lessonApi'
import { useNavigate, useParams } from 'react-router-dom'

import { alpha, Box, Button, Chip, CircularProgress, Divider, Typography, useTheme } from '@mui/material'
import { useGetLabActivationStatusAndTimeQuery, useGetSingleChallengeStudentQuery, useSubmitChallengeStudentMutation } from '../../../app/api/labApi'
import { Code, TextFields, Flag, AccessTimeFilled, Bolt, Cancel, CheckCircle, Circle, Info, Score, PersonOutline, SmartToy, Biotech, AddToQueue } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import LabTimer from '../../Labs/LabTimer'
import TextAreaField from '../../../components/Forms/InputFields/TextAreaField'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { submitChallengeType } from '../../../types/create_lab.types'
import { StudyTimeTracker } from '../../dashboards/TimeTracker/StudyTimeTracker'

function AttemptChallenge() {
  const { challengeId } = useParams()
  const { data: challengeIncomingData, isLoading: challengeIncomingLoading, isError: ChallengeIncomingError, refetch: refetchChallengeData, } = useGetSingleChallengeStudentQuery({ challengeId })
  const navigate = useNavigate()
  const [labDeactivated, setLabDeactivated] = useState(false);
  const lessonId = challengeIncomingData?.lessonId
  const theme = useTheme()
  const { handleSubmit, reset } = useFormContext<submitChallengeType>();
  const { data: activationData, isError: activationstatusIsError, error: activationstatusError } = useGetLabActivationStatusAndTimeQuery({ lessonId }, {
    skip: !lessonId,
    pollingInterval: 10000
  })
  const [submitChallengeStudent] = useSubmitChallengeStudentMutation()

  useEffect(() => {
    if (activationData?.data?.activationStatus === 'Inactive') {
      setLabDeactivated(true);
      refetchChallengeData(); // Invalidate stale lab content
    }
  }, [activationData]);
  useEffect(() => {
    if (activationData?.data?.activationStatus === 'Active') {
      setLabDeactivated(false); // reset on re-activation
      refetchChallengeData();         // ✅ fetch updated lab state
    }
  }, [activationData]);

  const submitChallenge: SubmitHandler<submitChallengeType> = async (data: submitChallengeType) => {
    try {
      const formData = {
        ...data,
        challengeId
      }
      const response = await submitChallengeStudent(formData).unwrap()
      console.log(response)
      toast.success("Challenge Submitted successfully awaiting evaluation.")
      reset()
      navigate(`/detailed-lab-result/${challengeId}`)
    } catch (error) {
      console.log(error)
    }
  }
  const getAnswerTypeIcon = (type: string) => {
    switch (type) {
      case 'Code':
        return <Code sx={{ fontSize: "16px !important" }} />;
      case 'Text':
        return <TextFields sx={{ fontSize: "16px !important" }} />;
      case 'Flag':
        return <Flag sx={{ fontSize: "16px !important" }} />;
      default:
        return <TextFields sx={{ fontSize: "16px !important" }} />;
    }
  };

  const getAnswerTypeColor = (type: string) => {
    switch (type) {
      case 'Code':

        return theme.palette.success.light;
      case 'Text':
        return theme.palette.primary.light;
      case 'Flag':
        return theme.palette.warning.light;
      default:
        return theme.palette.text.secondary;
    }
  };

  if (challengeIncomingLoading) {
    return (
      <Box sx={{
        width: "100%",
        height: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <CircularProgress />
      </Box>
    );
  }



  if (ChallengeIncomingError) {
    return (
      <Box sx={{
        width: "100%",
        height: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
        p: 2
      }}>
        <Typography variant="h6" color="error">
          An error occurred while loading the lab.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please try again later.
        </Typography>
      </Box>
    );
  }

  if (!challengeIncomingData) {
    return (
      <Box sx={{
        width: "100%",
        height: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
        p: 2
      }}>
        <Typography variant="h6" color="warning.main">
          Challenge not found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          No Challenge is associated with this Lab yet.
        </Typography>
      </Box>
    );
  }

  if (challengeIncomingData && challengeIncomingData.activationStatus === false) {
    return (
      <Box sx={{
        width: "100%",
        height: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
        p: 2
      }}>
        <Typography variant="h6" color="warning.main">
          Lab is not active
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This lab has been created but is currently inactive. Please wait for your instructor to activate it.
        </Typography>
      </Box>
    );
  }

  if (labDeactivated) {
    return (
      <Box sx={{
        width: "100%",
        height: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
        p: 2,
      }}>
        <Typography variant="h6" color="error">
          Lab has been deactivated
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Your instructor has deactivated this lab. Please wait for further instructions or refresh the page later.
        </Typography>
      </Box>
    );
  }
  if (challengeIncomingLoading) {
    return <Box sx={{ width: "100%", height: "70vh", alignItems: "center", justifyContent: "center" }}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column", width: "100%", mb: 2
    }}>
      <StudyTimeTracker courseId={challengeIncomingData.courseId} />
      <Typography variant="body2" fontWeight={550} sx={{ color: theme.palette.text.secondary, mb: 2, mt: 3, mx: 2 }}>{`Dashboard / Courses / Lab / Attempt Lab`}</Typography>
      <Box sx={{
        width: "90%",
        mx: 2,
        display: "flex", flexDirection: "column", gap: 0
      }}>

        {/* Header Section */}
        <Box sx={{ width: "100%" }}>
          <Box sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            gap: { xs: 2, sm: 2 },
            mb: 2
          }}>

            <Box sx={{
              width: "70%",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2.5, ml: 2

            }}>
              <Box >
                <Typography variant='caption' fontWeight={750} sx={{ color: theme.palette.text.secondary }}>LAB TITLE</Typography>
                <Typography variant="body1"
                  fontWeight={500}
                  sx={{
                    fontSize: { xs: '1rem', sm: '1.2rem', md: '1.2rem' },
                    textShadow: `0 0 12px ${theme.palette.warning.light}`,
                    wordBreak: "break-word"
                  }}>{challengeIncomingData.labTitle}</Typography>
              </Box>
              <Typography variant='body2' fontWeight={200} sx={{ display: "flex", flexDirection: "column" }}><span><Typography variant='caption' fontWeight={750} sx={{ color: theme.palette.text.secondary }}>LAB DESCRIPTION</Typography></span>{challengeIncomingData.labDescription}</Typography>


            </Box>
            <Box sx={{
              width: "30%",

              display: "flex",
              flexDirection: "column",
              gap: 2,
              background: alpha(theme.palette.primary.dark, 0.7),
              border: "1px solid",
              borderColor: theme.palette.divider,
              p: { xs: 2, sm: 3 },
              borderRadius: 4,
              alignItems: "center"
            }}>
              <Box>
                <Typography
                  variant='h6'
                  fontWeight={700}
                  sx={{
                    color: theme.palette.text.primary,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontSize: { xs: "0.75rem", sm: "1.2rem" },
                    textShadow: `0 0 12px ${theme.palette.primary.main}`,
                  }}
                >
                  <Circle sx={{
                    fontSize: 10,
                    color: theme.palette.primary.main,
                    boxShadow: `0 0 6px 2px ${theme.palette.primary.main}`,
                    borderRadius: '50%',
                    background: theme.palette.primary.main,

                  }} />
                  <span>Lab Activation Status</span>
                </Typography>
              </Box>



              {
                activationData?.data.activationStatus === "Active" ? activationData.data.activatedAt && <Box >
                  <Chip
                    icon={<AccessTimeFilled sx={{ fontSize: "16px !important" }} />}
                    label={`Activated At ${new Date(activationData.data.activatedAt).toLocaleString('en-US', {
                      weekday: undefined,
                      year: 'numeric',
                      month: 'short', // or 'long' for full month name
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })
                      }`}
                    color="success"
                    size="small"
                    sx={{
                      px: 0.5,
                      minWidth: "auto",
                      fontSize: { xs: "0.65rem", sm: "0.75rem" }
                    }}
                  />
                </Box> : activationData?.data.deactivatedAt && <Box>
                  <Chip
                    icon={<AccessTimeFilled sx={{ fontSize: "16px !important" }} />}
                    label={`Deactivated At ${new Date(activationData?.data.deactivatedAt).toLocaleString('en-US', {
                      weekday: undefined,
                      year: 'numeric',
                      month: 'short', // or 'long' for full month name
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })
                      }`}

                    color="error"
                    size="small"
                    sx={{
                      px: 0.5,
                      minWidth: "auto",
                      fontSize: { xs: "0.65rem", sm: "0.75rem" }
                    }}
                  />
                </Box>
              }
              <Box sx={{
                display: "flex",
                gap: 1,
                flexDirection: { xs: "row", md: "column" },
                justifyContent: "center",
                alignItems: "center", background: alpha(theme.palette.error.light, 0.15), p: 1, border: "1px solid", borderRadius: 4, borderColor: theme.palette.divider, width: "90%"

              }}>

                <Typography variant='caption' fontWeight={600} sx={{ color: theme.palette.text.secondary, display: "flex", alignItems: 'center', gap: 0.2 }}>
                  <Bolt sx={{ fontSize: 14 }} />  <span>Lab Activation Time Clock</span></Typography>
                {activationData?.data && (
                  <LabTimer
                    activatedAt={activationData.data.activatedAt}
                    timeLimitInMinutes={activationData.data.timelimit}
                    isActive={activationData.data.activationStatus === "Active"}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>



        <Box sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2, background: alpha(theme.palette.primary.dark, 0.75),
          border: "1px solid",
          borderColor: theme.palette.divider,
          p: { xs: 2, sm: 3 },
          borderRadius: 4

        }}>

          <Box>
            <Typography variant='caption' fontWeight={600} sx={{ color: theme.palette.text.secondary }}>
              CHALLENGE TITILE
            </Typography>
            <Typography
              variant="body1"
              fontWeight={500}
              sx={{
                fontSize: { xs: '1rem', sm: '1rem', md: '1.1rem' },
                textShadow: `0 0 12px ${theme.palette.warning.light}`,
                wordBreak: "break-word"
              }}
            >
              {challengeIncomingData?.challenge_text}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Chip
              icon={getAnswerTypeIcon(challengeIncomingData.answer_string_type)}
              label={`${challengeIncomingData.answer_string_type}`}
              size="small"
              sx={{
                backgroundColor: alpha(getAnswerTypeColor(challengeIncomingData.answer_string_type), 0.4),
                color: theme.palette.text.primary, fontWeight: 700,
                border: `1px solid ${theme.palette.divider}`,
                fontSize: { xs: "0.65rem", sm: "0.75rem" },
                px: 2
              }}
            />

            <Chip
              icon={challengeIncomingData.auto_evaluate ? <SmartToy sx={{ fontSize: "14px !important" }} /> : <PersonOutline sx={{ fontSize: "14px !important" }} />}
              label={challengeIncomingData.auto_evaluate ? "Auto Evaluation" : "Manual Evaluation"}
              size="small"

              sx={{
                backgroundColor: alpha(getAnswerTypeColor(challengeIncomingData.answer_string_type), 0.4),
                color: theme.palette.text.primary, fontWeight: 700,
                border: `1px solid ${theme.palette.divider}`,
                fontSize: { xs: "0.65rem", sm: "0.75rem" },
                px: 2
              }}
            />
          </Box>
          <Box>
            <Typography variant='caption' fontWeight={600} sx={{ color: theme.palette.text.secondary }}>
              CHALLENGE DESCRIPTION
            </Typography>

            <Typography
              variant='body2'
              sx={{
                color: theme.palette.text.primary,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                mt: 1
              }}
            >
              {challengeIncomingData?.description}
            </Typography>




          </Box>
          {challengeIncomingData.sample_input && (
            <Box sx={{
              background: alpha(theme.palette.background.paper, 0.2),
              border: "1px solid",
              borderColor: theme.palette.divider,
              borderRadius: 2,
              p: 1,
              mt: 1
            }}>
              <Typography
                variant='caption'
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: { xs: "0.65rem", sm: "0.75rem" },
                  fontWeight: 600
                }}
              >
                HINT
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  fontFamily: "monospace",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  mt: 0.5
                }}
              >
                {challengeIncomingData.sample_input}
              </Typography>
            </Box>
          )}
          <Box>
            <form onSubmit={handleSubmit(submitChallenge)}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextAreaField<submitChallengeType> isRequired={true} label='Challenge Answer' name='challengeAnswer' rows={7} type='text' />
                <Box sx={{ ml: 1 }}>
                  <Button type='submit' startIcon={<AddToQueue sx={{ fontSize: "16px !important" }} />}
                    sx={{
                      px: { xs: 1.5, sm: 2 },
                      py: 0.5,
                      fontWeight: 600,
                      textTransform: 'none',
                      background: theme.palette.text.primary,
                      border: '1px solid',
                      borderRadius: 4,
                      borderColor: theme.palette.divider,
                      color: theme.palette.background.default,
                      fontSize: { xs: '0.7rem', sm: '0.8rem' },
                      minWidth: "auto",
                      whiteSpace: "nowrap",
                      flex: 1
                    }}>Submit Challege</Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>



      </Box>





    </Box >
  )
}

export default AttemptChallenge
