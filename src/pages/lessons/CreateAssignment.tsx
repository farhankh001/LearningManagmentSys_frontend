import { useTheme } from '@emotion/react'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams, useNavigate } from 'react-router-dom'
import { useCreateNewAssignmentMutation, useCreateNewLessonWithQuizAndAssignmentMutation } from '../../app/api/lessonApi'
import { AssignmentType, CreateLessonType } from '../../types/create_lesson.types'

function CreateAssignment() {
    const { courseId } = useParams()
    const navigate = useNavigate()
    const { handleSubmit, reset } = useFormContext<AssignmentType>()
    const [createLessonWithQAA, { error: lessonCreationError, isError: lessonCreationIsError, isSuccess: LessonCreationIsSuccess, isLoading: lessonCreationIsLoading }] = useCreateNewAssignmentMutation()
    const theme = useTheme()
    useEffect(() => {
        if (LessonCreationIsSuccess) {

            toast.success("Lesson Created Successfully.")
            reset();
            navigate('/teacher-dash');

        }
    }, [LessonCreationIsSuccess, navigate, reset]);

    return (
        <div>

        </div>
    )
}

export default CreateAssignment
