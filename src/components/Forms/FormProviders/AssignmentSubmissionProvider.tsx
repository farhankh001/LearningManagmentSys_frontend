import { QuizAndAssignmentFormDefault, QuizAndAssignmentFormType, quizAndAssignmentSchema } from '../../../types/quizAndAssignment'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AttemptQuizForm from '../../../pages/lessons/quizAndAssignment/AttemptQuizForm'
import AttemptAssignmentForm from '../../../pages/lessons/quizAndAssignment/AttemptAssignmentForm'
interface AttemptQuizProps{
    lessonId:string|undefined
}
function AssignmentSubmissionFormProvider({lessonId}:AttemptQuizProps) {
       const methods=useForm<QuizAndAssignmentFormType>({
             mode:"all",
             defaultValues:QuizAndAssignmentFormDefault,
             resolver:zodResolver(quizAndAssignmentSchema)
        })
  return (
    <FormProvider {...methods}>
      <AttemptAssignmentForm lessonId={lessonId}/>
    </FormProvider>
  )
}

export default AssignmentSubmissionFormProvider
