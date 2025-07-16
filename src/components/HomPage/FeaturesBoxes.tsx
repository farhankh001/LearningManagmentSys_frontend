
import { Box, } from '@mui/material'
import { LogoCarousel } from './Cr';
// const featureBoxesSX={
//   fontSize:50,fontWeight:600,
// }
// const features = [
//   {
//     title: "Advanced Cybersecurity Training",
//     desc: "In-depth courses covering network security, ethical hacking, and threat detection.",
//     icon: <Security sx={featureBoxesSX}/>,
//   },
//   {
//     title: "Cloud Computing Integration",
//     desc: "Hands-on labs and simulations using real-world cloud security and architecture.",
//     icon: <CloudQueue sx={featureBoxesSX} />,
//   },
//   {
//     title: "Developer-Focused Curriculum",
//     desc: "Secure coding practices,and application security tailored for software developers.",
//     icon: <Code sx={featureBoxesSX} />,
//   },
//   {
//     title: "Interactive Labs & MCQ Quizzes",
//     desc: "Scenario-based learning,and real-time assessments to reinforce critical thinking.",
//     icon: <Quiz sx={featureBoxesSX} />,
//   },
//   {
//     title: "Progress Tracking & Analytics",
//     desc: "Personalized dashboards for learners and instructors to monitor progress, and skill gaps.",
//     icon: <Insights sx={featureBoxesSX} />,
//   },
//    {
//     title: "Personalized Progress Tracking",
//     desc: "Personalized dashboards for learners and instructors to monitor progress, and skill gaps.",
//     icon: <FlashAuto sx={featureBoxesSX} />,
//   },
// ];

function FeaturesBoxes() {
    // const theme=useTheme()
  return (
        
      <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",maxWidth:"100%",justifyContent:"center"}}>
        
     
       
        <LogoCarousel/>
    
      
      
     
      </Box>
  )
}

export default FeaturesBoxes
