import { useEffect } from 'react';
import { useGetAllCategoriesQuery } from '../api/categoriesApi';
import { setCategories } from '../slices/categorySlice';
import { useDispatch } from 'react-redux';
import { useGetAllCoursesQuery } from '../api/createCourseApi';
import { setAllCourses } from '../slices/courseSlice';
export const useInitialData = () => {
  const dispatch = useDispatch();
  
  // Query both categories and courses
  const { data: categoriesData, isSuccess: categorySuccess } = useGetAllCategoriesQuery();
  const { data: coursesData, isSuccess: courseSuccess } = useGetAllCoursesQuery({});
  
  // Handle categories initialization
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
};

