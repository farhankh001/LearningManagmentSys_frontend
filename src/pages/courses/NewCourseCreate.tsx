import { Alert, Box, Button, List, ListItem, Typography, useTheme } from '@mui/material'
import TextInputField from '../../components/Forms/InputFields/TextInputField'
import { CreateCourseFormType, } from '../../types/create_course.types'
import TextAreaField from '../../components/Forms/InputFields/TextAreaField'
import SelectInputField from '../../components/Forms/InputFields/SelectInputField'
import { LoadingButton } from '@mui/lab'
import { useCreateNewCourseMutation } from '../../app/api/createCourseApi'
import FileInputField from '../../components/Forms/InputFields/FileInputField'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import MultipleSelectInputField from '../../components/Forms/InputFields/MultipleSelectField'
import RichTextInputField from '../../components/Forms/InputFields/RichTextInputField'
import { CheckCircle, Create, Gavel } from '@mui/icons-material'
import DOMPurify from 'dompurify';
import { StepDefinition, useMultiStepForm } from '../../components/MultistepFormSetup/useMultiStepFormhook'
import { HorizontalMultiStepFormWrapper } from '../../components/MultistepFormSetup/HorizontalFormWrapper'
const instructions = [
  "Course Title: Enter a clear and concise title that reflects the main topic of your course.",
  "Sub-Title: A tagline for your course, should be brief and attractive.",
  "Description: Provide a brief overview of what your course covers.",
  "What You Will Learn: Describe the key skills, knowledge, or outcomes.",
  "Course Image: Upload a high-quality image that represents your course topic."

]


