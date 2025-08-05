import { useParams } from 'react-router-dom'
import { useGetSingleCourseQuery } from '../../app/api/createCourseApi'
import { Alert, Avatar, Box, Button, Card, CardMedia, CircularProgress, Container, List, ListItem, Rating, Typography, useMediaQuery, useTheme } from '@mui/material'
import { CheckCircle, Language, Speed, } from '@mui/icons-material';
import { FaStopwatch, } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import { useEnrollStudentMutation } from '../../app/api/enrollmentApi';
import toast from 'react-hot-toast';
import { FILEURLPRE } from '../../components/other/Defaulturl';
import { useEffect } from 'react';


function SingleCourseDetails() {
    const { courseId } = useParams<{ courseId: string }>();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
    const { data: courseData, isFetching } = useGetSingleCourseQuery({ courseId });
    const [enrollStudent, { error: enrollmentError, isError: isEnrollmentError, isSuccess: enrollmentSuccess }] = useEnrollStudentMutation()

    if (!courseId) {
        return (
            <Typography variant='h3' sx={{ height: "70vh", width: "100%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                course not found.
            </Typography>
        );
    }

    useEffect(() => {
        if (isEnrollmentError && enrollmentError && 'data' in enrollmentError) {
            toast.error(`${JSON.stringify((enrollmentError.data as any).error)}`)
        }
    }, [isEnrollmentError, enrollmentError])

    if (isFetching) {
        return (
            <Box sx={{ height: "70vh", width: "100%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </Box>
        );
    }
    const enrollStudentHandle = () => {
        if (courseData?.course.id) {
            enrollStudent({ courseId: courseData?.course.id })
        }
    }
    let titleVariant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" = 'h6';
    if (isXs) {
        titleVariant = 'h6';
    } else if (isSm) {
        titleVariant = 'h6';
    } else if (isMd) {
        titleVariant = 'h5';
    } else if (isLgUp) {
        titleVariant = 'h4';
    }

    let descVariant: "body2" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" = 'h6';
    if (isXs) {
        descVariant = 'body2';
    } else if (isSm) {
        descVariant = 'body1';
    } else if (isMd) {
        descVariant = 'body1';
    } else if (isLgUp) {
        descVariant = 'body1';
    }

    const checkPoints = [
        "Expert-Curated Content", "Self-Paced Learning", "Hands-On Practice", "Certificate of Completion", "Mobile & Desktop Access"
    ]
    const cleanWhatYouWillLearn = DOMPurify.sanitize(courseData?.course ? courseData?.course.whatYouWillLearn : "");

    return (
        <Container>
            <Box>
                <CardMedia
                    component="img"
                    src={`${FILEURLPRE}/${courseData?.course.course_thumbnail_url}`}
                    sx={{ backgroundColor: theme.palette.background.paper, marginTop: 1, borderRadius: 4, boxShadow: `-1.5px 4px 2px ${theme.palette.secondary.light}`, maxHeight: "50vh", border: "1px solid", borderColor: theme.palette.divider }}

                />
            </Box>
            <Box sx={{ backgroundColor: theme.palette.primary.dark, marginTop: 3, borderRadius: 4, boxShadow: `-1.5px 4px 2px ${theme.palette.secondary.light}`, border: "1px solid", borderColor: theme.palette.divider }}>
                {enrollmentSuccess && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        Enrolled Successfully...
                    </Alert>
                )}

                {isEnrollmentError && enrollmentError && 'data' in enrollmentError &&
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {JSON.stringify((enrollmentError.data as any).error)}
                    </Alert>
                }
                <Box sx={{
                    padding: 5, display: 'flex', flexDirection: {
                        xs: "column",
                        sm: "column",
                        md: "row",
                        lg: "row"
                    }, gap: 2, alignItems: "center", justifyContent: "center"
                }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                        <Box>
                            {/* <Typography fontWeight={500} sx={{ color: theme.palette.text.secondary }}>TITLE</Typography> */}
                            <Typography variant={titleVariant} fontWeight={{ xs: 500, sm: 500, md: 500 }}>
                                {courseData?.course.title + " : " + courseData?.course.subtitle}
                            </Typography>

                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2, p: 1, }}>
                            <Avatar src={courseData?.course.course_teacher.profile} sx={{
                                width: { xs: 45, sm: 50, md: 50, lg: 55 },
                                height: { xs: 45, sm: 50, md: 50, lg: 55 }
                            }} />
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.2 }}>
                                <Typography fontWeight={500} variant='caption' sx={{ color: theme.palette.text.secondary }}>TEACHER NAME</Typography>
                                <Typography variant='body1' >
                                    {courseData?.course.course_teacher.name + " "} ({courseData?.course.course_teacher.qualifications})
                                </Typography>
                            </Box>
                        </Box>

                        <Box>
                            <Typography fontWeight={100} sx={{ color: theme.palette.text.secondary }}>DESCRIPTION</Typography>

                            <Typography variant={descVariant} sx={{ fontWeight: 100 }}>
                                {courseData?.course.description}
                            </Typography>
                        </Box>
                    </Box>
                    <Box >
                        <Card sx={{ p: 2, width: "290px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: theme.palette.background.paper, border: "1px solid", borderColor: theme.palette.divider, borderRadius: 3 }}>
                            <Typography variant="h5" fontWeight={800} sx={{ fontStyle: "italic", color: theme.palette.primary.light }}>
                                Advance your Career
                            </Typography>

                            <Button variant="contained" onClick={enrollStudentHandle}>
                                Enroll Now
                            </Button>
                            <Box>

                                <List>
                                    {checkPoints && checkPoints.map((checkpoint) => <ListItem sx={{ display: "flex", gap: 2 }}>
                                        <CheckCircle sx={{
                                            fontSize: 15,

                                        }} />
                                        <Typography>
                                            {checkpoint}
                                        </Typography>
                                    </ListItem>)}
                                </List>
                            </Box>
                        </Card>

                    </Box>
                </Box>
            </Box>



            <Box sx={{
                backgroundColor: theme.palette.primary.dark, marginTop: 4, borderRadius: 4, display: "flex", flexDirection: {
                    xs: "column",
                    sm: "column",
                    md: "row",
                    lg: "row"
                }, alignItems: { xs: "left", sm: "left", md: "center", lg: "center", xl: "center" }, justifyContent: {
                    xs: "left",
                    sm: "left",
                    md: "space-between",
                    lg: 'space-between',
                    xl: "space-between"
                }, pt: 3, pb: 3, pl: {
                    xs: 2,
                    sm: 4,
                    md: 4,
                    lg: 5
                }, pr: 5, boxShadow: `-1.5px 4px 2px ${theme.palette.secondary.light}`, gap: {
                    xs: 3,
                    sm: 3,
                    md: 3,
                    lg: 3,
                    xl: 3
                }, border: "1px solid", borderColor: theme.palette.divider
            }}>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "left", justifyContent: "left", gap: 2 }}>
                    <Speed sx={{
                        fontSize: 30
                    }} />
                    <Box>
                        <Typography>{courseData?.course.level}</Typography>
                        <Typography>Deficulty level according to creator</Typography>
                    </Box>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "left", justifyContent: "left", gap: 2 }}>
                    <FaStopwatch size={25} />
                    <Box>
                        <Typography>{courseData?.course.duration}</Typography>
                        <Typography>Credit hours of content avaliable</Typography>
                    </Box>

                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "left", justifyContent: "left", gap: 2 }}>
                    <Language sx={{
                        fontSize: 30
                    }} />
                    <Box>
                        <Typography>{courseData?.course.language}</Typography>
                        <Typography>Course language</Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                backgroundColor: theme.palette.primary.dark, marginTop: 4, borderRadius: 4, display: "flex", flexDirection: "column", alignItems: "left", pt: 3, pb: 3, pl: 5, pr: {
                    xs: 5,
                    sm: 5,
                    md: 10,
                    lg: 20
                }, boxShadow: `-1.5px 4px 2px ${theme.palette.secondary.light}`, gap: {
                    xs: 3,
                    sm: 3,
                    md: 0,
                    lg: 0,
                    xl: 0
                }, border: "1px solid", borderColor: theme.palette.divider
            }}>
                <Typography variant='h5' fontWeight={700} sx={{ color: theme.palette.text.secondary }}>

                    Pre-Requisites:
                </Typography>
                <Typography sx={{ pt: 2, pb: 3 }}>{courseData?.course.preRequisites}</Typography>
                <Typography variant='h5' fontWeight={700} sx={{ color: theme.palette.text.secondary }}>

                    What You Will Learn:

                </Typography>
                <Box
                    dangerouslySetInnerHTML={{ __html: cleanWhatYouWillLearn }}

                />

            </Box>
            <Box sx={{ backgroundColor: theme.palette.primary.dark, mb: 5, marginTop: 2, boxShadow: `-1.5px 4px 2px ${theme.palette.secondary.light}`, padding: 3, display: 'flex', alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 2, border: '1px solid', borderRadius: 4, borderColor: theme.palette.divider }}>
                <Typography variant='h4' fontWeight={600} sx={{ fontStyle: "italic", color: theme.palette.primary.light }}>
                    Get full access to all avaliable content:
                </Typography>
                <Button variant='contained' size='large' onClick={enrollStudentHandle}>
                    Enroll Now
                </Button>
            </Box>
        </Container>
    )
}

export default SingleCourseDetails