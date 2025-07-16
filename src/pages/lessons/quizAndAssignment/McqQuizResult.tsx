import {  ControlCamera, Diamond } from '@mui/icons-material'
import { Box, Typography, useTheme, Alert } from '@mui/material'
import BarChartDash from '../../dashboards/Charts/BarChartDash'
import RadialChartDash from '../../dashboards/Charts/RadialChartDash'
import { PieChartDashComparison } from '../../dashboards/DashCards/DashPieChartCompVsTotal'

import { MCQQuizResults } from '../../../app/api/lessonApi'

interface McqQuizResultProps{
    results:MCQQuizResults;
    title:string;
    desc?:string;
    hasAttempted?:boolean
}

function McqQuizResult({results,title,hasAttempted}:McqQuizResultProps) {
    const theme=useTheme()
     return  <Box sx={{display:"flex",flexDirection:"column",gap:1,alignItems:"center",justifyContent:"center"}}>
      {
            hasAttempted&& <Alert severity="success" sx={{ mb: 2,pl:3,pr:3 }}>
                           You have already attempted this quiz
                          </Alert>

           }
           <Box sx={{background:theme.palette.primary.dark,padding:2,border:"1px solid",borderRadius:4,borderColor:theme.palette.divider,display:"flex",gap:1,mb: 2,px:2,width:"74%"}}><Diamond sx={{color:theme.palette.primary.main}}/><Typography>Detailed Result of Quiz for Lesson  </Typography> <Typography sx={{fontWeight:600,color:theme.palette.primary.main}}>{title}</Typography></Box>

           

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

                   <Box sx={{background:theme.palette.primary.dark,padding:2,border:"1px solid",borderRadius:4,borderColor:theme.palette.divider,display:"flex",gap:2,px:2,width:"100%",mt:4}}><ControlCamera sx={{color:theme.palette.success.main}}/><Typography>Details Answers of All Questions Along With Correct Answer and Explanation.</Typography></Box>

           

            {results.detailedResults.map((result,index)=><Box sx={{width:"100%",border:"1px solid",borderColor:theme.palette.divider,padding:4,margin:0,display:"flex",flexDirection:"column",borderRadius:4,background:theme.palette.primary.dark,gap:0.5}}>
              <Typography variant="body1">Question {index+1} <ControlCamera sx={{fontSize:14,color:theme.palette.warning.main}}/> {result.questionText}.</Typography>
              

            <Box
                sx={{
                display: 'flex',
                gap: 0.5,
                fontWeight: 600,
                fontSize: '1rem',alignItems:"center"
             }}
            >
             Correction Status <Diamond sx={{fontSize:14,color:theme.palette.warning.main}}/>
            <Box
             component="span"
             sx={{
                p: 1.6,
                fontSize: 16,
                color: result.isCorrect
               ? theme.palette.success.main
               : theme.palette.error.main,
              }}
              >
            {result.isCorrect ? 'Correct' : 'Incorrect'}
          </Box>
        </Box>
             <Box sx={{display:"flex",gap:3}}>
               
              <Typography  sx={{}}>Selected <ControlCamera sx={{fontSize:14,color:theme.palette.primary.main}}/> {result.selectedAnswer}</Typography>
              <Typography variant='body1' sx={{}}>Correct <Diamond sx={{fontSize:14,color:theme.palette.success.main}}/> {result.correctAnswer}</Typography>
             </Box>
              <Typography>Explanation <ControlCamera sx={{fontSize:14,color:theme.palette.warning.main}}/>  {result.explanation}</Typography>
            </Box>)}
          </Box>
        </Box>
  }

  


export default McqQuizResult
