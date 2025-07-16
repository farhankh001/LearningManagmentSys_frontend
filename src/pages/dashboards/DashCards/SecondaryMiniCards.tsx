
import {  Box, Card, CardMedia, CircularProgress, Typography, useTheme , SvgIconTypeMap} from '@mui/material'
import { Link } from 'react-router-dom'
import { EnrolledCoursesApproved } from '../../../app/api/studentDashApis';
import { FILEURLPRE } from '../../../components/other/Defaulturl';
import { BugReport, Code, FlightTakeoff, Kayaking, Terminal, Visibility, Web } from '@mui/icons-material';
import { OverridableComponent } from '@mui/material/OverridableComponent';


const limitWords = (str: string, limit: number) => {
  const words = str.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return str;
};
const categoryBackgroundMap: Record<string, string> = {
  'Cyber Security': '#0a424a',   // dark green
  'Programming': '#0d47a1',      // dark blue
  'Design': '#4e342e',           // dark brown
  'Marketing': '#6a1b9a',        // deep purple
  'Business': '#263238',         // dark slate
  'AI & ML': '#37474f',          // blue-grey
  'Data Science': '#1a237e',     // indigo
  'Networking': '#004d40',       // dark teal
  'DevOps': '#3e2723',           // dark mocha
  'Default': '#121212'           // standard dark background
};
const categoryIconMap:Record<
  string,
  { Icon: OverridableComponent<SvgIconTypeMap>; color: string }
> 
 = {
  'DevOps': {
    Icon: Terminal ,
    color: '#ffca28', // amber (bright on dark)
  },
  'Cyber Security': {
    Icon: Kayaking,
    color: '#4dd0e1', // cyan/light blue
  },
  'Programming': {
    Icon: Code,
    color: '#81c784', // light green
  },
  'Ethical Hacking': {
    Icon: BugReport,
    color: '#f06292', // bright pink
  },
  'Red Team Operator': {
    Icon: Visibility,
    color: '#ef5350', // bright red
  },
  'Web Development': {
    Icon: Web,
    color: '#64b5f6', // light blue
  },
  'Default': {
    Icon: Code,
    color: '#eeeeee', // neutral light grey
  },
};
interface ApprovedCourseCardProps{
    courses:EnrolledCoursesApproved[]|undefined
}
function SecondaryMiniCards({courses}:ApprovedCourseCardProps) {
    const theme=useTheme()
  return (
   <Box  sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr ', md: '1fr 1fr 1fr ',lg:" 1fr 1fr 1fr" },
            gap: { xs: 2, md: 3},
            justifyContent: 'center',
            
            }} >
        
    {courses&&courses.map(course=>{ 
       const { Icon, color } = categoryIconMap[course.course.category] || categoryIconMap['Default'];
      return <Card sx={{
            width: 260,
            height: 310,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 4,
            overflow: 'hidden',
            // boxShadow:`-1.5px 4px 2px ${theme.palette.secondary.light}`,
           
            textDecoration: 'none',
           backgroundColor: categoryBackgroundMap[course.course.category] || categoryBackgroundMap['Default'],
            border:"0.5px solid",
            borderColor:theme.palette.divider,
            justifyContent:"space-between"
    
    }}>
       <Box sx={{padding:1, backgroundColor:theme.palette.primary.dark,border:"1px solid",borderColor:theme.palette.divider,borderRadius:4}}>
       <CardMedia component={"img"} src={`${FILEURLPRE}/${course.course.thumbnail}`} sx={{
            height: 110,
            borderRadius:4,
            objectFit: 'cover',border:"1px solid",borderColor:theme.palette.divider}}/>
       
          <Box sx={{ display: 'flex', flexDirection: 'column',m:1,gap:1}}>
                        
                         <Typography
                           variant="body2"
                           sx={{
                          
                             
                             color: theme.palette.text.primary,
                              display:"flex",alignItems:"center",
                              gap:0.4
                           }}
                         >
                            <Icon sx={{color:theme.palette.warning.light,fontSize:16}}/>
                           <span> {limitWords(course.course.title, 8)}</span>
                         </Typography>
                         <Typography
                           variant="body2"
                           sx={{
                             color:theme.palette.text.primary,
                             opacity: 0.75,
                             display: '-webkit-box',
                             
                           }}
                         >
                             {limitWords(course.course.subtitle, 6)}
                         </Typography>
                         </Box>
                   <Box sx={{display:"flex",gap:2,mb:0.5,mt:1.5,ml:1,mr:1}}>
          <Box
               sx={{
                   fontSize: 10,
                   color,
                  
            }}
        >
  {course.course.category}
</Box>
         </Box>
       </Box>
        <Box sx={{display:"flex",alignItems:'center',justifyContent:"space-between",padding:1.5}}>
                  <Box  sx={{display:"flex",flexDirection:"row",gap:0.8,}}>
                    <Typography variant='caption'  sx={{
                    color:theme.palette.text.primary,
                    opacity: 0.75,
                    
                  }}>
                    Progress: 
                  </Typography>
                    <CircularProgress
                    variant="determinate"
            value={course.progress.percentage}
            size={22}
            thickness={7}
            color="success"
        />
                  <Typography variant='caption'  sx={{
                    color:theme.palette.text.primary,
                    opacity: 0.75,
                    
                  }} >{course.progress.percentage}%</Typography>
                  </Box>
                 <Typography variant='caption' fontWeight={700} component={Link} to={`/get-single-course-by-enrolled-student/${course.course.id}`} sx={{color:theme.palette.warning.light,display:"flex",alignItems:"center",gap:1}}><FlightTakeoff sx={{color:theme.palette.warning.light,fontSize:13}}/><span>CONTINUE</span></Typography>
                </Box>
          
    </Card>})}
   </Box>
  )
}

export default SecondaryMiniCards
