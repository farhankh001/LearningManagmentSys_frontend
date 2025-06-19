
import { Box, CircularProgress } from '@mui/material';
import Lottie from 'lottie-react';
import loading from "../../assets/Animation - 1750248804799.json"
const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full screen height
        width: '100%',  // Full screen width
        backgroundColor: 'background.default', // Matches theme
      }}
    >
       <Lottie
        animationData={loading}
        loop
        autoplay
        style={{
          width: "100%",
          height: "40%",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

export default LoadingScreen;