function NewCourseCreate() {
  const [createCourse, { isLoading, isSuccess, isError, error }] = useCreateNewCourseMutation();
  const { handleSubmit } = useFormContext<CreateCourseFormType>()
  const navigate = useNavigate()
  const theme = useTheme()
  const { reset } = useFormContext<CreateCourseFormType>()

  const categories = useSelector((state: RootState) =>
    state.categories.categories || ["OTHERS"])
  useEffect(() => {
    if (isSuccess) {
      reset();
      setTimeout(() => {
        navigate('/teacher-dash');
      }, 1000);
    }
  }, [isSuccess, navigate, reset]);
  console.log(error)
  const createCourseSumit: SubmitHandler<CreateCourseFormType> = async (data: CreateCourseFormType) => {
    try {


      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('subtitle', data.subtitle);
      formData.append('description', data.description);
      formData.append('level', data.level);
      formData.append('language', data.language);
      formData.append('activationStatus', data.activationStatus);
      formData.append('sales_category', data.sales_category);
      formData.append('preRequisites', data.preRequisites);
      formData.append('price', data.price.toString());
      formData.append('duration', data.duration.toString());


      const cleanLearningText = DOMPurify.sanitize(data.whatYouWillLearn);
      formData.append('whatYouWillLearn', cleanLearningText);


      if (data.course_thumbnail instanceof File) {
        formData.append('course_thumbnail', data.course_thumbnail);
      }


      data.course_category.forEach((cat) => {
        formData.append('course_category', cat);
      });

      createCourse(formData).unwrap();
    } catch (error) {
      console.error('Submission error:', error);
    }
  }

  const steps: StepDefinition<CreateCourseFormType>[] = [
    {
      id: 'basic-info',
      title: 'Basic Information',
      description: 'Course Basic Detais like title, subtitle, language, duration and price.',
      instructions: "Enter basic course details",
      fields: ['title', 'subtitle', 'language', 'duration', 'price']
    },

    {
      id: 'status-info',
      title: 'Course Status Info',
      description: 'Information about course, course category, sales category, activation status and level.',
      instructions: "Enter your course status details",
      fields: ['course_category', 'sales_category', 'activationStatus', 'level']
    },
    {
      id: 'course-details',
      title: 'Course Details',
      description: 'Detailed course descreption, pre,requisites and a course thumbnail.',
      instructions: "Enter your course detailed information",
      fields: ['description', 'preRequisites', 'course_thumbnail']
    },
    {
      id: 'what-you-will-learn',
      title: 'What You Will Learn',
      description: 'What you will learn in this course, a detailed analysis along with all the modules and main chapters.',
      instructions: "Enter your course detailed information",
      fields: ["whatYouWillLearn"]
    },

  ];

  const [multiStepState, multiStepActions] = useMultiStepForm<CreateCourseFormType>({
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
            <TextAreaField<CreateCourseFormType> isRequired={true} label='Title' name='title' type='text' rows={5} />
            <TextAreaField<CreateCourseFormType> isRequired={true} label='Subtitle' name='subtitle' type='text' rows={5} />
            <TextInputField<CreateCourseFormType> isRequired={true} label='Language' name='language' type='text' />
            <TextInputField<CreateCourseFormType> isRequired={true} label='Price' name="price" type='number' />
            <TextInputField<CreateCourseFormType> isRequired={true} label='Estimated Duration (in hours)' name="duration" type='number' />
          </Box>
        );
      case "status-info":
        return (
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }} >

            <SelectInputField<CreateCourseFormType> isRequired={true} label='Activation Status' name='activationStatus' options={["Active",
              "Inactive"]} />
            <SelectInputField<CreateCourseFormType> isRequired={true} label='Course Level' name='level' options={["Primary", "Middle", "HighSchool", "Bachelor", "Masters", "Doctorate", "PhD", "Others"]} />

            <SelectInputField<CreateCourseFormType> isRequired={true} label="Sales Category" name='sales_category' options={["Free", "Basic", "Standard", "Premium", "Enterprise"]} />
            <MultipleSelectInputField<CreateCourseFormType> isRequired={true} label='Course Category' name='course_category' options={categories || ["OTHERS"]} />

          </Box>
        );
      case "course-details":
        return (
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }} >
            <TextAreaField<CreateCourseFormType> name='description' label='Description' type='text' rows={5} isRequired={true} />
            <TextAreaField<CreateCourseFormType> name='preRequisites' label='Pre-Requisites' type='text' rows={5} isRequired={true} />
            <FileInputField<CreateCourseFormType> fileType={["image/jpeg", "image/jpg", "image/png", "image/webp"]} isRequired={true} label='Course thumbnail' maxFiles={1} name='course_thumbnail' maxSize={2 * 1024 * 1024} />
          </Box>
        );
      case "what-you-will-learn":
        return (
          <Box sx={{ display: 'flex', flexDirection: "column", gap: 1 }}>
            <RichTextInputField<CreateCourseFormType> isRequired={true} label={"Write in detail what students will learn from this course"} name={"whatYouWillLearn"} />
            <Typography variant='caption' sx={{ color: "text.secondary" }}>Click submit after writing what you will learn*</Typography>
          </Box>
        )
    }
  }
  return (
    <Box
      sx={{
        width: "100%",
        display: 'flex',
        backgroundColor: 'Background.default',
        flexDirection: "column",
        gap: 1,
        alignItems: "center"

      }}
    >


      <Box
        sx={{
          padding: 0,
          width: "95%"
        }}>
        {isSuccess && (
          <Alert severity="success" sx={{ mb: 1 }}>
            Course Created Successfully...
          </Alert>
        )}

        {isError && error && 'data' in error &&
          <Alert severity="error" sx={{ mb: 1 }}>
            {JSON.stringify((error.data as any).error)}
          </Alert>
        }
        {/* <Typography variant='h4' fontWeight={700}>Create a new course</Typography> */}
        <Box sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit(createCourseSumit)}>
            <HorizontalMultiStepFormWrapper
              state={multiStepState}
              actions={multiStepActions}
              stepTitles={steps.map(step => {
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

    </Box>

  )
}

export default NewCourseCreate








