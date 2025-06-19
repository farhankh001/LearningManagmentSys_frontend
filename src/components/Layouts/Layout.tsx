import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { lightTheme ,darkTheme} from "./Theme";
import NavBar from "./NavBar";
import { CssBaseline } from "@mui/material";
import { Toaster } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../../app/slices/authSlice";
import { useLoggedInUserInofQuery } from "../../app/api/userApi";
import { useGetAllCoursesQuery } from "../../app/api/createCourseApi";
import { useGetAllCategoriesQuery } from "../../app/api/categoriesApi";
import { setCategories } from "../../app/slices/categorySlice";
import { setAllCourses } from "../../app/slices/courseSlice";
import { IdleTimerProvider, useIdleTimerContext } from 'react-idle-timer';
import { StudyTimeTracker } from "../../pages/dashboards/TimeTracker/StudyTimeTracker";


const Layout = () => {
  const[darkMode,setDarkMode]=useState(true)
  const {data:currentUserInfo,isError,isLoading,error,isFetching,isSuccess}=useLoggedInUserInofQuery();
  const { data: categoriesData, isSuccess: categorySuccess } = useGetAllCategoriesQuery();
  const { data: coursesData, isSuccess: courseSuccess } = useGetAllCoursesQuery({});
  
  const dispatch=useDispatch();


  useEffect(() => {
    if (categorySuccess && categoriesData) {
      dispatch(setCategories(categoriesData.categories));
    }
  }, [categorySuccess, categoriesData, dispatch]);

  // Handle courses initialization
  useEffect(() => {
    if (courseSuccess && coursesData) {
      dispatch(setAllCourses(coursesData.courses));
    }
  }, [courseSuccess, coursesData, dispatch]);


  useEffect(()=>{
    if(isSuccess&&currentUserInfo){
        dispatch(setUser(currentUserInfo))
    }else if(!isLoading&&isError){
       
        dispatch(clearUser())
         }
       },[isSuccess, isError, currentUserInfo, error,isLoading,isFetching, dispatch])
      
  return (
    <>
      <ThemeProvider theme={darkMode?darkTheme:lightTheme}>
      <CssBaseline/>
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode}/>
         <Toaster position="top-right" reverseOrder={false} />

         <IdleTimerProvider
          timeout={1000 * 60 * 10} // 10 minutes, irrelevant for now
          crossTab
         >
             <Outlet/>
         </IdleTimerProvider>
       
      </ThemeProvider>
    </>
  )
}

export default Layout
