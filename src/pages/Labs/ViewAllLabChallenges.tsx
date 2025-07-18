import React from 'react';
import {
    alpha,
    Box,
    Button,
    Chip,
    CircularProgress,
    Typography,
    useTheme,
    Card,
    CardContent,
    Divider
} from '@mui/material';
import {
    CheckCircle,
    Cancel,
    AddCircleOutlineTwoTone,
    AccessTimeFilled,
    Circle,
    Edit,
    Code,
    TextFields,
    Flag,
    Score,
    SmartToy,
    PersonOutline,
    Info
} from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useViewAllLabChallengesTeacherQuery } from '../../app/api/labApi';


function ViewAllLabChallenges() {
    const { labId } = useParams();
    const theme = useTheme();

    const { data: challangeData, isError, isLoading, isSuccess, error } = useViewAllLabChallengesTeacherQuery({ labId })

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
                return theme.palette.info.main;
            case 'Text':
                return theme.palette.success.main;
            case 'Flag':
                return theme.palette.warning.main;
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


    const challenges = challangeData?.data.challenges;
    const summary = challangeData?.data.summary;
    const lab = challangeData?.data.lab;

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
                {/* Header Section */}
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: { xs: "column", lg: "row" },
                    alignItems: "stretch",
                    gap: { xs: 2, sm: 3 },
                    mb: 3
                }}>
                    {/* Lab Summary Card */}
                    <Box sx={{
                        width: { xs: "100%", lg: "320px" },
                        minWidth: { lg: "320px" },
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
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
                                fontSize: { xs: "1.3rem", sm: "1.5rem" }
                            }}
                        >
                            Lab Challenges Overview
                        </Typography>

                        <Box sx={{
                            display: "flex",
                            gap: 1,
                            flexWrap: "wrap",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            {
                                lab && lab.createdAt && <Chip
                                    icon={<AccessTimeFilled sx={{ fontSize: "16px !important" }} />}
                                    label={`Created ${new Date(lab.createdAt).toLocaleDateString()}`}
                                    color="secondary"
                                    size="small"
                                    sx={{
                                        px: 0.5,
                                        minWidth: "auto",
                                        fontSize: { xs: "0.65rem", sm: "0.75rem" }
                                    }}
                                />
                            }
                            <Chip
                                icon={<Score sx={{ fontSize: "16px !important" }} />}
                                label={`Total Score: ${summary?.totalMaxScore}`}
                                color="warning"
                                size="small"
                                sx={{
                                    minWidth: "auto",
                                    fontSize: { xs: "0.65rem", sm: "0.75rem" },
                                    color: theme.palette.text.primary, fontWeight: 600
                                }}
                            />
                            <Chip
                                icon={summary?.hasChallenges ? <CheckCircle sx={{ fontSize: "16px !important" }} /> : <Cancel sx={{ fontSize: "16px !important" }} />}
                                label={`${summary?.totalChallenges} Challenges`}
                                color={summary?.hasChallenges ? "success" : "error"}
                                size="small"
                                sx={{
                                    minWidth: "auto",
                                    fontSize: { xs: "0.65rem", sm: "0.75rem" }
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Lab Info Card */}
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
                                <span>Lab Title</span>
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
                                {lab?.title}
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                    mt: 1
                                }}
                            >
                                {lab?.description}
                            </Typography>
                        </Box>

                        <Box sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1.5,
                            alignItems: "center",
                            mt: 2
                        }}>
                            <Button
                                startIcon={<AddCircleOutlineTwoTone sx={{ fontSize: "16px !important" }} />}
                                sx={{
                                    px: { xs: 1.5, sm: 2 },
                                    py: 0.5,
                                    fontWeight: 400,
                                    textTransform: 'none',
                                    background: theme.palette.warning.main,
                                    border: '1px solid',
                                    borderRadius: 4,
                                    borderColor: theme.palette.divider,
                                    color: theme.palette.text.primary,
                                    fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                    minWidth: "auto",
                                    whiteSpace: "nowrap"
                                }}
                                component={Link}
                                to={`/add-lab-challenge/${lab?.id}`}
                                size="small"
                            >
                                Add New Challenge
                            </Button>

                            <Button
                                startIcon={<Edit sx={{ fontSize: "16px !important" }} />}
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
                                to={`/edit-lab/${lab?.id}`}
                                size="small"
                            >
                                Edit Lab
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* No Challenges Message */}
                {!summary?.hasChallenges && (
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
                        mb: 3
                    }}>
                        <Info sx={{ fontSize: 20, color: theme.palette.text.secondary, flexShrink: 0 }} />
                        <Typography sx={{
                            color: theme.palette.text.secondary,
                            fontSize: { xs: "0.8rem", sm: "0.875rem" }
                        }}>
                            No challenges have been created for this lab yet. Create your first challenge to get started!
                        </Typography>
                    </Box>
                )}

                {/* Challenges Grid */}
                {summary?.hasChallenges && (
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(2, 1fr)",

                        },
                        gap: { xs: 2, sm: 3 },
                        mb: 3
                    }}>
                        {challenges?.map((challenge, index) => (
                            <Card key={challenge.id} sx={{
                                background: alpha(theme.palette.primary.dark, 0.55),
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
                                                    color: theme.palette.info.light,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                    fontSize: { xs: "0.75rem", sm: "0.8rem" }
                                                }}
                                            >
                                                <Circle sx={{
                                                    fontSize: 8,
                                                    color: theme.palette.info.light,
                                                    boxShadow: `0 0 6px 2px ${theme.palette.info.light}`,
                                                    borderRadius: '50%',
                                                    background: theme.palette.info.light
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
                                                    backgroundColor: alpha(getAnswerTypeColor(challenge.answer_string_type), 0.2),
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
                                                    backgroundColor: alpha(getAnswerTypeColor(challenge.answer_string_type), 0.2),
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
                                                    backgroundColor: alpha(getAnswerTypeColor(challenge.answer_string_type), 0.2),
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
                                                background: alpha(theme.palette.background.paper, 0.1),
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
                                            startIcon={<Edit sx={{ fontSize: "16px !important" }} />}
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
                                                whiteSpace: "nowrap",
                                                flex: 1
                                            }}
                                            component={Link}
                                            to={`/update-challenge/${challenge.id}`}
                                            size="small"
                                        >
                                            Edit Challenge
                                        </Button>
                                    </Box>

                                    {/* Challenge Metadata */}

                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default ViewAllLabChallenges;

