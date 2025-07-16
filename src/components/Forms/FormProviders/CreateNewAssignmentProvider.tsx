import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'

import { AssignmentDefaultValues, AssignmentType, QuizAndAssignmentSchema } from '../../../types/create_lesson.types'
import CreateAssignment from '../../../pages/lessons/CreateAssignment'


function CreateNewAssignmentProvider() {

    const methods = useForm<AssignmentType>({
        mode: "all",
        defaultValues: AssignmentDefaultValues,
        resolver: zodResolver(QuizAndAssignmentSchema)
    })
    return (
        <FormProvider {...methods}>
            <CreateAssignment />
        </FormProvider>
    )

}

export default CreateNewAssignmentProvider
