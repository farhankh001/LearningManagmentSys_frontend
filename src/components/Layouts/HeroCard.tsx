import { Image } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Link } from 'react-router-dom';

interface HeroCardProps{
    textBeforeColor:string;
    colorText:string;
    textAfterColor:string;
    subTitle?:string;
    description?:string;
    imageUrl?:string;
    showImage?:boolean
    showButtons?:true,
    buttonsTo?:{}[]
}

// ...existing imports...

function HeroCard({textBeforeColor, colorText, textAfterColor, imageUrl, showButtons, showImage}: HeroCardProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isXMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.down('lg'));
  
    return (
      <Box sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: "center",
        gap: { md: 4, lg: 6 }, // Add space between components
        px: { xs: 2, sm: 4, md: 6, lg: 8 }, // Add horizontal padding
        py: { xs: 4, sm: 6, md: 8 }, // Add vertical padding
      }}>
        {/* Text Content */}
        <Box sx={{
          display: 'flex',
          flexDirection: "column",
          width: { xs: "100%", md: "45%" }, // Adjusted width
          height: { md: "400px" }, // Fixed height for larger screens
          justifyContent: "center",
          alignItems: { xs: "center", md: "flex-start" },
          textAlign: { xs: "center", md: "left" },
        }}>
          <Box>
            <Typography
              variant={ 'h3'}
              fontWeight={800}
              color="text.primary"
              sx={{
                textShadow: '2px 2px 4px rgba(27, 20, 20, 0.5)',
                mb: 1
              }}
            >
              {textBeforeColor}
            </Typography>
            <Typography
              variant={ 'h3'}
              fontWeight={800}
              color="#4F43F7"
              sx={{
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                mb: 1
              }}
            >
              {colorText}
            </Typography>
            <Typography
              variant={ 'h3'}
              fontWeight={800}
              color="text.primary"
              sx={{
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                mb: 3
              }}
            >
              {textAfterColor}
            </Typography>
          </Box>
  
          <Button 
            component={Link} 
            to="/register" 
            size='small'
            variant='outlined'
            sx={{
              mt: 2,
              px: 2,
              py: 1,
              fontSize: '1rem'
            }}
          >
            Register for free
          </Button>
        </Box>
  
        {/* Image Content */}
        {showImage && imageUrl && !isMobile && (
          <Box sx={{
            width: { md: "45%" }, // Adjusted width
            height: { md: "400px" }, // Fixed height for larger screens
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}>
            <CardMedia
              component="img"
              image={imageUrl}
              alt="Hero"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                transform: "scale(0.9)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(0.95)"
                }
              }}
            />
          </Box>
        )}
      </Box>
    );
  }
  
  export default HeroCard;