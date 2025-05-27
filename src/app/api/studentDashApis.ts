import baseApi from "./baseApi";
import { GetSingleCourseByTeacherResponse, Lesson } from "./createCourseApi";
export interface Teacher {
  id: string;
  name: string;
  email: string;
}
export interface CourseInfo {
  id: string;
  title: string;
}

export interface EnrolledCourse {
  enrollmentId: string;
  enrollmentDate: string;
  enrollmentStatus: string;
  course: CourseInfo;
  teacher: Teacher | null;
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
const studentDashApis=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        fetchAllEnrolledCoursesByStudent:builder.query<StudentDashboardSuccessResponse,null>({
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