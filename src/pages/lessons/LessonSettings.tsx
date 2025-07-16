import { alpha, Box, Button, Chip, CircularProgress, Typography, useTheme } from '@mui/material'
import { useGetLessonByIdQuery } from '../../app/api/lessonApi'
import { Link, useParams } from 'react-router-dom'

import { CheckCircle, Cancel, AddCircleOutlineTwoTone, } from '@mui/icons-material'



function LessonSettings() {
    const { lessonId } = useParams()
    const theme = useTheme()
    const { data: lessonData, isError: lessonIsError, isSuccess: lessonIsSuccess, isLoading: lessonIsLoading, error: lessonError } = useGetLessonByIdQuery({ lessonId })




    if (lessonIsLoading) {
        return <Box sx={{ width: "100%", height: "670vh", display: "flex", alignItems: "center", justifyContent: "center" }}><CircularProgress /></Box>
    }

    if (lessonIsError && lessonError && "data" in lessonError) {
        return <Box sx={{ width: "100%", height: "670vh", display: "flex", alignItems: "center", justifyContent: "center" }}><Typography>{`${JSON.stringify((lessonError.data as any).error)}`}</Typography></Box>

    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>


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
                        width: { xs: "100%", sm: "80%", md: "60%", lg: "30%" },
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        background: alpha(theme.palette.primary.dark, 0.6),
                        border: "1px solid",
                        borderColor: theme.palette.divider,
                        p: 2,
                        borderRadius: 4,
                        alignItems: "center"
                    }}>
                        <Typography variant='h5' fontWeight={670} sx={{ textShadow: `0 0 12px ${theme.palette.warning.light}` }}>Manage Course Settings</Typography>


                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", justifyContent: "center" }}>
                            <Chip
                                icon={lessonData?.hasAssignment ? <CheckCircle /> : <Cancel />}
                                label={lessonData?.hasAssignment ? "Assignment Created" : "No Assignment"}
                                color={lessonData?.hasAssignment ? "success" : "error"}
                                size="small"
                            />
                            <Chip
                                icon={lessonData?.hasLab ? <CheckCircle /> : <Cancel />}
                                label={lessonData?.hasLab ? "Lab Created" : "No Lab"}
                                color={lessonData?.hasLab ? "success" : "error"}
                                size="small"
                            />
                            <Chip
                                icon={lessonData?.hasQuiz ? <CheckCircle /> : <Cancel />}
                                label={lessonData?.hasQuiz ? "Quiz Created" : "No Quiz"}
                                color={lessonData?.hasQuiz ? "success" : "error"}
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
                        <Box>
                            <Typography variant='caption' sx={{ color: theme.palette.text.secondary }}>Lesson Title</Typography>
                            <Typography
                                variant="h6"
                                fontWeight={600}
                                sx={{
                                    fontSize: { xs: '1.2rem', sm: '1.6rem' },

                                    width: { xs: "100%", sm: "auto" },

                                }}
                            >
                                {lessonData?.title}
                            </Typography>

                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            {
                                lessonData?.hasQuiz ? <Button
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
                                        background: alpha(theme.palette.success.light, 0.9),
                                        border: '1px solid',
                                        borderRadius: 6,
                                        borderColor: theme.palette.divider,
                                        color: theme.palette.text.primary,
                                        width: { xs: "100%", sm: "auto" }
                                    }}
                                    component={Link}
                                    to={`/create-MCQS-quiz/${lessonData?.id}`}
                                    size="small"
                                >
                                    Edit Quiz
                                </Button> : <Button
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
                                        background: alpha(theme.palette.success.light, 0.9),
                                        border: '1px solid',
                                        borderRadius: 6,
                                        borderColor: theme.palette.divider,
                                        color: theme.palette.text.primary,
                                        width: { xs: "100%", sm: "auto" }
                                    }}
                                    component={Link}
                                    to={`/create-MCQS-quiz/${lessonData?.id}`}
                                    size="small"
                                >
                                    Create Quiz
                                </Button>
                            }
                            {lessonData?.hasLab ? <Button
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
                                    background: alpha(theme.palette.success.light, 0.9),
                                    border: '1px solid',
                                    borderRadius: 6,
                                    borderColor: theme.palette.divider,
                                    color: theme.palette.text.primary,
                                    width: { xs: "100%", sm: "auto" }
                                }}
                                component={Link}
                                to={`/create-lab/${lessonData?.id}`}
                                size="small"
                            >
                                Edit Lab
                            </Button> :
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
                                        background: alpha(theme.palette.success.light, 0.9),
                                        border: '1px solid',
                                        borderRadius: 6,
                                        borderColor: theme.palette.divider,
                                        color: theme.palette.text.primary,
                                        width: { xs: "100%", sm: "auto" }
                                    }}
                                    component={Link}
                                    to={`/create-lab/${lessonData?.id}`}
                                    size="small"
                                >
                                    Create Lab
                                </Button>
                            }
                            {
                                lessonData?.hasAssignment ? <Button
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
                                        background: alpha(theme.palette.success.light, 0.9),
                                        border: '1px solid',
                                        borderRadius: 6,
                                        borderColor: theme.palette.divider,
                                        color: theme.palette.text.primary,
                                        width: { xs: "100%", sm: "auto" }
                                    }}
                                    component={Link}
                                    to={`/create-lab/${lessonData?.id}`}
                                    size="small"
                                >
                                    Edit Assignment
                                </Button> :
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
                                            background: alpha(theme.palette.success.light, 0.9),
                                            border: '1px solid',
                                            borderRadius: 6,
                                            borderColor: theme.palette.divider,
                                            color: theme.palette.text.primary,
                                            width: { xs: "100%", sm: "auto" }
                                        }}
                                        component={Link}
                                        to={`/create-assignment/${lessonData?.id}`}
                                        size="small"
                                    >
                                        Create Assignment
                                    </Button>
                            }
                        </Box>
                    </Box>

                </Box>


            </Box>
        </Box>
    )
}

export default LessonSettings
