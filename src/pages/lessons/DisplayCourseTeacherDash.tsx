import {
  ExpandMore,
  OndemandVideo,
  Insights,
  LibraryBooks,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Box,
  Button,
  Chip,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';

import { FILEURLPRE } from '../../components/other/Defaulturl';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Link } from 'react-router-dom';
import { LessonWithFlags } from '../../app/api/createCourseApi';

interface DisplayLessonAndAssignmentProps {
  lessons: LessonWithFlags[] | undefined;
}

function DisplayCourseTeacherDash({ lessons }: DisplayLessonAndAssignmentProps) {
  const authUser = useSelector((state: RootState) => state.auth.user);
  const [expanded, setExpanded] = useState<number | null>(null);
  const theme = useTheme();

  return (
    <Box sx={{display:"grid",gridTemplateColumns:"1fr 1fr"}}>
      {lessons &&
        lessons.map((lesson, index) => (
          <Box sx={{background:alpha(theme.palette.primary.dark,0.6),border:"1px solid",p:2,borderColor:theme.palette.divider,borderRadius:4,display:"flex",flexDirection:"column",gap:2}}>
             <Box sx={{}}>
              <Typography variant='body1' fontWeight={800}>Lesson {index+1} {lesson.title}</Typography>
            
             </Box>
             <Box>
              <Button variant='outlined'>Lesson Settings</Button>
             </Box>
             <Box sx={{display:"flex",gap:1.7}}>
              
              <Chip label={lesson.has_assignment?"Has assignment":"Create Assignment"} color={lesson.has_assignment?"success":"warning"} sx={{fontWeight:700,color:theme.palette.text.primary}} />
              <Chip label={lesson.has_lab?"Has Lab":"Create Lab"} color={lesson.has_lab?"success":"error"} sx={{fontWeight:700}} />
               <Chip label={lesson.has_assignment?"Has Mcq Quiz":"Create Mcq Quiz"} color={lesson.has_mcq_quiz?"success":"error"} sx={{fontWeight:700}} />
              
             </Box>
          </Box>
        ))}
    </Box>
  );
}

export default DisplayCourseTeacherDash;
