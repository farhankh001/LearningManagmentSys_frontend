import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { lightTheme, darkTheme } from "./Theme";
import NavBar from "./NavBar";
import { Box, CssBaseline } from "@mui/material";
import { Toaster } from 'react-hot-toast';
import { useDispatch } from "react-redux";

import { useGetAllCoursesQuery } from "../../app/api/createCourseApi";
import { useGetAllCategoriesQuery } from "../../app/api/categoriesApi";
import { setCategories } from "../../app/slices/categorySlice";
import { setAllCourses } from "../../app/slices/courseSlice";
import { IdleTimerProvider } from 'react-idle-timer';
import AuthInitializer from "../../AuthInitializer";



const Layout = () => {
  const [darkMode, setDarkMode] = useState(true)
  const { data: categoriesData, isSuccess: categorySuccess } = useGetAllCategoriesQuery();
  const { data: coursesData, isSuccess: courseSuccess } = useGetAllCoursesQuery({});

  const dispatch = useDispatch();


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



  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <AuthInitializer />
        <Toaster position="top-right" reverseOrder={false} />

        <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: 'center' }}>
          <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />

          <IdleTimerProvider
            timeout={1000 * 60 * 10} // 10 minutes, irrelevant for now
            crossTab
          >
            <Outlet />
          </IdleTimerProvider>
        </Box>

      </ThemeProvider>
    </>
  )
}

export default Layout
