import { useState } from 'react'
import { useGetAllCoursesQuery } from '../app/api/createCourseApi';
import { Box, CircularProgress, Container, Pagination, Typography } from '@mui/material';
import CourseCard from '../components/Card/CourseCard';

function DisplayAllCourses() {
    const [page,setPage]=useState(1);
    const limit =8;
    const {
        data:courseData,
        isLoading,
        isFetching,
        isError
    }=useGetAllCoursesQuery({page,limit})

    const handlePageChange=(event:React.ChangeEvent<unknown>,value:number)=>{
        setPage(value);
        window.scrollTo(0,0);
    }
    console.log("in display all course......",courseData)
    if (isLoading) {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress />
          </Box>
        );
      }
      if (isError) {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <Typography color="error">Error loading courses</Typography>
          </Box>
        );
      }
  return (
    <Container maxWidth="xl">
      hello
  </Container>
  )
}

export default DisplayAllCourses
