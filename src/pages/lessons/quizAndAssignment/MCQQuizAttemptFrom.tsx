
import { Box,Button, List, ListItem, Typography, useTheme } from '@mui/material'
import { SubmitQuizMCQType, useAttemptedMCQByStudentSubmitMutation, useGetMCQsQuizForStudentQuery } from '../../../app/api/lessonApi'
import MCQSInputField from '../../../components/Forms/InputFields/MCQSInputField'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { SingleMCQbyStudentType, SubmitMCQByStudentType } from '../../../types/quiz-mcqs-types'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'
import { Gavel, CheckCircle } from '@mui/icons-material'


interface MCQQuizAttemptFormProps {
  questions: {
    id: string;
    question_text: string;
    options: string[];
  }[]|undefined;
}


const instructions=[
  "Each question has four options choose one of four. Only one choice is correct",
  "Fill all questions. All questions are required. Re-check after filling",
  "All Questions have equal marks.Results will be calculated based on all questions",
  "Re-read your answers before submitting, submit is no reverseable",
  "You cannot submit same quiz twice so fill carefully"

]

function MCQQuizAttemptFrom({questions}:MCQQuizAttemptFormProps) {
  const navigate=useNavigate()
  const theme=useTheme()
 const[attemptedMCQData,{isError,isLoading,error}]=useAttemptedMCQByStudentSubmitMutation()
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
// console.log(questions)
console.log(error)
  return (
 <Box sx={{width:"100%",padding:5,display:"flex",flexDirection:"column"}}>
   <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <Typography variant='h4' fontWeight={600} sx={{color: theme.palette.primary.light,fontStyle:"italic"}}>
            <Gavel sx={{fontSize:25,mr:1}}/>
           Attempt Quiz:  Instructions
          </Typography>
        <List sx={{
          display:"flex",
          flexDirection:{
            xs:"column",
            sm:"column",
            md:"row",
            lg:"row",
            xl:'row'
          },
          ml:1,
          mr:1
          // alignItems:"center",
          // justifyContent:"center",
        }}>
              {instructions&&instructions.map((instruction)=><ListItem 
              sx={{display:"flex",flexDirection:{
                 xs:"row",
                 sm:"row",
                 md:"column",
                 lg:"column",
                 xl:'column'
            },
             boxShadow:`-2px 2px 2px ${theme.palette.secondary.light}`,
            gap:{
              xs:1,
              sm:1,
              md:2
            },alignItems:"center",margin:1,backgroundColor:theme.palette.background.paper,borderRadius:4,padding:2,textAlign:"center"}}>
                  <CheckCircle sx={{
                         fontSize:15, }}/>
                <Typography variant='caption' fontWeight={600}>
                   {instruction}
                </Typography>
               </ListItem>)}
          </List>
          <Button variant='outlined' size='large'>
            Questions
          </Button>
        </Box>
  
    <Box sx={{}}>
    
    <form onSubmit={handleSubmit(submitHandler)}>
       {questions&&fields.map((field,index)=><Box>
        <MCQSInputField<SubmitMCQByStudentType> label='Multiple Choice Questions' name={`answers.${index}.selectedAnswerIndex`} question={{id:field.questionId,question_text:questions[index].question_text,options:questions[index].options}} isRequired={true} />
       </Box>)}
       <Button type='submit' variant='contained' size='medium' sx={{margin:3}}>
        submit
       </Button>
    </form>
   </Box>
 </Box>
  )
}

export default MCQQuizAttemptFrom
