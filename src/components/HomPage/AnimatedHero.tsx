import { Box, Typography, useTheme } from "@mui/material";
import Lottie from "lottie-react";

import rocket from "../../assets/space.json"
// import herodown from "../../assets/latest_robo.json"
import { Link } from "react-router-dom";
import { CallReceived, } from "@mui/icons-material";
import heroback from "../../assets/Animation - 1750599627470.json"
const HeroSection = () => {
  const theme=useTheme()
  return(
  <Box sx={{ position: "relative", height: {
    xs:"100vh",md:"95vh",lg:"100vh"
  }, overflow: "hidden", bgcolor: "background.default",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center" }}>
    
    {/* Background animation */}
 
 <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    >
      <Lottie
        animationData={heroback}
        loop
        autoplay
        style={{
          width: "80%",
          height: "80%",
          objectFit: "cover",
        }}
      />
     
    </Box>
    {/* Content container */}
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Title */}
      <Typography variant="h1" fontWeight={700} sx={{mb: 4 ,mt:0,   fontSize: { xs: '2.7rem',md:"3rem",lg:"5rem"}, }}>
       
       REFINE
        <Box component="span" fontWeight={700} sx={{ fontStyle:"italic",color:theme.palette.primary.main}}>
         YOUR SKILLS <Box component="span" sx={{
          color:theme.palette.warning.light
 ,fontWeight:100
          }}>WITH US</Box>
        </Box>
      </Typography>
      {/* <Box sx={{width:"100%",display:"flex",gap:3,alignItems:"center",justifyContent:"center",}}>
         <Box sx={{width:"100%"}}>
         <CardMedia
         component="img"
          src='homepics/seco.jpg'
            sx={{width:"100px",height:"100px",border:"1px solid",borderColor:theme.palette.divider,borderTopLeftRadius:"70px",borderBottomRightRadius:"70px",borderTopRightRadius:"7px",borderBottomLeftRadius:1}}
        />
       </Box>
       <Box >
         <CardMedia
         component="img"
          src='homepics/women.jpg'
            sx={{width:"100px",height:"100px",border:"1px solid",borderColor:theme.palette.divider,borderTopLeftRadius:"70px",borderBottomRightRadius:"70px",borderTopRightRadius:"7px",borderBottomLeftRadius:1}}
        />
       </Box>
       
        <Box sx={{background:theme.palette.primary.dark,border:"1px solid",borderColor:theme.palette.divider,borderTopLeftRadius:"70px",borderBottomRightRadius:"70px",borderTopRightRadius:"7px",borderBottomLeftRadius:1}}>
        <Lottie
        animationData={herodown}
        loop
        autoplay
        style={{
          width: "300px",
          height: "300px",
          objectFit: "cover",
        }}
      />
       </Box>
        <Box sx={{}}>
         <CardMedia
         component="img"
            src='homepics/man.jpg'
            sx={{width:"270px",height:"270px",border:"1px solid",borderColor:theme.palette.divider,borderTopLeftRadius:"7px",borderBottomRightRadius:"7px",borderTopRightRadius:"70px",borderBottomLeftRadius:"70px"}}
        />
       </Box>
         <Box >
         <CardMedia
         component="img"
          src='homepics/woem.jpg'
            sx={{width:"210px",height:"210px",border:"1px solid",borderColor:theme.palette.divider,borderTopLeftRadius:"70px",borderBottomRightRadius:"70px",borderTopRightRadius:"7px",borderBottomLeftRadius:1}}
        />
       </Box>
      </Box> */}

       <Box sx={{width:"100%",display:"flex",gap:4,alignItems:"center",justifyContent:"center",mt:4}} >
      
        <Box sx={{display:"flex",flexDirection:"column",width:"23%"}}>
       <Typography variant="h4" fontWeight={700} sx={{fontStyle:"italic"}}>EXPLORE NEW POSIBILITES </Typography>
       <Typography variant="h4" component={Link} to="/register" fontWeight={100} sx={{color:theme.palette.warning.light,textDecoration:"none"}}>START <CallReceived/></Typography>
        </Box>

    <Box sx={{display:"flex",flexDirection:'column',alignItems:'flex-start',width:"30%",padding:4,border:"1px solid",borderColor:theme.palette.divider,borderTopLeftRadius:"7px",borderBottomRightRadius:"7px",borderTopRightRadius:"70px",borderBottomLeftRadius:"70px"}}>
       
           <Typography variant="h5" fontWeight={700} sx={{textAlign:"left",color:theme.palette.primary.main,fontStyle:"italic"}}>
               --ENHANCE YOUR SKILLS 
          </Typography>
          <Typography variant="h6" fontWeight={400} sx={{textAlign:"left",}}>
           WITH BEST AVALIALBE CONTENT, TRAINING AND MENTORS.
          </Typography>
        
        </Box>
  <Box sx={{border:"1px solid",borderColor:theme.palette.divider,borderTopLeftRadius:"7px",borderBottomRightRadius:"7px",borderTopRightRadius:"70px",borderBottomLeftRadius:"70px"}}>
    <Typography variant="h5" fontWeight={700} sx={{textAlign:"left",color:theme.palette.warning.light,fontStyle:"italic"}}>
              --LETS EXPLORE!
          </Typography>
             <Lottie
        animationData={rocket}
        loop
        autoplay
        style={{
          width: "300px",
          height: "120px",
          objectFit: "cover",
        }}
      />
        <Typography variant="h5" fontWeight={700} sx={{textAlign:"right",color:theme.palette.warning.light,fontStyle:"italic"}}>
              TOGETHER--
          </Typography>
        </Box>
       </Box>
     
    </Box>
  </Box>
)};

export default HeroSection;
