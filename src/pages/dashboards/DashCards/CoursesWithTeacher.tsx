
import { RootState } from '../../../app/store'
import { useSelector } from 'react-redux'
import { Avatar, Box, Chip, Typography, useTheme } from '@mui/material'
import { Course } from '../../../app/slices/courseSlice'
import { FILEURLPRE } from '../../../components/other/Defaulturl'
import { Diamond,} from '@mui/icons-material'
import CourseMiniCards from '../../../components/HomPage/CourseMiniCards'

interface CoursesWithTeacherProps{
  bgc:string
}

function CoursesWithTeacher({bgc=""}:CoursesWithTeacherProps) {
    const courses=useSelector((state:RootState)=>state.courses.allCourses)
    const theme=useTheme();
    const grouped = courses.reduce((acc, course) => {
        const teacherId = course.course_teacher.id;
        if (!acc[teacherId]) {
                acc[teacherId] = {
                teacher: course.course_teacher,
                courses: [],
                };
            }
        acc[teacherId].courses.push(course);
       
        return acc;
        }, {} as Record<string, { teacher: Course['course_teacher']; courses: Course[] }>);

        const groupedArray=Object.values(grouped)
        console.log(groupedArray)
    return (
    <Box sx={{display:"flex",width:"100%",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
      
      {groupedArray.map(({teacher,courses})=>{
        return<Box sx={{display:'flex',gap:3,width:"95%",p:3,m:2,justifyContent:"center"}}>
        
      <Box sx={{padding:4,margin:0,width:"70%",border:"1px solid",borderColor:theme.palette.divider,background:bgc,borderRadius:4}}>
        <CourseMiniCards courses={courses} />
      </Box>
       

       <Box sx={{width:"25%"}}>
         <Box sx={{width:"100%",border:"1px solid",borderColor:theme.palette.divider, background:bgc,padding:3,display:"flex",flexDirection:"column",gap:1,borderRadius:4,alignItems:"center",justifyContent:"center", opacity: 1,}}>
       <Avatar  src={`${FILEURLPRE}/${teacher.profile}`}  sx={{width:"120px",height:"120px"}}/>
       <Typography variant="body1" fontWeight={600}  sx={{display:"flex",alignItems:"center",gap:1}}>
         {teacher.name.split(" ")[0].toUpperCase()}
        </Typography>
       <Typography variant="body1" fontWeight={600} sx={{display:'flex',alignItems:"center",gap:1,color:theme.palette.success.light}}>
         <Diamond sx={{fontSize:18,color:theme.palette.warning.light}}/> <span>{teacher.qualifications}</span>
       </Typography>
       <Box sx={{ display: "flex",
               flexWrap: "wrap",
               gap: 1,
             justifyContent: "center", // horizontal alignment
           alignItems: "center",  }}>
          {teacher.expertise.map((expert,index)=>
             <Chip
              key={index}
              label={expert.category.title}
              color={ expert.category.title === 'Cyber Security'
                  ? 'success'
                  : expert.category.title === 'Programming'
                ? 'info'
                : 'warning'}
              variant="outlined"
              size="small"
              sx={{
                   fontSize: 10,
                   px: 1,
         }}
            />

         )}  
          </Box>
    </Box>
       </Box>


     



        
        {/* <Box  sx={{display:"flex",gap:3,width:"30%",flexDirection:"column"}}>
          <Avatar src={`${FILEURLPRE}/${teacher.profile}`} sx={{width:"60px",height:"60px"}} />

          <Box sx={{display:"flex",gap:1,flexDirection:"column"}}>

            <Box sx={{display:"flex",gap:1,alignItems:"center"}}>
              <Typography variant='h6'sx={{pr:1.6}} >{teacher.name}</Typography>
           
             </Box>

             <Typography sx={{display:"flex",alignItems:"center",gap:1,fontWeight:550,opacity:0.5}}><span>{teacher.qualifications}</span></Typography>  
          </Box>

        </Box> */}


        

        </Box>
      })}
    </Box>
  )
}

export default CoursesWithTeacher
