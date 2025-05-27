import {  submitCourseType } from "../../types/create_lesson.types";
import baseApi from "./baseApi";

interface GetQuizForStudentReturn{
    title:string,
    description:string,
    questions:string,
    timeLimit:number,
    activationStatus:string,
    passingScore:number,
    totalScore:number

}

export interface SubmitQuizByStudentType{
    solution_text:string,
    solution_doc_url?:string,
    lessonId:string|undefined
}

export interface SubmitQuizMCQType{
    lessonId:string|undefined;
    questions:{
        quizId:string,
        question_text:string,
        options:string[],
        correctAnswer:string,
        explanation?:string

    }[]
}


const lessonApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        createNewLessonWithQuizAndAssignment:builder.mutation<any,submitCourseType>({
            query:(data)=>({
                url:"create-lesson-with-assignment-quiz",
                body:data,
                method:"POST"
            })
        }),
        getQuizForStudent:builder.query<GetQuizForStudentReturn,{lessonId:string|undefined}>({
            query:({lessonId})=>({
                url:"get-quiz-for-student",
                method:"GET",
                params:{lessonId}
            })
        }),
        submitQuizByStudent:builder.mutation<any,SubmitQuizByStudentType>({
            query:(data)=>({
                method:"POST",
                url:"/submit-quiz-by-student",
                body:data
            })
        }),
         submitAssignmentByStudent:builder.mutation<any,SubmitQuizByStudentType>({
            query:(data)=>({
                method:"POST",
                url:"/submit-assignment-by-student",
                body:data
            })
        }),
          getAssignmentForStudent:builder.query<GetQuizForStudentReturn,{lessonId:string|undefined}>({
            query:({lessonId})=>({
                url:"get-assignment-for-student",
                method:"GET",
                params:{lessonId}
            })
        }),
        createMCQsQuiz:builder.mutation<any,SubmitQuizMCQType>({
            query:(data)=>({
                url:"create-MCQ-quiz",
                method:"POST",
                body:data
            })
        })

    })
})


export const {useGetAssignmentForStudentQuery,useCreateNewLessonWithQuizAndAssignmentMutation,useGetQuizForStudentQuery,useSubmitQuizByStudentMutation,useSubmitAssignmentByStudentMutation,useCreateMCQsQuizMutation}=lessonApi