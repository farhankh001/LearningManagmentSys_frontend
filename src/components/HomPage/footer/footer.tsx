import { FC } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import FooterSocialLinks from './footer-social-links'
import FooterNavigation from './footer-navigation'
import { useTheme } from '@emotion/react'


const Footer: FC = () => {
  const theme = useTheme()
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.default",
        py: { xs: 6, md: 10 },
        color: 'primary.contrastText',
        width: "100%"
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          {/* Left Column */}
          <Box sx={{ width: { xs: '100%', md: 360 } }}>
            <Typography component="h2" variant="h2" sx={{ mb: 2 }}>
              CyberRange
            </Typography>
            <Typography variant="subtitle1" sx={{ letterSpacing: 1, mb: 2 }}>
              Cyber Range is an online learning platform that has been operating since 2025 until now.
            </Typography>
            <FooterSocialLinks />
          </Box>

          {/* Right Column */}
          <Box sx={{ flex: 1 }}>
            <FooterNavigation />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
