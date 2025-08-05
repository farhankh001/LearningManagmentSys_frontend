import { QuizAndAssignmentFormDefault, QuizAndAssignmentFormType, quizAndAssignmentSchema } from '../../../types/quizAndAssignment'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AttemptChallenge from '../../../pages/lessons/quizAndAssignment/AttemptChallenge'
import { submitChallengeDefaultValues, submitChallengeSchema, submitChallengeType } from '../../../types/create_lab.types'

function ChallengeSubmissionFormProvider() {

  const methods = useForm<submitChallengeType>({
    mode: "all",
    defaultValues: submitChallengeDefaultValues,
    resolver: zodResolver(submitChallengeSchema)
  })
  return (
    <FormProvider {...methods}>
      <AttemptChallenge />
    </FormProvider>
  )
}

export default ChallengeSubmissionFormProvider
