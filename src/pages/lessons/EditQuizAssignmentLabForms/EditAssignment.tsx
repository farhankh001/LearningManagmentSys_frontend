import { useTheme } from '@emotion/react'
import { Box, Alert, Typography } from '@mui/material'
import { useEffect } from 'react'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'
import { useCreateNewAssignmentMutation } from '../../../app/api/lessonApi'
import RichTextInputField from '../../../components/Forms/InputFields/RichTextInputField'
import SelectInputField from '../../../components/Forms/InputFields/SelectInputField'
import TextAreaField from '../../../components/Forms/InputFields/TextAreaField'
import TextInputField from '../../../components/Forms/InputFields/TextInputField'
import { HorizontalMultiStepFormWrapper } from '../../../components/MultistepFormSetup/HorizontalFormWrapper'
import { StepDefinition, useMultiStepForm } from '../../../components/MultistepFormSetup/useMultiStepFormhook'
import { AssignmentType } from '../../../types/create_lesson.types'
import { useEditAssignmentMutation } from '../../../app/api/quizAndAssignmentApi'


function EditAssignment() {
    const { assignmentId } = useParams()
    const navigate = useNavigate()
    const { handleSubmit, reset } = useFormContext<AssignmentType>()
    const [editAssignment, { error: assignmentCreationError, isError: assignmentCreationIsError, isSuccess: assignmentCreationIsSuccess, isLoading: assignmentCreationIsLoading }] = useEditAssignmentMutation()
    const theme = useTheme()
    useEffect(() => {
        if (assignmentCreationIsSuccess) {
            toast.success("Assignment Updated Successfully.")
            reset();

        }
    }, [assignmentCreationIsSuccess, navigate, reset]);


    useEffect(() => {
        if (assignmentCreationIsError && assignmentCreationError && "data" in assignmentCreationError) {
            console.log(assignmentCreationError)
            toast.error(`${JSON.stringify((assignmentCreationError.data as any).error)}`)
        }
    }, [assignmentCreationIsError, assignmentCreationError])

    const handleAssignmentCreation: SubmitHandler<AssignmentType> = async (data: AssignmentType) => {
        try {
            const payload = {
                ...data,
                assignmentId: assignmentId, // courseId is a string from useParams
            };
            await editAssignment(payload).unwrap();
        } catch (err: any) {

            console.error(err);
        }

    }
    const steps: StepDefinition<AssignmentType>[] = [
        {
            id: 'basic-info',
            title: 'Edit Basic Assignemnt Information',
            description: 'Edit Assignment Basic Details like title, description and activation status',
            instructions: "Edit basic assignment details",
            fields: ['title', 'description', 'activationStatus',]
        },
        {
            id: 'scoring',
            title: 'Edit Detailed Assignment Information',
            description: 'Edit assignment details about time limit, total score and passing score',
            instructions: "Edit meta data",
            fields: ["passing_score", 'total_score', "timelimit"]
        },
        {
            id: 'questions',
            title: 'Edit Assignment Questions',
            description: 'Edit Detaied questions, create question paper in text field below',
            instructions: "Edit assignment question paper",
            fields: ["questions"]
        },
    ]
    const [multiStepState, multiStepActions] = useMultiStepForm<AssignmentType>({
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
                        <TextAreaField<AssignmentType> isRequired={true} label="Assignment Title" name='title' type='text' rows={5} />
                        <TextAreaField<AssignmentType> isRequired={true} label='Description/Instructions' name="description" type='text' rows={5} />
                        <SelectInputField<AssignmentType> isRequired={true} label={"Activation Status (set to inactive essentially)"} name={"activationStatus"} options={["Active", "Inactive"]} />
                    </Box>
                );
            case "scoring":
                return (
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
                        <TextInputField<AssignmentType> isRequired={true} label='Total Score' name='total_score' type='text' hideData={false} />
                        <TextInputField<AssignmentType> isRequired={true} label='Passing Score' name='passing_score' type='text' hideData={false} />
                        <TextInputField<AssignmentType> isRequired={true} label='Time Limit (in minutes)' name='timelimit' type='text' hideData={false} />
                    </Box>
                );
            case "questions":
                return (
                    <Box sx={{ display: 'flex', flexDirection: "column", gap: 1 }}>
                        <RichTextInputField<AssignmentType> isRequired={true} label='Assignment Question Paper' name='questions' />
                        <Typography
                            variant='caption' sx={{ color: "text.secondary" }}>Click submit after creating question paper*</Typography>
                    </Box>
                )
        }
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: "column",
                gap: 1,
                width: "100%",
                alignItems: "center", justifyContent: "center", m: 3
            }}
        >



            <Box sx={{ width: "100%" }} >
                {assignmentCreationIsSuccess && (
                    <Alert severity="success" sx={{ mb: 1 }}>
                        Assignment Created Successfully...
                    </Alert>
                )}
                {assignmentCreationIsLoading && (
                    <Alert severity="warning" sx={{ mb: 1 }}>
                        Creating Assignment...
                    </Alert>
                )}

                {assignmentCreationIsError && assignmentCreationError && 'data' in assignmentCreationError &&
                    <Alert severity="error" sx={{ mb: 1 }}>
                        {JSON.stringify((assignmentCreationError.data as any).error)}
                    </Alert>
                }


                <form onSubmit={handleSubmit(handleAssignmentCreation)}>
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

export default EditAssignment
