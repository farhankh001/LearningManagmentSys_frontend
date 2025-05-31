import { Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const LogoCarousel = () => {
  const logos = [
  // Tech Development
  "Frontend Development",
  "Backend Development",
  "Mobile Development",
  "DevOps",
  "Cloud Computing",
  "AI/ML Development",
  "Software Architecture",
  "Game Development",

  // Cybersecurity
  "Network Security",
  "Application Security",
  "Endpoint Security",
  "Cloud Security",
  "Cryptography",
  "IAM",
  "Threat Intelligence",
  "Penetration Testing",
  "Security Operations",
  "Compliance and Governance"
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
      centerSlidePercentage={15}
    >
      {logos.map((src, index) => (
        <div key={index}>
         <Typography variant="h6" fontWeight={900} sx={{opacity:0.3}}>
            {src}
          </Typography>
        </div>
      ))}
    </Carousel>
  );
};
