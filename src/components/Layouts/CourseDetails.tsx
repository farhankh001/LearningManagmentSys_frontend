import { useState } from 'react'
import { Box, Tabs, Tab, Typography, useTheme, Container } from '@mui/material'
import Slider from 'react-slick'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import CourseCard from '../Card/CourseCard'

// Required CSS for react-slick
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


const categories = ['All', 'FREE', 'BASIC', 'STANDARD', 'PREMIUM', 'ENTERPRISE']

export default function CourseDetails() {
  const theme = useTheme()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const courses = useSelector((state: RootState) => state.courses.allCourses)

  const filteredCourses =
    selectedCategory === 'All'
      ? courses
      : courses.filter((course) => course.sales_category === selectedCategory)

  const courseCount = filteredCourses.length

  const getSliderSettings = () => ({
    dots: courseCount > 1,
    speed: 500,
    slidesToShow: Math.min(courseCount, 4),
    slidesToScroll: 1,
    infinite: false, 
    arrows:false,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: Math.min(courseCount, 4),
         arrows: false,
          dots: courseCount > 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: Math.min(courseCount, 3),
          arrows:false,
         dots: courseCount > 1,
           centerMode: true,
          centerPadding: courseCount === 1 ? '0px' : '40px',
        
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: Math.min(courseCount, 2),
         dots: courseCount >= 1,
           centerMode: true,
          centerPadding: courseCount === 1 ? '0px' : '40px',
          arrows: false
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          dots: courseCount >= 1,
          centerMode: true,
          centerPadding: courseCount === 1 ? '0px' : '40px',
          arrows: false
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          dots: courseCount >= 1,
          centerMode: true,
          centerPadding: courseCount === 1 ? '0px' : '20px',
          arrows: false
        },
      },
    ],
  })

  const shouldUseGrid = courseCount <= 2

  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper,padding:4 }}>
      <Container maxWidth="xl">
        {/* Title */}
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            fontWeight: 700,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            mb: 1,
            color: theme.palette.text.primary,
          }}
        >
          Explore Our <span>Courses</span>
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            mb: 3,
            opacity: 0.9,
            maxWidth: '800px',
            mx: 'auto',
            px: 2,
            fontSize: { xs: '1rem', md: '1.1rem' },
            color: theme.palette.text.primary,
          }}
        >
          Choose from a wide range of courses designed to help you succeed
        </Typography>

        {/* Category Tabs */}
        <Box sx={{ p: 1, mb: 4, mx: { xs: 2, md: 4 } }}>
          <Tabs
            value={categories.indexOf(selectedCategory)}
            onChange={(_, newVal) => setSelectedCategory(categories[newVal])}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-flexContainer': {
                justifyContent: 'center',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: theme.palette.primary.main,
                height: 3,
              },
              '& .MuiTab-root': {
                color: theme.palette.text.primary,
                fontWeight: 500,
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: 1,
                '&.Mui-selected': {
                  fontWeight: 700,
                },
              },
            }}
          >
            {categories.map((category) => (
              <Tab key={category} label={category} />
            ))}
          </Tabs>
        </Box>

        {/* Courses Section */}
        <Box sx={{ maxWidth: '100%', my: 4 }}>
          {courseCount === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No courses found for the selected category.
              </Typography>
            </Box>
          ) : shouldUseGrid ? (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md:'repeat(3,1fr)',
                  lg:'repeat(4,1fr)'
                },
               gap:1,
               
                
              }}
            >
              {filteredCourses.map((course, index) => (
                <Box key={course.id || index} sx={{ width: '100%', boxSizing: 'border-box'}}>
                  <CourseCard course={course} />
                </Box>
              ))}
            </Box>
          ) : (
            <Box
          
            >
              <Slider {...getSliderSettings()}>
                {filteredCourses.map((course, index) => (
                  <div key={course.id || index}>
                    <Box sx={{ width: '100%', boxSizing: 'border-box' }}>
                      <CourseCard course={course} />
                    </Box>
                  </div>
                ))}
              </Slider>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  )
}
