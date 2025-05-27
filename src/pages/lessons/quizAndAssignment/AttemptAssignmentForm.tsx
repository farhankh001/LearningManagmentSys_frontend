import { Alert, Box, Button, LinearProgress, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RichTextInputField from '../../../components/Forms/InputFields/RichTextInputField'
import { QuizAndAssignmentFormType } from '../../../types/quizAndAssignment'
import FileInputField from '../../../components/Forms/InputFields/FileInputField'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { uploadToCloudinary } from '../../../utils/uploadToCloundinary'
import { SubmitQuizByStudentType, useSubmitAssignmentByStudentMutation } from '../../../app/api/lessonApi'
import LoadingScreen from '../../../components/other/Loading'
import toast from 'react-hot-toast'
import { LoadingButton } from '@mui/lab'

interface AttemptAssignmentProps{
    lessonId:string|undefined
}

function AttemptAssignmentForm({lessonId}:AttemptAssignmentProps) {
     const { handleSubmit,reset } = useFormContext<QuizAndAssignmentFormType>();
     const [uploadProgress, setUploadProgress] = useState({  document : 0, })
     const theme=useTheme()
     const[submitAssignment,{isError:submitAssignmentIsError,error:submitAssignmentError,isSuccess:submitAssignmentSuccess,isLoading:submitAssignmentIsLoading}]=useSubmitAssignmentByStudentMutation()
     useEffect(() => {
         if (submitAssignmentSuccess) {
           reset();
           toast.success("Quiz submitted Successfully.")
           setTimeout(() => { 
           }, 1000);
         }
       }, [submitAssignmentSuccess, reset]);
        useEffect(() => {
         if (submitAssignmentIsError && submitAssignmentError && "data" in submitAssignmentError) {
             console.log(submitAssignmentError);
             toast.error(`${JSON.stringify((submitAssignmentError.data as any).error)}`);
         }
     }, [submitAssignmentIsError, submitAssignmentError]);
       const submitForm: SubmitHandler<QuizAndAssignmentFormType> = async (data: QuizAndAssignmentFormType) => {
            try {
            let quizFile_url=""
            if (data.quizAndAssignmentFile instanceof File) {
                const quizAndAssignmentFile=await uploadToCloudinary(data.quizAndAssignmentFile,(percent)=>setUploadProgress({document:percent}))
                quizFile_url=quizAndAssignmentFile
            }
            const submitAssignmentData:SubmitQuizByStudentType={
                solution_text:data.solution_text,
                solution_doc_url:quizFile_url,
                lessonId:lessonId
            }   
            submitAssignment(submitAssignmentData)
            } catch (error) {
                console.log(error)
            }
       }
    if(submitAssignmentIsLoading){
        return <LoadingScreen/>
    }
      
 
  return (
    <Box sx={{width:{xs:"100%",sm:"100%",md:"90%"}}}>
        <form onSubmit={handleSubmit(submitForm)}>
       <Box sx={{mt:1.5,mb:1.5}}>
         <Typography variant='h4' fontWeight={600} sx={{fontStyle:"italic",textAlign:"center",mb:1}}>
            Assignment Submission
        </Typography>
        <Alert color='warning'>Attempt Answers In Provided text box or upload answers as Document file. In second case write your name in Assignemnt Answer text field</Alert>
       </Box>
      <Box sx={{display:"flex",flexDirection:"column",gap:2}}>
        <RichTextInputField<QuizAndAssignmentFormType>  isRequired={true} label='Quiz Answers' name='solution_text' />
       <Box sx={{display:"flex", flexDirection:"column"}}>
        <Typography variant='body1'>Upload Answers As Document. {"(Optional)*"}</Typography>
         <FileInputField<QuizAndAssignmentFormType> fileType={[ "application/pdf","application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation"]} isRequired={false} label='Answers As File' maxFiles={1} maxSize={5* 1024 * 1024} name='quizAndAssignmentFile' />
       </Box>
      </Box>
       <LoadingButton
              type="submit"
              variant="contained"
              loading={submitAssignmentIsLoading}
              disabled={submitAssignmentIsLoading}
              size="large"
              sx={{ mt: 1 }}
            >
              {submitAssignmentIsLoading ? 'Submitting Quiz...' : 'Submit Quiz'}
            </LoadingButton>
    </form>
    {uploadProgress.document > 0 && (
        <Box sx={{margin:3,display:"flex",flexDirection:'column',gap:3}}>
          <Typography variant="body2">Uploading file: {uploadProgress.document}%</Typography>
          <LinearProgress variant="determinate" value={uploadProgress.document} sx={{color:theme.palette.success.main}} />
        </Box>
      )}
    </Box>
  )
}

export default AttemptAssignmentForm
