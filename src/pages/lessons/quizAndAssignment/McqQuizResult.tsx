import { CheckCircle, Cancel, Forward, AutoStories, Insights } from '@mui/icons-material'
import { Box, Typography, Chip, useTheme, Alert } from '@mui/material'
import BarChartDash from '../../dashboards/Charts/BarChartDash'
import RadialChartDash from '../../dashboards/Charts/RadialChartDash'
import { PieChartDashComparison } from '../../dashboards/DashCards/DashPieChartCompVsTotal'

import { MCQEvaluationResult, MCQQuizResults } from '../../../app/api/lessonApi'

interface McqQuizResultProps{
    results:MCQQuizResults;
    title:string;
    desc?:string;
    hasAttempted?:boolean
}

function McqQuizResult({results,title,desc="MCQ Result",hasAttempted}:McqQuizResultProps) {
    const theme=useTheme()
     return  <Box sx={{display:"flex",flexDirection:"column",gap:1,alignItems:"center",justifyContent:"center"}}>
      {
            hasAttempted&& <Alert severity="success" sx={{ mb: 2,pl:3,pr:3 }}>
                           You have already attempted this quiz
                          </Alert>

           }
          <Typography sx={{display:'flex',alignItems:"center",gap:2,mb:1, background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",WebkitBackgroundClip: "text",WebkitTextFillColor: "transparent",}} variant="h5" fontWeight={600}><span>{title}</span> <Insights  sx={{color:theme.palette.warning.light}} /></Typography>

           

             <Box sx={{display:"flex",width:"80%",height:'310px',alignItems:"center",justifyContent:"center",gap:3}}>
                  <Box sx={{height:"100%",width:"33%"}}>
                      <PieChartDashComparison data={[
                      { name: 'Correct', value:results.correctAnswers??0 },
                      { name: 'Incorrect', value:results.incorrectAnswers??0}
                    ]}  />
                     </Box>
                 
                 <Box sx={{height:"100%",width:"33%"}}>
                  <BarChartDash data={
                [ {name: 'Total Questions', value:results.totalQuestions??0 },
                {name: 'Correct', value:results.correctAnswers??0 },
                {name: 'Incorrect', value:results.incorrectAnswers??0 },
            ]}   colors={{
              'Total Questions': '#10B981',        // Emerald
              'Correct': '#F59E0B',    // Amber
              'In Correct':"#e1774b"
            }}  legendItems={
              [
                {label: 'Total Questions', value:results.totalQuestions??0 },
                {label: 'Correct', value:results.correctAnswers??0  },
                {label: 'Incorrect', value:results.incorrectAnswers??0 },
              ]
                } title={"Result Summary"} />
                 </Box>
                 <Box sx={{height:"100%",width:"23%"}}>
                  <RadialChartDash overAllProgressPercentage={results.percentage??0} title="Correct Percentage"/>
                 </Box>
                </Box>



          <Box sx={{maxWidth:"75%",minWidth:"75%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:2,mb:5}}>
                  <Typography sx={{display:'flex',alignItems:"center",gap:2,mb:1, background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",WebkitBackgroundClip: "text",WebkitTextFillColor: "transparent",}} variant="h5" fontWeight={600}><span>Detailed Results</span> <Insights  sx={{color:theme.palette.warning.light}} /></Typography>


            {results.detailedResults.map((result,index)=><Box sx={{width:"100%",border:"1px solid",borderColor:theme.palette.divider,padding:2,margin:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRadius:4,background:theme.palette.primary.dark,gap:0.5}}>
              <Typography variant="h6">Question {index+1} : {result.questionText}</Typography>
              <Typography sx={{display:"flex",gap:2,color:theme.palette.success.light}}> Correction Status: 
                <Chip
                    icon={result.isCorrect ? <CheckCircle /> : <Cancel />}
                    label={result.isCorrect ? "Correct" : "Incorrect"}
                    color={result.isCorrect ? "success" : "error"}
                    size="small"
                    variant='filled'
                    sx={{p:1.6}}
                                />
              </Typography>
             <Box sx={{display:"flex",gap:2,alignItems:"center",justifyContent:"center"}}>
               <Typography variant='body1' sx={{border:"2px solid",borderColor:theme.palette.divider,borderRadius:4,padding:1.5,margin:2,color:theme.palette.success.light}}>Correct: {result.correctAnswer}</Typography>
              <Typography  sx={{border:"1px solid",borderColor:theme.palette.divider,borderRadius:4,padding:1.5,margin:2,color:theme.palette.primary.main}}>Selected: {result.selectedAnswer}</Typography>
             </Box>
              <Typography>Explanation: {result.explanation}</Typography>
            </Box>)}
          </Box>
        </Box>
  }

  


export default McqQuizResult
