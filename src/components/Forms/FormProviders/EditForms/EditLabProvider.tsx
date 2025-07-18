

import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useParams } from 'react-router-dom'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useLabDatabyIdQuery } from '../../../../app/api/labApi'
import { CreateLabFormDefaultValues, CreateLabFormSchema, CreateLabFormType } from '../../../../types/create_lab.types'
import EditLabForm from '../../../../pages/lessons/EditQuizAssignmentLabForms/EditLab'

function EditLabProvider() {
    const { labId } = useParams()

    const {
        data: existingLab,
        isError,
        error,
        isLoading,
    } = useLabDatabyIdQuery({ labId })

    const methods = useForm<CreateLabFormType>({
        mode: 'all',
        defaultValues: CreateLabFormDefaultValues, // Use fallback default initially
        resolver: zodResolver(CreateLabFormSchema),
    })

    //  Reset the form when existingCourse is available
    useEffect(() => {
        const formData = existingLab?.data.lab
        if (formData) {
            methods.reset(formData)
        }
    }, [existingLab, methods])

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
            <EditLabForm />
        </FormProvider>
    )
}



export default EditLabProvider

