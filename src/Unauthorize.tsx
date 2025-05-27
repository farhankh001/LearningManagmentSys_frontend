// Unauthorized.tsx
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Unauthorized = () => (
  <Box sx={{ padding: {
      xs:2,lg:20
  }, textAlign: "center" }}>
    <Typography variant="h5">Unauthorized Access</Typography>
    <Typography variant="h5">You do not have permission to view this page.</Typography>
    <Button component={Link} to={"/"} variant="contained">Go to Home Page</Button>
  </Box>
);

export default Unauthorized;
