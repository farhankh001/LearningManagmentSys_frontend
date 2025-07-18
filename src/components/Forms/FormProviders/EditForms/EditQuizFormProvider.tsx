


import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useParams } from 'react-router-dom'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useLabDatabyIdQuery } from '../../../../app/api/labApi'
import { CreateLabFormDefaultValues, CreateLabFormSchema, CreateLabFormType } from '../../../../types/create_lab.types'
import { useQuizByIdQuery } from '../../../../app/api/quizAndAssignmentApi'
import { CreateMCQQuizFormDefaultValues, createMCQSchema, CreateQuizMCQFormType } from '../../../../types/quiz-mcqs-types'
import MCQQuizEditForm from '../../../../pages/lessons/EditQuizAssignmentLabForms/EditQuiz'

function EditQuizFormProvider() {
    const { quizId } = useParams()

    const {
        data: existingQuiz,
        isError,
        error,
        isLoading,
    } = useQuizByIdQuery({ quizId })

    const methods = useForm<CreateQuizMCQFormType>({
        mode: 'all',
        defaultValues: CreateMCQQuizFormDefaultValues, // Use fallback default initially
        resolver: zodResolver(createMCQSchema),
    })

    //  Reset the form when existingCourse is available
    useEffect(() => {
        const formData = existingQuiz?.data;
        if (formData) {
            methods.reset(formData);
        }
    }, [existingQuiz, methods]);


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
            <MCQQuizEditForm />
        </FormProvider>
    )
}



export default EditQuizFormProvider

