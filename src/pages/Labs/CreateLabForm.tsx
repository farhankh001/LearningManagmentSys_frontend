import { Box, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { CreateLabFormType, CreateLabWithChallengesFormType } from '../../types/create_lab.types'
import { StepDefinition, useMultiStepForm } from '../../components/MultistepFormSetup/useMultiStepFormhook'
import { HorizontalMultiStepFormWrapper } from '../../components/MultistepFormSetup/HorizontalFormWrapper'
import TextInputField from '../../components/Forms/InputFields/TextInputField'
import SelectInputField from '../../components/Forms/InputFields/SelectInputField'
import TextAreaField from '../../components/Forms/InputFields/TextAreaField'
import { useCreateLabApiMutation } from '../../app/api/labApi'
import toast from 'react-hot-toast'

function CreateLabForm() {
  const theme = useTheme()
  const navigate = useNavigate()
  const { lessonId } = useParams()
  const { control, handleSubmit, reset, getValues } = useFormContext<CreateLabFormType>()

  const [createlab, { isError, isLoading, isSuccess, error }] = useCreateLabApiMutation()
  useEffect(() => {
    if (isSuccess) {
      toast.success("Assignment Created Successfully.")
      reset();
      navigate(`/lesson-settings/${lessonId}`);

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
        lessonId: lessonId, // courseId is a string from useParams
      };
      await createlab(payload).unwrap();
    } catch (err: any) {

      console.error(err);
    }
  }
  const steps: StepDefinition<CreateLabFormType>[] = [
    {
      id: 'basic-info',
      title: 'Create Lab',
      description: 'Enter basic lab information like title, description, activation Status and timelimit',
      instructions: "Enter basic course details",
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
    <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", m: 3 }}>
      <Box sx={{ width: "100%" }}>
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

export default CreateLabForm
