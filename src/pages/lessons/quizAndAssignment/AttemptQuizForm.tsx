import { Alert, Box,  CircularProgress, LinearProgress, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import RichTextInputField from '../../../components/Forms/InputFields/RichTextInputField'
import { QuizAndAssignmentFormType } from '../../../types/quizAndAssignment'
import FileInputField from '../../../components/Forms/InputFields/FileInputField'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { uploadToCloudinary } from '../../../utils/uploadToCloundinary'
import { SubmitQuizByStudentType, useSubmitQuizByStudentMutation } from '../../../app/api/lessonApi'
import toast from 'react-hot-toast'
import { LoadingButton } from '@mui/lab'

interface AttemptQuizProps{
    lessonId:string|undefined
}

function AttemptQuizForm({lessonId}:AttemptQuizProps) {
     const { handleSubmit,reset } = useFormContext<QuizAndAssignmentFormType>();
     const [uploadProgress, setUploadProgress] = useState({  document : 0, })
     const theme=useTheme()
     const[submitQuiz,{isError:submitQuizIsError,error:submitQuizError,isSuccess:submitQuizSuccess,isLoading:submitQuizIsLoading}]=useSubmitQuizByStudentMutation()
     useEffect(() => {
         if (submitQuizSuccess) {
           reset();
           toast.success("Quiz submitted Successfully.")
           setTimeout(() => { 
           }, 1000);
         }
       }, [submitQuizSuccess, reset]);
       const submitForm: SubmitHandler<QuizAndAssignmentFormType> = async (data: QuizAndAssignmentFormType) => {
            try {
            let quizFile_url=""
            if (data.quizAndAssignmentFile instanceof File) {
                const quizAndAssignmentFile=await uploadToCloudinary(data.quizAndAssignmentFile,(percent)=>setUploadProgress({document:percent}))
                quizFile_url=quizAndAssignmentFile
            }
            const submitQuizData:SubmitQuizByStudentType={
                solution_text:data.solution_text,
                solution_doc_url:quizFile_url,
                lessonId:lessonId
            }   
            submitQuiz(submitQuizData)
            } catch (error) {
                console.log(error)
            }
       }
    if(submitQuizIsLoading){
        return  <Box sx={{width:"100%",height:"70vh",alignItems:"center",justifyContent:"center"}}><CircularProgress/></Box>;
    }
    if(submitQuizIsError&&submitQuizError&&"data" in submitQuizError){
         console.log(submitQuizError)
         toast.error(`${JSON.stringify((submitQuizError.data as any).error)}`)
}
 
  return (
    <Box sx={{width:{xs:"100%",sm:"100%",md:"90%"}}}>
        <form onSubmit={handleSubmit(submitForm)}>
       <Box sx={{mt:1.5,mb:1.5}}>
         <Typography variant='h4' fontWeight={600} sx={{fontStyle:"italic",textAlign:"center",mb:1}}>
            Quiz Submission
        </Typography>
        <Alert color='warning'>Attempt Answers In Provided text box or upload answers as Document file. In second case write your name in Quiz Answer text field</Alert>
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
              loading={submitQuizIsLoading}
              disabled={submitQuizIsLoading}
              size="large"
              sx={{ mt: 1 }}
            >
              {submitQuizIsLoading ? 'Submitting Quiz...' : 'Submit Quiz'}
            </LoadingButton>
    </form>
    {uploadProgress.document > 0 && (
        <Box sx={{margin:3,display:"flex",flexDirection:'column',gap:3}}>
          <Typography variant="body2">Uploading Image: {uploadProgress.document}%</Typography>
          <LinearProgress variant="determinate" value={uploadProgress.document} sx={{color:theme.palette.success.main}} />
        </Box>
      )}
    </Box>
  )
}

export default AttemptQuizForm
