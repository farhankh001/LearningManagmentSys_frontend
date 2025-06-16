import { Assignment, CheckCircle, Create, Gavel, Quiz } from '@mui/icons-material'
import { Alert, Box, Button, Divider, FormControl, List, ListItem, Typography, useTheme,LinearProgress } from '@mui/material'
import TextInputField from '../../components/Forms/InputFields/TextInputField'
import { CreateLessonType, submitCourseType } from '../../types/create_lesson.types'
import FileInputField from '../../components/Forms/InputFields/FileInputField'
import RichTextInputField from '../../components/Forms/InputFields/RichTextInputField'
import SelectInputField from '../../components/Forms/InputFields/SelectInputField'
import { useCreateNewLessonWithQuizAndAssignmentMutation } from '../../app/api/lessonApi'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { uploadToCloudinary,uploadToCloudinaryRaw } from '../../utils/uploadToCloundinary'
import toast from 'react-hot-toast'

const instructions=[
  "Lesson Title: Enter a clear and concise title that reflects the main topic of your Lesson.",
  "Files: Provide a video, a document and image(will be used as thumbnail for lesson).",
  "Quiz:Each lesson will contain one Quiz. Plese fill that form as well before submitting.",
  "Assignment: Each lesson will contain one Assignment, fill that form as well.",
  "All fields are required. Fill them carefully along with quiz and assignment."

]


