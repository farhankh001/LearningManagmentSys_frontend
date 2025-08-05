import { alpha, Box, Button, Chip, CircularProgress, Typography, useTheme, Card, CardContent, } from '@mui/material';
import { Circle, Code, TextFields, Flag, SmartToy, PersonOutline, Info, AccessTimeFilled, Bolt, Cancel, CheckCircle, Score, Biotech, CheckCircleOutline, PlaylistAddCheckCircleOutlined } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useGetLabForStudentQuery } from '../../../app/api/lessonApi';
import { useGetLabActivationStatusAndTimeQuery } from '../../../app/api/labApi';
import LabTimer from '../../Labs/LabTimer';
import { useEffect, useState } from 'react';
import { StudyTimeTracker } from '../../dashboards/TimeTracker/StudyTimeTracker';


function LabChallengesForStudents() {
    const { lessonId } = useParams();
    const theme = useTheme();
    const [labDeactivated, setLabDeactivated] = useState(false);

    const {
        data: labData,
        isError,
        isLoading,
        isSuccess,
        error,
        refetch: refetchLabData,
    } = useGetLabForStudentQuery({ lessonId });

    const { data: activationData, isError: activationstatusIsError, error: activationstatusError } = useGetLabActivationStatusAndTimeQuery({ lessonId }, {
        skip: !lessonId,
        pollingInterval: 10000
    })
    useEffect(() => {
        if (activationData?.data?.activationStatus === 'Inactive') {
            setLabDeactivated(true);
            refetchLabData(); // Invalidate stale lab content
        }
    }, [activationData]);
    useEffect(() => {
        if (activationData?.data?.activationStatus === 'Active') {
            setLabDeactivated(false); // reset on re-activation
            refetchLabData();         // ✅ fetch updated lab state
        }
    }, [activationData]);


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

    if (isLoading) {
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



    if (isError) {
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

    if (!labData) {
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
                    Lab not found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    No lab is associated with this lesson yet.
                </Typography>
            </Box>
        );
    }

    if (labData && labData.isActive === false) {
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

    if (labData && !labData.hasChallenges) {
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
                <Typography variant="h6" color="info.main">
                    No Challenges Available
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This lab has no challenges. Your teacher may add them later.
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

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%"


        }}>
            <StudyTimeTracker courseId={labData.courseId} />
            <Box sx={{
                width: "90%",
                my: 4, ml: 2, display: 'flex', flexDirection: 'column', gap: 2
            }}>
                <Typography variant="body2" fontWeight={550} sx={{ color: theme.palette.text.secondary, mb: 2 }}>{`Dashboard / Courses / Lab / Attempt Lab`}</Typography>
                {/* Header Section */}
                <Box sx={{
                    display: "flex",
                    flexDirection: { xs: "column", lg: "row" },
                    alignItems: "flex-start", justifyContent: 'center',
                    gap: 2, background: alpha(theme.palette.primary.dark, 0.75), p: 2, border: " 1px solid", borderColor: theme.palette.divider, borderRadius: 2

                }}>
                    {/* Lab Summary Card */}


                    {/* Lab Info Card */}
                    <Box sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column", width: "63%", ml: 2

                    }}>

                        <Box sx={{
                            display: "flex", flexDirection: "column", gap: 1.5
                        }}>
                            <Box>
                                <Box sx={{ display: "flex", mb: 2 }}>  <Typography variant="caption" fontWeight={500} sx={{
                                    background: alpha(theme.palette.primary.main, 0.3), color: theme.palette.text.secondary, px: 1.5, py: 0.4, borderRadius: 2.5, fontSize: "0.67rem", display: "flex", gap: 1.5, alignItems: "center"
                                }}><Circle sx={{
                                    fontSize: 6,
                                    color: theme.palette.primary.main,
                                    boxShadow: `0 0 6px 2px ${theme.palette.primary.main}`,
                                    borderRadius: '50%',
                                    background: theme.palette.primary.main
                                }} /> <span>{labData.activationStatus}</span></Typography></Box>
                                <Typography
                                    variant="body1"
                                    fontWeight={500}
                                    sx={{
                                        fontSize: { xs: '1rem', sm: '1.2rem', md: '1.2rem' },
                                        textShadow: `0 0 12px ${theme.palette.warning.light}`,
                                        wordBreak: "break-word"
                                    }}
                                >
                                    {labData?.title}
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Chip
                                    icon={<Score sx={{ fontSize: "16px !important" }} />}
                                    label={`Total Score: ${labData?.labTotalScore}`}
                                    color="secondary"
                                    size="small"
                                    sx={{
                                        minWidth: "auto",
                                        fontSize: { xs: "0.65rem", sm: "0.75rem" },
                                        color: theme.palette.text.primary, fontWeight: 600
                                    }}
                                />
                                <Chip
                                    icon={labData?.hasChallenges ? <CheckCircle sx={{ fontSize: "16px !important" }} /> : <Cancel sx={{ fontSize: "16px !important" }} />}
                                    label={`Try Challenges`}
                                    color={labData?.hasChallenges ? "success" : "error"}
                                    size="small"
                                    sx={{
                                        minWidth: "auto",
                                        fontSize: { xs: "0.65rem", sm: "0.75rem" }
                                    }}
                                />
                            </Box>
                            <Box>
                                <Typography variant='caption' fontWeight={600} sx={{ color: theme.palette.text.secondary }}>
                                    LAB DESCRIPTION
                                </Typography>

                                <Typography
                                    variant='body2'
                                    sx={{
                                        color: theme.palette.text.primary,
                                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                        mt: 1
                                    }}
                                >
                                    {labData?.description}
                                </Typography>
                            </Box>
                        </Box>



                    </Box>
                    <Box sx={{
                        width: { xs: "100%", lg: "27%" },
                        height: "210px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.3,
                        background: alpha(theme.palette.primary.dark, 0.7),
                        border: "1px solid",
                        borderColor: theme.palette.divider,
                        p: { xs: 2, sm: 2 },
                        borderRadius: 4,
                        alignItems: "center"
                    }}>

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
                                fontSize: 9,
                                color: theme.palette.primary.main,
                                boxShadow: `0 0 6px 2px ${theme.palette.primary.main}`,
                                borderRadius: '50%',
                                background: theme.palette.primary.main,

                            }} />
                            <span>Lab Activation Status</span>
                        </Typography>




                        {
                            activationData?.data.activationStatus === "Active" ? activationData.data.activatedAt && <Box>
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

                                    size="small"
                                    sx={{
                                        px: 0.5,
                                        borderRadius: 2, background: alpha(theme.palette.success.light, 0.55), border: "1px solid", borderColor: theme.palette.divider,
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


                                    size="small"
                                    sx={{
                                        px: 0.5,
                                        backgroundColor: alpha(theme.palette.error.light, 0.55),
                                        minWidth: "auto",
                                        borderRadius: 2,
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
                            alignItems: "center", background: alpha(theme.palette.error.light, 0.15), p: 1, border: "1px solid", borderRadius: 4, borderColor: theme.palette.divider, width: "82%"

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

                {/* No Challenges Message */}
                {!labData?.hasChallenges && (
                    <Box sx={{
                        width: "100%",
                        background: alpha(theme.palette.warning.main, 0.25),
                        p: { xs: 1.5, sm: 2 },
                        border: "1px solid",
                        borderColor: theme.palette.divider,
                        borderRadius: 2,
                        display: "flex",
                        gap: 1,
                        alignItems: "flex-start",
                        mb: 3,
                    }}>
                        <Info sx={{ fontSize: 20, color: theme.palette.text.secondary, flexShrink: 0 }} />
                        <Typography sx={{
                            color: theme.palette.text.secondary,
                            fontSize: { xs: "0.8rem", sm: "0.875rem" }
                        }}>
                            No challenges have been created for this lab yet. Wait for your teacher to create or activate lab
                        </Typography>
                    </Box>
                )}

                {/* Challenges Grid */}
                {labData?.hasChallenges && (
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(2, 1fr)",

                        },
                        gap: { xs: 2, sm: 3 },
                        mb: 3
                    }}>
                        {labData.challenges?.map((challenge, index) => (
                            challenge.attempted ? <Card key={challenge.id} sx={{
                                background: alpha(theme.palette.primary.dark, 0.7),
                                border: "1px solid",
                                borderColor: theme.palette.divider,
                                borderRadius: 4,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <CardContent sx={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    p: { xs: 2, sm: 3 }
                                }}>
                                    {/* Challenge Header */}
                                    <Box sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1,
                                        mb: 2
                                    }}>
                                        <Box sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                            flexWrap: "wrap",
                                            gap: 1
                                        }}>
                                            <Typography
                                                variant='caption'
                                                sx={{
                                                    color: getAnswerTypeColor(challenge.answer_string_type),
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                    fontSize: { xs: "0.75rem", sm: "0.8rem" }
                                                }}
                                            >
                                                <Circle sx={{
                                                    fontSize: 8,
                                                    color: getAnswerTypeColor(challenge.answer_string_type),
                                                    boxShadow: `0 0 6px 2px ${getAnswerTypeColor(challenge.answer_string_type)}`,
                                                    borderRadius: '50%',
                                                    background: getAnswerTypeColor(challenge.answer_string_type)
                                                }} />
                                                <span>Challenge - {index + 1}</span>
                                            </Typography>

                                            <Typography
                                                variant='caption'
                                                sx={{

                                                    color: theme.palette.text.primary,
                                                    px: 2,
                                                    py: 0.3,
                                                    fontSize: { xs: "0.65rem", sm: "0.75rem" },
                                                    fontWeight: 600,
                                                    display: "flex", alignItems: "center", gap: 1
                                                }}
                                            >
                                                <CheckCircleOutline sx={{ fontSize: 20, color: theme.palette.success.light }} />
                                            </Typography>
                                        </Box>

                                        <Box sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 1,
                                            alignItems: "center"
                                        }}>
                                            <Chip
                                                icon={getAnswerTypeIcon(challenge.answer_string_type)}
                                                label={`${challenge.answer_string_type}`}
                                                size="small"
                                                sx={{
                                                    backgroundColor: alpha(getAnswerTypeColor(challenge.answer_string_type), 0.25),
                                                    color: theme.palette.text.primary, fontWeight: 700,
                                                    border: `1px solid ${theme.palette.divider}`,
                                                    fontSize: { xs: "0.65rem", sm: "0.75rem" },
                                                    px: 2
                                                }}
                                            />

                                            <Chip
                                                icon={challenge.auto_evaluate ? <SmartToy sx={{ fontSize: "14px !important" }} /> : <PersonOutline sx={{ fontSize: "14px !important" }} />}
                                                label={challenge.auto_evaluate ? "Auto" : "Manual"}
                                                size="small"

                                                sx={{
                                                    backgroundColor: alpha(getAnswerTypeColor(challenge.answer_string_type), 0.25),
                                                    color: theme.palette.text.primary, fontWeight: 700,
                                                    border: `1px solid ${theme.palette.divider}`,
                                                    fontSize: { xs: "0.65rem", sm: "0.75rem" },
                                                    px: 2
                                                }}
                                            />

                                            <Chip

                                                label={new Date(challenge.createdAt).toLocaleDateString()}
                                                size="small"

                                                sx={{
                                                    backgroundColor: alpha(getAnswerTypeColor(challenge.answer_string_type), 0.25),
                                                    color: theme.palette.text.primary, fontWeight: 700,
                                                    border: `1px solid ${theme.palette.divider}`,
                                                    fontSize: { xs: "0.65rem", sm: "0.75rem" },
                                                    px: 2
                                                }}
                                            />
                                        </Box>
                                    </Box>

                                    {/* Challenge Content */}
                                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
                                        <Typography
                                            variant='body1'
                                            fontWeight={400}
                                            sx={{
                                                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                                                lineHeight: 1.4
                                            }}
                                        >
                                            {challenge.challenge_text}
                                        </Typography>

                                        {challenge.description && (
                                            <Typography
                                                variant='body2'
                                                sx={{
                                                    color: theme.palette.text.secondary,
                                                    fontSize: { xs: "0.67rem", sm: "0.8rem" },

                                                }}
                                            >
                                                {challenge.description}
                                            </Typography>
                                        )}

                                        {challenge.submission && (
                                            <Box sx={{
                                                background: alpha(theme.palette.background.paper, 0.2),
                                                border: "1px solid",
                                                borderColor: theme.palette.divider,
                                                borderRadius: 2,
                                                p: 1,
                                                mt: 1, display: "grid", gridTemplateColumns: "1fr 1fr"
                                            }}>
                                                <Typography
                                                    variant='caption'
                                                    sx={{
                                                        color: theme.palette.text.secondary,
                                                        fontSize: { xs: "0.65rem", sm: "0.75rem" },
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    RESULTS
                                                </Typography>

                                                <Typography
                                                    variant='body2'
                                                    sx={{
                                                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                                        mt: 0.5
                                                    }}
                                                >
                                                    {`Marks: ${challenge.submission.obtained_marks ?? 'N/A'} / 100`}
                                                </Typography>

                                                {challenge.submission.similarity_score !== null && (
                                                    <Typography
                                                        variant='body2'
                                                        sx={{
                                                            fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                                            mt: 0.5
                                                        }}
                                                    >
                                                        Similarity Score: {`${(challenge.submission.similarity_score * 100).toFixed(2)}%`}
                                                    </Typography>
                                                )}

                                                {challenge.submission.grade && (
                                                    <Typography
                                                        variant='body2'
                                                        sx={{
                                                            fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                                            mt: 0.5
                                                        }}
                                                    >
                                                        Grade: {challenge.submission.grade}
                                                    </Typography>
                                                )}
                                            </Box>
                                        )}

                                    </Box>



                                    {/* Challenge Actions */}
                                    <Box sx={{
                                        mt: 2

                                    }}>
                                        <Button
                                            startIcon={<PlaylistAddCheckCircleOutlined sx={{ fontSize: "18px !important" }} />}
                                            sx={{
                                                px: { xs: 1.5, sm: 2 },
                                                py: 0.5,
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                background: alpha(theme.palette.text.primary, 0.1),
                                                border: '1px solid',
                                                borderRadius: 4,
                                                borderColor: theme.palette.divider,
                                                color: theme.palette.text.primary,
                                                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                                minWidth: "auto",
                                                whiteSpace: "nowrap",
                                                flex: 1
                                            }}
                                            component={Link}
                                            to={`/detailed-lab-result/${challenge.id}`}
                                            size="small"
                                        >
                                            View Detailed Result
                                        </Button>
                                    </Box>




                                </CardContent>
                            </Card> : <Card key={challenge.id} sx={{
                                background: alpha(theme.palette.primary.dark, 0.75),
                                border: "1px solid",
                                borderColor: theme.palette.divider,
                                borderRadius: 4,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column"
                            }}>
                                <CardContent sx={{
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    p: { xs: 2, sm: 3 }
                                }}>
                                    {/* Challenge Header */}
                                    <Box sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1,
                                        mb: 2
                                    }}>
                                        <Box sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                            flexWrap: "wrap",
                                            gap: 1
                                        }}>
                                            <Typography
                                                variant='caption'
                                                sx={{
                                                    color: getAnswerTypeColor(challenge.answer_string_type),
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                    fontSize: { xs: "0.75rem", sm: "0.8rem" }
                                                }}
                                            >
                                                <Circle sx={{
                                                    fontSize: 8,
                                                    color: getAnswerTypeColor(challenge.answer_string_type),
                                                    boxShadow: `0 0 6px 2px ${getAnswerTypeColor(challenge.answer_string_type)}`,
                                                    borderRadius: '50%',
                                                    background: getAnswerTypeColor(challenge.answer_string_type)
                                                }} />
                                                <span>Challenge - {index + 1}</span>
                                            </Typography>

                                            <Typography
                                                variant='caption'
                                                sx={{
                                                    background: theme.palette.background.paper,
                                                    color: theme.palette.text.primary,
                                                    px: 2,
                                                    py: 0.3,
                                                    borderRadius: 2,
                                                    fontSize: { xs: "0.65rem", sm: "0.75rem" },
                                                    fontWeight: 600, border: "1px solid", borderColor: theme.palette.divider
                                                }}
                                            >
                                                {challenge.max_score} pts
                                            </Typography>
                                        </Box>

                                        <Box sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 1,
                                            alignItems: "center"
                                        }}>
                                            <Chip
                                                icon={getAnswerTypeIcon(challenge.answer_string_type)}
                                                label={`${challenge.answer_string_type}`}
                                                size="small"
                                                sx={{
                                                    backgroundColor: alpha(getAnswerTypeColor(challenge.answer_string_type), 0.25),
                                                    color: theme.palette.text.primary, fontWeight: 700,
                                                    border: `1px solid ${theme.palette.divider}`,
                                                    fontSize: { xs: "0.65rem", sm: "0.75rem" },
                                                    px: 2
                                                }}
                                            />

                                            <Chip
                                                icon={challenge.auto_evaluate ? <SmartToy sx={{ fontSize: "14px !important" }} /> : <PersonOutline sx={{ fontSize: "14px !important" }} />}
                                                label={challenge.auto_evaluate ? "Auto" : "Manual"}
                                                size="small"

                                                sx={{
                                                    backgroundColor: alpha(getAnswerTypeColor(challenge.answer_string_type), 0.25),
                                                    color: theme.palette.text.primary, fontWeight: 700,
                                                    border: `1px solid ${theme.palette.divider}`,
                                                    fontSize: { xs: "0.65rem", sm: "0.75rem" },
                                                    px: 2
                                                }}
                                            />

                                            <Chip

                                                label={new Date(challenge.createdAt).toLocaleDateString()}
                                                size="small"

                                                sx={{
                                                    backgroundColor: alpha(getAnswerTypeColor(challenge.answer_string_type), 0.25),
                                                    color: theme.palette.text.primary, fontWeight: 700,
                                                    border: `1px solid ${theme.palette.divider}`,
                                                    fontSize: { xs: "0.65rem", sm: "0.75rem" },
                                                    px: 2
                                                }}
                                            />
                                        </Box>
                                    </Box>

                                    {/* Challenge Content */}
                                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
                                        <Typography
                                            variant='body1'
                                            fontWeight={400}
                                            sx={{
                                                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                                                lineHeight: 1.4
                                            }}
                                        >
                                            {challenge.challenge_text}
                                        </Typography>

                                        {challenge.description && (
                                            <Typography
                                                variant='body2'
                                                sx={{
                                                    color: theme.palette.text.secondary,
                                                    fontSize: { xs: "0.67rem", sm: "0.8rem" },

                                                }}
                                            >
                                                {challenge.description}
                                            </Typography>
                                        )}

                                        {challenge.sample_input && (
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
                                                    Hint:
                                                </Typography>
                                                <Typography
                                                    variant='body2'
                                                    sx={{
                                                        fontFamily: "monospace",
                                                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                                        mt: 0.5
                                                    }}
                                                >
                                                    {challenge.sample_input}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>



                                    {/* Challenge Actions */}
                                    <Box sx={{
                                        mt: 2

                                    }}>
                                        <Button
                                            startIcon={<Biotech sx={{ fontSize: "16px !important" }} />}
                                            sx={{
                                                px: { xs: 1.5, sm: 2 },
                                                py: 0.5,
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                background: alpha(getAnswerTypeColor(challenge.answer_string_type), 0.25),
                                                border: '1px solid',
                                                borderRadius: 4,
                                                borderColor: theme.palette.divider,
                                                color: theme.palette.text.primary,
                                                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                                minWidth: "auto",
                                                whiteSpace: "nowrap",
                                                flex: 1
                                            }}
                                            component={Link}
                                            to={`/attempt-challenge/${challenge.id}`}
                                            size="small"
                                        >
                                            Attempt Challenge
                                        </Button>
                                    </Box>




                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}
            </Box>
        </Box >
    );
}
export default LabChallengesForStudents;

