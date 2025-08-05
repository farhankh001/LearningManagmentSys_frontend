import '@fontsource/orbitron/400.css';
import '@fontsource/orbitron/800.css';
import '@fontsource/roboto-slab/400.css';

import {
  Box,
  Typography,
  Button,
  useTheme,
  alpha,
  keyframes,
} from "@mui/material";

import Lottie from "lottie-react";

import lmsHeroAnimation from "../../assets/Animation - 1748602807457.json";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const radarSweep = keyframes`
  0% {
    left: -50%;
  }
  100% {
    left: 100%;
  }
`;

const FeatureBox = ({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        background: alpha(theme.palette.info.light, 0.07),
        border: "1px solid",
        borderColor: theme.palette.divider,
        p: 3,
        borderRadius: 4,
        boxShadow: `0 0 12px rgba(0, 200, 255, 0.15)`,
        textAlign: "center",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: `0 0 24px rgba(0, 200, 255, 0.25)`,
        },
      }}
    >
      <Typography
        variant="caption"
        fontWeight={900}
        sx={{
          mb: 0.5,
          color: theme.palette.info.main,
          textShadow: `0 0 6px rgba(0, 200, 255, 0.94)`,
        }}
      >
        [ 0{number} ]
      </Typography>
      <Typography
        fontSize="1.1rem"
        fontWeight={700}
        fontFamily="orbitron"
        sx={{ color: theme.palette.text.primary }}
      >
        {title}
      </Typography>
      <Typography
        fontSize="0.9rem"
        fontFamily="orbitron"
        sx={{
          mt: 1,
          color: theme.palette.text.secondary,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

const HeroSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: { xs: 2, sm: 2 },
        px: { xs: 2, sm: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        maxHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Animation */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "80%",
          height: "100%",
          zIndex: -1,
          opacity: 0.4,
        }}
      >
        <Lottie
          animationData={lmsHeroAnimation}
          loop
          autoplay
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      {/* Headings */}
      <Box sx={{ textAlign: "center" }}>
        <Typography
          fontWeight={900}
          sx={{
            fontFamily: "orbitron",
            fontSize: {
              xs: "1.6rem",
              sm: "2rem",
              md: "2.6rem",
              lg: "3.6rem",
            },
            lineHeight: 1.2,
            textShadow: `0 0 12px rgba(0,200,255,0.5), 0 0 20px rgba(0,200,255,0.4)`,
          }}
        >
          Welcome to{" "}
          <Box component="span" sx={{ color: theme.palette.info.light }}>
            LMS Hub
          </Box>
        </Typography>

        <Typography
          fontWeight={600}
          fontFamily="orbitron"
          sx={{
            fontSize: {
              xs: "1.4rem",
              sm: "1.8rem",
              md: "2.4rem",
              lg: "3rem",
            },
            mt: 1,
            letterSpacing: 1.2,
            color: theme.palette.primary.contrastText,
            textShadow: `0 0 10px rgba(0,200,255,0.5), 0 0 20px rgba(0,200,255,0.4)`,
          }}
        >
          <Typewriter
            words={[
              "Master cybersecurity with hands-on, real simulations",
              "Crack certification with expert-led prep courses",
              "Learn ethical hacking anytime, at your own pace",
              "Earn globally recognized certifications",
              "Build skills for high-demand security roles",
            ]}


            loop={0}
            cursor
            cursorStyle="|"
            cursorColor="#00e0ff"
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={2500}
          />
        </Typography>
      </Box>

      {/* Subheading Description */}
      <Box sx={{ width: "80%", mt: 2 }}>
        <Typography
          component="div"
          sx={{
            textAlign: "center",
            fontFamily: "roboto-slab",
            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
            fontWeight: 400,
            lineHeight: 1.75,
            color: "#ddd",
          }}
        >
          <Box
            component="span"
            sx={{
              color: "#fff",
              fontWeight: 700,
              textShadow: `0 0 6px rgba(0, 200, 255, 0.5)`,
            }}
          >
            Empowering learners
          </Box>{" "}
          with top-tier courses, real-world projects, and guidance from{" "}
          <Box
            component="span"
            sx={{
              color: theme.palette.info.light,
              fontWeight: 700,
              fontStyle: "italic",
            }}
          >
            expert mentors
          </Box>{" "}
          to help you achieve your academic and professional goals.
        </Typography>
      </Box>

      {/* CTA Button */}
      <Button
        component={Link}
        to="/register"
        variant="contained"
        size="large"
        sx={{
          mt: 3,
          px: 2.5,
          py: 1.2,
          borderRadius: 8,
          fontWeight: 600,
          fontSize: { xs: "0.95rem", sm: "1.05rem" },
          background: (theme) => alpha(theme.palette.info.light, 0.2),
          border: "2px solid",
          borderColor: theme.palette.divider,
          color: "info.light",
          position: "relative",
          overflow: "hidden",
          textTransform: "uppercase",
          letterSpacing: 1.2,

          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-50%",
            height: "100%",
            width: "1%",
            background: (theme) => alpha(theme.palette.info.light, 0.1),
            animation: `${radarSweep} 2.5s linear infinite`,
            pointerEvents: "none",
          },
        }}
      >
        <Box
          component="span"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 700,
          }}
        >
          Register Now
        </Box>
      </Button>

      {/* Feature Boxes */}
      <Box sx={{ width: { xs: "90%", md: "70%" }, mt: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr",
              },
              gap: 3,
              width: "100%",
              maxWidth: "1000px",
              px: { xs: 2, md: 0 },
            }}
          >
            <FeatureBox
              number={1}
              title="Expert Instructors"
              description="Learn from seasoned cybersecurity professionals with real-world experience."
            />
            <FeatureBox
              number={2}
              title="Hands-on Projects"
              description="Gain practical skills through realistic, scenario-based security labs."
            />
            <FeatureBox
              number={3}
              title="Career-Ready Skills"
              description="Build competencies aligned with top cybersecurity job roles and certifications."
            />

          </Box>
        </Box>
      </Box>

      {/* University Logos Section */}

    </Box>
  );
};

export default HeroSection;