function CreateLesson() {
  const {courseId}=useParams()
 const navigate=useNavigate()
  const {handleSubmit,reset}=useFormContext<CreateLessonType>()
  const [createLessonWithQAA,{error:lessonCreationError,isError:lessonCreationIsError,isSuccess:LessonCreationIsSuccess,isLoading:lessonCreationIsLoading}]=useCreateNewLessonWithQuizAndAssignmentMutation()
  const theme=useTheme()
   useEffect(() => {
      if (LessonCreationIsSuccess) {
        reset();
        toast.success("Lesson Created Successfully.")
        setTimeout(() => { 
          navigate('/teacher-dash');
        }, 1000);
      }
    }, [LessonCreationIsSuccess, navigate, reset]);
  
// const uploadFile = async (file: File, onProgress?: (p: number) => void) => {
//   const ext = file.name.split('.').pop()?.toLowerCase() || ''
//   const docTypes = ['pdf', 'doc', 'docx', 'ppt', 'pptx']

//   if (docTypes.includes(ext)) {
//     return uploadToCloudinaryRaw(file, onProgress)
//   } else {
//     return uploadToCloudinary(file, onProgress)
//   }
// }

// const [uploadProgress, setUploadProgress] = useState({ video: 0,document: 0, image: 0,  })
 
const handleLessonCreation:SubmitHandler<CreateLessonType>=async(data:CreateLessonType)=>{
    try {
    //   const refinedData:submitCourseType={
    //     quiz:data.quiz,
    //     assignment:data.assignment,
    //     lesson_document:"",
    //     lesson_document2:"",
    //     lesson_text:data.lesson_text,
    //     lesson_title:data.lesson_title,
    //     lesson_video:""
    //   }
    // if(data.lesson_video instanceof File){
    //   const videoUrl = await uploadFile(data.lesson_video, (percent) =>
    //   setUploadProgress((prev) => ({ ...prev, video: percent }))
    // )
    //  refinedData.lesson_video=videoUrl
    // }

    // if(data.lesson_document instanceof File){
    //   const documentUrl =  await uploadFile(data.lesson_document, (percent) =>
    //   setUploadProgress((prev) => ({ ...prev, document: percent })))
    //   refinedData.lesson_document=documentUrl
    // }
   
    // if(data.lesson_image instanceof File){
    //    const imageUrl = await uploadFile(data.lesson_image, (percent) =>
    //   setUploadProgress((prev) => ({ ...prev, image: percent })))
    //    refinedData.lesson_image=imageUrl
    // }
    // refinedData.courseId=courseId
    
    // await createCourseWithQAA(refinedData)
  const formData = new FormData();
if(courseId){
  formData.append("courseId",courseId)
}
formData.append("lesson_title", data.lesson_title);
formData.append("lesson_text", data.lesson_text);

  if(data.lesson_video){
    formData.append("lesson_video", data.lesson_video);
  }

  // if (data.lesson_video) {
  // formData.append("lesson_video", data.lesson_video);
  // }

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

  return (
     <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        backgroundColor: 'Background.default',
        flexDirection:"column",
        gap:1
       
      }}
    >  
    <Box sx={{
       backgroundColor:theme.palette.background.paper ,
       ml:2,
       mr:2,
       mt:2,
      display:"flex",
      flexDirection:"column",
      boxShadow:`-4px 4px 2px ${theme.palette.secondary.light}`,
          borderRadius:4,
         p:2
        }}>
          
      <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        <Typography variant='h4' fontWeight={600} sx={{color: theme.palette.primary.light,fontStyle:"italic"}}>
          <Gavel sx={{fontSize:25,mr:1}}/>
          Instructions
        </Typography>
      <List sx={{
        display:"flex",
        flexDirection:{
          xs:"column",
          sm:"column",
          md:"row",
          lg:"row",
          xl:'row'
        },
        ml:1,
        mr:1
        // alignItems:"center",
        // justifyContent:"center",
      }}>
            {instructions&&instructions.map((instruction)=><ListItem 
            sx={{display:"flex",flexDirection:{
               xs:"row",
               sm:"row",
               md:"column",
               lg:"column",
               xl:'column'
          },
           boxShadow:`-2px 2px 2px ${theme.palette.secondary.light}`,
          gap:{
            xs:1,
            sm:1,
            md:2
          },alignItems:"center",margin:1,backgroundColor:theme.palette.background.default,borderRadius:4,padding:2,textAlign:"center"}}>
                <CheckCircle sx={{
                       fontSize:15, }}/>
              <Typography variant='caption' fontWeight={600}>
                 {instruction}
              </Typography>
             </ListItem>)}
        </List>
        <Button variant='contained'>
          See full instructions
        </Button>
      </Box>

    </Box>
      
    <Box
        sx={{
          maxWidth:  '100%' ,
          backgroundColor: theme.palette.background.paper,
          minWidth:"60%",
          padding: { xs: 3, sm: 4 },
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          margin:2,
          boxShadow:`-4px 4px 2px ${theme.palette.secondary.light}`,
          borderRadius:4
        }}
      >
        <Box 
         sx={{
          borderTop:"1px solid",
          borderBottom:"1px solid",
          borderColor:theme.palette.background.paper,
          borderWidth:{
            xs:"0px",  sm:"0px", md:"2px"
          },
          padding:0
        }}>
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
      <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.light,
                mb: 2,
                textAlign: 'center',
                fontStyle:"italic"
              }}
            >
              <Create sx={{fontSize:25,mr:1}}/>
              Create Lesson
            </Typography>
            
        <form   onSubmit={handleSubmit(handleLessonCreation)}>
         <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
           <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr ', md: '1fr 1fr 1fr ',lg:"1fr 1fr 1fr" },
            gap: { xs: 2, md: 2},
            justifyContent: 'center',
            pl:{xs:1, sm:1,  md:2, lg:4, xl:4
             },pr:{  xs:1, sm:1, md:2,  lg:4, xl:4}}}>
            
           <FormControl>
            <Typography variant='caption'>
              Lesson video Link
            </Typography>
             <TextInputField<CreateLessonType> isRequired={false}  label='Lesson Video Link' name='lesson_video' type='text' hideData={false} />
           </FormControl>
          <FormControl>
            <Typography variant='caption'>
              Lesson document
            </Typography>
              <FileInputField<CreateLessonType>  fileType={[ "application/pdf","application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation",]} isRequired={false} label='Lesson document' maxFiles={1} maxSize={10 * 1024 * 1024} name='lesson_document'/>
          </FormControl>
            <FormControl>
              <Typography variant='caption'> 
             Lesson image
              </Typography>
              <FileInputField<CreateLessonType>  fileType={[ "application/pdf","application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation",]} isRequired={false} label='Lesson document 2' maxFiles={1} maxSize={10* 1024 * 1024} name='lesson_document2'/>
            </FormControl>
             <TextInputField<CreateLessonType> isRequired={true} label='Lesson Title'  name='lesson_title' type='text' hideData={false}/>
            </Box>
             
      <Box sx={{pl:{
        xs:1, sm:1, md:2, lg:4, xl:4
      },pr:{ xs:1, sm:1, md:2, lg:4, xl:4
      },mt:2,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%"}}>
       <RichTextInputField<CreateLessonType> isRequired={true} label='Lesson text data.' name='lesson_text' />
      </Box>
         </Box>
      <Box >
        <Divider sx={{mt:4,}}/>
          <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.light,
                mb: 4,
                textAlign: 'center',
                fontStyle:"italic",
                mt:4
              }}
            >
              <Quiz sx={{fontSize:25,mr:1}}/>
              Create Quiz
            </Typography>
      </Box>
       <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr ', md: '1fr 1fr 1fr ',lg:"1fr 1fr 1fr" },
            gap: { xs: 2, md: 2},
            justifyContent: 'center',
            pl:{xs:1, sm:1,  md:2, lg:4, xl:4
             },pr:{  xs:1, sm:1, md:2,  lg:4, xl:4}}}>
         <TextInputField<CreateLessonType> isRequired={false} label='Quiz title' name='quiz.title' type='text'/>
        <TextInputField<CreateLessonType> isRequired={false} label='Quiz Time limit' name='quiz.timeLimit' type='number'/>
        <TextInputField<CreateLessonType> isRequired={false} label='Quiz total score' name='quiz.totalScore' type='number'/>
        <TextInputField<CreateLessonType> isRequired={false} label='Quiz passing score' name='quiz.passingScore' type='number'/>
        <SelectInputField<CreateLessonType> isRequired={false}  label='Quiz activation status' name='quiz.activationStatus' options={["ACTIVE", "INACTIVE"]}/>
        <TextInputField<CreateLessonType> isRequired={false} label='Instructions' name='quiz.description' type={"text"}/>
       </Box>
        <Box sx={{pl:{
        xs:1, sm:1, md:2, lg:4, xl:4
      },pr:{ xs:1, sm:1, md:2, lg:4, xl:4
      },mt:2,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%"}}>
       <RichTextInputField<CreateLessonType> isRequired={false} label='Quiz Questions' name='quiz.question' />
      </Box>

 <Box >
        <Divider  sx={{mt:4}}/>
          <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.light,
                mb: 4,
                textAlign: 'center',
                fontStyle:"italic",
                mt:4
              }}
            >
              <Assignment sx={{fontSize:25,mr:1}}/>
              Create Assignment
            </Typography>
      </Box>


       <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr ', md: '1fr 1fr 1fr ',lg:"1fr 1fr 1fr" },
            gap: { xs: 2, md: 2},
            justifyContent: 'center',
            pl:{xs:1, sm:1,  md:2, lg:4, xl:4
             },pr:{  xs:1, sm:1, md:2,  lg:4, xl:4}}}>
         <TextInputField<CreateLessonType> isRequired={false} label='Assignment title' name='assignment.title' type='text'/>
        <TextInputField<CreateLessonType> isRequired={false} label='Assignment Time limit' name='assignment.timeLimit' type='number'/>
        <TextInputField<CreateLessonType> isRequired={false} label='Assignment total score' name='assignment.totalScore' type='number'/>
        <TextInputField<CreateLessonType> isRequired={false} label='Assignment passing score' name='assignment.passingScore' type='number'/>
        <SelectInputField<CreateLessonType> isRequired={false}  label='Assignment activation status' name='assignment.activationStatus' options={["ACTIVE", "INACTIVE"]}/>
        <TextInputField<CreateLessonType> isRequired={true} label='Instructions' name='assignment.description'  type='text'/>
       </Box>
        <Box sx={{pl:{
        xs:1, sm:1, md:2, lg:4, xl:4
      },pr:{ xs:1, sm:1, md:2, lg:4, xl:4
      },mt:2,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%"}}>
       <RichTextInputField<CreateLessonType> isRequired={false} label='Assignment Questions' name='assignment.question' />
      </Box>
       <Box sx={{
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          margin:1,
          padding:1
       }}>
        <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={lessonCreationIsLoading}
                    disabled={lessonCreationIsLoading}
                    size="large"
                    sx={{ mt: 1 }}
                  >
                    {lessonCreationIsLoading ? 'Creating Course...' : 'Create Course'}
        </LoadingButton>
       </Box>
        </form>

  {/* {uploadProgress.video > 0 && (
  <Box mb={2}>
    <Typography variant="body2">Uploading Video: {uploadProgress.video}%</Typography>
    <LinearProgress variant="determinate" value={uploadProgress.video} />
  </Box>
)}

{uploadProgress.document > 0 && (
  <Box mb={2}>
    <Typography variant="body2">Uploading Document: {uploadProgress.document}%</Typography>
    <LinearProgress variant="determinate" value={uploadProgress.document} />
  </Box>
)}

{uploadProgress.image > 0 && (
  <Box mb={2}>
    <Typography variant="body2">Uploading Image: {uploadProgress.image}%</Typography>
    <LinearProgress variant="determinate" value={uploadProgress.image} />
  </Box>
)} */}
    </Box>
      </Box>
    </Box>
  )
}

export default CreateLesson
