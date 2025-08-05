import { SubmitMCQByStudentType } from "../../types/quiz-mcqs-types";
import baseApi from "./baseApi";
export type GetLabForStudentResponse = {
    lessonId: string;
    courseId: string;
    isActive: boolean;
    title?: string;
    description?: string;
    timeLimit?: number;
    activationStatus: 'Active' | 'Inactive' | string;
    hasChallenges?: boolean;
    labTotalScore?: number;
    totalChallenges?: number;
    attemptedChallenges?: number;
    progressPercentage?: number;
    challenges?: {
        id: string;
        challenge_text: string;
        description: string;
        answer_string_type: string;
        max_score: number;
        sample_input: string | null;
        auto_evaluate: boolean;
        createdAt: string;
        updatedAt: string;
        attempted: boolean;
        submission: {
            id: string;
            submitted_text: string | null;
            submitted_code: string | null;
            submitted_flag: string | null;
            obtained_marks: number | null;
            similarity_score: number | null;
            manually_reviewed: boolean;
            uploaded_solution_url: string | null;
            grade: string | null;
            createdAt: string;
            updatedAt: string;
        } | null;
    }[];
};



interface GetQuizForStudentReturn {
    title: string,
    description: string,
    questions: string,
    timeLimit: number,
    activationStatus: string,
    passingScore: number,
    totalScore: number,
    courseId: string

}
export interface MCQQuizResults {
    summary: {
        name: "Total Questions" | "Correct" | "Incorrect";
        count: number;
    }[];
    percentage: number; // e.g., 87.5
    detailedResults: {
        questionText: string;
        selectedAnswer: string | null;
        correctAnswer: string;
        isCorrect: boolean;
        explanation: string;
    }[];
    totalQuestions: number; correctCount: number; courseTitle: string;
    courseSubTitle: string
};

type MCQQuizEvaluationResponse = {
    title: string; // Lesson title
    hasAttempted: boolean; // Always true in this case
    results: {
        summary: {
            name: "Total Questions" | "Correct" | "Incorrect";
            count: number;
        }[];
        percentage: number; // e.g., 87.5
        detailedResults: {
            questionText: string;
            selectedAnswer: string | null;
            correctAnswer: string;
            isCorrect: boolean;
            explanation: string;
        }[];
        totalQuestions: number; correctCount: number;
        courseTitle: string;
        courseSubTitle: string
    };
};

export interface SubmitQuizByStudentType {
    solution_text: string,
    solution_doc_url?: string,
    lessonId: string | undefined
}

export interface SubmitQuizMCQType {
    lessonId: string | undefined;
    questions: {
        questionId: string,
        question_text: string,
        options: string[],
        correctAnswer: string,
        explanation?: string

    }[]
}
export interface SubmitQuizMCQReturn {
    id: string,
    title: string,
    courseId: string,
    questions: {
        id: string,
        question_text: string,
        options: string[],
    }[]
}
export interface MCQQuizResultResponse {
    totalQuestions: number;
    correctAnswers: number;
    percentageScore: string;
    results: MCQQuestionResult[];
}

