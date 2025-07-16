import { useEffect } from 'react'
import { useResultsMcqForStudentQuery } from '../../../app/api/lessonApi'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import toast from 'react-hot-toast'
import McqQuizResult from './McqQuizResult'

function MCQResults() {
    const {submissionId}=useParams()
    const {data,error,isError}=useResultsMcqForStudentQuery({submissionId})
    // const theme=useTheme()
    useEffect(() => {
   
  if(isError&&error&&"data" in error){
  console.log(error)
  toast.error(`${JSON.stringify((error.data as any).error)}`)
}   
  }, [isError,error]);
       return  <Box>
         {data?.results&& <McqQuizResult  results={data?.results} title={data?.title??''}/>}
        </Box>
  
}

export default MCQResults
