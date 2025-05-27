
import { Box, CircularProgress } from '@mui/material';

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full screen height
        width: '100vw',  // Full screen width
        backgroundColor: 'background.default', // Matches theme
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingScreen;
