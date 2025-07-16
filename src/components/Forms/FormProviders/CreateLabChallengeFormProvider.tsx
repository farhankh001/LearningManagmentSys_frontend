import { FormProvider, useForm } from 'react-hook-form'
import { CreateLabChallengeFormDefaultValues, CreateLabChallengeFormSchema, CreateLabChallengeFormType } from '../../../types/create_lab.types'
import { zodResolver } from '@hookform/resolvers/zod'
import CreateLabChallengeForm from '../../../pages/Labs/CreateLabChallengeForm'

function CreateLabChallengeFormProvider() {
  const methods=useForm<CreateLabChallengeFormType>({
          mode:"all",
          defaultValues:CreateLabChallengeFormDefaultValues,
          resolver:zodResolver(CreateLabChallengeFormSchema)
     })
   return (
     <FormProvider {...methods}>
       <CreateLabChallengeForm/>
     </FormProvider>
   )
  
}

export default CreateLabChallengeFormProvider
