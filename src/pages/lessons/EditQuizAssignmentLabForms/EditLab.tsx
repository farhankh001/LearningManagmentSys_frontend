import { Box, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Edit } from '@mui/icons-material'
import { useEditLabMutation } from '../../../app/api/labApi'
import { CreateLabFormType } from '../../../types/create_lab.types'
import SelectInputField from '../../../components/Forms/InputFields/SelectInputField'
import TextAreaField from '../../../components/Forms/InputFields/TextAreaField'
import TextInputField from '../../../components/Forms/InputFields/TextInputField'
import { HorizontalMultiStepFormWrapper } from '../../../components/MultistepFormSetup/HorizontalFormWrapper'
import { StepDefinition, useMultiStepForm } from '../../../components/MultistepFormSetup/useMultiStepFormhook'

function EditLabForm() {
    const theme = useTheme()
    const navigate = useNavigate()
    const { labId } = useParams()
    const { control, handleSubmit, reset, getValues } = useFormContext<CreateLabFormType>()

    const [editlab, { isError, isLoading, isSuccess, error }] = useEditLabMutation()
    useEffect(() => {
        if (isSuccess) {
            toast.success("Lab Updated Successfully.")
            reset();
            setTimeout(() => {
                navigate(`/view-all-lab-challenge/${labId}`);
            }, 500);


        }
    }, [isSuccess, navigate, reset]);


    useEffect(() => {
        if (isError && error && "data" in error) {
            console.log(error)
            toast.error(`${JSON.stringify((error.data as any).error)}`)
        }
    }, [isError, error])
    const handleLabCreation = async (data: CreateLabFormType) => {
        try {
            const payload = {
                ...data,
                labId: labId, // courseId is a string from useParams
            };
            await editlab(payload).unwrap();
        } catch (err: any) {

            console.error(err);
        }
    }
    const steps: StepDefinition<CreateLabFormType>[] = [
        {
            id: 'basic-info',
            title: 'Edit Lab',
            description: 'Edit basic lab information like title, description, activation Status and timelimit',
            instructions: "Edit basic course details",
            fields: ["title", "description", "activationStatus", "timelimit"]
        },

    ]

    const [multiStepState, multiStepActions] = useMultiStepForm<CreateLabFormType>({
        steps,
        onStepChange: (step, direction) => {
            console.log(`Moved to step ${step + 1} (${direction})`);
        }
    });


    const renderCurrentStepFields = () => {
        const currentStepId = multiStepState.currentStepInfo.id;
        switch (currentStepId) {
            case "basic-info":
                return (
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }} >
                        <TextAreaField<CreateLabFormType> isRequired label='Lab Title' name='title' type={"text"} rows={5} />
                        <TextAreaField<CreateLabFormType> isRequired label='Lab Description' name='description' type={"text"} rows={5} />
                        <TextInputField<CreateLabFormType> isRequired label='Time Limit' name='timelimit' type={"text"} />
                        <SelectInputField<CreateLabFormType> isRequired label='Activation Status' name='activationStatus' options={["Active", "Inactive"]} />
                    </Box>
                );
        }
    }




    return (
        <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box sx={{ width: "85%" }}>
                <form onSubmit={handleSubmit(handleLabCreation)}>
                    <HorizontalMultiStepFormWrapper state={multiStepState} actions={multiStepActions} stepTitles={steps.map(step => {
                        return {
                            steptitle: step.title,
                            instructions: step.instructions
                        }
                    })}
                    >
                        {renderCurrentStepFields()}
                    </HorizontalMultiStepFormWrapper>
                </form>
            </Box>


        </Box>
    )
}

export default EditLabForm
