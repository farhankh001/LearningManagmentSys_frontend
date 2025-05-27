import React from 'react'
import { CreateMCQQuizFormDefaultValues, createMCQSchema, CreateQuizMCQFormType } from '../../../types/quiz-mcqs-types'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import MCQQuizAttemptFrom from '../../../pages/lessons/quizAndAssignment/MCQQuizAttemptFrom'

function SubmitMCQQuizStudentFormProvider() {
    const methods=useForm<CreateQuizMCQFormType>({
             mode:"all",
             defaultValues:CreateMCQQuizFormDefaultValues,
             resolver:zodResolver(createMCQSchema)
        })
  return (
    <FormProvider {...methods}>
      <MCQQuizAttemptFrom/>
    </FormProvider>
  )
}

export default SubmitMCQQuizStudentFormProvider
