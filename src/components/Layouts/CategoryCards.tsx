import { Typography, Box, Card, CardMedia, CardContent, Button, useTheme, Chip, Stack, Rating, Avatar } from '@mui/material';
import { Course } from '../../app/slices/courseSlice';
import { FaClock, FaUsers, FaStar } from 'react-icons/fa';


const salesCategoryColors = {
  FREE: '#4CAF50',      
  BASIC: '#2196F3',     
  STANDARD: '#FFC107',  
  PREMIUM: '#FFD700',   
  ENTERPRISE: '#9C27B0' 
};

interface InfoTextProps {
  icon: React.ComponentType;
  text: string;
  color?: string;
}

const InfoText = ({ icon: Icon, text }: InfoTextProps) => (
  <Stack direction="row" alignItems="center" spacing={1}>
    <Icon  />
    <Typography variant="body2" sx={{ fontWeight: 500 }}>
      {text}
    </Typography>
  </Stack>
);

interface CourseCardProps {
  courses: Course[];
  title?: string;
}

export function CourseCards({ courses, title = "Available Courses" }: CourseCardProps) {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        py: 6,
        px: { xs: 2, sm: 4, md: 8 },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 6,
          fontSize: { xs: '1.8rem', md: '2.2rem' },
          fontWeight: 800,
          color: theme.palette.text.primary,
          textTransform: 'capitalize',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -12,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '4px',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '2px',
          }
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)' 
          },
          gap: 3,
          justifyContent: 'center',
        }}
      >
        {courses.map((course) => (
          <Card
            key={course.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              maxWidth: 320,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: theme.shadows[8],
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <Box sx={{ 
              position: 'relative', 
              pt: '56.25%',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)',
                zIndex: 1
              }
            }}>
              <CardMedia
                component="img"
                image={course.course_thumbnail_url || '/placeholder-course.jpg'}
                alt={course.title}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <Chip
                label={course.sales_category}
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  // backgroundColor: salesCategoryColors[course.sales_category as keyof typeof salesCategoryColors],
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  zIndex: 2,
                  px: 1,
                }}
              />
            </Box>

            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
                <Avatar 
                  src={course.course_teacher.profile} 
                  alt={course.course_teacher.name}
                  sx={{ 
                    width: 32, 
                    height: 32,
                    border: `2px solid ${theme.palette.primary.main}`,
                  }}
                />
                <Typography 
                  variant="subtitle2"
                  sx={{ 
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                  }}
                >
                  {course.course_teacher.name || 'Expert Instructor'}
                </Typography>
              </Stack>

              <Typography 
                variant="h6" 
                sx={{ 
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  lineHeight: 1.3,
                  mb: 2,
                  height: '2.6em',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {course.title || 'Course Title'}
              </Typography>

              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <InfoText 
                    icon={FaUsers} 
                    text={`${course.total_enrollments?.toLocaleString() || '0'} enrolled`}
                  />
                  <InfoText 
                    icon={FaClock} 
                    text={`${course.duration || 0}h total`}
                  />
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Rating 
                    value={course.avg_rating|| 0} 
                    readOnly 
                    precision={0.5} 
                    size="small"
                    icon={<FaStar style={{ color: '#FFB400' }} />}
                  />
                  <Typography 
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    ({course.avg_rating?.toFixed(1) || 'N/A'})
                  </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700,
                      color: course.sales_category === 'FREE' 
                        ? salesCategoryColors.FREE
                        : theme.palette.primary.main
                    }}
                  >
                    {course.sales_category === 'FREE' ? 'Free' : `$${course.price || 0}`}
                  </Typography>
                </Stack>
              </Stack>

              <Button 
                variant="contained"
                fullWidth 
                sx={{ 
                  mt: 2.5,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  borderRadius: 1.5,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s ease-in-out',
                  }
                }}
                href={`/course/${course.id}`}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}