import React from 'react'
import { useResultsMcqForStudentQuery } from '../../../app/api/lessonApi'
import { useParams } from 'react-router-dom'

function MCQResults() {
    const {submissionId}=useParams()
    const {data,error}=useResultsMcqForStudentQuery({submissionId})
    console.log(error)
  return (
    <div>
      {
        JSON.stringify(data)
      }
    </div>
  )
}

export default MCQResults
