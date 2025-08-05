
import {
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  Box,
  alpha,
  Typography,
  CardMedia,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import NavBarOptions from "./NavBarOptions";
import { Brightness4Outlined, Cancel, Circle, LightModeTwoTone, Logout, Menu } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";

interface NavProps {
  darkMode: boolean;
  setDarkMode: (preState: boolean) => void;
}

const drawerWidth = 250;

const NavBar: React.FC<NavProps> = ({ darkMode, setDarkMode }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [openMenu, setOpenMenu] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Drawer
        variant={isLargeScreen ? "permanent" : "temporary"}
        open={isLargeScreen || openMenu}
        onClose={() => setOpenMenu(false)}
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: alpha(theme.palette.primary.dark, 0.75),
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        {/* Only show toggle on mobile */}
        {!isLargeScreen && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
            <IconButton onClick={() => setOpenMenu(false)}>
              <Cancel />
            </IconButton>
          </Box>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column", height: "100%" }}>
          <NavBarOptions openMenu={openMenu} setOpenMenu={setOpenMenu} />
          <Box sx={{ display: "flex", flexDirection: 'column', mb: 3 }}>
            <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: "center", gap: 1.5, background: "linear-gradient(135deg,rgba(184, 176, 255, 1) 0%,rgba(40, 40, 228, 1) 100%)", m: 2, py: 1.5, px: 1, border: "0px solid", borderColor: theme.palette.divider, borderRadius: 3 }}>

              <Box> <Typography fontWeight={500} variant="body1">Powered by</Typography>
                <Typography fontWeight={500} variant="caption">Learning Managment System</Typography></Box>
              <CardMedia component="img" src="/Zettabyte.png" sx={{ width: "140px" }} />

            </Box>
            <Box sx={{ px: 2 }}>
              <Box sx={{ display: "flex", gap: 1.4, background: alpha(theme.palette.background.paper, 0.4), border: "1px solid", borderColor: theme.palette.divider, p: 2, borderRadius: 3 }}>
                <Avatar />
                <Box>
                  <Typography variant="body2" fontWeight={500} sx={{ fontSize: "0.8rem", display: "flex", gap: 1.5, alignItems: 'center' }}><Circle sx={{
                    fontSize: 6,
                    color: theme.palette.success.light,
                    boxShadow: `0 0 6px 2px ${theme.palette.success.light}`,
                    borderRadius: '50%',
                    background: theme.palette.success.light
                  }} /><span>{user?.name}</span></Typography>
                  <Typography variant="body2" fontWeight={500} sx={{ fontSize: "0.8rem" }}>{user?.email} </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ px: 2 }}>
              <Box sx={{ display: "flex", alignItems: 'center', justifyContent: "space-between", p: 1, background: alpha(theme.palette.background.paper, 0.4), border: "1px solid", borderRadius: 2, borderColor: theme.palette.divider, mt: 2 }}>
                <IconButton onClick={() => setDarkMode(!darkMode)} >
                  {darkMode ? <LightModeTwoTone /> : <Brightness4Outlined />}
                </IconButton>
                <Box component={Link} to={"/logout"} >
                  <Logout sx={{ color: theme.palette.error.light }} />
                </Box>
              </Box>
            </Box>
          </Box>

        </Box>




      </Drawer>

      {/* Menu toggle only visible on mobile screens */}
      {!isLargeScreen && (
        <IconButton
          onClick={() => setOpenMenu(true)}
          sx={{
            position: "fixed",
            top: 10,
            left: 10,
            zIndex: theme.zIndex.drawer + 2,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Menu />
        </IconButton>
      )}
    </>
  );
};

export default NavBar;
