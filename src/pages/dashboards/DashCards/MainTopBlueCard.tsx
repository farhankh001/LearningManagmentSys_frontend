import { ArrowForward } from '@mui/icons-material'
import { Box, Typography,Button} from '@mui/material'
import Lottie from 'lottie-react'
import React from 'react'

import heroAnimation from "../../../assets/snowfall.json"


function MainTopBlueCard() {
  return (
    <Box>
         <Box
            sx={{     position: "absolute",
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
                        color:"white"
                      }}
                    />
                  </Box>
              {/* Stars / sparkle effect - optional pseudo background */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "radial-gradient(ellipse at 20% 40%, rgba(0, 69, 107, 0.43) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(255, 255, 255, 0.57) 0%, transparent 60%)",
                  opacity: 1,
                  zIndex: 0,
                }}
              />
        
              {/* Content */}
              <Typography
                variant="caption"
                sx={{ textTransform: "uppercase", letterSpacing: 1, zIndex: 1, position: "relative" }}
              >
                Online Course
              </Typography>
              <Typography
                variant="h5"
                fontWeight={600}
                sx={{ mt: 1, mb: 3, zIndex: 1, position: "relative" }}
              >
                Sharpen Your Skills with <br />
                Professional Online Courses
              </Typography>
              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  textTransform: "none",
                  borderRadius: "999px",
                  paddingX: 3,
                  paddingY: 1,
                  zIndex: 1,
                  position: "relative",
                  "&:hover": {
                    backgroundColor: "#111",
                  },
                }}
              >
                Join Now
              </Button>
    </Box>
  )
}

export default MainTopBlueCard
