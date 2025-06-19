import baseApi from "./baseApi";
import { Assignment, Quiz } from "./createCourseApi";
export interface EnhancedLesson {
  id: string;
  title: string;
  url_video?: string | null;
  url_doc2?: string | null;
  lesson_text: string;
  url_docs?: string | null;
  createdAt: Date;
  updatedAt: Date;
  course_id: string;
  quiz_id?: string | null;
  assignment_id?: string | null;
  quiz?: Quiz | null;
  assignment?: Assignment | null;
  completionStatus:string;
  mcqPercentage: number | null;
}

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
        subtitle:string,
        language:string,
        course_thumbnail: string,
        avgRating:number,
        category:string,
        activationStatus: string,
        lessons:EnhancedLesson[],
        courseTeacherInfo:CourseTeacher[]
        stats: {
    totalLessons:number,
    completedLessons:number,
    progressPercentage:number,
    quizScores:number[]
  },
}



export type EnrolledCourse = {
  enrollmentId: string;
  enrollmentDate: string; // or Date if not serialized
  enrollmentStatus: string;
  approvalStatus: string;
  course: {
    id: string;
    title: string;
    thumbnail:string;
    subtitle:string;
    activationStatus:string;
    language:string
  };
  teacher: {
    id: string;
    name: string;
    email: string;
  } | null;
};
export type EnrolledCoursesApproved = {
  enrollmentId: string;
  enrollmentDate: string; // or Date if not serialized
  enrollmentStatus: string;
  approvalStatus: string;
  course: {
    id: string;
    title: string;
    thumbnail:string;
    subtitle:string;
    activationStatus:string;
    language:string
    category:string,
  };
  teacher: {
    id: string;
    name: string;
    email: string;
  } | null;
  progress:{
   totalMcq: number;
    attemptedMcq: number;
    percentage:number;
  }
};

export type EnrolledCoursesGrouped = {
  pending: EnrolledCourse[];
  approved: EnrolledCoursesApproved[];
  rejected: EnrolledCourse[];
};

export type EnrollmentSummary = {
  totalEnrolled: number;
  inProgress: number;
  completed: number;
  totalPending:number;
  totalApproved:number;
  totalLessonsWithMcq:number;
  totalCompletedLessonsWithMcq:number;
  overallProgressPercentage:number;
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
            }) ,
    updateActiveStudyTime:builder.mutation<any,any>({
      query:(data)=>({
        url:"update-active-study-time",
        method:"POST",
        body:data
      }),
      invalidatesTags:["StdActiveTime"]
    }),
    getActiveStudyTime:builder.query<{studyTime:number},void>({
      query:()=>(
        {
          url:"get-study-time",
          method:"GET",
        }
      ),
      providesTags:['StdActiveTime']
    })
    
    })
})


export const{useFetchAllEnrolledCoursesByStudentQuery,useGetSingleCourseByEnrolledStudentQuery,useGetActiveStudyTimeQuery,useUpdateActiveStudyTimeMutation}=studentDashApis