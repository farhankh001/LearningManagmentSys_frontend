import { CreateCourseFormType } from "../../types/create_course.types";
import baseApi from "./baseApi";
import { CreateCourseSbumitType } from "./createCourseApi";
enum activationStatus{
  "ACTIVE",
  "INACTIVE"
};
export type TeacherCoursesResponse = {
  averageRating: number;
  totalApprovedEnrollments: number;
  totalRejectedEnrollments: number;
  totalCourses: number;
  fiveStarRatings: number;
  courses: {
    id: string;
    title: string;
    activationStatus: string; // adjust based on your enum
    createdAt: string; // or `Date` if you don't stringify in your response
    totalEnrollmentsPerCourse: number;
  }[];
};


export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export interface SingleTeacherResponse {
  id: string;
  qualifications: string;
  is_approved_teacher: 'PENDING' | 'APPROVED' | 'REJECTED'; // or string if not using enums
  user: {
    name: string;
    email: string;
    email_verified: boolean;
    profile_picture:string|null
  };
  expertise: string[]; // Array of category titles
}

export interface TeacherApprovalStatusResponse {
  success: boolean;
  status: string;
  message: string;
}
export type GetSingleStudentByEnrollmentIdResponse = {
  id: string;
  enrollmentStatus: string; // or string if it's more dynamic
  education_level: string; // You can replace with a union like 'HIGH_SCHOOL' | 'UNDERGRADUATE' | etc. if enum is known
  interests: string[];
  user: {
    name: string;
    email: string;
    profile_picture: string | null;
    email_verified: boolean;
  };
};

const teacherDashApis=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        fetchAllCreatedCoursesByTeacher:builder.query<TeacherCoursesResponse,null>({
            query:()=>({
                url:"fetch-all-courses-by-teacher",
                method:"GET"
            }),
            providesTags:["Courses","Enrollment","Teacher"]
        }),
        singleCourseDetailsForEdit:builder.query<CreateCourseFormType,{courseId:string|undefined}>({
          query:({courseId})=>({
            url:"/get-single-course-for-edit",
            method:"GET",
            params:{courseId}
          })
        }),
        editExistingCourse:builder.mutation<any,CreateCourseSbumitType>({
                    query:(data)=>({
                        url:"/edit-existing-course",
                        method:"POST",
                        body:data
                    }),
                    invalidatesTags: ['Courses']
                }),
          checkTeacherApprovalStatus:builder.query<TeacherApprovalStatusResponse,void>({
            query:()=>({
              url:"/check-teacher-approved-status",
              method:"GET"
            }),
            providesTags:["Teacher"]
          })  ,
          getSingleTeacherById:builder.query<SingleTeacherResponse,{teacherId:string|undefined}>({
            query:({teacherId})=>({
              url:"get-single-teacher-by-id",
              method:"GET",
              params:{teacherId}
            })
          }),
           getSingleStudentByEnrollmentId:builder.query<GetSingleStudentByEnrollmentIdResponse,{enrollmentId:string|undefined}>({
            query:({enrollmentId})=>({
              url:"get-Single-Student-By-EnrollmentId",
              method:"GET",
              params:{enrollmentId}
            })
          }),
        approveEnrollment:builder.mutation({
            query:({enrollmentId})=>({
                url:"approve-pending-enrollment",
                method:"PUT",
                params:{enrollmentId}
            }),
            invalidatesTags:["Enrollment"]
        }), 
       rejectEnrollment:builder.mutation({
            query:({enrollmentId})=>({
                url:"reject-pending-enrollment",
                method:"PUT",
                params:{enrollmentId}
            }),
             invalidatesTags:["Enrollment"]
        }),
    })
})

export const {useGetSingleStudentByEnrollmentIdQuery,useFetchAllCreatedCoursesByTeacherQuery,useSingleCourseDetailsForEditQuery,useEditExistingCourseMutation,useCheckTeacherApprovalStatusQuery,useGetSingleTeacherByIdQuery,useApproveEnrollmentMutation,useRejectEnrollmentMutation}=teacherDashApis