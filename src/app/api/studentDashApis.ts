import baseApi from "./baseApi";
import { Lesson } from "./createCourseApi";
export interface Teacher {
  id: string;
  name: string;
  email: string;
}
export interface CourseInfo {
  id: string;
  title: string;
}


export interface DashboardSummary {
  totalEnrolled: number;
  inProgress: number;
  completed: number;
}
export interface StudentDashboardSuccessResponse {
  EnrollmentData: DashboardSummary;
  enrolledCourses: EnrolledCourse[];
}
export interface CourseTeacher{
  name:string,
  email:string,
  id:string,
  profile_url:string
}
export interface StudentEnrolledCourseSuccessType{
         id:string,
        title:string,
        course_thumbnail: string,
        avgRating:number,
        activationStatus: string,
        lessons:Lesson[],
        courseTeacherInfo:CourseTeacher[]
}



export type EnrolledCourse = {
  enrollmentId: string;
  enrollmentDate: string; // or Date if not serialized
  enrollmentStatus: string;
  approvalStatus: string;
  course: {
    id: string;
    title: string;
  };
  teacher: {
    id: string;
    name: string;
    email: string;
  } | null;
};

export type EnrolledCoursesGrouped = {
  pending: EnrolledCourse[];
  approved: EnrolledCourse[];
  rejected: EnrolledCourse[];
};

export type EnrollmentSummary = {
  totalEnrolled: number;
  inProgress: number;
  completed: number;
  totalPending:number;
  totalApproved:number
};

export type GetAllEnrolledCoursesResponse = {
  success: boolean;
  summary: EnrollmentSummary;
  enrollments: EnrolledCoursesGrouped;
};
``

const studentDashApis=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        fetchAllEnrolledCoursesByStudent:builder.query<GetAllEnrolledCoursesResponse,null>({
            query:()=>({
                url:"fetch-all-enrolled-courses-by-student",
                method:"GET"
            }), 
            providesTags:["Enrollment"]
        }), 
    GetSingleCourseByEnrolledStudent:builder.query<StudentEnrolledCourseSuccessType,{courseId:string|undefined}>({
                query:({courseId})=>({
                    url:"get-single-course-by-enrolled-student",
                    method:"GET",
                    params:{courseId}
                }) 
            }) 
    })
})


export const{useFetchAllEnrolledCoursesByStudentQuery,useGetSingleCourseByEnrolledStudentQuery}=studentDashApis