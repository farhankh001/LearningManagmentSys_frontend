
import baseApi from "./baseApi";
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
        lab: LabMetadata;
        summary: LabChallengeSummary;
        challenges: LabChallenge[];
    };
}


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
            }), invalidatesTags: ["Lesson"]
        }),
        viewAllLabChallengesTeacher: builder.query<GetAllChallengesForLabResponse, any>({
            query: ({ labId }) => ({
                url: "/view-all-lab-challenges-teacher",
                method: "GET",
                params: { labId }
            }),
            providesTags: ["Lesson"]


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
            }), invalidatesTags: ["Lesson"]
        })

    })
})

export const { useCreateLabApiMutation, useLabDatabyIdQuery, useEditLabMutation, useCreateLabChallengeMutation, useViewAllLabChallengesTeacherQuery, useGetLabChallengeForEditQuery, useUpdateLabChallengeMutation } = labApi