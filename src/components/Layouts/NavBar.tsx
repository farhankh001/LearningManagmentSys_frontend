import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import NavBarOptions from "./NavBarOptions";
import { School } from "@mui/icons-material";

interface NavProps {
  darkMode: boolean;
  setDarkMode: (preState: boolean) => void;
}

const NavBar: React.FC<NavProps> = ({ darkMode, setDarkMode }) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <Box role="presentation">
        <AppBar position="static" >
          <Toolbar
            sx={{
              backgroundColor: "background.paper",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* Menu Icon */}
            <IconButton onClick={() => setOpenMenu(!openMenu)}>
              {openMenu ? <FaTimes /> : <FaBars />}
            </IconButton>

            {/* Drawer for Navigation Options */}
            <Drawer open={openMenu} onClose={() => setOpenMenu(false)}>
              <NavBarOptions openMenu={openMenu} setOpenMenu={setOpenMenu} />
            </Drawer>

            {/* Title with Icon */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1, // Space between icon and text
              }}
            >
              <School sx={{ color: "text.secondary", fontSize: "1.8rem" }} />
              <Typography
                sx={{ color: "text.secondary", fontWeight: "700" }}
                variant="h6"
              >
                LMS
              </Typography>
            </Box>

            {/* Dark Mode Toggle */}
            <IconButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;