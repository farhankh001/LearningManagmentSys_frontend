import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Typography } from '@mui/material'
import { Lesson, Quiz, useGetSingleCourseByTeacherQuery } from '../../app/api/createCourseApi'
import  DocViewer,{ DocViewerRenderers, IDocument } from "@cyntler/react-doc-viewer";
import { JSX } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';


import { FILEURLPRE } from '../../components/other/Defaulturl';


interface DisplayLessonAndAssignmentprops{
    lessons:Lesson[]|undefined
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
    maxHeight: {xs:"50vh",sm:"50vh",md:"80vh",lg:"90vh"},
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
// export interface Lesson {
//   id: string;
//   title: string;
//   url_video?: string | null;
//   url_image?: string | null;
//   lesson_text: string;
//   url_docs?: string | null;
//   createdAt: Date;
//   updatedAt: Date;
//   course_id: string;
//   quiz_id?: string | null;
//   assignment_id?: string | null;
//   quiz?: Quiz | null;
//   assignment?: Assignment | null;
// }

function DisplayLessonAndAssignment({lessons}:DisplayLessonAndAssignmentprops) {
  const authUser=useSelector((state:RootState)=>state.auth.user)
    console.log(lessons)
  return (
    lessons&&lessons.map((lesson)=>{
        return <Accordion>
      <AccordionSummary expandIcon={<ExpandMore/>}>
        <Typography variant='body1' fontWeight={600} sx={{p:1}}>
            {lesson.title.toLocaleUpperCase()} 
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
       <Box sx={{padding:3}}>
         {lesson.url_video&&<Box
          component="video"
          src={`${FILEURLPRE}/${lesson.url_video}`}
          controls
          sx={{
            width: '100%',
            height: 'auto',
            maxHeight:"70vh",
            borderRadius: 1,
            boxShadow: 1,
          }}
        />}
     <Box sx={{mt:3}}>
      <Typography variant='h5' fontWeight={600}>
        Description:
      </Typography>
      <Box
      dangerouslySetInnerHTML={{ __html: lesson.lesson_text }}
      sx={{
        
      }}
    />
     </Box>
   <Box sx={{mt:5}}>
     <Typography variant='h5' fontWeight={600}>
        Additional Resources:
      </Typography>
     {lesson.url_docs ? (
     <FilePreviewer fileUrl={`${FILEURLPRE}/${lesson.url_docs}`} />) : null}

   </Box>
    </Box>
      { authUser?.role==="Student"&&<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",gap:3}}>
        <Button component={Link} to={`/attempt-quiz/${lesson.id}`} variant="contained">
          Attempt Quiz
        </Button>
        <Button component={Link} to={`/attempt-assignment/${lesson.id}`} variant="contained">
          Attempt Assignment
        </Button>
        <Button component={Link} to={`/attempt-MCQS-quiz/${lesson.id}`} variant="contained">
          Evaluate Progress with MCQs Quiz
        </Button>
       </Box>}
        { authUser?.role==="Teacher"&&<Box sx={{display:'flex', alignItems:"center",justifyContent:"center",gap:3}}>
        <Button component={Link} to={`/attempt-quiz/${lesson.id}`} variant="contained">
          Edit Lesson
        </Button>
        <Button component={Link} to={`/attempt-assignment/${lesson.id}`} variant="contained">
          Edit Assignment
        </Button>
        <Button component={Link} to={`/attempt-assignment/${lesson.id}`} variant="contained">
          Edit Quiz
        </Button>
         <Button component={Link} to={`/create-MCQS-quiz/${lesson.id}`} variant="contained">
          Create Quiz MCQs based 
        </Button>
       </Box>}
      </AccordionDetails>
    </Accordion>
    })
  )
}

export default DisplayLessonAndAssignment
