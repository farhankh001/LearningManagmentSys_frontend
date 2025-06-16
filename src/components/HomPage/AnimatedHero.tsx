import React from "react";
import { Box, Typography, Button, Container, Stack, Avatar, useTheme } from "@mui/material";
import Lottie from "lottie-react";
import heroAnimation from "../../assets/Animation - 1748602807457.json";
import { Link } from "react-router-dom";
import { LogoCarousel} from "./Cr";
import { Security } from "@mui/icons-material";
 const avatarUrls = [
    "/images/avatars/4.jpg",
    "/images/avatars/2.jpg",
    "/images/avatars/3.jpg",
  ];
const HeroSection = () => {
  const theme=useTheme()
  return(
  <Box sx={{ position: "relative", height: {
    xs:"100vh",md:"95vh",lg:"85vh"
  }, overflow: "hidden", bgcolor: "background.default",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center" }}>
    
    {/* Background animation */}
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    >
      <Lottie
        animationData={heroAnimation}
        loop
        autoplay
        style={{
          width: "100%",
          height: "100%",
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
      <Typography variant="h2" fontWeight={700} sx={{mb: 4 ,mt:1,   fontSize: { xs: '2.7rem',md:"3rem",lg:"3.5rem"}, }}>
        <Security sx={{fontWeight:600,fontSize:45,}}/> <br/>
        Boost your Learning <br />
        <Box component="span" sx={{ color: "primary.main"}}>
          Start your Journey <Box component="span" sx={{
 
        background: "linear-gradient(to right,rgb(234, 196, 44),rgb(255, 55, 0))",
         WebkitBackgroundClip: "text",
       WebkitTextFillColor: "transparent",
       display: "inline-block",
          }}>With Us</Box>
        </Box>
      </Typography>

      {/* Subtext */}
      <Typography variant="h6" fontWeight={600} sx={{ maxWidth: 600, mb: 4}}>

        Take an online course to improve your skills in a different way. You can set your own study time according to your learning speed. Get ahead at your own pace.
      </Typography>
       <Stack direction="row" alignItems="center" spacing={1} sx={{mb:3}}>
      <Box sx={{ display: "flex" }}>
        {avatarUrls.map((src, index) => (
          <Avatar
            key={index}
            alt={`Customer ${index + 1}`}
            src={src}
            sx={{
              width: 32,
              height: 32,
              border: "2px solid #fff",
              ml: index === 0 ? 0 : -1.5,
              zIndex: avatarUrls.length - index, // ensures left-to-right layering
            }}
          />
        ))}
      </Box>
      <Typography fontWeight={600}>160+ Happy Learners</Typography>
    </Stack>
      {/* Action Buttons */}
      <Box sx={{pt:4,pb:4}}>
        <LogoCarousel/>
      </Box>
      <Stack direction="row" spacing={2} sx={{margin:2}}>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/register"
        >
          Get Started
        </Button>
        <Button
          variant="outlined"
          size="large"
          component={Link}
          to="/"
        >
          Watch Demo
        </Button>
      </Stack>
    </Box>
  </Box>
)};

export default HeroSection;
