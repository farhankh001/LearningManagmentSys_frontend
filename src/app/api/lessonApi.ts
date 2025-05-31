import {  submitCourseType } from "../../types/create_lesson.types";
import { SubmitMCQByStudentType } from "../../types/quiz-mcqs-types";
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
        questionId:string,
        question_text:string,
        options:string[],
        correctAnswer:string,
        explanation?:string

    }[]
}
export interface SubmitQuizMCQReturn{
    id:string,
    questions:{
        id:string,
        question_text:string,
        options:string[],
    }[]
}
export interface MCQQuizResultResponse {
  totalQuestions: number;
  correctAnswers: number;
  percentageScore: string;
  results: MCQQuestionResult[];
}

export interface MCQSubmissionReturnType{
    message:string,
    submissionId:string
}

export interface MCQQuestionResult {
  questionId: string;
  question_text: string;
  options: string[];
  correctAnswerText: string | null;
  selectedAnswerText: string | null;
  explanation: string;
  isCorrect: boolean;
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
        }),
        getMCQsQuizForStudent:builder.query<SubmitQuizMCQReturn,{lessonId:string|undefined}>({
            query:({lessonId})=>({
                url:"get-MCQquiz-for-student",
                method:"GET",
                params:{lessonId}
            })
        }),
        attemptedMCQByStudentSubmit:builder.mutation<MCQSubmissionReturnType,SubmitMCQByStudentType>({
            query:(data)=>({
                url:"attempted-mcq-by-student",
                method:"POST",
                body:data
            })
        }),
        resultsMcqForStudent:builder.query<any,any>({
            query:({submissionId})=>({
                url:"evaluate_mcq_results_by_std",
                method:"GET",
                params:{submissionId}
            })
        })

    })
})


export const {useGetAssignmentForStudentQuery,useCreateNewLessonWithQuizAndAssignmentMutation,useGetQuizForStudentQuery,useSubmitQuizByStudentMutation,useSubmitAssignmentByStudentMutation,useCreateMCQsQuizMutation,useGetMCQsQuizForStudentQuery,useAttemptedMCQByStudentSubmitMutation,useResultsMcqForStudentQuery}=lessonApi