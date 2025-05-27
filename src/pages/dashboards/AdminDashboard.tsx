import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { School, MenuBook } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const roles = [
  {
    title: 'Become a Teacher',
    icon: <School sx={{ fontSize: 50, color: 'primary.main' }} />,
    features: [
      'Create and manage courses',
      'Upload video, text, and docs',
      'Create and evaluate quizzes & assignments',
      'Track student progress',
    ],
    redirectPath: '/register-teacher',
  },
  {
    title: 'Become a Student',
    icon: <MenuBook sx={{ fontSize: 50, color: 'secondary.main' }} />,
    features: [
      'Enroll in courses',
      'Access lesson materials',
      'Submit quizzes & assignments',
      'Track learning progress',
    ],
    redirectPath: '/register-student',
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ px: 2, py: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Choose Your Role
      </Typography>
      <Typography variant="body1" align="center" sx={{ mb: 4 }}>
        Select a role to get started with your LMS journey
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          gap: 4,
          flexWrap: 'wrap',
        }}
      >
        {roles.map((role, idx) => (
          <Card
            key={idx}
            sx={{
              flex: '1 1 300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              p: 3,
            }}
          >
            {role.icon}
            <Typography variant="h6" sx={{ mt: 2 }}>
              {role.title}
            </Typography>
            <CardContent>
              <ul style={{ textAlign: 'left' }}>
                {role.features.map((feature, i) => (
                  <li key={i}>
                    <Typography variant="body2">{feature}</Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(role.redirectPath)}
              sx={{ mt: 'auto' }}
            >
              Continue as {role.title.split(' ')[2]}
            </Button>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AdminDashboard;