import { useParams } from 'react-router-dom'
import { useGetSingleCourseQuery } from '../../app/api/createCourseApi'
import { Alert, Avatar, Box, Button, Card, CardMedia, CircularProgress, Container,  List, ListItem, Rating,  Typography, useMediaQuery, useTheme } from '@mui/material'
import { AssignmentTurnedIn, CheckCircle, Language,  Lightbulb,  Speed,  } from '@mui/icons-material';
import { FaStopwatch, } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import { useEnrollStudentMutation } from '../../app/api/enrollmentApi';
import toast from 'react-hot-toast';
function SingleCourseDetails() {
    const { courseId } = useParams<{ courseId: string }>();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
    const { data: courseData, isFetching, isError, error } = useGetSingleCourseQuery({courseId});
    const [enrollStudent,{error:enrollmentError,isError:isEnrollmentError,isSuccess:enrollmentSuccess,isLoading:enrollmentLoading}]=useEnrollStudentMutation()
    
    if (!courseId) {
        return (
            <Typography variant='h3' sx={{ height: "70vh", width: "100%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                course not found.
            </Typography>
        );
    }

     if(isEnrollmentError && enrollmentError && 'data' in enrollmentError){
            toast.error(`${JSON.stringify((enrollmentError.data as any).error)}`)
          }  

    if (isFetching) {
        return (
            <Box sx={{ height: "70vh", width: "100%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </Box>
        );
    }
    const enrollStudentHandle=()=>{
         if(courseData?.course.id){
            enrollStudent({courseId:courseData?.course.id})
         }
    }
    let titleVariant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" = 'h6';
    if (isXs) {
        titleVariant = 'h6';
    } else if (isSm) {
        titleVariant = 'h6';
    } else if (isMd) {
        titleVariant = 'h3';
    } else if (isLgUp) {
        titleVariant = 'h2';
    }

    let descVariant: "body2" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" = 'h6';
    if (isXs) {
        descVariant = 'body2';
    } else if (isSm) {
        descVariant = 'body1';
    } else if (isMd) {
        descVariant = 'h6';
    } else if (isLgUp) {
        descVariant = 'h6';
    }
 
    const checkPoints=[
        "Expert-Curated Content","Self-Paced Learning","Hands-On Practice","Certificate of Completion","Mobile & Desktop Access"
    ]
    const cleanWhatYouWillLearn = DOMPurify.sanitize(courseData.course?courseData.course.whatYouWillLearn:"");
    return (
        <Container>
            <Box>
                <CardMedia
                component="img"
                src={courseData?.course.course_thumbnail_url}
                sx={{ backgroundColor: theme.palette.background.paper, marginTop: 1, borderRadius: 4,boxShadow:`-1.5px 4px 2px ${theme.palette.secondary.light}`,maxHeight:"85vh"}}

                />
            </Box>
            <Box  sx={{ backgroundColor: theme.palette.background.paper, marginTop: 3, borderRadius: 4,boxShadow:`-1.5px 4px 2px ${theme.palette.secondary.light}`}}>
                 {enrollmentSuccess&& (
                          <Alert severity="success" sx={{ mb: 2 }}>
                            Enrolled Successfully...
                          </Alert>
                        )}
                
                      {isEnrollmentError && enrollmentError && 'data' in enrollmentError &&
                              <Alert severity="error" sx={{ mb: 2 }}>
                                    {JSON.stringify((enrollmentError.data as any).error)}  
                               </Alert>
                                }
            <Box sx={{padding:5,display:'flex',flexDirection:{
                xs:"column",
                sm:"column",
                md:"row",
                lg:"row"
            },gap:2,alignItems:"center",justifyContent:"center"}}>
               <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
              
                <Box>
                    <Typography variant={titleVariant} fontWeight={{ xs: 700, sm: 800, md: 900 }}>
                        {courseData?.course.title+ " : "+courseData?.course.subtitle}
                    </Typography>
                    
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2, p: 1,  }}>
                    <Avatar src={courseData?.course.course_teacher.profile} sx={{
                        width: { xs: 35, sm: 35, md: 50, lg: 50 },
                        height: { xs: 35, sm: 35, md: 50, lg: 50 }
                    }} />
                    <Typography variant='body1' >
                        {courseData?.course.course_teacher.name + " "} {courseData?.course.course_teacher.qualifications}
                    </Typography>
                </Box>
                <Box sx={{display:"flex",flexDirection:"row",alignItems:"center",gap:1}}>
                <Rating
                name="text-feedback"
                value={courseData?.course.avg_rating||0}
                readOnly
                precision={0.5}
              />
              <Typography variant="h6">
                {courseData?.course.avg_rating||0}
              </Typography>
                </Box>
                <Box>
                    <Typography variant={descVariant}>
                        {courseData?.course.description}
                    </Typography>
                </Box>
               </Box>
               <Box >
                <Card sx={{p:2,width:"290px",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                <Typography variant="h5" fontWeight={800}sx={{fontStyle:"italic",color:theme.palette.primary.light}}>
                    Advance your Career
                </Typography>
                
                <Button variant="contained"  onClick={enrollStudentHandle}>
                    Enroll Now
                </Button>
                <Box>
                    <Typography>
                        This course is {courseData?.course.sales_category.toLowerCase()} level.
                    </Typography>
                   <List>
                    {checkPoints&&checkPoints.map((checkpoint)=><ListItem sx={{display:"flex",gap:2}}>
                        <CheckCircle sx={{
                            fontSize:15,
                           
                        }}/>
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



        <Box sx={{ backgroundColor: theme.palette.background.paper, marginTop: 4, borderRadius: 4 ,display:"flex",flexDirection:{
            xs:"column",
            sm:"column",
            md:"row",
            lg:"row"
        },alignItems:{xs:"left",sm:"left",md:"center",lg:"center",xl:"center"},justifyContent:{
            xs:"left",
            sm:"left",
            md:"space-between",
            lg:'space-between',
            xl:"space-between"
        },pt:3,pb:3,pl:{
            xs:2,
            sm:4,
            md:4,
            lg:5
        },pr:5, boxShadow:`-1.5px 4px 2px ${theme.palette.secondary.light}`,gap:{
            xs:3,
            sm:3,
            md:3,
            lg:3,
            xl:3
        }}}>
          <Box sx={{display:"flex",flexDirection:"row",alignItems:"left",justifyContent:"left",gap:2}}>
            <Speed sx={{
                fontSize:30
            }}/>
            <Box>
            <Typography>{courseData?.course.level}</Typography>
            <Typography>Deficulty level according to creator</Typography>
            </Box>
          </Box>
         
          <Box sx={{display:"flex",flexDirection:"row",alignItems:"left",justifyContent:"left",gap:2}}>
          <FaStopwatch  size={25}/>
         <Box>
         <Typography>{courseData?.course.duration}</Typography>
         <Typography>Credit hours of content avaliable</Typography>
         </Box>

          </Box>
          <Box sx={{display:"flex",flexDirection:"row",alignItems:"left",justifyContent:"left",gap:2}}>
            <Language  sx={{
                fontSize:30
            }}/>
          <Box>
          <Typography>{courseData?.course.language}</Typography>
          <Typography>Course language</Typography>
          </Box>
          </Box>
        </Box>

        <Box  sx={{ backgroundColor: theme.palette.background.paper, marginTop: 4, borderRadius:0 ,display:"flex",flexDirection:"column",alignItems:"left",pt:3,pb:3,pl:5,pr:{
            xs:5,
            sm:5,
            md:10,
            lg:20
        }, boxShadow:`-1.5px 4px 2px ${theme.palette.secondary.light}`,gap:{
            xs:3,
            sm:3,
            md:0,
            lg:0,
            xl:0
        }}}>
    <Typography variant='h4' fontWeight={700}>
        
       Pre-Requisites:
    </Typography>
    <Typography sx={{pt:2,pb:3}}>{courseData?.course.preRequisites}</Typography>
    <Typography variant='h4' fontWeight={700}>
       
        What You Will Learn:
        
    </Typography>
    <Box
      dangerouslySetInnerHTML={{ __html: cleanWhatYouWillLearn }}

    />

        </Box>
        <Box sx={{ backgroundColor: theme.palette.background.paper,mb:5, marginTop: 2,boxShadow:`-1.5px 4px 2px ${theme.palette.secondary.light}`,padding:3,display:'flex',alignItems:"center",justifyContent:"center",flexDirection:"column",gap:2}}>
            <Typography variant='h4' fontWeight={600} sx={{fontStyle:"italic",color:theme.palette.primary.light}}>
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