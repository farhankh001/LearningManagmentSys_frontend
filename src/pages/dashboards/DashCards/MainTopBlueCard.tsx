import { ArrowForward } from '@mui/icons-material'
import { Box, Typography,Button} from '@mui/material'

function MainTopBlueCard() {
  return (
    <Box sx={{ display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"center",gap:0.7}}>
        
              {/* Content */}
              <Typography
                variant="caption"
                sx={{ textTransform: "uppercase"}}
              >
                Sharpen Your Skills with
              </Typography>
              <Typography
                variant="h5"
                fontWeight={600}
               
              >
               
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
                  paddingX: 2,
                  paddingY: 0.7,
                  zIndex: 1,
                  position: "relative",
                  "&:hover": {
                    backgroundColor: "#111",
                  },
                }}
              >
                Enroll Now
              </Button>
    </Box>
  )
}

export default MainTopBlueCard