export interface MCQSubmissionReturnType {
    message: string,
    submissionId: string
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




interface BaseMCQAttemptResponse {
    lessonTitle: string;
}

// MCQ Question interface (for quiz questions)
interface MCQQuestion {
    id: string;
    question_text: string;
    options: string[];
}

// MCQ Quiz interface (for unattempted quiz)
interface MCQQuiz {
    id: string;
    questions: MCQQuestion[];
}

// Detailed result for each question (for attempted quiz)
interface QuestionResult {
    questionText: string;
    selectedAnswer: string | null;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string;
}

// Quiz results interface (for attempted quiz)


// Response when quiz has been attempted
interface MCQAttemptedResponse extends BaseMCQAttemptResponse {
    hasAttempted: true;
    results: MCQQuizResults;
}

// Response when quiz has not been attempted
interface MCQNotAttemptedResponse extends BaseMCQAttemptResponse {
    hasAttempted: false;
    quiz: MCQQuiz;
}

// Union type for the complete response
export type MCQAttemptStatusResponse = MCQAttemptedResponse | MCQNotAttemptedResponse;


export type GetLessonByIdResponse = {
    id: string;
    title: string;
    text: string;
    docs: string | null;
    docs2: string | null;
    video: string | null;
    createdAt: string; // ISO date
    updatedAt: string; // ISO date

    course: {
        id: string;
        title: string;
    };

    hasQuiz: boolean;
    hasAssignment: boolean;
    hasLab: boolean;

    quiz: {
        id: string;
        questions: {
            id: string;
            questionId: string;
            question_text: string;
            options: string[];
            correctAnswer: string;
            explanation: string;
            quiz_mcq_based_id: string;
        }[];
    } | null;

    assignment: {
        id: string;
        title: string;
        description: string;
        questions: string;
        timelimit: number;
        total_score: number;
        passing_score: number;
        activationStatus: string;
        createdAt: string;
        updatedAt: string;
    } | null;

    lab: {
        id: string;
        title: string;
        description: string;
        timelimit: number;
        activationStatus: string;
        createdAt: string;
        updatedAt: string;
    } | null;

    studentSubmissions: {
        studentName: string;
        studentEmail: string;

        quizAttempted: boolean;
        quizMarks: number | null;

        labAttempted: boolean;
        labMarks: number | null;
        labSimilarity: number | null;

        assignmentAttempted: boolean;
        assignmentSubmissionId: string | null;
        assignmentSubmittedAt: string | null;
    }[];
};





const lessonApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createNewLessonWithQuizAndAssignment: builder.mutation<any, FormData>({
            query: (data) => ({
                url: "create-lesson-with-assignment-quiz",
                body: data,
                method: "POST"
            }),
            invalidatesTags: ["Courses"]
        }),
        getLabForStudent: builder.query<GetLabForStudentResponse, { lessonId: string | undefined }>({
            query: ({ lessonId }) => ({
                url: "get-lab-for-student",
                method: "GET",
                params: { lessonId }
            })
        }),
        submitLabByStudent: builder.mutation<any, SubmitQuizByStudentType>({
            query: (data) => ({
                method: "POST",
                url: "/submit-lab-by-student",
                body: data
            })
        }),
        submitAssignmentByStudent: builder.mutation<any, SubmitQuizByStudentType>({
            query: (data) => ({
                method: "POST",
                url: "/submit-assignment-by-student",
                body: data
            })
        }),
        getAssignmentForStudent: builder.query<GetQuizForStudentReturn, { lessonId: string | undefined }>({
            query: ({ lessonId }) => ({
                url: "get-assignment-for-student",
                method: "GET",
                params: { lessonId }
            })
        }),
        createMCQsQuiz: builder.mutation<any, SubmitQuizMCQType>({
            query: (data) => ({
                url: "create-MCQ-quiz",
                method: "POST",
                body: data
            })
        }),
        getMCQsQuizForStudent: builder.query<SubmitQuizMCQReturn, { lessonId: string | undefined }>({
            query: ({ lessonId }) => ({
                url: "get-MCQquiz-for-student",
                method: "GET",
                params: { lessonId }
            })
        }),
        attemptedMCQByStudentSubmit: builder.mutation<MCQSubmissionReturnType, SubmitMCQByStudentType>({
            query: (data) => ({
                url: "attempted-mcq-by-student",
                method: "POST",
                body: data
            }), invalidatesTags: ["Enrollment"]
        }),
        resultsMcqForStudent: builder.query<MCQQuizEvaluationResponse, any>({
            query: ({ submissionId }) => ({
                url: "evaluate_mcq_results_by_std",
                method: "GET",
                params: { submissionId }
            })
        }),
        mcqAttemptStatusCheck: builder.query<MCQAttemptStatusResponse, any>({
            query: ({ lessonId }) => ({
                url: "mcq-attempt-status-check",
                method: "GET",
                params: { lessonId }
            })
        }),
        getLessonById: builder.query<GetLessonByIdResponse, any>({
            query: ({ lessonId }) => ({
                url: "lesson_by_id",
                method: "GET",
                params: { lessonId }
            }), providesTags: ["Courses", "Lesson"]
        }),
        createNewAssignment: builder.mutation<any, any>({
            query: (data) => ({
                url: "create-new-assignment",
                method: "POST",
                body: data
            }), invalidatesTags: ["Courses", "Lesson"]
        }),
        getLessonForEdit: builder.query<any, any>({
            query: ({ lessonId }) => ({
                url: "get-lesson-for-edit",
                method: "GET",
                params: { lessonId }
            })
        }),
        updateLesson: builder.mutation<any, any>({
            query: (data) => ({
                url: "/update-lesson",
                method: "POST",
                body: data
            }), invalidatesTags: ["Lesson"]
        })


    })
})


export const { useGetAssignmentForStudentQuery, useCreateNewLessonWithQuizAndAssignmentMutation, useGetLabForStudentQuery, useSubmitLabByStudentMutation, useSubmitAssignmentByStudentMutation, useCreateMCQsQuizMutation, useGetMCQsQuizForStudentQuery, useAttemptedMCQByStudentSubmitMutation, useResultsMcqForStudentQuery, useMcqAttemptStatusCheckQuery, useGetLessonByIdQuery, useCreateNewAssignmentMutation, useGetLessonForEditQuery, useUpdateLessonMutation } = lessonApi

