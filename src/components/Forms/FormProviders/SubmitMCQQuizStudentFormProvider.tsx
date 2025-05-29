import React from 'react'
import { CreateMCQQuizFormDefaultValues, createMCQSchema, CreateQuizMCQFormType } from '../../../types/quiz-mcqs-types'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import MCQQuizAttemptFrom from '../../../pages/lessons/quizAndAssignment/MCQQuizAttemptFrom'
import { useParams } from 'react-router-dom'

function SubmitMCQQuizStudentFormProvider() {
  const {lessonId}=useParams()
    const methods=useForm<CreateQuizMCQFormType>({
             mode:"all",
             defaultValues:CreateMCQQuizFormDefaultValues,
             resolver:zodResolver(createMCQSchema)
        })
  return (
    <FormProvider {...methods}>
      <MCQQuizAttemptFrom  lessonId={lessonId}/>
    </FormProvider>
  )
}

export default SubmitMCQQuizStudentFormProvider
