import { Box, Button, Typography, useTheme } from "@mui/material";

function EmpowerSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "90%",
        bgcolor: theme.palette.background.default,
        color: "white",
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 8 },
        overflow: "hidden",
        // borderTop:"1px solid",borderTopColor:theme.palette.divider,borderBottom:'1px solid',borderBottomColor:theme.palette.divider
      }}
    >
      {/* Left Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pr: { md: 6 },
          zIndex: 2,
        }}
      >
        <Typography variant="h3" fontWeight={800} gutterBottom sx={{ fontStyle: "italic" }}>
          Empower every 
          member <br />
          of your team
        </Typography>

        <Typography variant="subtitle1" fontWeight={700} gutterBottom>
          Discover edX Enterprise Subscriptions
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          Give your employees unlimited access to courses and certificate programs in topics
          like AI, sustainability, and leadership.
        </Typography>

        <Button
          variant="contained"
          sx={{
            bgcolor:theme.palette.warning.light,
            borderRadius: 5,
            px: 3,
            py: 1.5,
            width: "fit-content",
            textTransform: "none",
          }}
        >
          Discover enterprise solutions
        </Button>
      </Box>

      {/* Right Side Image */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          mt: { xs: 4, md: 0 },
          minHeight: { xs: 300, md: "100%" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundImage: `url('homepics/s.jpg')`, 
            backgroundSize: "cover",
            backgroundPosition: "center",
            clipPath: {
              xs: "none",
              md: "polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)",
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default EmpowerSection;
