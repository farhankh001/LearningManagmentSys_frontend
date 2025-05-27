import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { CreateMCQQuizFormDefaultValues, createMCQSchema, CreateQuizMCQFormType } from '../../../types/quiz-mcqs-types'
import { zodResolver } from '@hookform/resolvers/zod'
import MCQQuizCreateForm from '../../../pages/lessons/quizAndAssignment/MCQQuizCreateForm'

function MCQsCreateQuizFormProvider() {
   const methods=useForm<CreateQuizMCQFormType>({
         mode:"all",
         defaultValues:CreateMCQQuizFormDefaultValues,
         resolver:zodResolver(createMCQSchema)
    })
  return (
    <FormProvider {...methods}>
      <MCQQuizCreateForm/>
    </FormProvider>
  )
}

export default MCQsCreateQuizFormProvider
