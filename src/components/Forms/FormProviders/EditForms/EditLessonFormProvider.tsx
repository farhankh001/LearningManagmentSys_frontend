import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'react-router-dom'
import { Box, CircularProgress, Typography } from '@mui/material'

import { useGetLessonForEditQuery } from '../../../../app/api/lessonApi'
import EditLessonForm from '../../../../pages/lessons/EditLessonForm'
import { createLessonDefaultValues, createLessonSchema, CreateLessonType } from '../../../../types/create_lesson.types'

function EditLessonFormProvider() {
    const { lessonId } = useParams()

    const {
        data: existingLesson,
        isError,
        error,
        isLoading,
    } = useGetLessonForEditQuery({ lessonId })

    const methods = useForm<CreateLessonType>({
        mode: 'all',
        defaultValues: createLessonDefaultValues, // Use fallback default initially
        resolver: zodResolver(createLessonSchema),
    })

    //  Reset the form when existingCourse is available
    useEffect(() => {
        const formData = existingLesson?.data
        if (formData) {
            methods.reset(formData)
        }
    }, [existingLesson, methods])

    if (isLoading) {
        return <Box sx={{ display: "flex", width: "100%", height: "70vh", justifyContent: "center", alignItems: "center" }}><CircularProgress /></Box>
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
            <EditLessonForm />
        </FormProvider>
    )
}



export default EditLessonFormProvider


