import baseApi from "./baseApi";
// "APPROVED" | "PENDING" | "REJECTED";
export interface AdminApprovalResponse {
  status: string;
  message: string;
}
export interface AdminTeacherStatsResponse {
  status: "SUCCESS";
  message: string;
  data: {
    totalTeachers: number;
    approvedTeachers: number;
    rejectedTeachers: number;
  };
}
export interface PendingTeacher {
  teacherId: string;
  name: string;
  email: string;
  profile_picture: string | null;
  applied_date: string; // ISO string format of createdAt
  qualifications: string;
}

export interface PendingTeacherResponse {
  pending_teachers: PendingTeacher[];
}

const adminApis=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllPendingTeachers:builder.query<PendingTeacherResponse,void>({
            query:()=>({
                url:"get-all-pendig-teachers",
                method:"GET"
            }),
            providesTags:["Teacher"]
        }),
        approveTeacher:builder.mutation({
            query:({teacherId})=>({
                url:"approve-pending-teacher",
                method:"PUT",
                params:{teacherId}
            }),
            invalidatesTags:["Teacher"]
        }), 
       rejectTeacher:builder.mutation({
            query:({teacherId})=>({
                url:"reject-pending-teacher",
                method:"PUT",
                params:{teacherId}
            }),
             invalidatesTags:["Teacher"]
        }),
        getAdminApproval:builder.query<AdminApprovalResponse,void>({
            query:()=>({
             url:"get-admin-approval",
             method:"GET",
            })
        }),
         getAdminTeacherStats:builder.query<AdminTeacherStatsResponse,void>({
            query:()=>({
             url:"get-admin-teacher-stats",
             method:"GET",
            }),
            providesTags:["Teacher"]
        })
    })
})

export const {useGetAllPendingTeachersQuery,useGetAdminApprovalQuery,useGetAdminTeacherStatsQuery,useRejectTeacherMutation,useApproveTeacherMutation}=adminApis