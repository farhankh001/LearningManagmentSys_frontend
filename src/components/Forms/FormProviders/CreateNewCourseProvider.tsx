import { FormProvider, useForm } from 'react-hook-form'
import { createCourseDefaultValues, createCourseFormSchema, CreateCourseFormType,} from '../../../types/create_course.types'
import { zodResolver } from '@hookform/resolvers/zod'
import NewCourseCreate from '../../../pages/courses/NewCourseCreate'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'


function CreateNewCourseProvider() {
    const categories=useSelector((state:RootState)=>state.categories.categories)
    const methods=useForm<CreateCourseFormType>({
        mode:"all",
        defaultValues:createCourseDefaultValues,
        resolver:zodResolver(createCourseFormSchema(categories))
    })
  return (
    <FormProvider {...methods}>
      <NewCourseCreate/>
    </FormProvider>
  )
}

export default CreateNewCourseProvider
