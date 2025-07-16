import { Course } from '../../app/slices/courseSlice'
import { Avatar, Box, Card, CardMedia, Typography, Chip, Button, useTheme } from '@mui/material'
import { FaDollarSign, FaGraduationCap} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useEnrollStudentMutation } from '../../app/api/enrollmentApi'
import toast from 'react-hot-toast';

interface CourseProps {
  course: Course
}
const limitWords = (str: string, limit: number) => {
  const words = str.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return str;
};
function CourseCard({ course }: CourseProps) {
 const [enrollStudent,{error:enrollmentError,isError:isEnrollmentError,isSuccess:enrollmentSuccess}]=useEnrollStudentMutation()
 const enrollStudentHandle=()=>{
         if(course.id){
            enrollStudent({courseId:course.id})
         }else{
          toast.error("Course Id not Found")
         }
    }
const theme=useTheme()
    if(enrollmentSuccess){
      toast.success("Successfully Enrolled...")
    }
    if(isEnrollmentError && enrollmentError && 'data' in enrollmentError){
            toast.error(`${JSON.stringify((enrollmentError.data as any).error)}`)
          }                        
  return (
    <Card
      sx={{
        width: 290,
        height: 370,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        boxShadow:`-1.5px 4px 2px ${theme.palette.secondary.light}`,
        margin:2,
        backgroundColor:theme.palette.background.paper,
        // border: `1px solid`,
        
       
      }}
    >
      {/* Image with overlayed logo */}
      <Box sx={{ position: 'relative',boxShadow:`0 1.5px 4px ${theme.palette.secondary.dark}`}}>
        <CardMedia
          component="img"
          src={course.course_thumbnail_url}
          alt={course.title}
          sx={{
            height: 150,
            objectFit: 'cover',
           
           
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 25,
            left: 10,
            backgroundColor: theme.palette.background.paper,
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.39)',
            fontWeight: 600,
            fontSize: '0.75rem',
           
           
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0 }}>
          <Avatar src={course.course_teacher.profile} sx={{ width: 28, height: 28 }} />
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.primary,
              fontSize: '0.85rem',
              opacity: 0.85,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {course.course_teacher.name}
          </Typography>
        </Box>
        </Box>
      </Box>

      {/* Card Content */}
      <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: '1rem',
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 0.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
           {limitWords(course.title, 7)}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color:theme.palette.text.primary,
            opacity: 0.75,
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
            {limitWords(course.subtitle, 8)}
        </Typography>

        {/* button info */}
          <Box sx={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",gap:3}}>
            <Button variant='outlined' sx={{color:theme.palette.text.primary}} onClick={enrollStudentHandle}>Enroll</Button>
            <Button variant='outlined' component={Link} to={`single-course-details/${course.id}`} sx={{color:theme.palette.text.primary}}>Details</Button>
          </Box>

        {/* Footer row */}
        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: theme.palette.text.primary, }}>
           <FaGraduationCap size={20}  color={theme.palette.text.primary}/>  
            <Typography variant="caption"   sx={{ color: theme.palette.text.primary }}>{course.total_enrollments || 0}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: theme.palette.text.primary, }}>
            <FaDollarSign size={15} color={theme.palette.text.primary} />
            <Typography variant="caption" 
            sx={{ color: theme.palette.text.primary }}
            >{course.price}</Typography>
          </Box>
          <Chip
            label={course.level}
            size="small"
            sx={{
              backgroundColor: '#E5E7EB',
              fontSize: '0.8rem',
              height: '22px',
              borderRadius: '12px',
              fontWeight: 600,
              color:"black"
            }}
          />
        </Box>
      </Box>
    </Card>
  )
}

export default CourseCard
