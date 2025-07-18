
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useParams } from 'react-router-dom'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useAssignmentByIdQuery } from '../../../../app/api/quizAndAssignmentApi'
import { AssignmentDefaultValues, AssignmentType, QuizAndAssignmentSchema } from '../../../../types/create_lesson.types'
import EditAssignment from '../../../../pages/lessons/EditQuizAssignmentLabForms/EditAssignment'

function EditAssignmentProvider() {
    const { assignmentId } = useParams()

    const {
        data: existingAssignment,
        isError,
        error,
        isLoading,
    } = useAssignmentByIdQuery({ assignmentId })

    const methods = useForm<AssignmentType>({
        mode: 'all',
        defaultValues: AssignmentDefaultValues, // Use fallback default initially
        resolver: zodResolver(QuizAndAssignmentSchema),
    })

    //  Reset the form when existingCourse is available
    useEffect(() => {
        if (existingAssignment) {
            const formData = existingAssignment.data
            methods.reset(formData)
        }
    }, [existingAssignment, methods])

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
            <EditAssignment />
        </FormProvider>
    )
}



export default EditAssignmentProvider
