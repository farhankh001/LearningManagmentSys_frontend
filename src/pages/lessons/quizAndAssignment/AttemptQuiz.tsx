import React from 'react'
import { useGetQuizForStudentQuery } from '../../../app/api/lessonApi'
import { useParams } from 'react-router-dom'
import LoadingScreen from '../../../components/other/Loading'
import { Box, Chip, Divider, Typography, useTheme } from '@mui/material'
import AttemptQuizForm from './AttemptQuizForm'
import QuizSubmissionFormProvider from '../../../components/Forms/FormProviders/QuizSubmissionFormProvider'

function AttemptQuiz() {
  const {lessonId}=useParams()
  const {data:quizIncomingData,error:quizIncomingError,isError:quizEncomingIsError,isSuccess:quizEncomingIsSuccess,isLoading:quizIncomingLoading}=useGetQuizForStudentQuery({lessonId:lessonId})
  const theme=useTheme()
  if(quizIncomingLoading){
    return <LoadingScreen/>
  }
  
  return (
<Box>
     <Box sx={{background:theme.palette.background.paper,margin:4,padding:4,display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
   <Box>
    <Typography variant='h4'>
      {quizIncomingData?.title}
    </Typography>
   </Box>
   <Divider sx={{width:"100%"}}/>
   <Box sx={{display:"flex",flexDirection:{xs:"column",sm:"column",md:"row"},justifyContent:"space-between",width:"100%",gap:2}}>
    <Typography variant='h6'>
      Total Scores: {quizIncomingData?.totalScore}
    </Typography>
    <Typography variant='h6' sx={{display:"flex",flexDirection:"row",gap:3}}>
     Time Limit: {quizIncomingData?.timeLimit}
     <Chip
      label={quizIncomingData?.activationStatus}
      color={quizIncomingData?.activationStatus==="ACTIVE" ?"success" : "error"}
      size="small"
      variant='filled'
             />
   </Typography>
     <Typography variant='h6'>
     Passing score: {quizIncomingData?.passingScore}
   </Typography>
   </Box>
   <Box>
   
   </Box>
   <Box>
  
   </Box>
   
   <Box>
   <Typography variant='h6'>
     Instructions: {quizIncomingData?.description}
   </Typography>
   </Box>
   <Box>
  <Typography variant='h6'>
    Questions:
  </Typography>
  {quizIncomingData?.questions&&<Box
    dangerouslySetInnerHTML={{ __html: quizIncomingData.questions }}
    />
  }
   </Box>
   </Box>
   <Box sx={{background:theme.palette.background.paper,margin:4,padding:4,display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
      <QuizSubmissionFormProvider lessonId={lessonId}/>
   </Box>
   
</Box>
  )
}

export default AttemptQuiz
