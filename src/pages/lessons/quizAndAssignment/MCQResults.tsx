import React, { useEffect } from 'react'
import { useResultsMcqForStudentQuery } from '../../../app/api/lessonApi'
import { useParams } from 'react-router-dom'
import { Box, Chip, Divider, Typography, useTheme } from '@mui/material'
import { Cancel, CheckCircle, QuizRounded, ReviewsOutlined } from '@mui/icons-material'
import toast from 'react-hot-toast'
import BarChartDash from '../../dashboards/Charts/BarChartDash'
import RadialChartDash from '../../dashboards/Charts/RadialChartDash'
import { PieChartDashComparison } from '../../dashboards/DashCards/DashPieChartCompVsTotal'

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
       return  <Box sx={{display:"flex",flexDirection:"column",gap:1,alignItems:"center",justifyContent:"center"}}>
          <Typography variant='h4' fontWeight={600} sx={{color:theme.palette.primary.light,textAlign:"center"}} >
            
            Quiz Results
          </Typography>

        
             <Box sx={{display:"flex",width:"100%",height:'380px',alignItems:"center",justifyContent:"center",gap:3,padding:4}}>
                  <Box sx={{height:"100%",width:"33%"}}>
                      <PieChartDashComparison data={[
                      { name: 'Correct', value: data?.correctAnswers??0 },
                      { name: 'Incorrect', value:data?.incorrectAnswers??0}
                    ]}  />
                     </Box>
                 
                 <Box sx={{height:"100%",width:"33%"}}>
                  <BarChartDash data={
                [ {name: 'Total Questions', value: data?.totalQuestions??0 },
                {name: 'Correct', value:data?.correctAnswers??0 },
                {name: 'Incorrect', value: data?.incorrectAnswers??0 },
            ]}   colors={{
              'Total Questions': '#10B981',        // Emerald
              'Correct': '#F59E0B',    // Amber
              'In Correct':"#e1774b"
            }}  legendItems={
              [
                {label: 'Total Questions', value: data?.totalQuestions??0 },
                {label: 'Correct', value:data?.correctAnswers??0  },
                {label: 'Incorrect', value: data?.incorrectAnswers??0 },
              ]
                } title={"Result Summary"} />
                 </Box>
                 <Box sx={{height:"100%",width:"23%"}}>
                  <RadialChartDash overAllProgressPercentage={data?.percentage??0} title="Correct Percentage"/>
                 </Box>
                </Box>



          <Box sx={{maxWidth:"75%",minWidth:"75%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                <Typography variant='h5'fontWeight={700} sx={{textAlign:"center",padding:2,margin:2,border:"1px solid",borderColor:theme.palette.divider,width:"100%"}}>DETAILED RESULTS</Typography>

            {data?.detailedResults.map((result,index)=><Box sx={{width:"100%",border:"1px solid",borderColor:theme.palette.divider,padding:2,margin:2,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
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
             <Box sx={{display:"flex",gap:2,alignItems:"center",justifyContent:"center"}}>
               <Typography variant='body1' fontWeight={600} sx={{border:"1px solid",borderColor:theme.palette.divider,padding:2,margin:2,color:theme.palette.success.light}}>Correct Answer: {result.correctAnswer}</Typography>
              <Typography fontWeight={600} sx={{border:"1px solid",borderColor:theme.palette.divider,padding:2,margin:2,color:theme.palette.primary.main}}>Selected Answer: {result.selectedAnswer}</Typography>
             </Box>
              <Typography>Explanation: {result.explanation}</Typography>
            </Box>)}
          </Box>
        </Box>
  
}

export default MCQResults
