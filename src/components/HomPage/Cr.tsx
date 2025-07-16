import { Box, Typography, useTheme } from "@mui/material";
import { Code, MilitaryTech, Build, Security, SettingsApplications } from "@mui/icons-material";
import { FaRobot } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const LogoCarousel = () => {
  const logoProp = { fontSize: 30 };

  const logos = [
    { text: "Frontend Development", logo: <Code sx={logoProp} /> },
    { text: "DevOperations", logo: <MilitaryTech sx={logoProp} /> },
    { text: "AI/ML Development", logo: <FaRobot /> },
    { text: "Software Architecture", logo: <Build sx={logoProp} /> },
    { text: "Network Security", logo: <Security sx={logoProp} /> },
    { text: "Application Security", logo: <SettingsApplications sx={logoProp} /> },
    { text: "Cloud Security", logo: <Security sx={logoProp} /> },
    { text: "EndPoint Security", logo: <Security sx={logoProp} /> },
    { text: "Security Operations", logo: <Security sx={logoProp} /> },
    { text: "Penetration Testing", logo: <Security sx={logoProp} /> },
  ];
  const theme=useTheme()

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden", // Hide overflow explicitly
        "& .carousel-root": {
          width: "100%", // Ensures the carousel itself respects bounds
        },
        "& .carousel-slider": {
          overflow: "hidden", // Prevents children from leaking
        },
      }}
    >
      <Carousel
        autoPlay
        infiniteLoop
        interval={2000}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        showIndicators={false}
        centerMode
        centerSlidePercentage={20} // You can reduce to 15 if it still overflows
        swipeable
        emulateTouch
      >
        {logos.map((data, index) => (
          <Box key={index} sx={{ px: 1 }}>
            <Typography
              variant="h4"
              fontWeight={500}
              sx={{
                opacity: 1,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                gap: 1,
                fontStyle: "italic",
                width: "100%",
                color:theme.palette.text.primary
              }}
            >
              {data.logo}
              {data.text}
            </Typography>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};
