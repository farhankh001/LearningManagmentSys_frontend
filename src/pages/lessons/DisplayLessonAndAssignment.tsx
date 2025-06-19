import { Article, AutoStories, Book, ExpandMore, Insights, LibraryBooks, MenuBook, OndemandVideo, ViewAgenda } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Chip, Divider, LinearProgress, Typography, useTheme } from '@mui/material'
import { Lesson, Quiz, useGetSingleCourseByTeacherQuery } from '../../app/api/createCourseApi'
import  DocViewer,{ DocViewerRenderers, IDocument } from "@cyntler/react-doc-viewer";
import { JSX, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import ReactPlayer from 'react-player';

import { FILEURLPRE } from '../../components/other/Defaulturl';
import VideoComponent from './VideoComponent';
import { limitWords } from '../dashboards/DashCards/ApprovedCoursesCards';
import { EnhancedLesson } from '../../app/api/studentDashApis';
import { BorderLinearProgress } from '../../test/feature';

interface DisplayLessonAndAssignmentprops{
    lessons:EnhancedLesson[]|undefined
}
type FilePreviewerProps = {
  fileUrl: string | null | undefined;
};
const CustomErrorRenderer = () => (
  <div>
    <p>Unable to display the document. Please check the URL or try again later.</p>
  </div>
);
function FilePreviewer({ fileUrl }: FilePreviewerProps): JSX.Element | null {
  if (!fileUrl) return null;

  const fileName = decodeURIComponent(fileUrl.split('/').pop() || 'file');
  const fileType = fileName.split('.').pop()?.toLowerCase() || '';

  const documents: IDocument[] = [
    {
      uri: fileUrl,
      fileType,
      fileName,
    },
  ];

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width:"100%",
        mt:2
      }}
    >
     
      {/* Ensure the viewer container doesn't clip or get overlapped */}
    <Box
  sx={{
    maxHeight: {xs:"50vh",sm:"50vh",md:"80vh",lg:"50vh"},
    border: '1px solid #ddd',
    borderRadius: 2,
    overflowY: 'auto', 

  }}
>
  <DocViewer
    documents={documents}
    pluginRenderers={DocViewerRenderers}
    style={{ width: '100%', height: '100%' }}
    config={{
      header: {
        disableFileName: false,
        disableHeader: false,
      
        
      },
      pdfVerticalScrollByDefault:true,

      noRenderer: {
          overrideComponent: CustomErrorRenderer,
        },
        
    }}
  />
</Box>
    </Card>
  );
}

