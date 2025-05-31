
import { Box,Button } from '@mui/material'
import { SubmitQuizMCQType, useAttemptedMCQByStudentSubmitMutation, useGetMCQsQuizForStudentQuery } from '../../../app/api/lessonApi'
import MCQSInputField from '../../../components/Forms/InputFields/MCQSInputField'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { SingleMCQbyStudentType, SubmitMCQByStudentType } from '../../../types/quiz-mcqs-types'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'


interface MCQQuizAttemptFormProps {
  questions: {
    id: string;
    question_text: string;
    options: string[];
  }[]|undefined;
}

function MCQQuizAttemptFrom({questions}:MCQQuizAttemptFormProps) {
  const navigate=useNavigate()
 const[attemptedMCQData,{isError,isLoading,error}]=useAttemptedMCQByStudentSubmitMutation()
  const {handleSubmit,control}=useFormContext<SubmitMCQByStudentType>()
  const {fields,append}=useFieldArray({control,name:"answers"})
const submitHandler=async(data:SubmitMCQByStudentType)=>{
   try {
    console.log(data)
     const response = await attemptedMCQData(data)
     if(!response?.data?.submissionId){
       toast.error("No submission Id was returned you won't be able to view results.")
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
   <Box>
    
    <form onSubmit={handleSubmit(submitHandler)}>
       {questions&&fields.map((field,index)=><Box>
        <MCQSInputField<SubmitMCQByStudentType> label='Multiple Choice Questions' name={`answers.${index}.selectedAnswerIndex`} question={{id:field.questionId,question_text:questions[index].question_text,options:questions[index].options}} isRequired={true} />
       </Box>)}
       <Button type='submit'>
        submit
       </Button>
    </form>
   </Box>
  )
}

export default MCQQuizAttemptFrom
