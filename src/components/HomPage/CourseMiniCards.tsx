import { Box, Card, CardMedia, SvgIconTypeMap, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'

import { FILEURLPRE } from '../other/Defaulturl'
import { BugReport, Code,  FlightTakeoff, Kayaking, Terminal, Visibility, Web } from '@mui/icons-material'
import { Course } from '../../app/slices/courseSlice'
import { OverridableComponent } from '@mui/material/OverridableComponent'

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
interface CourseMiniCardsprops{
    courses:Course[]
}
function CourseMiniCards({courses}:CourseMiniCardsprops) {
    const theme=useTheme()
 return (
    <Box  sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr ', md: '1fr 1fr 1fr ',lg:"1fr 1fr 1fr" },
            gap: { xs: 2, md: 3,lg:2},
            justifyContent: 'center',
          
             }} >
        
    {courses&&courses.map(course=>{
      const category = course.course_categories[0].category.title;
        const { Icon, color } = categoryIconMap[category] || categoryIconMap['Default'];
      return <Card component={Link} to={`/single-course-details/${course.id}`} sx={{
        width: 260,
        height: 310,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        // boxShadow:`-1.5px 4px 2px ${theme.palette.secondary.light}`,
       
        textDecoration: 'none',
       backgroundColor: categoryBackgroundMap[course.course_categories[0]?.category.title] || categoryBackgroundMap['Default'],
        border:"0.5px solid",
        borderColor:theme.palette.divider,
        justifyContent:"space-between"

}}>
       <Box sx={{px:0.5,pt:0.5,pb:1.5, backgroundColor:theme.palette.primary.dark,border:"1px solid",borderColor:theme.palette.divider,borderRadius:4,}}>
        <CardMedia component={"img"} src={`${FILEURLPRE}/${course.course_thumbnail_url}`} sx={{
            height: 130,
            borderRadius:4,
            objectFit: 'cover',border:"1px solid",borderColor:theme.palette.divider}}/>
       
         <Box sx={{ display: 'flex', flexDirection: 'column',m:1,gap:1}}>
               
                <Typography
                  variant="body2"
                  sx={{
                 
                    
                    color: theme.palette.text.primary,
                 

                  }}
                >
                   <Icon sx={{color:theme.palette.warning.light,fontSize:19,pr:0.3}}/>
                  <span> {limitWords(course.title, 8)}</span>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color:theme.palette.text.primary,
                    opacity: 0.75,
                    display: '-webkit-box',
                    
                  }}
                >
                    {limitWords(course.subtitle, 10)}
                </Typography>
                </Box>

        <Box sx={{display:"flex",gap:2,mt:1.5,ml:1,mr:1}}>
          <Box
               sx={{
                   fontSize: 10,
                   color,
                  
            }}
        >
  {course.course_categories[0].category.title}
</Box>
        </Box>

       </Box>
        <Box sx={{display:"flex",alignItems:'center',justifyContent:"center",mb:0.85,  }}>
            <Typography variant='body2' fontWeight={700} sx={{color:theme.palette.warning.light,display:"flex",alignItems:"center",gap:1}}><FlightTakeoff sx={{color:theme.palette.warning.light,fontSize:19}}/><span>Enroll Now</span></Typography>
        </Box>
          
    </Card>
    })}
   </Box>
 
  )
}

export default CourseMiniCards
