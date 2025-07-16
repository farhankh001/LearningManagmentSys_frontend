import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  createCourseDefaultValues,

  editCourseFormSchema,
  EditCourseFormType,
} from '../../../types/create_course.types'
import { zodResolver } from '@hookform/resolvers/zod'
import EditExistingCourse from '../../../pages/courses/EditExistingCourse'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { useParams } from 'react-router-dom'
import { useSingleCourseDetailsForEditQuery } from '../../../app/api/teacherDashApis'
import { Typography } from '@mui/material'

function EditExistingCourseProvider() {
  const { courseId } = useParams()
  const categories = useSelector((state: RootState) => state.categories.categories)

  const {
    data: existingCourse,
    isError,
    error,
    isLoading,
  } = useSingleCourseDetailsForEditQuery({ courseId: courseId })

  const methods = useForm<EditCourseFormType>({
    mode: 'all',
    defaultValues: createCourseDefaultValues, // Use fallback default initially
    resolver: zodResolver(editCourseFormSchema(categories)),
  })

  //  Reset the form when existingCourse is available
  useEffect(() => {
    if (existingCourse) {
      methods.reset(existingCourse)
    }
  }, [existingCourse, methods])

  if (isLoading) {
    return <Typography>Loading course data...</Typography>
  }

  if (isError && error && 'data' in error) {
    return (
      <Typography>
        {JSON.stringify((error.data as any).error)}
      </Typography>
    )
  }

  return (
    <FormProvider {...methods}>
      <EditExistingCourse />
    </FormProvider>
  )
}

export default EditExistingCourseProvider
