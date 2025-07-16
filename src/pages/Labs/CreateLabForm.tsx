import { Box, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { CreateLabFormType, CreateLabWithChallengesFormType } from '../../types/create_lab.types'
import { StepDefinition, useMultiStepForm } from '../../components/MultistepFormSetup/useMultiStepFormhook'
import { HorizontalMultiStepFormWrapper } from '../../components/MultistepFormSetup/HorizontalFormWrapper'
import TextInputField from '../../components/Forms/InputFields/TextInputField'
import SelectInputField from '../../components/Forms/InputFields/SelectInputField'
import TextAreaField from '../../components/Forms/InputFields/TextAreaField'

function CreateLabForm() {
   const theme=useTheme()
   const navigate=useNavigate()
   const {lessonId}=useParams()
   const { control, handleSubmit,reset,getValues } = useFormContext<CreateLabFormType>()


    const handleLabCreation=async(data:CreateLabFormType)=>{
        console.log(data)
    }
    const steps: StepDefinition<CreateLabFormType>[] = [
              {
                id: 'basic-info',
                title: 'Create Lab',
                description: 'Enter basic lab information like title, description, activation Status and timelimit',
                instructions:"Enter basic course details",
                fields: ["title","description","activationStatus","timelimit"]
              },
              
            ]

    const [multiStepState, multiStepActions] = useMultiStepForm<CreateLabFormType>({
            steps,
            onStepChange: (step, direction) => {
              console.log(`Moved to step ${step + 1} (${direction})`);
            }
          });


    const renderCurrentStepFields=()=>{
              const currentStepId=multiStepState.currentStepInfo.id;
              switch(currentStepId){
                case "basic-info":
                  return(
                  <Box sx={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:3}} >
                    <TextAreaField<CreateLabFormType> isRequired label='Lab Title' name='title' type={"text"} rows={5} />
                    <TextAreaField<CreateLabFormType> isRequired label='Lab Description' name='description' type={"text"} rows={5} />
                    <TextInputField<CreateLabFormType> isRequired label='Time Limit' name='timelimit' type={"text"} />
                    <SelectInputField<CreateLabFormType> isRequired label='Activation Status' name='activationStatus' options={["Active","Inactive"]} />
                  </Box>
                  );
                }}



    
    return (
    <Box sx={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
       <Box sx={{width:"85%"}}>
         <form  onSubmit={handleSubmit(handleLabCreation)}>
           <HorizontalMultiStepFormWrapper state={multiStepState} actions={multiStepActions}  stepTitles={steps.map(step =>{
                    return {
                             steptitle:step.title,
                             instructions:step.instructions
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
