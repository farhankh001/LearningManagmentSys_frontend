import React, { useEffect } from 'react'
import { useResultsMcqForStudentQuery } from '../../../app/api/lessonApi'
import { useParams } from 'react-router-dom'
import { Box, Chip, Divider, Typography, useTheme } from '@mui/material'
import { Cancel, CheckCircle, QuizRounded, ReviewsOutlined } from '@mui/icons-material'
import toast from 'react-hot-toast'

function MCQResults() {
    const {submissionId}=useParams()
    const {data,error,isSuccess,isError}=useResultsMcqForStudentQuery({submissionId})
    const theme=useTheme()
    useEffect(() => {
   
  if(isError&&error&&"data" in error){
  console.log(error)
  toast.error(`${JSON.stringify((error.data as any).error)}`)
}   
  }, [isError,error]);
  return (
    <Box sx={{display:"flex",flexDirection:"column",gap:1}}>
      <Typography variant='h4' fontWeight={600} sx={{color:theme.palette.primary.light,textAlign:"center"}} >
        <QuizRounded sx={{marginRight:1}}/>
        Quiz Results
      </Typography>
      <Box sx={{display:"flex", gap:4,width:"100%",alignItems:"center",justifyContent:"center"}}>
        <Typography variant='h6' sx={{backgroundColor:theme.palette.background.paper,borderRadius:4,padding:2,textAlign:"center",
       }}>Total Questions: {data?.totalQuestions}</Typography>
         <Typography variant='h6' sx={{backgroundColor:theme.palette.background.paper,borderRadius:4,padding:2,textAlign:"center"}}>Total Correct Answers: {data?.correctAnswers}</Typography>
          <Typography  variant='h6' sx={{backgroundColor:theme.palette.background.paper,borderRadius:4,padding:2,textAlign:"center"
          }}>Total Incorrect Answers: {data?.incorrectAnswers}</Typography>
           <Typography variant='h6'  sx={{ backgroundColor:theme.palette.background.paper,borderRadius:4,padding:2,textAlign:"center" }}>Total Percentage: {data?.percentage}%</Typography>
      </Box>
      <Box>
        {data?.detailedResults.map((result,index)=><Box sx={{margin:4,display:"flex",flexDirection:"column",gap:1}}>
          <Typography variant='h6' fontWeight={600}>Question {index+1} : {result.questionText}</Typography>
          <Typography sx={{display:"flex",gap:2}}> Correction Status: 
            <Chip
                icon={result.isCorrect ? <CheckCircle /> : <Cancel />}
                label={result.isCorrect ? "Correct" : "Incorrect"}
                color={result.isCorrect ? "success" : "error"}
                size="small"
                variant='outlined'
                            />
          </Typography>
          <Typography>Correct Answer: {result.correctAnswer}</Typography>
          <Typography>Selected Answer: {result.selectedAnswer}</Typography>
          <Typography>Explanation: {result.explanation}</Typography>
          <Divider/>
        </Box>)}
      </Box>
    </Box>
  )
}

export default MCQResults