function DisplayLessonAndAssignment({lessons}:DisplayLessonAndAssignmentprops) {
  const authUser=useSelector((state:RootState)=>state.auth.user)
  const [expanded,setExpanded]=useState<number|null>(null)
    console.log(lessons)
    const theme=useTheme()
  return (
    lessons&&lessons.map((lesson,index)=>{
        return  <Accordion  
          key={lesson.id}
          expanded={expanded === index}
          sx={{
            backgroundColor:theme.palette.primary.dark,
            borderRadius: '16px !important', // Use !important to override default
            border: "1px solid",
            borderColor: theme.palette.divider,
            
            '&:before': {
              display: 'none', // Remove default MUI border
            },
            '&.Mui-expanded': {
              margin: '0 0 16px 0', // Override expanded margin
            },
            // Target the root element when expanded
            '&.MuiAccordion-root': {
              borderRadius: '16px !important',
            },
            // Override summary styling
            '& .MuiAccordionSummary-root': {
              borderRadius: '16px',
              borderBottomLeftRadius: expanded === index ? 0 : '16px',
              borderBottomRightRadius: expanded === index ? 0 : '16px',
              minHeight: 48,
              '&.Mui-expanded': {
                minHeight: 48,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              },
            },
            // Override details styling
            '& .MuiAccordionDetails-root': {
              borderTop: `1px solid ${theme.palette.divider}`,
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px',
              padding: 0, // Remove default padding since we add our own
            },
          }}
          onChange={(e, isExpanded) => setExpanded(isExpanded ? index : null)}
        >
      <AccordionSummary 
        expandIcon={<ExpandMore/>} 
        sx={{
          // Additional summary styling if needed
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
       <Box sx={{display:"flex",gap:0,width:"100%",pl:2,pr:3,flexDirection:"column"}}>
       <Box sx={{display:"flex",gap:1,flexDirection:"column"}}> 
        <Typography variant='h6' sx={{display:"flex",gap:3}}><span>{lesson.title}</span> </Typography>
         <Box>
           <Chip 
            label={lesson.completionStatus} 
            variant='outlined' 
            color={lesson.completionStatus === 'COMPLETED' ? 'success' : lesson.completionStatus === 'IN_PROGRESS' ? 'warning' : 'default'} 
            size='small' 
            sx={{fontSize:10,pl:2,pr:2}}
          />
         </Box>
        </Box>
      {lesson.completionStatus==="COMPLETED"&&<Box sx={{width:"50%",display:"flex",flexDirection:"column",gap:0.5,mb:0.5}}>
           <Typography variant="caption" color="text.secondary" fontSize={14} sx={{mt:1}}>
                              {lesson.mcqPercentage??0}% Quiz Score
                                </Typography>
           <LinearProgress variant="determinate" value={lesson.mcqPercentage??0} color='success' />
        </Box>}
       </Box>
      </AccordionSummary>
      <AccordionDetails>
       <Box sx={{padding:3}}>
        <Typography sx={{display:'flex',alignItems:"center",gap:2,mb:1, background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",WebkitBackgroundClip: "text",WebkitTextFillColor: "transparent",}} variant="h6" fontWeight={600}><span>Lesson Video</span> <OndemandVideo  sx={{color:theme.palette.warning.light}} /></Typography>
         {lesson.url_video&&<Box sx={{width:"100%",height:"70vh"}}><ReactPlayer url={lesson.url_video}   width="100%"
        height="100%" controls /></Box>}
     <Box sx={{mt:3}}>
      <Typography sx={{display:'flex',alignItems:"center",gap:2,mb:1, background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",WebkitBackgroundClip: "text",WebkitTextFillColor: "transparent",}} variant="h6" fontWeight={600}><span>Description</span> <Insights  sx={{color:theme.palette.warning.light}} /></Typography>
      <Box
      dangerouslySetInnerHTML={{ __html: lesson.lesson_text }}
      sx={{
        mt:1
      }}
    />
     </Box>
   <Box sx={{mt:5}}>
     <Typography sx={{display:'flex',alignItems:"center",gap:2,mb:1,background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",WebkitBackgroundClip: "text",WebkitTextFillColor: "transparent",}} variant="h6" fontWeight={600}><span>Additional Resources</span> <LibraryBooks  sx={{color:theme.palette.warning.light}} /></Typography>
     {expanded==index&&lesson.url_docs ? (
     <FilePreviewer fileUrl={`${FILEURLPRE}/${lesson.url_docs}`} />) : null}
     {
      lesson.url_doc2&& <Typography sx={{display:'flex',alignItems:"center",gap:2,mb:1,mt:2, background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",WebkitBackgroundClip: "text",WebkitTextFillColor: "transparent",}} variant="h6" fontWeight={600}><span> Second Document</span> <LibraryBooks  sx={{color:theme.palette.warning.light}} /></Typography>
     }
     {expanded==index&&lesson.url_doc2 ? (
     <FilePreviewer fileUrl={`${FILEURLPRE}/${lesson.url_doc2}`} />) : null}
   </Box>
    </Box>
      { authUser?.role==="Student"&&<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",gap:3,p:2,borderTop:`1px solid ${theme.palette.divider}`}}>
        <Button component={Link} to={`/attempt-quiz/${lesson.id}`} variant="contained" size="small">
          Attempt Quiz
        </Button>
        <Button component={Link} to={`/attempt-assignment/${lesson.id}`} variant="contained" size="small">
          Attempt Assignment
        </Button>
        <Button component={Link} to={`/attempt-MCQS-quiz/${lesson.id}`} variant="contained" size="small">
          Evaluate Progress with MCQs Quiz
        </Button>
       </Box>}
        { authUser?.role==="Teacher"&&<Box sx={{display:'flex', alignItems:"center",justifyContent:"center",gap:3,p:2,borderTop:`1px solid ${theme.palette.divider}`}}>
        <Button component={Link} to={`/attempt-quiz/${lesson.id}`} variant="contained" size="small">
          Edit Lesson
        </Button>
        <Button component={Link} to={`/attempt-assignment/${lesson.id}`} variant="contained" size="small">
          Edit Assignment
        </Button>
        <Button component={Link} to={`/attempt-assignment/${lesson.id}`} variant="contained" size="small">
          Edit Quiz
        </Button>
         <Button component={Link} to={`/create-MCQS-quiz/${lesson.id}`} variant="contained" size="small">
          Create Quiz MCQs based 
        </Button>
       </Box>}
      </AccordionDetails>
    </Accordion>
        
    })
  )
}

export default DisplayLessonAndAssignment