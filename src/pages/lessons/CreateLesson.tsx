
import { Alert, Box, useTheme } from '@mui/material'
import TextInputField from '../../components/Forms/InputFields/TextInputField'
import { CreateLessonType, } from '../../types/create_lesson.types'
import FileInputField from '../../components/Forms/InputFields/FileInputField'
import RichTextInputField from '../../components/Forms/InputFields/RichTextInputField'

import { useCreateNewLessonWithQuizAndAssignmentMutation } from '../../app/api/lessonApi'
import { SubmitHandler, useFormContext } from 'react-hook-form'

import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DOMPurify from 'dompurify';
import toast from 'react-hot-toast'
import { StepDefinition, useMultiStepForm } from '../../components/MultistepFormSetup/useMultiStepFormhook'
import { HorizontalMultiStepFormWrapper } from '../../components/MultistepFormSetup/HorizontalFormWrapper'



function CreateLesson() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { handleSubmit, reset } = useFormContext<CreateLessonType>()
  const [createLessonWithQAA, { error: lessonCreationError, isError: lessonCreationIsError, isSuccess: LessonCreationIsSuccess, isLoading: lessonCreationIsLoading }] = useCreateNewLessonWithQuizAndAssignmentMutation()
  const theme = useTheme()
  useEffect(() => {
    if (LessonCreationIsSuccess) {

      toast.success("Lesson Created Successfully.")
      reset();
      navigate('/teacher-dash');

    }
  }, [LessonCreationIsSuccess, navigate, reset]);



  const handleLessonCreation: SubmitHandler<CreateLessonType> = async (data: CreateLessonType) => {
    try {

      const formData = new FormData();
      if (courseId) {
        formData.append("courseId", courseId)
      }
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

      if (data.quiz) {
        formData.append("quiz", JSON.stringify(data.quiz));
      }

      if (data.assignment) {
        formData.append("assignment", JSON.stringify(data.assignment));
      }

      createLessonWithQAA(formData)
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
            <FileInputField<CreateLessonType> fileType={["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation",]} isRequired={false} label='Lesson document' maxFiles={1} maxSize={10 * 1024 * 1024} name='lesson_document' />
            <FileInputField<CreateLessonType> fileType={["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation",]} isRequired={false} label='Lesson document 2' maxFiles={1} maxSize={10 * 1024 * 1024} name='lesson_document2' />
          </Box>
        );
      case "lesson_text":
        return (
          <Box sx={{ display: 'flex' }}>
            <RichTextInputField<CreateLessonType> isRequired={true} label={"Provide course content in textual formate if you have any"} name={"lesson_text"} />
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
        alignItems: "center", justifyContent: "center"
      }}
    >



      <Box sx={{ width: "90%" }} >
        {LessonCreationIsSuccess && (
          <Alert severity="success" sx={{ mb: 1 }}>
            Lesson Created Successfully...
          </Alert>
        )}

        {lessonCreationIsError && lessonCreationError && 'data' in lessonCreationError &&
          <Alert severity="error" sx={{ mb: 1 }}>
            {JSON.stringify((lessonCreationError.data as any).error)}
          </Alert>
        }


        <form onSubmit={handleSubmit(handleLessonCreation)}>
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

export default CreateLesson
