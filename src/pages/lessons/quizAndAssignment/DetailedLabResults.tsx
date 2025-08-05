import { Link, useParams } from 'react-router-dom'
import { alpha, Box, Button, Chip, CircularProgress, Typography, useTheme } from '@mui/material'
import { useDetailedLabResultQuery } from '../../../app/api/labApi'
import { Code, TextFields, Flag, PersonOutline, SmartToy, CheckCircle, Cancel, HowToRegOutlined, LiveTvTwoTone, PersonAddAlt1Outlined, TrendingDownOutlined, TrendingUpOutlined, Circle, AddToQueue, KeyboardDoubleArrowLeft } from '@mui/icons-material'

// Types
export type ChallengeBreakdown = {
    semantic: number;
    structural: number;
    lexical: number;
};

export type ChallengeSubmission = {
    submitted_code?: string | null;
    submitted_text?: string | null;
    submitted_flag?: string | null;
    obtained_marks: number;
    similarity_score?: number | null;
    breakdown?: ChallengeBreakdown | null;
    grade?: string | null;
    remarks?: string | null;
    passed: boolean;
    confidence?: number | null;
    createdAt: string;
    updatedAt: string;
};

export type ChallengeMeta = {
    id: string;
    title: string;
    description?: string | null;
    type: 'Code' | 'Text' | 'Flag';
    max_score: number;
    correctAnswer: string;
    evaluationMethod: boolean;
};

export type LabMeta = {
    id: string;
    title: string;
};

export type DetailedLabResultResponse = {
    message: string;
    challenge: ChallengeMeta;
    submission: ChallengeSubmission;
    lab: LabMeta;
};

