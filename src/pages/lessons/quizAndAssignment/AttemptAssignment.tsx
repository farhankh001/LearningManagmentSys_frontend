
import { useGetAssignmentForStudentQuery, } from '../../../app/api/lessonApi'
import { useParams } from 'react-router-dom'

import { Box, Chip, CircularProgress, Divider, Typography, useTheme } from '@mui/material'

import AssignmentSubmissionFormProvider from '../../../components/Forms/FormProviders/AssignmentSubmissionProvider'

function AttemptAssignment() {
  const {lessonId}=useParams()    
  const {data:assignmentIncomingData,isLoading:assignmentIncomingLoading}=useGetAssignmentForStudentQuery({lessonId:lessonId})
  const theme=useTheme()
  if(assignmentIncomingLoading){
    return  <Box sx={{width:"100%",height:"70vh",alignItems:"center",justifyContent:"center"}}><CircularProgress/></Box>;
  }
  
  return (
<Box>
     <Box sx={{background:theme.palette.background.paper,margin:4,padding:4,display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
   <Box>
    <Typography variant='h4'>
      {assignmentIncomingData?.title}
    </Typography>
   </Box>
   <Divider sx={{width:"100%"}}/>
   <Box sx={{display:"flex",flexDirection:{xs:"column",sm:"column",md:"row"},justifyContent:"space-between",width:"100%",gap:2}}>
    <Typography variant='h6'>
      Total Scores: {assignmentIncomingData?.totalScore}
    </Typography>
    <Typography variant='h6' sx={{display:"flex",flexDirection:"row",gap:3}}>
     Time Limit: {assignmentIncomingData?.timeLimit}
     <Chip
      label={assignmentIncomingData?.activationStatus}
      color={assignmentIncomingData?.activationStatus==="ACTIVE" ?"success" : "error"}
      size="small"
      variant='filled'
             />
   </Typography>
     <Typography variant='h6'>
     Passing score: {assignmentIncomingData?.passingScore}
   </Typography>
   </Box>
   <Box>
   
   </Box>
   <Box>
  
   </Box>
   
   <Box>
   <Typography variant='h6'>
     Instructions: {assignmentIncomingData?.description}
   </Typography>
   </Box>
   <Box>
  <Typography variant='h6'>
    Questions:
  </Typography>
  {assignmentIncomingData?.questions&&<Box
    dangerouslySetInnerHTML={{ __html: assignmentIncomingData.questions }}
    />
  }
   </Box>
   </Box>
   <Box sx={{background:theme.palette.background.paper,margin:4,padding:4,display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
      <AssignmentSubmissionFormProvider lessonId={lessonId}/>
   </Box>
   
</Box>
  )
}

export default AttemptAssignment
