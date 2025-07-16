import {  Box, useTheme} from '@mui/material';

import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import HeroSection from './components/HomPage/AnimatedHero';

import { Footer } from './components/HomPage/footer';


function App() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
 const authState = useSelector((state: RootState) => state.auth);
  console.log("in app: ",authState)

//   const [create_category,{}]=useCreateCategoriesMutation()
//    const createCategory=()=>{
//     create_category({title:"Politices",description:"Knowledge society."})
//    }
//  const avatarUrls = [
//     "/images/avatars/4.jpg",
//     "/images/avatars/2.jpg",
//     "/images/avatars/3.jpg",
//   ];
  return (
    <Box sx={{maxWidth:"100%"}}>
      <Box>
      
      <HeroSection/>
      </Box>


    
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
         
          backgroundColor: isDarkMode ? '#1E1E1E' : '#f5f5f5',
          mt: 10,
        }}
      >
       

       <Footer/>
      </Box>
      
    </Box>
  );
}

export default App;