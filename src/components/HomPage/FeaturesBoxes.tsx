import { Gavel, CheckCircle, Security, CloudQueue, Code, Insights, Quiz } from '@mui/icons-material'
import { Box, Typography, List, ListItem, useTheme,Button } from '@mui/material'
import React from 'react'
const features = [
  {
    title: "Advanced Cybersecurity Training",
    desc: "In-depth courses covering network security, ethical hacking, and threat detection.",
    icon: <Security/>,
  },
  {
    title: "Cloud Computing Integration",
    desc: "Hands-on labs and simulations using real-world cloud security and architecture.",
    icon: <CloudQueue/>,
  },
  {
    title: "Developer-Focused Curriculum",
    desc: "Secure coding practices,and application security tailored for software developers.",
    icon: <Code />,
  },
  {
    title: "Interactive Labs & MCQ Quizzes",
    desc: "Scenario-based learning,and real-time assessments to reinforce critical thinking.",
    icon: <Quiz />,
  },
  {
    title: "Progress Tracking & Analytics",
    desc: "Personalized dashboards for learners and instructors to monitor progress, and skill gaps.",
    icon: <Insights />,
  },
];

function FeaturesBoxes() {
    const theme=useTheme()
  return (
        
      <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",maxWidth:"100%"}}>
        
      <List sx={{
        display:"flex",
        flexDirection:{
            xs:"column",
            md:"row"
        },
        ml:1,
        mr:1,
      }}>
            {features&&features.map((feature)=><ListItem 

            sx={{display:"flex",flexDirection:"column",
           boxShadow:`-3px 3px 3px ${theme.palette.secondary.main}`,
          gap:{
            xs:1,
            sm:1,
            md:2
          },alignItems:"center",margin:1,backgroundColor:theme.palette.background.paper,borderRadius:4,padding:2,textAlign:"center",
           transition: "all 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-4px) scale(1.02)",
      boxShadow: `-3px 3px 3px ${theme.palette.primary.main}`,
    },
          }}>
               {feature.icon}
                <Typography variant='body1' fontWeight={600} sx={{
                     background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",}}>
                 {feature.title}
              </Typography>
              <Typography variant='caption' fontWeight={600} sx={{display:{xs:"none",md:"block"}}}>
                 {feature.desc}
              </Typography>
             </ListItem>)}
        </List>
      </Box>
  )
}

export default FeaturesBoxes
