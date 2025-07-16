import { useState } from 'react'
import { useGetAllCoursesQuery } from '../app/api/createCourseApi';
import { Box, CircularProgress, Container, Typography } from '@mui/material';


function DisplayAllCourses() {
    const [page,_]=useState(1);
    const limit =8;
    const {
        data:courseData,
        isLoading,
       
        isError
    }=useGetAllCoursesQuery({page,limit})

    // const handlePageChange=(event:React.ChangeEvent<unknown>,value:number)=>{
    //     setPage(value);
    //     window.scrollTo(0,0);
    // }
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
