import { Build, Code, MilitaryTech, NetworkCell, Security, SecurityOutlined, SecurityTwoTone, SecurityUpdateGoodOutlined, SettingsApplications } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { FaHackerNews, FaRobot } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const LogoCarousel = () => {
  const logos = [
  // Tech Development
 {
  text: "Frontend Development",
  logo:<Code/>
 },

   {
  text: "DevOps",
  logo:<MilitaryTech/>
 },
   {
  text: "AI/ML Development",
  logo:<FaRobot/>
 },
  {
  text: "Software Architecture",
  logo:<Build/>
 },
 {
 text:  "Network Security",
  logo:<FaHackerNews/>
 },
 {
 text:  "Application Security",
  logo:<SettingsApplications/>
 },
 {
 text:  "Cloud Security",
  logo:<Security/>
 },
  {
 text:  "EndPoint Security",
  logo:<Security/>
 },
  {
 text:  "Security Operations",
  logo:<Security/>
 },
   {
 text:  "Penetration Testing",
  logo:<Security/>
 },
 
];

  return (
    <Carousel
      autoPlay
      infiniteLoop
      interval={2000}
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      showIndicators={false}
      centerMode
      centerSlidePercentage={20}
    >
      {logos.map((data, index) => (
        <Box key={index}>
         <Typography variant="h6" fontWeight={900} sx={{opacity:0.3,alignItems:"center",justifyContent:"center",display:"flex",gap:1}} >
          {data.logo}
          {data.text}
          </Typography>
        </Box>
      ))}
    </Carousel>
  );
};
