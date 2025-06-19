import { Gavel, CheckCircle, Security, CloudQueue, Code, Insights, Quiz, FlashAuto } from '@mui/icons-material'
import { Box, Typography, List, ListItem, useTheme,Button } from '@mui/material'
import React from 'react'
const featureBoxesSX={
  fontSize:50,fontWeight:600,
}
const features = [
  {
    title: "Advanced Cybersecurity Training",
    desc: "In-depth courses covering network security, ethical hacking, and threat detection.",
    icon: <Security sx={featureBoxesSX}/>,
  },
  {
    title: "Cloud Computing Integration",
    desc: "Hands-on labs and simulations using real-world cloud security and architecture.",
    icon: <CloudQueue sx={featureBoxesSX} />,
  },
  {
    title: "Developer-Focused Curriculum",
    desc: "Secure coding practices,and application security tailored for software developers.",
    icon: <Code sx={featureBoxesSX} />,
  },
  {
    title: "Interactive Labs & MCQ Quizzes",
    desc: "Scenario-based learning,and real-time assessments to reinforce critical thinking.",
    icon: <Quiz sx={featureBoxesSX} />,
  },
  {
    title: "Progress Tracking & Analytics",
    desc: "Personalized dashboards for learners and instructors to monitor progress, and skill gaps.",
    icon: <Insights sx={featureBoxesSX} />,
  },
   {
    title: "Personalized Progress Tracking",
    desc: "Personalized dashboards for learners and instructors to monitor progress, and skill gaps.",
    icon: <FlashAuto sx={featureBoxesSX} />,
  },
];

function FeaturesBoxes() {
    const theme=useTheme()
  return (
        
      <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",maxWidth:"100%",justifyContent:"center"}}>
        
      <List sx={{
        display:"grid",
        gridTemplateColumns:"1fr 1fr 1fr",
        width:"90%",
        ml:1,
        mr:1,
        alignItems:"center",justifyContent:"center",gap:3
      }}>
            {features&&features.map((feature)=><ListItem 

            sx={{display:"flex",flexDirection:"column",
           boxShadow:`-3px 3px 3px ${theme.palette.secondary.main}`,
          gap:{
            xs:1,
            sm:1,
            md:2
          },alignItems:"center",margin:1,backgroundColor:theme.palette.primary.dark,borderRadius:4,padding:2,textAlign:"center",
           transition: "all 0.3s ease",
    cursor: "pointer",
    width:"300px",
    height:"200px",
    justifyContent:"center",
    "&:hover": {
      transform: "translateY(-4px) scale(1.02)",
      boxShadow: `-3px 3px 3px rgb(234, 145, 44)`,
    },
          }}>
               {feature.icon}
                <Typography variant='h6' fontWeight={600} sx={{
                  fontStyle:"italic",
                  opacity:1,
                     background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    "&:hover": {
                        opacity:1
    },
                    }}>
                 {feature.title}
              </Typography>
              {/* <Typography variant='caption' fontWeight={600} sx={{display:{xs:"none",md:"block"}}}>
                 {feature.desc}
              </Typography> */}
             </ListItem>)}
        </List>
      </Box>
  )
}

export default FeaturesBoxes
