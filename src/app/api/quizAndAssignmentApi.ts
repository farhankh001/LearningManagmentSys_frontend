import baseApi from "./baseApi";



const quizAndAssignemntApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        assignmentById: builder.query<any, any>({
            query: ({ assignmentId }) => ({
                params: { assignmentId },
                method: "GET",
                url: "get-ssignment-by-id"
            }), providesTags: ["Lesson"]

        }),
        quizById: builder.query<any, any>({
            query: ({ quizId }) => ({
                url: "get-quiz-by-id",
                method: "GET",
                params: { quizId }

            }), providesTags: ["Lesson"]
        }),
        editQuiz: builder.mutation<any, any>({
            query: (data) => ({
                url: "edit-quiz",
                method: "POST",
                body: data
            }), invalidatesTags: ["Courses", "Lesson"]
        }),
        editAssignment: builder.mutation<any, any>({
            query: (data) => ({
                url: "edit-assignment",
                method: "POST",
                body: data
            }), invalidatesTags: ["Courses", "Lesson"]
        })
    })
})

export const { useAssignmentByIdQuery, useQuizByIdQuery, useEditQuizMutation, useEditAssignmentMutation } = quizAndAssignemntApi