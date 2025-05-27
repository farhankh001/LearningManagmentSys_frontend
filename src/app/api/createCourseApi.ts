import { SingleCourseResponse, TeacherCourseResponse } from "../slices/courseSlice";
import baseApi from "./baseApi";


enum Activation_Status
{
    "ACTIVE",
  "INACTIVE"
}

enum Enrollment_Status {
  "INPROGRESS",
  "PASSED",
  "FAILED"
}

// Types for individual elements in the response
export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: string;
  timelimit: number;
  total_score: number;
  passing_score: number;
  activationStatus: Activation_Status;
  createdAt: Date;
  updatedAt: Date;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  questions: string;
  timelimit: number;
  total_score: number;
  passing_score: number;
  activationStatus: Activation_Status;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  title: string;
  url_video?: string | null;
  url_image?: string | null;
  lesson_text: string;
  url_docs?: string | null;
  createdAt: Date;
  updatedAt: Date;
  course_id: string;
  quiz_id?: string | null;
  assignment_id?: string | null;
  quiz?: Quiz | null;
  assignment?: Assignment | null;
}

export interface EnrolledStudent {
  studentId: string;
  name: string;
  email: string;
  enrollmentStatus: string;
  courseRating: number | null;
}

export interface CourseDetails {
  id: string;
  title: string;
  course_thumbnail: string;
  avgRating: number | null;
  activationStatus:string,
  lessons: Lesson[];
  enrolledStudents: EnrolledStudent[];
}

// Main response type
export interface GetSingleCourseByTeacherResponse {
  courseDetails: CourseDetails;
}
enum Education_Levels{
  "PRIMARY_SCHOOL",
  "MIDDLE_SCHOOL",
  "HIGH_SCHOOL",
  "BACHELOR",
  "MASTERS",
  "DOCTORATE",
  "PHD",
  "OTHER"
};
enum Sales_Category{
  "FREE",
  "BASIC",
  "STANDARD",
  "PREMIUM",
  "ENTERPRISE"
}
export interface CreateCourseSbumitType{
  title:string,
  subtitle: string,
  description:string,
  level: "PRIMARY_SCHOOL"|"MIDDLE_SCHOOL"|"HIGH_SCHOOL"|"BACHELOR"|"MASTERS"|"DOCTORATE"|"PHD"|"OTHER",
  language:string,
  activationStatus: "ACTIVE"|"INACTIVE"
  price: number,
  sales_category: "FREE"|"BASIC"|"STANDARD"|"PREMIUM"|"ENTERPRISE",
  duration: number,
  course_thumbnail:string|undefined,
  course_category:string[],
  preRequisites:string,
  whatYouWillLearn:string
}

const courseApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        createNewCourse:builder.mutation<any,CreateCourseSbumitType>({
            query:(data)=>({
                url:"/create-new-course",
                method:"POST",
                body:data
            }),
            invalidatesTags: ['Courses']
        }),
        getAllCourses:builder.query<TeacherCourseResponse,{page?: number, limit?: number}>({
            query:({page=1,limit=8})=>({
                url:"/get-all-courses",
                method:"GET",
                params:{page,limit}
            }),
            providesTags: ['Courses']
        }),
        getSingleCourse:builder.query<SingleCourseResponse,{courseId:string|undefined}>({
            query:({courseId})=>(
            {url:"/get-single-course",
            method:"GET",
            params:{courseId}
        }),
       
        }),
        GetSingleCourseByTeacher:builder.query<GetSingleCourseByTeacherResponse,{courseId:string|undefined}>({
            query:({courseId})=>({
                url:"get-single-course-by-teacher",
                method:"GET",
                params:{courseId}
            }) 
        })
    })
})

export const {useCreateNewCourseMutation,useGetAllCoursesQuery,useGetSingleCourseQuery,useGetSingleCourseByTeacherQuery}=courseApi;