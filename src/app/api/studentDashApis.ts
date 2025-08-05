import baseApi from "./baseApi";
import { Assignment, Quiz } from "./createCourseApi";
export interface EnhancedLesson {

  id: string;
  title: string;
  url_video?: string | null;
  url_doc2?: string | null;
  lesson_text: string;
  url_docs?: string | null;
  hasMcq: boolean;
  hasLab: boolean;
  hasAssignment: boolean;
  attemptedMcq: boolean;
  attemptedLab: boolean;
  attemptedAssignment: boolean;
  isCompletedLesson: boolean;
  mcqPercentage: number | null;
  mcqSubmissionId: string | null;
  labSubmissionId: string | null;
  assignmentSubmissionId: string | null;
  lab: any | null;
  assignment: any | null;
  mcqQuiz: any | null;
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
export interface CourseTeacher {
  name: string,
  email: string,
  id: string,

  profile_url: string
}
type DataType = {
  name: string;
  count: number;
};

export type SingleCourseOverviewResponse = {
  id: string;
  enrollmentDate: string;
  courseCreatedAt: string;
  language: string;
  title: string;
  subtitle: string;
  description: string;
  course_thumbnail: string;
  avgRating: number | null;
  category: string | undefined;
  activationStatus: 'Active' | 'Inactive' | null;
  courseTeacherInfo: {
    name: string;
    email: string;
    id: string;
    qualifications: string;
    profile_url: string | null;
  }[];
  lessons: {
    id: string;
    title: string;
    url_video?: string | null;
    url_doc2?: string | null;
    lesson_text: string;
    url_docs?: string | null;
    hasMcq: boolean;
    hasLab: boolean;
    hasAssignment: boolean;
    attemptedMcq: boolean;
    attemptedLab: boolean;
    attemptedAssignment: boolean;
    isCompletedLesson: boolean;
    mcqPercentage: number | null;
    mcqSubmissionId: string | null;
    labSubmissionId: string | null;
    assignmentSubmissionId: string | null;
    lab: any | null;
    assignment: any | null;
    mcqQuiz: any | null;
  }[];
  stats: OverallStats;
  progressPercentage: {
    name: string;
    value: number;
  };
  quizScores: number[];
};



export type EnrolledCourse = {
  enrollmentId: string;
  enrollmentDate: string; // or Date if not serialized
  enrollmentStatus: string;
  approvalStatus: string;
  course: {
    id: string;
    title: string;
    thumbnail: string;
    subtitle: string;
    activationStatus: string;
    language: string
  };
  teacher: {
    id: string;
    name: string;
    email: string;
  } | null;
};

export type EnrollmentSummary = {
  name: string;
  count: number;
};

export type LessonStats = {
  totalLessons: number;
  totalAssignments: number;
  totalMCQs: number;
  totalLabs: number;
  submittedAssignments: number;
  submittedMCQs: number;
  submittedLabs: number;
};

export type CourseDetails = {
  id: string;
  title: string;
  thumbnail: string;
  subtitle: string;
  language: string;
  activationStatus: string | null;
  category: string | null;
};

export type TeacherDetails = {
  id: string;
  name: string;
  email: string;
} | null;

export type EnrollmentData = {
  enrollmentId: string;
  enrollmentDate: string;
  enrollmentStatus: "InProgress" | "Passed" | "Failed";
  approvalStatus: "Pending" | "Approved" | "Rejected";
  course: CourseDetails;
  teacher: TeacherDetails;
  lessonStats: LessonStats;

};

export type GroupedEnrollments = {
  pending: EnrollmentData[];
  approved: EnrollmentData[];
  rejected: EnrollmentData[];
};
export type OverallStats = {
  totalAssignments: number;
  submittedAssignments: number;
  totalMCQs: number;
  submittedMCQs: number;
  totalLabs: number;
  submittedLabs: number;
  totalLessons: number
};

export type EnrolledCoursesResponse = {
  success: true;
  summary: {
    totalEnrolled: EnrollmentSummary;
    totalApproved: EnrollmentSummary;
    totalPending: EnrollmentSummary;
    totalRejected: EnrollmentSummary;
    inProgress: EnrollmentSummary;
    completed: EnrollmentSummary;
  };
  overallStats: OverallStats;
  totalStudyTimeInHours: number;
  enrollments: GroupedEnrollments;

};
export type ActiveStudyClockUpdateDataType = {
  seconds: number;
  courseId: string
}

const studentDashApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllEnrolledCoursesByStudent: builder.query<EnrolledCoursesResponse, null>({
      query: () => ({
        url: "fetch-all-enrolled-courses-by-student",
        method: "GET"
      }),
      providesTags: ["Enrollment"]
    }),
    GetSingleCourseByEnrolledStudent: builder.query<SingleCourseOverviewResponse, { courseId: string | undefined }>({
      query: ({ courseId }) => ({
        url: "get-single-course-by-enrolled-student",
        method: "GET",
        params: { courseId }
      })
    }),
    updateActiveStudyTime: builder.mutation<any, ActiveStudyClockUpdateDataType>({
      query: (data) => ({
        url: "update-active-study-time",
        method: "POST",
        body: data,

      }),
      invalidatesTags: ["StdActiveTime"]
    }),
    getActiveStudyTime: builder.query<{ studyTime: number }, { courseId: string }>({
      query: ({ courseId }) => (
        {
          url: "get-study-time",
          method: "GET",
          params: { courseId }
        }
      ),
      providesTags: ['StdActiveTime']
    })

  })
})


export const { useFetchAllEnrolledCoursesByStudentQuery, useGetSingleCourseByEnrolledStudentQuery, useGetActiveStudyTimeQuery, useUpdateActiveStudyTimeMutation } = studentDashApis