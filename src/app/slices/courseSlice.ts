import { Category } from "@mui/icons-material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EnrolledCourse, EnrolledCoursesApproved, EnrollmentSummary } from "../api/studentDashApis";

export interface Category {
    id: string;
    title: string;
  }
  
export interface CourseCategory {
     category:{
    title: string;
   }
  }
  
export interface CourseTeacher {
    name:string,
    profile:string
    id:string,
    qualifications:string,
    expertise:{
      category:{
        title:string
      }
    }[]
  }
  
export interface Course {
    id: string;
    title: string;
    whatYouWillLearn:string;
    preRequisites:string;
    subtitle: string;
    description: string;
    level: string;
    language: string;
    activationStatus: string;
    price: number;
    sales_category: string;
    avg_rating: number | null;
    total_enrollments: number;
    duration: number;
    course_thumbnail_url: string;
    createdAt: Date;
    course_categories: CourseCategory[];
    course_teacher: CourseTeacher;
  }
  
export interface TeacherCourseResponse {
    success: boolean;
    courses: Course[];
    totalPages:number;
    message?: string;
  }
export interface SingleCourseResponse {
    course: Course;
  }



interface CourseState {
    teacherCourses: Course[];
    allCourses: Course[];
    favoriteCourses: Course[];
    pendingCourses: {
      courses: EnrolledCourse[],
      enrollmentSummary:EnrollmentSummary
  }
      ;
    enrolledCourses: {
      enrollmentSummary:EnrollmentSummary;
      courses:EnrolledCoursesApproved[];
    }
  }

const initialState: CourseState = {
  teacherCourses: [],
  allCourses: [],
  favoriteCourses: [],
  pendingCourses: {
    courses: [],
    enrollmentSummary: {
      totalEnrolled: {
        name: "Total Enrolled",
        count: 0,
      },
      inProgress: {
        name: "In Progress",
        count: 0,
      },
      completed: {
        name: "Completed",
        count: 0,
      },
      totalPending: {
        name: "Pending Approval",
        count: 0,
      },
      totalApproved: {
        name: "Approved",
        count: 0,
      },
      totalLessonsWithMcq: {
        name: "Lessons with MCQs",
        count: 0,
      },
      totalCompletedLessonsWithMcq: {
        name: "MCQs Attempted",
        count: 0,
      },
      overallProgressPercentage: {
        name: "Overall Progress (%)",
        count: 0
      }
    }
  },
  enrolledCourses: {
    enrollmentSummary: {
      totalEnrolled: {
        name: "Total Enrolled",
        count: 0
      },
      inProgress: {
        name: "In Progress",
        count: 0
      },
      completed: {
        name: "Completed",
        count: 0
      },
      totalPending: {
        name: "Pending Approval",
        count: 0
      },
      totalApproved: {
        name: "Approved",
        count: 0
      },
      totalLessonsWithMcq: {
        name: "Lessons with MCQs",
        count: 0
      },
      totalCompletedLessonsWithMcq: {
        name: "MCQs Attempted",
        count: 0
      },
      overallProgressPercentage: {
        name: "Overall Progress (%)",
        count: 0
      }
    },
    courses: []
  }
}
const courseSlice=createSlice({
    initialState,
    name:"course",
    reducers:{
        setTeacherCourses: (state, action: PayloadAction<Course[]>) => {
            state.teacherCourses = action.payload;
          },
        setAllCourses: (state, action: PayloadAction<Course[]>) => {
            state.allCourses = action.payload;
          },
        setFavoriteCourses: (state, action: PayloadAction<Course[]>) => {
            state.favoriteCourses = action.payload;
          },
        setPendingCourses: (state, action: PayloadAction<{
      courses: EnrolledCourse[],
      enrollmentSummary:EnrollmentSummary
  }>) => {
            state.pendingCourses = action.payload;
          },
        setEnrolledCourses: (state, action: PayloadAction<{
      courses: EnrolledCoursesApproved[],
      enrollmentSummary:EnrollmentSummary
  }>) => {
            state.enrolledCourses = action.payload;
          }
    }
})


export default courseSlice.reducer
export const {setAllCourses,setEnrolledCourses,setFavoriteCourses,setTeacherCourses,setPendingCourses}=courseSlice.actions