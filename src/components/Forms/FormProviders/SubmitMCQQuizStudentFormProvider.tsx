import React from 'react'
import { CreateMCQQuizFormDefaultValues, createMCQSchema, CreateQuizMCQFormType, submitMCQByStudent, submitMCQByStudentDefault, SubmitMCQByStudentType } from '../../../types/quiz-mcqs-types'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import MCQQuizAttemptFrom from '../../../pages/lessons/quizAndAssignment/MCQQuizAttemptFrom'
import { useParams } from 'react-router-dom'
import { useGetMCQsQuizForStudentQuery } from '../../../app/api/lessonApi'
import LoadingScreen from '../../other/Loading'
import { Box } from '@mui/material'

function SubmitMCQQuizStudentFormProvider() {
  const {lessonId}=useParams()
  const {data:mcqData,isError:mcqIncomingIsError,isSuccess:mcqIncomingIsSuccess,error:mcqIncomingError,isLoading:mcqDataIsloading}=useGetMCQsQuizForStudentQuery({lessonId})

  const methods=useForm<SubmitMCQByStudentType>({
             mode:"all",
             defaultValues:{
              lessonId:lessonId??"",
              answers:mcqData?.questions?.map(q=>({
                questionId:q.id,
                selectedAnswerIndex:-1
              }))
             },
             resolver:zodResolver(submitMCQByStudent)
        })
  React.useEffect(() => {
    if (mcqData?.questions) {
      methods.reset({
        lessonId: lessonId ?? "",
        answers: mcqData.questions.map((q) => ({
          questionId: q.id,
          selectedAnswerIndex: -1
        }))
      });
    }
  }, [mcqData, lessonId, methods]);
  if(mcqDataIsloading){
    return <LoadingScreen/>
  }
  if(mcqIncomingIsError&&mcqIncomingError){
    return <Box>Error</Box>
  }
  return (
    <FormProvider {...methods}>
      <MCQQuizAttemptFrom  questions={mcqData?.questions}/>
    </FormProvider>
  )
}

export default SubmitMCQQuizStudentFormProvider
