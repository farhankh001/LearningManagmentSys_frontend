import { alpha, Box, Button, Chip, CircularProgress, Typography, useTheme } from '@mui/material'
import { useGetLessonByIdQuery } from '../../app/api/lessonApi'
import { Link, useParams } from 'react-router-dom'

import { CheckCircle, Cancel, AddCircleOutlineTwoTone, PunchClockOutlined, LockClock, Circle, AccessTime, AccessTimeFilled, Download, CopyAll, RestorePageOutlined, LibraryAddCheckSharp, LibraryAddCheckOutlined, Info, Edit, EditOffOutlined, } from '@mui/icons-material'
import { FILEURLPRE } from '../../components/other/Defaulturl'
import { copyToClipboard } from '../../components/other/CopyToClip'



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
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mb: 5,
            px: { xs: 1, sm: 2 }
        }}>

            <Box sx={{
                width: "100%",
                maxWidth: { xs: "100%", sm: "95%", md: "90%", lg: "1200px" }
            }}>

                {/* Profile and Header Section */}
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: { xs: "column", lg: "row" },
                    alignItems: "stretch",
                    gap: { xs: 2, sm: 3 },
                    mb: 3
                }}>

                    {/* Profile Card */}
                    <Box sx={{
                        width: { xs: "100%", lg: "320px" },
                        minWidth: { lg: "320px" },
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        background: alpha(theme.palette.primary.dark, 0.55),
                        border: "1px solid",
                        borderColor: theme.palette.divider,
                        p: { xs: 2, sm: 3 },
                        borderRadius: 4,
                        alignItems: "center"
                    }}>
                        <Typography
                            variant='h5'
                            fontWeight={670}
                            sx={{
                                textAlign: "center",
                                fontSize: { xs: "1.1rem", sm: "1.25rem" }
                            }}
                        >
                            Manage Your Lesson's Settings
                        </Typography>

                        <Box sx={{
                            display: "flex",
                            gap: 1,
                            flexWrap: "wrap",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Chip
                                icon={<AccessTimeFilled sx={{ fontSize: "16px !important" }} />}
                                label={lessonData?.createdAt ? `Created At ${new Date(lessonData?.createdAt).toLocaleDateString()}` : ""}
                                color={"secondary"}
                                size="small"
                                sx={{
                                    px: 0.5,
                                    minWidth: "auto",
                                    fontSize: { xs: "0.65rem", sm: "0.75rem" }
                                }}
                            />
                            <Chip
                                icon={lessonData?.hasQuiz ? <CheckCircle sx={{ fontSize: "16px !important" }} /> : <Cancel sx={{ fontSize: "16px !important" }} />}
                                label={lessonData?.hasQuiz ? "Quiz ✓" : "No Quiz"}
                                color={lessonData?.hasQuiz ? "success" : "error"}
                                size="small"
                                sx={{
                                    minWidth: "auto",
                                    fontSize: { xs: "0.65rem", sm: "0.75rem" }
                                }}
                            />

                            <Chip
                                icon={lessonData?.hasLab ? <CheckCircle sx={{ fontSize: "16px !important" }} /> : <Cancel sx={{ fontSize: "16px !important" }} />}
                                label={lessonData?.hasLab ? "Lab ✓" : "No Lab"}
                                color={lessonData?.hasLab ? "success" : "error"}
                                size="small"
                                sx={{
                                    minWidth: "auto",
                                    fontSize: { xs: "0.65rem", sm: "0.75rem" }
                                }}
                            />
                            <Chip
                                icon={lessonData?.hasAssignment ? <CheckCircle sx={{ fontSize: "16px !important" }} /> : <Cancel sx={{ fontSize: "16px !important" }} />}
                                label={lessonData?.hasAssignment ? "Assignment ✓" : "No Assignment"}
                                color={lessonData?.hasAssignment ? "success" : "error"}
                                size="small"
                                sx={{
                                    minWidth: "auto",
                                    fontSize: { xs: "0.65rem", sm: "0.75rem" }
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Main Header Card */}
                    <Box sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        background: alpha(theme.palette.primary.dark, 0.6),
                        border: "1px solid",
                        borderColor: theme.palette.divider,
                        p: { xs: 2, sm: 3 },
                        borderRadius: 4
                    }}>
                        <Box>
                            <Typography
                                variant='body2'
                                sx={{
                                    color: theme.palette.primary.main,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    fontSize: { xs: "0.75rem", sm: "0.875rem" }
                                }}
                            >
                                <Circle sx={{
                                    fontSize: 8,
                                    color: theme.palette.primary.main,
                                    boxShadow: `0 0 6px 2px ${theme.palette.primary.main}`,
                                    borderRadius: '50%',
                                    background: theme.palette.primary.main
                                }} />
                                <span>Lesson Title</span>
                            </Typography>
                            <Typography
                                variant="h6"
                                fontWeight={600}
                                sx={{
                                    fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                                    textShadow: `0 0 12px ${theme.palette.warning.light}`,
                                    wordBreak: "break-word"
                                }}
                            >
                                {lessonData?.title}
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontSize: { xs: "0.75rem", sm: "0.875rem" }
                                }}
                            >
                                Course - {lessonData?.course.title}
                            </Typography>
                        </Box>

                        <Box sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1.5,
                            alignItems: "center"
                        }}>
                            {lessonData?.hasQuiz ? (
                                <Button
                                    startIcon={<EditOffOutlined sx={{ fontSize: "16px !important" }} />}
                                    sx={{
                                        px: { xs: 1.5, sm: 2 },
                                        py: 0.5,
                                        fontWeight: 400,
                                        textTransform: 'none',
                                        background: theme.palette.text.primary,
                                        border: '1px solid',
                                        borderRadius: 4,
                                        borderColor: theme.palette.divider,
                                        color: theme.palette.background.default,
                                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                        minWidth: "auto",
                                        whiteSpace: "nowrap"
                                    }}
                                    component={Link}
                                    to={`/edit-quiz/${lessonData?.quiz?.id}`}
                                    size="small"
                                >
                                    Edit Quiz
                                </Button>
                            ) : (
                                <Button
                                    startIcon={<AddCircleOutlineTwoTone sx={{ fontSize: "16px !important" }} />}
                                    sx={{
                                        px: { xs: 1.5, sm: 2 },
                                        py: 0.5,
                                        fontWeight: 400,
                                        textTransform: 'none',
                                        background: theme.palette.text.primary,
                                        border: '1px solid',
                                        borderRadius: 4,
                                        borderColor: theme.palette.divider,
                                        color: theme.palette.background.default,
                                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                        minWidth: "auto",
                                        whiteSpace: "nowrap"
                                    }}
                                    component={Link}
                                    to={`/create-MCQS-quiz/${lessonData?.id}`}
                                    size="small"
                                >
                                    Create Quiz
                                </Button>
                            )}

                            {lessonData?.hasLab ? (
                                <Button
                                    startIcon={<EditOffOutlined sx={{ fontSize: "16px !important" }} />}
                                    sx={{
                                        px: { xs: 1.5, sm: 2 },
                                        py: 0.5,
                                        fontWeight: 400,
                                        textTransform: 'none',
                                        background: theme.palette.text.primary,
                                        border: '1px solid',
                                        borderRadius: 4,
                                        borderColor: theme.palette.divider,
                                        color: theme.palette.background.default,
                                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                        minWidth: "auto",
                                        whiteSpace: "nowrap"
                                    }}
                                    component={Link}
                                    to={`/edit-lab/${lessonData?.lab?.id}`}
                                    size="small"
                                >
                                    Edit Lab
                                </Button>
                            ) : (
                                <Button
                                    startIcon={<AddCircleOutlineTwoTone sx={{ fontSize: "16px !important" }} />}
                                    sx={{
                                        px: { xs: 1.5, sm: 2 },
                                        py: 0.5,
                                        fontWeight: 400,
                                        textTransform: 'none',
                                        background: theme.palette.text.primary,
                                        border: '1px solid',
                                        borderRadius: 4,
                                        borderColor: theme.palette.divider,
                                        color: theme.palette.background.default,
                                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                        minWidth: "auto",
                                        whiteSpace: "nowrap"
                                    }}
                                    component={Link}
                                    to={`/create-lab/${lessonData?.id}`}
                                    size="small"
                                >
                                    Create Lab
                                </Button>
                            )}

                            {lessonData?.hasAssignment ? (
                                <Button
                                    startIcon={<EditOffOutlined sx={{ fontSize: "16px !important" }} />}
                                    sx={{
                                        px: { xs: 1.5, sm: 2 },
                                        py: 0.5,
                                        fontWeight: 400,
                                        textTransform: 'none',
                                        background: theme.palette.text.primary,
                                        border: '1px solid',
                                        borderRadius: 4,
                                        borderColor: theme.palette.divider,
                                        color: theme.palette.background.default,
                                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                        minWidth: "auto",
                                        whiteSpace: "nowrap"
                                    }}
                                    component={Link}
                                    to={`/edit-assignment/${lessonData?.assignment?.id}`}
                                    size="small"
                                >
                                    Edit Assignment
                                </Button>
                            ) : (
                                <Button
                                    startIcon={<AddCircleOutlineTwoTone sx={{ fontSize: "16px !important" }} />}
                                    sx={{
                                        px: { xs: 1.5, sm: 2 },
                                        py: 0.5,
                                        fontWeight: 400,
                                        textTransform: 'none',
                                        background: theme.palette.text.primary,
                                        border: '1px solid',
                                        borderRadius: 4,
                                        borderColor: theme.palette.divider,
                                        color: theme.palette.background.default,
                                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                        minWidth: "auto",
                                        whiteSpace: "nowrap"
                                    }}
                                    component={Link}
                                    to={`/create-assignment/${lessonData?.id}`}
                                    size="small"
                                >
                                    Create Assignment
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* Info Message */}
            <Box sx={{
                width: "100%",
                maxWidth: { xs: "100%", sm: "95%", md: "90%", lg: "1200px" },

            }}>
                {!lessonData?.hasLab && !lessonData?.hasAssignment && (
                    <Box sx={{
                        width: "100%",
                        background: alpha(theme.palette.error.main, 0.25),
                        p: { xs: 1.5, sm: 2 },
                        border: "1px solid",
                        borderColor: theme.palette.divider,
                        borderRadius: 2,
                        display: "flex",
                        gap: 1,
                        alignItems: "flex-start",

                    }}>
                        <Info sx={{ fontSize: 20, color: theme.palette.text.secondary, flexShrink: 0 }} />
                        <Typography sx={{
                            color: theme.palette.text.secondary,
                            fontSize: { xs: "0.8rem", sm: "0.875rem" }
                        }}>
                            Create assignment and lab for this lesson as they are necessary for student progress evaluation.
                        </Typography>
                    </Box>
                )}

                {/* Lab and Assignment Cards */}
                <Box sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: { xs: 2, sm: 3 },


                }}>
                    {lessonData?.hasLab && (
                        <Box sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1.5,
                            background: alpha(theme.palette.primary.dark, 0.55),
                            p: { xs: 2, sm: 3 },
                            border: "1px solid",
                            borderColor: theme.palette.divider,
                            borderRadius: 4,
                            justifyContent: "space-between"
                        }}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", sm: "row" },
                                    gap: 1,
                                    alignItems: { xs: "flex-start", sm: "center" }
                                }}>
                                    <Typography
                                        variant='body2'
                                        sx={{
                                            color: theme.palette.warning.light,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            fontSize: { xs: "0.75rem", sm: "0.875rem" }
                                        }}
                                    >
                                        <Circle sx={{
                                            fontSize: 8,
                                            color: theme.palette.warning.light,
                                            boxShadow: `0 0 6px 2px ${theme.palette.warning.light}`,
                                            borderRadius: '50%',
                                            background: theme.palette.warning.light
                                        }} />
                                        <span>Lab</span>
                                    </Typography>

                                    <Box sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 1,
                                        alignItems: "center"
                                    }}>
                                        <Typography
                                            variant='caption'
                                            sx={{
                                                background: theme.palette.background.paper,
                                                border: "1px solid",
                                                borderColor: theme.palette.divider,
                                                px: 1,
                                                py: 0.3,
                                                borderRadius: 4,
                                                fontSize: { xs: "0.65rem", sm: "0.75rem" },
                                                whiteSpace: "nowrap"
                                            }}
                                        >
                                            {lessonData.lab?.createdAt && new Date(lessonData.lab?.createdAt).toLocaleDateString()}
                                        </Typography>

                                        <Typography
                                            variant='caption'
                                            sx={{
                                                background: theme.palette.background.paper,
                                                border: "1px solid",
                                                borderColor: theme.palette.divider,
                                                px: 1,
                                                py: 0.3,
                                                borderRadius: 4,
                                                fontWeight: 600,
                                                fontSize: { xs: "0.65rem", sm: "0.75rem" },
                                                whiteSpace: "nowrap"
                                            }}
                                        >
                                            {lessonData.lab?.timelimit}m
                                        </Typography>

                                        <Chip
                                            label={lessonData.lab?.activationStatus}
                                            color={"default"}
                                            variant="filled"
                                            size="small"
                                            sx={{
                                                px: 0.5,
                                                color: "text.primary",
                                                fontSize: { xs: '0.65rem', sm: '0.75rem' },
                                                fontWeight: 600,
                                                border: '1px solid',
                                                borderColor: theme.palette.divider,
                                                minWidth: "auto"
                                            }}
                                        />
                                    </Box>
                                </Box>

                                <Typography
                                    variant='body1'
                                    sx={{
                                        fontSize: { xs: "1rem", sm: "1.1rem" },
                                        wordBreak: "break-word"
                                    }}
                                >
                                    {lessonData.lab?.title}
                                </Typography>

                                <Typography
                                    variant='body2'
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        fontSize: { xs: "0.75rem", sm: "0.875rem" }
                                    }}
                                >
                                    {lessonData.lab?.description}
                                </Typography>
                            </Box>

                            <Box sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                gap: 1.5,
                                mt: 2
                            }}>
                                <Button
                                    startIcon={<AddCircleOutlineTwoTone sx={{ fontSize: "16px !important" }} />}
                                    sx={{
                                        px: { xs: 1.5, sm: 2 },
                                        py: 0.5,
                                        color: theme.palette.text.primary,
                                        fontWeight: 400,
                                        textTransform: 'none',
                                        background: theme.palette.warning.main,
                                        border: '1px solid',
                                        borderRadius: 4,
                                        borderColor: theme.palette.divider,
                                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                        minWidth: "auto",
                                        whiteSpace: "nowrap"
                                    }}
                                    component={Link}
                                    to={`/add-lab-challenge/${lessonData?.lab?.id}`}
                                    size="small"
                                >
                                    Create Challenge
                                </Button>

                                <Button
                                    startIcon={<LibraryAddCheckOutlined sx={{ fontSize: "16px !important" }} />}
                                    sx={{
                                        px: { xs: 1.5, sm: 2 },
                                        py: 0.5,
                                        color: theme.palette.text.primary,
                                        fontWeight: 400,
                                        textTransform: 'none',
                                        background: theme.palette.warning.main,
                                        border: '1px solid',
                                        borderRadius: 4,
                                        borderColor: theme.palette.divider,
                                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                        minWidth: "auto",
                                        whiteSpace: "nowrap"
                                    }}
                                    component={Link}
                                    to={`/view-all-lab-challenge/${lessonData?.lab?.id}`}
                                    size="small"
                                >
                                    View Challenges
                                </Button>
                            </Box>
                        </Box>
                    )}

                    {lessonData?.hasAssignment && (
                        <Box sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1.5,
                            background: alpha(theme.palette.primary.dark, 0.55),
                            p: { xs: 2, sm: 3 },
                            border: "1px solid",
                            borderColor: theme.palette.divider,
                            borderRadius: 4,
                            justifyContent: "space-between"
                        }}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", sm: "row" },
                                    gap: 1,
                                    alignItems: { xs: "flex-start", sm: "center" }
                                }}>
                                    <Typography
                                        variant='body2'
                                        sx={{
                                            color: theme.palette.success.light,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            fontSize: { xs: "0.75rem", sm: "0.875rem" }
                                        }}
                                    >
                                        <Circle sx={{
                                            fontSize: 8,
                                            color: theme.palette.success.light,
                                            boxShadow: `0 0 6px 2px ${theme.palette.success.light}`,
                                            borderRadius: '50%',
                                            background: theme.palette.success.light
                                        }} />
                                        <span>Assignment</span>
                                    </Typography>

                                    <Box sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 1,
                                        alignItems: "center"
                                    }}>
                                        <Typography
                                            variant='caption'
                                            sx={{
                                                background: theme.palette.background.paper,
                                                border: "1px solid",
                                                borderColor: theme.palette.divider,
                                                px: 1,
                                                py: 0.3,
                                                borderRadius: 4,
                                                fontSize: { xs: "0.65rem", sm: "0.75rem" },
                                                whiteSpace: "nowrap"
                                            }}
                                        >
                                            {lessonData.assignment?.createdAt && new Date(lessonData.assignment?.createdAt).toLocaleDateString()}
                                        </Typography>

                                        <Typography
                                            variant='caption'
                                            sx={{
                                                background: theme.palette.background.paper,
                                                border: "1px solid",
                                                borderColor: theme.palette.divider,
                                                px: 1,
                                                py: 0.3,
                                                borderRadius: 4,
                                                fontWeight: 600,
                                                fontSize: { xs: "0.65rem", sm: "0.75rem" },
                                                whiteSpace: "nowrap"
                                            }}
                                        >
                                            {lessonData.assignment?.timelimit}m
                                        </Typography>

                                        <Chip
                                            label={lessonData.assignment?.activationStatus}
                                            color={"default"}
                                            variant="filled"
                                            size="small"
                                            sx={{
                                                px: 0.5,
                                                color: "text.primary",
                                                fontSize: { xs: '0.65rem', sm: '0.75rem' },
                                                fontWeight: 600,
                                                border: "1px solid",
                                                borderColor: theme.palette.divider,
                                                minWidth: "auto"
                                            }}
                                        />
                                    </Box>
                                </Box>

                                <Typography
                                    variant='body1'
                                    sx={{
                                        fontSize: { xs: "1rem", sm: "1.1rem" },
                                        wordBreak: "break-word",
                                    }}
                                >
                                    {lessonData.assignment?.title}
                                </Typography>

                                <Typography
                                    variant='body2'
                                    sx={{
                                        color: theme.palette.text.secondary,
                                        fontSize: { xs: "0.75rem", sm: "0.875rem" }
                                    }}
                                >
                                    {lessonData.assignment?.description}
                                </Typography>
                            </Box>

                            <Box sx={{ mt: 2 }}>
                                <Button
                                    startIcon={<RestorePageOutlined sx={{ fontSize: "16px !important" }} />}
                                    sx={{
                                        px: { xs: 1.5, sm: 2 },
                                        py: 0.5,
                                        fontWeight: 400,
                                        textTransform: 'none',
                                        background: theme.palette.success.light,
                                        border: '1px solid',
                                        borderRadius: 4,
                                        borderColor: theme.palette.divider,
                                        color: theme.palette.text.primary,
                                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                        minWidth: "auto",
                                        whiteSpace: "nowrap"
                                    }}
                                    component={Link}
                                    to={`/assignment-settings/${lessonData?.id}`}
                                    size="small"
                                >
                                    View Submissions
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>

            {/* Lesson Content Section */}
            <Box sx={{
                width: "100%",
                maxWidth: { xs: "100%", sm: "95%", md: "90%", lg: "1200px" },
                px: { xs: 1, sm: 2 },
                mt: 3,
                background: alpha(theme.palette.primary.dark, 0.55),
                border: "1px solid",
                borderColor: theme.palette.divider,
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 4,
            }}>
                <Typography
                    variant='body2'
                    sx={{
                        color: theme.palette.primary.main,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontSize: { xs: "0.75rem", sm: "0.875rem" }
                    }}
                >
                    <Circle sx={{
                        fontSize: 8,
                        color: theme.palette.primary.main,
                        boxShadow: `0 0 6px 2px ${theme.palette.primary.main}`,
                        borderRadius: '50%',
                        background: theme.palette.primary.main
                    }} />
                    <span>Lesson Content</span>
                </Typography>

                <Typography
                    variant='h5'
                    fontWeight={670}
                    sx={{
                        mt: 1,
                        mb: 1,
                        fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" }
                    }}
                >
                    Download or copy lesson content
                </Typography>

                <Box sx={{
                    mt: 1.5,
                    mb: 1.5,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    flexWrap: "wrap",
                    gap: 1.5,
                    alignItems: { xs: "stretch", sm: "center" }
                }}>
                    {lessonData?.docs && (
                        <Button
                            variant="outlined"
                            color="primary"
                            href={`${FILEURLPRE}/${lessonData.docs}`}
                            download
                            target="_blank"
                            startIcon={<Download sx={{ fontSize: "16px !important" }} />}
                            sx={{
                                px: { xs: 1.5, sm: 2 },
                                py: 0.5,
                                fontWeight: 600,
                                textTransform: 'none',
                                background: theme.palette.background.paper,
                                border: '1px solid',
                                borderRadius: 4,
                                borderColor: theme.palette.divider,
                                color: theme.palette.text.primary,
                                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                minWidth: "auto",
                                whiteSpace: "nowrap"
                            }}
                        >
                            Download Document
                        </Button>
                    )}

                    {lessonData?.docs2 && (
                        <Button
                            variant="outlined"
                            color="primary"
                            href={`${FILEURLPRE}/${lessonData.docs2}`}
                            download
                            target="_blank"
                            startIcon={<Download sx={{ fontSize: "16px !important" }} />}
                            sx={{
                                px: { xs: 1.5, sm: 2 },
                                py: 0.5,
                                fontWeight: 600,
                                textTransform: 'none',
                                background: theme.palette.background.paper,
                                border: '1px solid',
                                borderRadius: 4,
                                borderColor: theme.palette.divider,
                                color: theme.palette.text.primary,
                                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                minWidth: "auto",
                                whiteSpace: "nowrap"
                            }}
                        >
                            Download Document 2
                        </Button>
                    )}

                    {lessonData?.video && (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => copyToClipboard(lessonData.video!)}
                            startIcon={<CopyAll sx={{ fontSize: "16px !important" }} />}
                            sx={{
                                px: { xs: 1.5, sm: 2 },
                                py: 0.5,
                                fontWeight: 600,
                                textTransform: 'none',
                                background: theme.palette.background.paper,
                                border: '1px solid',
                                borderRadius: 4,
                                borderColor: theme.palette.divider,
                                color: theme.palette.text.primary,
                                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                minWidth: "auto",
                                whiteSpace: "nowrap"
                            }}
                        >
                            Copy Video URL
                        </Button>
                    )}
                </Box>

                <Typography
                    variant='h5'
                    fontWeight={670}
                    sx={{
                        mt: 3,
                        mb: 1,
                        color: theme.palette.text.primary,
                        fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" }
                    }}
                >
                    Lesson Text Content
                </Typography>

                {lessonData?.text && (
                    <Box sx={{
                        color: theme.palette.text.secondary,
                        fontSize: { xs: "0.8rem", sm: "0.9rem" },
                        overflow: "hidden",
                        mb: 2,
                        '& *': {
                            maxWidth: '100%',
                            wordBreak: 'break-word'
                        }
                    }}
                        dangerouslySetInnerHTML={{ __html: lessonData?.text }}
                    />
                )}

                <Box sx={{ mt: 1 }}>
                    <Button
                        startIcon={<EditOffOutlined sx={{ fontSize: "16px !important" }} />}
                        sx={{
                            px: { xs: 1.5, sm: 2 },
                            py: 0.5,
                            fontWeight: 400,
                            textTransform: 'none',
                            background: theme.palette.primary.main,
                            border: '1px solid',
                            borderRadius: 4,
                            borderColor: theme.palette.divider,
                            color: theme.palette.text.primary,
                            fontSize: { xs: '0.7rem', sm: '0.8rem' },
                            minWidth: "auto",
                            whiteSpace: "nowrap"
                        }}
                        component={Link}
                        to={`/update-lesson/${lessonData?.id}`}
                        size="small"
                    >
                        Edit Lesson Content
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default LessonSettings