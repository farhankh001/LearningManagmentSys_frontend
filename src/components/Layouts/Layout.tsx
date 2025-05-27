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
        console.log(currentUserInfo)
        dispatch(setUser(currentUserInfo))
    }else if(!isLoading&&isError){
        console.log(error)
        dispatch(clearUser())
         }
       },[isSuccess, isError, currentUserInfo, error,isLoading,isFetching, dispatch])
  return (
    <>
      <ThemeProvider theme={darkMode?darkTheme:lightTheme}>
      <CssBaseline/>
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode}/>
         <Toaster position="top-right" reverseOrder={false} />
        <Outlet/>
      </ThemeProvider>
    </>
  )
}

export default Layout
