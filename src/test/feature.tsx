import React, { FC } from 'react'
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { data } from './feature.data'
import { CardMedia } from '@mui/material'
import Lottie from 'lottie-react'
import heroAnimation from "../assets/Animation - 1750249071716.json";
import { Security } from '@mui/icons-material'
interface LinearProgressProps {
  order: number
}

export const BorderLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== 'color',
})<LinearProgressProps>(({ theme, order }) => ({
  height: 6.5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    ...(order === 1 && {
      backgroundColor: '#ffcc40',
    }),
    ...(order === 2 && {
      backgroundColor: '#5bfccc',
    }),
    ...(order === 3 && {
      backgroundColor: '#f36dfc',
    }),
     ...(order === 4 && {
      backgroundColor: '#ded63a',
    }),
     ...(order === 5 && {
      backgroundColor: '#34ad77',
    }),
   
  },
}))

const HomeFeature: FC = () => {
  const theme=useTheme()
  return (
    <Box id="feature" sx={{ py: { xs: 10, md: 14 }, backgroundColor: 'background.default' }}>
      <Container>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
            gap: 3,
          }}
        >
          {/* Left Section - Image and Overlay */}
          <Box sx={{ position: 'relative' }}>
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

            {/* Top Right Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: -36,
                right: { xs: 0, md: -36 },
                boxShadow: 2,
                borderRadius: 1,
                px: 2.2,
                py: 1.4,
                zIndex: 1,
                backgroundColor: 'background.default',
                width: 190,
              }}
            >
              <Typography variant="h5" sx={{ mb: 1 }}>
                <Security sx={{fontSize:30,opacity:0.5}}/>
              </Typography>

              {[
                { label: 'Pen Testing', value: 90, order: 1 },
                { label: 'Cryptography', value: 95, order: 2 },
                { label: 'Cloud Security', value: 80, order: 3 },
              ].map(({ label, value, order }) => (
                <Box key={label} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    {label}
                  </Typography>
                  <BorderLinearProgress variant="determinate" value={value} order={order} />
                </Box>
              ))}
            </Box>

            {/* Bottom Left Circular Overlay */}
            <Box
              sx={{
                position: 'absolute',
                bottom: -12,
                left: { xs: 0, md: -24 },
                boxShadow: 2,
                borderRadius: 1,
                px: 2.2,
                py: 2,
                zIndex: 1,
                backgroundColor: 'background.default',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography sx={{ fontWeight: 600, lineHeight: 1 }}>Cyber Security</Typography>
                <Typography variant="subtitle1" sx={{ mb: 1, color: 'text.disabled' }}>
                  Learning Progress
                </Typography>
                <Box
                  sx={{
                    height: 85,
                    width: 85,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="h4" sx={{ color: '#32dc88' }}>
                    99%
                  </Typography>
                  <CircularProgress
                    sx={{ position: 'absolute', color: 'divider' }}
                    thickness={2}
                    variant="determinate"
                    value={90}
                    size={99}
                  />
                  <CircularProgress
                    disableShrink
                    thickness={2}
                    variant="determinate"
                    value={90}
                    size={85}
                    sx={{ transform: 'rotate(96deg) !important', color: '#32dc88', position: 'absolute' }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right Section - Text and Features */}
          <Box>
            <Typography
              component="h2"
              sx={{
                position: 'relative',
                fontSize: { xs: 40, md: 50 },
                ml: { xs: 0, md: 4 },
                mt: 2,
                mb: 3,
                lineHeight: 1,
                fontWeight: 'bold',
              }}
            >
              Celebrate your{' '}
              <Typography
                component="mark"
                sx={{
                  position: 'relative',
                  color: 'primary.main',
                  fontSize: 'inherit',
                  fontWeight: 'inherit',
                  backgroundColor: 'unset',
                }}
              >
                Achievements<br />
                
              </Typography>
              Grow With Us
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 2, ml: { xs: 0, md: 4 } }}>
              Set the way of learning according to your wishes with some of the benefits that you get us, so you on
              enjoy the lessons that we provide.
            </Typography>

            <Box
              sx={{
               
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 2,
                ml: { xs: 0, md: 2 },
      
              }}
            >
              {data.map(({ title, description, icon }, index) => (
                <Box
                  key={String(index)}
                  sx={{ 
                boxShadow:`-3px 3px 3px ${theme.palette.secondary.main}`,
                px: 2,
                py: 1.5,
                display: 'flex',
                alignItems: 'center',
                backgroundColor:theme.palette.background.paper,borderRadius:4,padding:2,textAlign:"center",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                transform: "translateY(-4px) scale(1.02)",
                boxShadow: `-3px 3px 3px ${theme.palette.primary.main}`,
    },
                  }}
                >
                  <Box
                    sx={{
                      mr: 1,
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: '50%',
                      height: 36,
                      width: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'primary.contrastText',
                      '& svg': {
                        fontSize: 20,
                      },
                    }}
                  >
                    {icon}
                  </Box>
                  <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                    <Typography variant="h5" sx={{ fontSize: '1rem', mb: 1, color: 'primary.main' }} fontWeight={900}>
                      {title}
                    </Typography>
                    <Typography sx={{ lineHeight: 1.3, color: 'text.secondary',fontSize:"0.9rem" }} variant="caption">
                      {description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default HomeFeature
