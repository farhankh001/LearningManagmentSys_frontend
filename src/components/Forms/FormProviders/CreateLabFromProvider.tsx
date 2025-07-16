
import { FormProvider, useForm } from 'react-hook-form'
import { CreateLabFormDefaultValues, CreateLabFormSchema, CreateLabFormType, CreateLabWithChallengesFormDefaultValues, CreateLabWithChallengesFormType, CreateLabWithChallengesSchema } from '../../../types/create_lab.types'
import { zodResolver } from '@hookform/resolvers/zod'
import CreateLabForm from '../../../pages/Labs/CreateLabForm'
function CreateLabFromProvider() {
  const methods=useForm<CreateLabFormType>({
          mode:"all",
          defaultValues:CreateLabFormDefaultValues,
          resolver:zodResolver(CreateLabFormSchema)
     })
   return (
     <FormProvider {...methods}>
       <CreateLabForm/>
     </FormProvider>
   )
}

export default CreateLabFromProvider