function DetailedLabResults() {
    const { challengeId } = useParams()
    const { data: resultData, isLoading: resultDataLoading, isError: resultDataError, error: resultError } = useDetailedLabResultQuery({ challengeId })
    const theme = useTheme()

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

    // Helper function to get submitted answer based on challenge type
    const getSubmittedAnswer = (submission: ChallengeSubmission, challengeType: string) => {
        switch (challengeType) {
            case 'Code':
                return submission.submitted_code || 'No code submitted';
            case 'Text':
                return submission.submitted_text || 'No text submitted';
            case 'Flag':
                return submission.submitted_flag || 'No flag submitted';
            default:
                return 'No answer submitted';
        }
    };

    // Helper function to format date
    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleString();
        } catch {
            return 'Invalid date';
        }
    };

    // Helper function to format percentage values
    const formatPercentage = (value: number | null | undefined) => {
        if (value === null || value === undefined) return 'N/A';
        return `${Math.round(value)}%`;
    };

    // Helper function to format confidence
    const formatConfidence = (value: number | null | undefined) => {
        if (value === null || value === undefined) return 'N/A';
        return `${Math.round(value)}%`;
    };

    if (resultDataLoading) {
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

    if (resultDataError) {
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
                    An error occurred while loading the lab result.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Please try again later.
                </Typography>
            </Box>
        );
    }

    if (!resultData) {
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
                    Challenge result not found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    No submission found for this challenge.
                </Typography>
            </Box>
        );
    }

    const { challenge, submission, lab } = resultData;

    // Build analytics array conditionally based on challenge type and available data
    const analytics = [
        // Submission date
        ...(submission.createdAt ? [{
            title: "Attempted At",
            icon: <LiveTvTwoTone sx={{ color: "primary.main" }} />,
            desc: "Date when challenge was submitted",
            value: new Date(submission.createdAt).toLocaleDateString(),
            color: theme.palette.primary.main
        }] : []),

        // Score (normalized if not Flag)
        {
            title: "Score",
            icon: <TrendingUpOutlined sx={{ color: "success.light" }} />,
            desc:
                challenge.type === "Flag"
                    ? `Obtained marks out of ${challenge.max_score}`
                    : `Normalized AI given similarity score out of 100`,
            value:
                challenge.type === "Flag"
                    ? `${submission.obtained_marks}/${challenge.max_score}`
                    : `${submission.obtained_marks}/100`,
            color: submission.passed ? theme.palette.success.light : theme.palette.error.light
        },

        // Similarity Score
        // ...(challenge.type !== 'Flag' && submission.similarity_score != null ? [{
        //     title: "Similarity Score",
        //     icon: <HowToRegOutlined sx={{ color: "success.light" }} />,
        //     desc: "How similar your answer was to the correct answer",
        //     value: formatPercentage(submission.similarity_score),
        //     color: theme.palette.success.light
        // }] : []),

        // Grade
        ...(submission.grade ? [{
            title: "Grade",
            icon: <PersonAddAlt1Outlined sx={{ color: "warning.light" }} />,
            desc: "Grade assigned by the evaluation system",
            value: submission.grade,
            color: theme.palette.warning.light
        }] : []),

        // Confidence
        // ...(challenge.type !== 'Flag' && submission.confidence != null ? [{
        //     title: "Confidence",
        //     icon: <TrendingUpOutlined sx={{ color: "success.light" }} />,
        //     desc: "How confident the AI is about its evaluation",
        //     value: formatConfidence(submission.confidence),
        //     color: theme.palette.success.light
        // }] : []),

        // Breakdown (semantic, structural, lexical)
        ...(challenge.type.toLowerCase() !== 'flag' && submission.breakdown ? [
            {
                title: "Lexical Similarity",
                icon: <TrendingUpOutlined sx={{ color: "info.light" }} />,
                desc: "Word-for-word overlap between answers",
                value: formatPercentage(submission.breakdown.lexical),
                color: theme.palette.info.light
            },
            {
                title: "Semantic Similarity",
                icon: <TrendingUpOutlined sx={{ color: "primary.light" }} />,
                desc: "Meaning similarity despite different words",
                value: formatPercentage(submission.breakdown.semantic),
                color: theme.palette.primary.light
            },
            {
                title: "Structural Similarity",
                icon: <TrendingUpOutlined sx={{ color: "warning.light" }} />,
                desc: "Arrangement and structure similarity",
                value: formatPercentage(submission.breakdown.structural),
                color: theme.palette.warning.light
            }
        ] : [])
    ];


    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mx: 5, my: 2,
            px: { xs: 1, sm: 2 }
        }}>
            <Box sx={{
                width: "100%",
                maxWidth: { xs: "100%", sm: "95%", md: "90%", lg: "1300px" },
                mx: 5,
                display: "flex",
                flexDirection: "column",
                gap: 3
            }}>

                {/* Header Section */}
                <Box sx={{ display: "flex", flexDirection: 'row', gap: 2, width: "100%" }}>
                    {/* Status Cards */}
                    <Box sx={{
                        width: "25%",
                        border: "1px solid",
                        p: 3,
                        borderColor: theme.palette.divider,
                        borderRadius: 4,
                        background: alpha(theme.palette.primary.main, 0.15),
                        display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                        <Box sx={{ display: "grid", alignItems: "center", gap: 2, gridTemplateColumns: "1fr", width: "100%" }}>
                            <Typography variant='h6' fontWeight={600} sx={{ color: theme.palette.text.primary, textAlign: 'center' }}>
                                Challenge Info
                            </Typography>
                            <Chip
                                icon={getAnswerTypeIcon(challenge.type)}
                                label={`${challenge.type} Challenge`}
                                size="small"
                                sx={{
                                    backgroundColor: alpha(getAnswerTypeColor(challenge.type), 0.4),
                                    color: theme.palette.text.primary,
                                    fontWeight: 700,
                                    border: `1px solid ${theme.palette.divider}`,
                                    fontSize: { xs: "0.65rem", sm: "0.75rem" },
                                    px: 2,
                                }}
                            />

                            {/* Evaluation Method Chip */}
                            <Chip
                                icon={challenge.evaluationMethod ? <SmartToy sx={{ fontSize: "14px !important" }} /> : <PersonOutline sx={{ fontSize: "14px !important" }} />}
                                label={challenge.evaluationMethod ? "Auto Evaluation" : "Manual Evaluation"}
                                size="small"
                                sx={{
                                    backgroundColor: alpha(theme.palette.info.main, 0.4),
                                    color: theme.palette.text.primary,
                                    fontWeight: 700,
                                    border: `1px solid ${theme.palette.divider}`,
                                    fontSize: { xs: "0.65rem", sm: "0.75rem" },
                                    px: 2
                                }}
                            />

                            {/* Pass/Fail Status Chip */}
                            <Chip
                                icon={submission.passed ? <CheckCircle sx={{ fontSize: "14px !important" }} /> : <Cancel sx={{ fontSize: "14px !important" }} />}
                                label={submission.passed ? "Passed" : "Failed"}
                                size="small"
                                sx={{
                                    backgroundColor: alpha(submission.passed ? theme.palette.success.main : theme.palette.error.main, 0.4),
                                    color: theme.palette.text.primary,
                                    fontWeight: 700,
                                    border: `1px solid ${theme.palette.divider}`,
                                    fontSize: { xs: "0.65rem", sm: "0.75rem" },
                                    px: 2
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Challenge Info */}
                    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 1, border: "1px solid", borderColor: theme.palette.divider, borderRadius: 4, width: "75%" }}>
                        <Box>
                            <Typography variant='caption' fontWeight={600} sx={{ color: theme.palette.text.secondary }}>
                                CHALLENGE TITLE
                            </Typography>
                            <Typography
                                variant="body1"
                                fontWeight={500}
                                sx={{
                                    fontSize: { xs: '1rem', sm: '1rem', md: '1.5rem' },
                                    textShadow: `0 0 12px ${theme.palette.warning.light}`,
                                    wordBreak: "break-word"
                                }}
                            >
                                {challenge.title}
                            </Typography>
                        </Box>

                        {/* Show description if available */}
                        {challenge.description && (
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
                                    {challenge.description}
                                </Typography>
                            </Box>
                        )}

                        {/* Show lab info */}
                        <Box>
                            <Button component={Link} to={`/view-lab-challenges-student/${resultData.lab.lessonId}`} startIcon={<KeyboardDoubleArrowLeft sx={{ fontSize: "18.5px !important" }} />}
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
                                }}>Go back to the lab</Button>

                        </Box>
                    </Box>
                </Box>

                {/* Analytics Grid - Only show if we have analytics data */}
                {analytics.length > 0 && (
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "1fr 1fr",
                            md: "repeat(2, 1fr)",
                            lg: "repeat(3, 1fr)",
                            xl: "repeat(4, 1fr)"
                        },
                        gap: { xs: 2, sm: 3 },

                    }}>
                        {analytics.map((stat, index) => (
                            <Box
                                key={index}
                                sx={{
                                    border: "1px solid",
                                    borderColor: alpha(stat.color, 0.2),
                                    p: { xs: 1.5, sm: 2 },
                                    background: alpha(stat.color, 0.12),
                                    borderRadius: 4,
                                    display: "flex",
                                    gap: 1,
                                    justifyContent: "space-between",
                                    alignItems: "center",

                                }}
                            >
                                <Box sx={{ minWidth: 0, flex: 1 }}>
                                    <Typography sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        fontSize: { xs: '0.8rem', sm: '0.9rem' }
                                    }}>
                                        <Circle sx={{
                                            fontSize: 10,
                                            color: `${stat.color}`,
                                            boxShadow: `0 0 6px 2px ${stat.color}`,
                                            borderRadius: '50%',
                                            background: stat.color
                                        }} />
                                        <span>{stat.title}</span>
                                        <span>{stat.value}</span>
                                    </Typography>

                                    <Typography
                                        fontWeight={100}
                                        variant="caption"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            display: 'block',
                                            mt: 0.5,
                                            fontSize: { xs: '0.rem', sm: '0.8rem' }
                                        }}
                                    >
                                        {stat.desc}
                                    </Typography>

                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}

                {/* Detailed Answer Section */}
                <Box sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    background: alpha(theme.palette.primary.dark, 0.7),
                    border: "1px solid",
                    borderColor: theme.palette.divider,
                    p: { xs: 2, sm: 3 },
                    borderRadius: 4
                }}>
                    {/* Correct Answer */}
                    <Box>
                        <Typography variant='caption' fontWeight={600} sx={{ color: theme.palette.text.secondary }}>
                            CORRECT ANSWER
                        </Typography>
                        <Typography
                            variant='body2'
                            sx={{
                                color: theme.palette.success.main,
                                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                mt: 1,
                                backgroundColor: alpha(theme.palette.success.main, 0.1),
                                px: 3,
                                py: 2,
                                borderRadius: 3,
                                fontFamily: challenge.type === 'Code' ? 'monospace' : 'inherit',
                                whiteSpace: challenge.type === 'Code' ? 'pre-wrap' : 'normal'
                            }}
                        >
                            {challenge.correctAnswer}
                        </Typography>
                    </Box>

                    {/* Submitted Answer */}
                    <Box>
                        <Typography variant='caption' fontWeight={600} sx={{ color: theme.palette.text.secondary }}>
                            YOUR ANSWER
                        </Typography>
                        <Typography
                            variant='body2'
                            sx={{
                                color: submission.passed ? theme.palette.success.main : theme.palette.error.main,
                                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                mt: 1,
                                backgroundColor: alpha(submission.passed ? theme.palette.success.main : theme.palette.error.main, 0.1),
                                px: 3,
                                py: 2,
                                borderRadius: 3,

                                fontFamily: challenge.type === 'Code' ? 'monospace' : 'inherit',
                                whiteSpace: challenge.type === 'Code' ? 'pre-wrap' : 'normal'
                            }}
                        >
                            {getSubmittedAnswer(submission, challenge.type)}
                        </Typography>
                    </Box>



                    {/* Remarks/Feedback - Only show if available */}
                    {submission.remarks && (
                        <Box>
                            <Typography variant='caption' fontWeight={600} sx={{ color: theme.palette.text.secondary }}>
                                FEEDBACK
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    color: theme.palette.text.primary,
                                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                    mt: 1,

                                    backgroundColor: alpha(theme.palette.info.main, 0.1),
                                    px: 3,
                                    py: 2,
                                    borderRadius: 3,
                                }}
                            >
                                {submission.remarks}
                            </Typography>
                        </Box>
                    )}



                </Box>
            </Box>
        </Box >
    )
}

export default DetailedLabResults