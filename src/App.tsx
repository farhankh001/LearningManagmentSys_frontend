import { Typography, Button, Box, useTheme} from '@mui/material';
import { useCreateCategoriesMutation } from './app/api/categoriesApi';
import CourseDetails from './components/Layouts/CourseDetails';
// import HomeHero from './test/hero';
import HomeFeature from './test/feature';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import HeroSection from './test/AnimatedHero';


function App() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
 const authState = useSelector((state: RootState) => state.auth);
  console.log("in app: ",authState)

  const [create_category,{}]=useCreateCategoriesMutation()
   const createCategory=()=>{
    create_category({title:"Politices",description:"Knowledge society."})
   }

  return (
    <Box sx={{maxWidth:"100%"}}>
      <Box>
      
      <HeroSection/>
      </Box>
      
         <Box sx={{marginTop:10}}>
        <CourseDetails/>
      </Box>
      
       <Box sx={{marginTop:15}}>
        <HomeFeature/>
       </Box>
     
     
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60px',
          backgroundColor: isDarkMode ? '#1E1E1E' : '#f5f5f5',
          mt: 10,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          © 2025 LMS. All rights reserved.
        </Typography>
        <Button onClick={createCategory}>
create_category
        </Button>
      </Box>
      
    </Box>
  );
}

export default App;