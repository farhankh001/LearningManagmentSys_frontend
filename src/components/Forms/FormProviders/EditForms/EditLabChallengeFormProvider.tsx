
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useParams } from 'react-router-dom'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useGetLabChallengeForEditQuery } from '../../../../app/api/labApi'
import { CreateLabChallengeFormDefaultValues, CreateLabChallengeFormSchema, CreateLabChallengeFormType } from '../../../../types/create_lab.types'
import EditLabChallengeForm from '../../../../pages/Labs/EditLabChallengeForm'

function EditLabChallengeFormProvider() {
    const { challengeId } = useParams()

    const {
        data: existingChallenge,
        isError,
        error,
        isLoading,
    } = useGetLabChallengeForEditQuery({ challengeId })

    const methods = useForm<CreateLabChallengeFormType>({
        mode: 'all',
        defaultValues: CreateLabChallengeFormDefaultValues, // Use fallback default initially
        resolver: zodResolver(CreateLabChallengeFormSchema),
    })

    //  Reset the form when existingCourse is available
    useEffect(() => {
        const formData = existingChallenge?.data
        if (formData) {
            methods.reset(formData)
        }
    }, [existingChallenge, methods])

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
            <EditLabChallengeForm />
        </FormProvider>
    )
}



export default EditLabChallengeFormProvider

