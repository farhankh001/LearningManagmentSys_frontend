
import { Alert, Box, Typography, useTheme } from '@mui/material'
import TextInputField from '../../components/Forms/InputFields/TextInputField'
import { CreateLessonType, } from '../../types/create_lesson.types'
import FileInputField from '../../components/Forms/InputFields/FileInputField'
import RichTextInputField from '../../components/Forms/InputFields/RichTextInputField'

import { useCreateNewLessonWithQuizAndAssignmentMutation, useUpdateLessonMutation } from '../../app/api/lessonApi'
import { SubmitHandler, useFormContext } from 'react-hook-form'

import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DOMPurify from 'dompurify';
import toast from 'react-hot-toast'
import { StepDefinition, useMultiStepForm } from '../../components/MultistepFormSetup/useMultiStepFormhook'
import { HorizontalMultiStepFormWrapper } from '../../components/MultistepFormSetup/HorizontalFormWrapper'



function EditLessonForm() {
    const { lessonId } = useParams()
    const navigate = useNavigate()
    const { handleSubmit, reset, formState: { errors } } = useFormContext<CreateLessonType>()
    const [updateLesson, { error: lessonUpdateError, isError: lessonUpdateIsError, isSuccess: LessonUpdateIsSuccess, isLoading: lessonUpdateIsLoading }] = useUpdateLessonMutation()
    const theme = useTheme()
    console.log(errors)
    useEffect(() => {
        if (LessonUpdateIsSuccess) {
            toast.success("Lesson Updated Successfully.")
            reset();

        }
    }, [LessonUpdateIsSuccess, navigate, reset]);



    const handleLessonEdit: SubmitHandler<CreateLessonType> = async (data: CreateLessonType) => {
        try {

            const formData = new FormData();

            formData.append("lesson_title", data.lesson_title);
            const cleanLessonText = DOMPurify.sanitize(data.lesson_text)
            formData.append("lesson_text", cleanLessonText);

            if (data.lesson_video) {
                formData.append("lesson_video", data.lesson_video);
            }


            if (data.lesson_document) {
                formData.append("lesson_document", data.lesson_document);
            }

            if (data.lesson_document2) {
                formData.append("lesson_document2", data.lesson_document2);
            }


            if (lessonId) {
                formData.append("lessonId", lessonId)
            }
            await updateLesson(formData).unwrap()
        } catch (error) {
            console.log(error)
        }
    }

    const steps: StepDefinition<CreateLessonType>[] = [
        {
            id: 'basic-info',
            title: 'Basic Information',
            description: 'Lesson Basic Detais like lesson title, lesson vido url and documents',
            instructions: "Enter basic course details",
            fields: ['lesson_title', 'lesson_video', 'lesson_document', 'lesson_document2']
        },
        {
            id: 'lesson_text',
            title: 'Detailed Lesson Information',
            description: 'Lesson Detaied overview along with any textual data.',
            instructions: "Enter basic lesson details",
            fields: ["lesson_text"]
        },
    ]
    const [multiStepState, multiStepActions] = useMultiStepForm<CreateLessonType>({
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
                        <TextInputField<CreateLessonType> isRequired={true} label="Lesson Title" name='lesson_title' type='text' />
                        <TextInputField<CreateLessonType> isRequired={true} label='Video Url' name="lesson_video" type='text' />
                        <FileInputField<CreateLessonType> fileType={["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation",]} isRequired={false} label='If you want to update document upload new one here' maxFiles={1} maxSize={10 * 1024 * 1024} name='lesson_document' />
                        <FileInputField<CreateLessonType> fileType={["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation",]} isRequired={false} label='If you want to update document 2 upload new one here' maxFiles={1} maxSize={10 * 1024 * 1024} name='lesson_document2' />
                    </Box>
                );
            case "lesson_text":
                return (
                    <Box sx={{ display: 'flex', flexDirection: "column", gap: 1 }}>
                        <RichTextInputField<CreateLessonType> isRequired={true} label={"Provide course content in textual formate if you have any"} name={"lesson_text"} />
                        <Typography variant='caption' sx={{ color: "text.secondary" }}>Click submit after creating question paper*</Typography>
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
                m: 3,
                width: "100%",
                alignItems: "center", justifyContent: "center"
            }}
        >



            <Box sx={{ width: "100%" }} >
                {LessonUpdateIsSuccess && (
                    <Alert severity="success" sx={{ mb: 1 }}>
                        Lesson Updated Successfully...
                    </Alert>
                )}

                {lessonUpdateIsError && lessonUpdateError && 'data' in lessonUpdateError &&
                    <Alert severity="error" sx={{ mb: 1 }}>
                        {JSON.stringify((lessonUpdateError.data as any).error)}
                    </Alert>
                }


                <form onSubmit={handleSubmit(handleLessonEdit)}>
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

export default EditLessonForm


