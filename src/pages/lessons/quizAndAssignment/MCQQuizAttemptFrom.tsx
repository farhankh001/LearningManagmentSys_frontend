
import { Box,Button, Chip, Divider, List, ListItem, Typography, useTheme } from '@mui/material'
import { SubmitQuizMCQType, useAttemptedMCQByStudentSubmitMutation, useGetMCQsQuizForStudentQuery, useMcqAttemptStatusCheckQuery } from '../../../app/api/lessonApi'
import MCQSInputField from '../../../components/Forms/InputFields/MCQSInputField'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { SingleMCQbyStudentType, SubmitMCQByStudentType } from '../../../types/quiz-mcqs-types'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Gavel, CheckCircle, QuestionAnswer, Article, LibraryAdd, LibraryBooks, Book, AutoStories, Cancel, QuizRounded } from '@mui/icons-material'
import BarChartDash from '../../dashboards/Charts/BarChartDash'
import PieChartDash from '../../dashboards/Charts/PieChartDash'
import RadialChartDash from '../../dashboards/Charts/RadialChartDash'
import { PieChartDashComparison } from '../../dashboards/DashCards/DashPieChartCompVsTotal'


interface MCQQuizAttemptFormProps {
  questions: {
    id: string;
    question_text: string;
    options: string[];
  }[]|undefined;
}




function MCQQuizAttemptFrom({questions}:MCQQuizAttemptFormProps) {
  const {lessonId}=useParams()
  const navigate=useNavigate()

  const theme=useTheme()
  const[attemptedMCQData,{isError,isLoading,error}]=useAttemptedMCQByStudentSubmitMutation()
  const {data,error:mcqAttemptError,isError:mcqAttemptIsError}=useMcqAttemptStatusCheckQuery({lessonId})
  const {handleSubmit,control}=useFormContext<SubmitMCQByStudentType>()
  const {fields,append}=useFieldArray({control,name:"answers"})
  const submitHandler=async(data:SubmitMCQByStudentType)=>{
    try {
     console.log(data)
     const response = await attemptedMCQData(data)
     if(!response?.data?.submissionId){
       toast.error("No submission Id was returned You may have already attempted this Quiz.")
     }else{
       navigate(`/view-mcq-results-std/${response?.data?.submissionId}`)
     }
   } catch (error) {
    console.log(error)
   }
}
  if(mcqAttemptIsError){
          
    return <Box>
      {JSON.stringify(mcqAttemptError)}
    </Box>
  }




  



  if(data?.hasAttempted){
          
    return  <Box sx={{display:"flex",flexDirection:"column",gap:1,alignItems:"center",justifyContent:"center"}}>
          <Typography variant='h4' fontWeight={600} sx={{color:theme.palette.primary.light,textAlign:"center"}} >
            You Have Already Attempted this Quiz: 
            Quiz Results
          </Typography>

        
             <Box sx={{display:"flex",width:"100%",height:'380px',alignItems:"center",justifyContent:"center",gap:3,padding:4}}>
                  <Box sx={{height:"100%",width:"33%"}}>
                      <PieChartDashComparison data={[
                      { name: 'Correct', value: data.results.correctAnswers??0 },
                      { name: 'Incorrect', value:data.results.incorrectAnswers??0}
                    ]}  />
                     </Box>
                 
                 <Box sx={{height:"100%",width:"33%"}}>
                  <BarChartDash data={
                [ {name: 'Total Questions', value: data.results.totalQuestions??0 },
                {name: 'Correct', value:data.results.correctAnswers??0 },
                {name: 'Incorrect', value: data.results.incorrectAnswers??0 },
            ]}   colors={{
              'Total Questions': '#10B981',        // Emerald
              'Correct': '#F59E0B',    // Amber
              'In Correct':"#e1774b"
            }}  legendItems={
              [
                {label: 'Total Questions', value: data.results.totalQuestions??0 },
                {label: 'Correct', value:data.results.correctAnswers??0  },
                {label: 'Incorrect', value: data.results.incorrectAnswers??0 },
              ]
                } title={"Result Summary"} />
                 </Box>
                 <Box sx={{height:"100%",width:"23%"}}>
                  <RadialChartDash overAllProgressPercentage={data.results.percentage??0} title="Correct Percentage"/>
                 </Box>
                </Box>



          <Box sx={{maxWidth:"75%",minWidth:"75%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                <Typography variant='h5'fontWeight={700} sx={{textAlign:"center",padding:2,margin:2,border:"1px solid",borderColor:theme.palette.divider,width:"100%"}}>DETAILED RESULTS</Typography>

            {data?.results.detailedResults.map((result,index)=><Box sx={{width:"100%",border:"1px solid",borderColor:theme.palette.divider,padding:2,margin:2,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
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









  return (
 <Box sx={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
  
    <Box sx={{maxWidth:"95%",minWidth:"75%"}}>
    <Typography variant='h5'fontWeight={700} sx={{textAlign:"center",padding:2,margin:2,border:"1px solid",borderColor:theme.palette.divider,width:"100%"}}><AutoStories sx={{fontSize:18,mr:2}}/>Lesson Title: This is Frist Lesson: <AutoStories sx={{fontSize:18,ml:2}}/></Typography>
    <form onSubmit={handleSubmit(submitHandler)}>
       {questions&&fields.map((field,index)=><Box sx={{width:"100%",border:"1px solid",borderColor:theme.palette.divider,padding:2,margin:2,textAlign:"center"}}>
        <Typography variant='body1' ><QuestionAnswer/>Question No {index+1}</Typography>
        <MCQSInputField<SubmitMCQByStudentType> label='Multiple Choice Questions' name={`answers.${index}.selectedAnswerIndex`} question={{id:field.questionId,question_text:questions[index].question_text,options:questions[index].options}} isRequired={true} />
       </Box>)}
       <Box sx={{display:"flex",alignItems:"center",width:"100%",border:"1px solid",borderColor:theme.palette.divider,padding:1,margin:2,justifyContent:"center"
       }}>
        <Button type='submit' variant='contained' size='large' sx={{margin:1,pl:5,pr:5}}>
        submit
       </Button>
       </Box>
    </form>
   </Box>
 </Box>
  )
}

export default MCQQuizAttemptFrom
