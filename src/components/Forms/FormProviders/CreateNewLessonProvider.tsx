
import { FormProvider, useForm } from 'react-hook-form'
import CreateLesson from '../../../pages/lessons/CreateLesson'
import { createLessonDefaultValues, createLessonSchema, CreateLessonType } from '../../../types/create_lesson.types'
import { zodResolver } from '@hookform/resolvers/zod'

function CreateNewLessonProvider() {
    const methods=useForm<CreateLessonType>(
      {
        mode:"all",
        resolver:zodResolver(createLessonSchema),
        defaultValues:createLessonDefaultValues
      }
    )
  return (
    <FormProvider {...methods}>
      <CreateLesson/>
    </FormProvider>
  )
}

export default CreateNewLessonProvider
