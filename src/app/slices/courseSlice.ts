import { Category } from "@mui/icons-material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Category {
    id: string;
    title: string;
  }
  
export interface CourseCategory {
    id:string;
    title:string
  }
  
export interface CourseTeacher {
    name:string,
    profile:string
    id:string,
    qualifications:string
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
    course_category: CourseCategory[];
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
    topCourses: Course[];
    enrolledCourses: Course[];
  }

const initialState: CourseState = {
  teacherCourses: [],
  allCourses: [],
  favoriteCourses: [],
  topCourses: [],
  enrolledCourses: []
  };
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
        setTopCourses: (state, action: PayloadAction<Course[]>) => {
            state.topCourses = action.payload;
          },
        setEnrolledCourses: (state, action: PayloadAction<Course[]>) => {
            state.enrolledCourses = action.payload;
          }
    }
})


export default courseSlice.reducer
export const {setAllCourses,setEnrolledCourses,setFavoriteCourses,setTeacherCourses,setTopCourses}=courseSlice.actions