import { SingleCourseResponse, TeacherCourseResponse } from "../slices/courseSlice";
import baseApi from "./baseApi";
import { EnhancedLesson } from "./studentDashApis";


enum Activation_Status {
  "Active",
  "Inactive"
}


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
}

export interface EnrolledStudent {
  enrollmentId: string;
  studentId: string;
  name: string;
  email: string;
  enrollmentStatus: string;
  enrollmentApprovalStatus: string;
  enrollmentDate: string
}

export interface CourseDetails {
  id: string;
  title: string;
  course_thumbnail: string;
  avgRating: number | null;
  activationStatus: string,
  lessons: Lesson[];
  enrolledStudents: EnrolledStudent[];
}

// Main response type
// export interface GetSingleCourseByTeacherResponse {
//   courseDetails: CourseDetails;
// }

export interface LessonWithFlags {
  id: string;
  title: string;
  url_video?: string | null;
  url_doc2?: string | null;
  lesson_text: string;
  url_docs?: string | null;
  course_id: string;
  createdAt: string; // or Date if you're not serializing
  updatedAt: string; // or Date if you're not serializing

  // Relations (if included)
  quiz?: {
    id: string;
    // Add fields from `Lab` model as needed
  } | null;

  mcqQuiz?: {
    id: string;
    // Add fields from `QuizMCQBased` model as needed
  } | null;

  assignment?: {
    id: string;
    // Add fields from `Assignment` model as needed
  } | null;

  // Flags
  has_lab: boolean;
  has_mcq_quiz: boolean;
  has_assignment: boolean;
}


type GetSingleCourseByTeacherResponse = {
  courseDetails: {
    id: string;
    title: string;
    course_thumbnail: string;
    avgRating: number;
    activationStatus: string;
    lessons: LessonWithFlags[];
    approvedStudents: EnrolledStudent[];
    pendingStudents: EnrolledStudent[];
    enrollmentTrend: {
      date: string;   // formatted as 'yyyy-MM-dd'
      count: number;  // number of enrollments on that date
    }[];

  };
};







// enum Education_Levels{
//   "PRIMARY_SCHOOL",
//   "MIDDLE_SCHOOL",
//   "HIGH_SCHOOL",
//   "BACHELOR",
//   "MASTERS",
//   "DOCTORATE",
//   "PHD",
//   "OTHER"
// };
// enum Sales_Category{
//   "FREE",
//   "BASIC",
//   "STANDARD",
//   "PREMIUM",
//   "ENTERPRISE"
// }
export interface CreateCourseSbumitType {
  title: string,
  subtitle: string,
  description: string,
  level:
  "Primary" |
  "Middle" |
  "HighSchool" |
  "Bachelor" |
  "Masters" |
  "Doctorate" |
  "PhD" |
  "Others"
  language: string,
  activationStatus: "Active" | "Inactive"
  price: number,
  sales_category: "Free" | "Basic" | "Standard" | "Premium" | "Enterprise",
  duration: number,
  course_thumbnail: string | undefined,
  course_category: string[],
  preRequisites: string,
  whatYouWillLearn: string
}

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNewCourse: builder.mutation<any, FormData>({
      query: (data) => ({
        url: "/create-new-course",
        method: "POST",
        body: data
      }),
      invalidatesTags: ['Courses']
    }),
    getAllCourses: builder.query<TeacherCourseResponse, { page?: number, limit?: number }>({
      query: ({ page = 1, limit = 8 }) => ({
        url: "/get-all-courses",
        method: "GET",
        params: { page, limit }
      }),
      providesTags: ['Courses']
    }),
    getSingleCourse: builder.query<SingleCourseResponse, { courseId: string | undefined }>({
      query: ({ courseId }) => (
        {
          url: "/get-single-course",
          method: "GET",
          params: { courseId }
        }),

    }),
    GetSingleCourseByTeacher: builder.query<GetSingleCourseByTeacherResponse, { courseId: string | undefined }>({
      query: ({ courseId }) => ({
        url: "get-single-course-by-teacher",
        method: "GET",
        params: { courseId }
      }),
      providesTags: ['Courses', "Enrollment"]

    })
  })
})

export const { useCreateNewCourseMutation, useGetAllCoursesQuery, useGetSingleCourseQuery, useGetSingleCourseByTeacherQuery } = courseApi;