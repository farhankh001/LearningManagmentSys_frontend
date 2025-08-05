import '@fontsource/orbitron/400.css';
import '@fontsource/orbitron/800.css';
import '@fontsource/roboto-slab/400.css';
import { Box, Divider, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../app/store";
import { FaBars, FaTimes, FaUserAlt } from "react-icons/fa";
import { AddCircle, AddTaskOutlined, ArrowDropDownCircle, ArrowDropDownCircleOutlined, CastForEducation, Login, Logout, Pending, PendingOutlined, Settings } from "@mui/icons-material";
import { JSX } from "react";

const settingsOptions = [
  {
    name: "Approved Courses",
    path: "/all-enrolled-courses-settings",
    icon: <ArrowDropDownCircle />,
  },
  {
    name: "Enrollments",
    path: "/all-pending-courses-settings",
    icon: <Pending />,
  },
  {
    name: "Enroll",
    path: "/enroll-in-a-course",
    icon: <AddCircle />,
  },
];

const navUnregisteredOptions = [
  {
    name: "Register",
    path: "/register",
    icon: <FaUserAlt />,
  },
  {
    name: "LogIn",
    path: "/login",
    icon: <Login />,
  },
];

type UserRole = "Teacher" | "Student" | "Admin";
const roleBasedNavOptions: Record<UserRole, { name: string; path: string; icon: JSX.Element }[]> = {
  Teacher: [
    {
      name: "Teacher Dash",
      path: "/teacher-dash",
      icon: <Settings />,
    },
    {
      name: "LogOut",
      path: "/logout",
      icon: <Logout />,
    },
  ],
  Student: [
    {
      name: "Student Dash",
      path: "/student-dash",
      icon: <Settings />,
    },
    ...settingsOptions,
  ],
  Admin: [
    {
      name: "Admin Dash",
      path: "/admin-dash",
      icon: <Settings />,
    },
    {
      name: "LogOut",
      path: "/logout",
      icon: <Logout />,
    },
  ],
};

interface NavOptionsProp {
  openMenu: boolean;
  setOpenMenu: (preState: boolean) => void;
}



const NavBarOptions: React.FC<NavOptionsProp> = ({ openMenu, setOpenMenu }) => {
  const userRole = useSelector((state: RootState) => state.auth.user?.role);
  const baseNav =
    userRole && ["Teacher", "Student", "Admin"].includes(userRole)
      ? roleBasedNavOptions[userRole as UserRole]
      : navUnregisteredOptions;

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const location = useLocation();

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>

      {/* Header / Toggle */}
      {isLargeScreen ? (
        <Box sx={{ textAlign: "center", py: 3 }}>
          <Typography variant="h6" fontWeight={600} fontFamily={"orbitron"} sx={{ display: "flex", alignItems: 'center', justifyContent: 'center', gap: 1 }} >

            LMS <Box component={"span"} sx={{ color: theme.palette.success.light }}> HUB</Box>  <Box component={"span"} sx={{ color: theme.palette.success.light }}> <CastForEducation /></Box>
          </Typography>

          <Divider sx={{ mt: 2 }} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <IconButton onClick={() => setOpenMenu(!openMenu)}>
            {openMenu ? <FaTimes /> : <FaBars />}
          </IconButton>
        </Box>
      )}

      {/* Navigation Items */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, px: 2 }} >
        {baseNav.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link to={item.path} key={item.name} style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 2,
                  py: 1.5,
                  borderRadius: 3,
                  cursor: "pointer",
                  backgroundColor: isActive ? theme.palette.background.paper : "transparent",
                  border: isActive ? "1px solid" : "0px solid", borderColor: theme.palette.divider,
                  color: isActive
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                  // "&:hover": {
                  //   backgroundColor: isActive
                  //     ? theme.palette.text.primary
                  //     : theme.palette.action.hover,
                  // },
                }}
              >
                <Box sx={{ display: "flex", alignItems: 'center', gap: 1.5 }}> {item.icon}
                  <Typography
                    sx={{
                      color: "inherit",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {item.name}
                  </Typography></Box>
              </Box>

            </Link>
          );
        })}
      </Box>
    </Box>
  );
};

export default NavBarOptions;
