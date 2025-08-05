
import baseApi from "./baseApi";
export type ChallengeBreakdown = {
    semantic: number;
    structural: number;
    lexical: number;
};

export type ChallengeSubmission = {
    submitted_code?: string | null;
    submitted_text?: string | null;
    submitted_flag?: string | null;
    obtained_marks: number;
    similarity_score?: number | null;
    breakdown?: ChallengeBreakdown | null;
    grade?: string | null;
    remarks?: string | null;
    passed: boolean;
    confidence?: number | null;
    createdAt: string;
    updatedAt: string;
};

export type ChallengeMeta = {
    id: string;
    title: string;
    description?: string | null;
    type: string; // adjust as per your actual enum/string values
    max_score: number;
    correctAnswer: string;
    evaluationMethod: boolean;
};

export type LabMeta = {
    id: string;
    lessonId: string;
    title: string;
};

export type DetailedLabResultResponse = {
    message: string;
    challenge: ChallengeMeta;
    submission: ChallengeSubmission;
    lab: LabMeta;
};

export type LabChallenge = {
    id: string;
    lab_id: string;
    challenge_text: string;
    description: string;
    answer_string_type: 'Code' | 'Text' | 'Flag';
    correct_solution: string;
    sample_input: string | null;
    max_score: number;
    auto_evaluate: boolean;
    createdAt: string;
    updatedAt: string;
};

export type LabMetadata = {
    id: string;
    title: string;
    description: string;
    createdAt: string;
};

export type LabChallengeSummary = {
    hasChallenges: boolean;
    totalChallenges: number;
    totalMaxScore: number;
};

export type GetAllChallengesForLabResponse = {
    success: true;
    data: {
        lessonId: string,
        lab: LabMetadata;
        summary: LabChallengeSummary;
        challenges: LabChallenge[];
    };
}

export type LabActivationStatusResponse = {
    success: true;
    data: {
        title: string;
        activationStatus: string;
        timelimit: number; // in minutes
        activatedAt: string | null; // ISO string
        deactivatedAt: string | null; // ISO string
    };
};

export type GetSingleChallengeStudentResponse = {
    lessonId: string;
    courseId: string;
    activationStatus: boolean;
    challengeId: string;
    challenge_text: string;
    description: string;
    answer_string_type: 'Code' | 'Text' | 'Flag';
    max_score: number;
    sample_input?: string | null;
    auto_evaluate: boolean;
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string
    labTitle: string;
    labDescription: string;
};

const labApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createLabApi: builder.mutation<any, any>({
            query: (data) => ({
                url: "create-new-lab",
                method: "POST",
                body: data
            }), invalidatesTags: ["Courses"]
        }),
        labDatabyId: builder.query<any, any>({
            query: ({ labId }) => ({
                url: "get-lab-by-id",
                method: "GET",
                params: { labId }
            })
        }),
        editLab: builder.mutation<any, any>({
            query: (data) => ({
                url: "edit-lab",
                method: "POST",
                body: data
            }), invalidatesTags: ["Courses"]
        }),
        CreateLabChallenge: builder.mutation<any, any>({
            query: (data) => ({
                url: "create-lab-challenge",
                method: "POST",
                body: data
            }), invalidatesTags: ["Lesson", "Lab"]
        }),
        viewAllLabChallengesTeacher: builder.query<GetAllChallengesForLabResponse, any>({
            query: ({ labId }) => ({
                url: "/view-all-lab-challenges-teacher",
                method: "GET",
                params: { labId }
            }),
            providesTags: ["Lesson", "Lab"]


        }),
        getLabChallengeForEdit: builder.query<any, any>({
            query: ({ challengeId }) => ({
                url: "get-lab-challenge-for-edit",
                method: "GET",
                params: { challengeId }
            })
        }),
        updateLabChallenge: builder.mutation<any, any>({
            query: (data) => ({
                url: "/update-lab-challenge",
                method: "POST",
                body: data
            }), invalidatesTags: ["Lesson", "Lab"]
        }),
        getLabActivationStatusAndTime: builder.query<LabActivationStatusResponse, any>({
            query: ({ lessonId }) => ({
                url: "get-lab-activation-staus",
                method: "GET",
                params: { lessonId }
            }), providesTags: ["Lab"]
        }),
        activateLab: builder.mutation<any, any>({
            query: (data) => ({
                url: "/activate-lab",
                method: "POST",
                body: data
            }), invalidatesTags: ["Lab"]
        }),
        deActivateLab: builder.mutation<any, any>({
            query: (data) => ({
                url: "/de-activate-lab",
                method: "POST",
                body: data
            }), invalidatesTags: ["Lab"]
        }),
        getSingleChallengeStudent: builder.query<GetSingleChallengeStudentResponse, any>({
            query: ({ challengeId }) => ({
                url: "get-single-challenge-student",
                method: "GET",
                params: { challengeId }
            }), providesTags: ["Lab"]
        }),
        submitChallengeStudent: builder.mutation<any, any>({
            query: (data) => ({
                method: "POST",
                url: "/submit-challenge-student",
                body: data
            })
        }),
        detailedLabResult: builder.query<DetailedLabResultResponse, any>({
            query: ({ challengeId }) => ({
                url: "detailed-lab-result",
                method: "GET",
                params: { challengeId }
            }), providesTags: ["Lab"]
        }),
    })

})

export const { useCreateLabApiMutation, useLabDatabyIdQuery, useEditLabMutation, useCreateLabChallengeMutation, useViewAllLabChallengesTeacherQuery, useGetLabChallengeForEditQuery, useUpdateLabChallengeMutation, useGetLabActivationStatusAndTimeQuery, useActivateLabMutation, useDeActivateLabMutation, useGetSingleChallengeStudentQuery, useSubmitChallengeStudentMutation, useDetailedLabResultQuery } = labApi

