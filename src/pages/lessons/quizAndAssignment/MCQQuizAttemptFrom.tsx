
import { Box } from '@mui/material'
import { useGetMCQsQuizForStudentQuery } from '../../../app/api/lessonApi'
import MCQSInputField from '../../../components/Forms/InputFields/MCQSInputField'

interface MCQQuizAttemptProp{
  lessonId:string|undefined
}


function MCQQuizAttemptFrom({lessonId}:MCQQuizAttemptProp) {
  const {data:mcqData,isError:mcqIncomingIsError,isSuccess:mcqIncomingIsSuccess,error:mcqIncomingError}=useGetMCQsQuizForStudentQuery({lessonId})
  console.log(mcqData?.questions)
console.log(mcqIncomingError)
  return (
   <Box>
  
    <form>
       {mcqData&&mcqData.questions&&mcqData.questions.map((question)=><Box>
        <MCQSInputField  label='Multiple Choice Questions' name='mcq' question={question} isRequired={true} />
       </Box>)}
    </form>
   </Box>
  )
}

export default MCQQuizAttemptFrom
