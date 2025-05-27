import { CreateCourseFormType } from "../../types/create_course.types";
import baseApi from "./baseApi";
import { CreateCourseSbumitType } from "./createCourseApi";
enum activationStatus{
  "ACTIVE",
  "INACTIVE"
};
export interface TeacherCoursesResponse{
  averageRating: number;
  totalEnrollment: number;
  totalCourses: number;
  fiveStarRatings: number;
  courses: Array<{
    id:string;
    title: string;
    activationStatus:string ;
    createdAt: string;
    totalEnrollmentsPerCourse:number
     // ISO date string (can use Date if you prefer)
  }>;
};

const teacherDashApis=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        fetchAllCreatedCoursesByTeacher:builder.query<TeacherCoursesResponse,null>({
            query:()=>({
                url:"fetch-all-courses-by-teacher",
                method:"GET"
            }),
            providesTags:["Courses"]
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
    })
})

export const {useFetchAllCreatedCoursesByTeacherQuery,useSingleCourseDetailsForEditQuery,useEditExistingCourseMutation}=teacherDashApis