import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
 
  useTheme,
} from "@mui/material";
import { useState } from "react";
import {   FaSun, FaMoon } from "react-icons/fa";
import NavBarOptions from "./NavBarOptions";
import { Cancel, Menu, } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";

const navOptions:any=[]
const navUnregisteredOptions=[
   {
        name:"Register",
        path:"/register",
        
    },
    {
        name:"LogIn",
        path:"/login",
    },
]

type UserRole = 'Teacher' | 'Student' | 'Admin';
const roleBasedNavOptions:Record<UserRole, { name: string; path: string}[]> = {
  Teacher: [
    {
      name: "Teacher Dash",
      path: "/teacher-dash",
     
    },
     {
        name:"LogOut",
        path:"/logout",
       

    }
     
    // Add more teacher-specific nav options here
  ],
  Student: [
    {
      name: "Student Dash",
      path: "/student-dash",
      
    },
     {
        name:"LogOut",
        path:"/logout",
       

    }
    // Add more student-specific nav options here
  ],
  Admin: [
    {
      name: "Admin Dash",
      path: "/admin-dash",
      
    },
     {
        name:"LogOut",
        path:"/logout",
       

    }
    // Add admin-specific options
  ]
};
interface NavProps {
  darkMode: boolean;
  setDarkMode: (preState: boolean) => void;
}

const NavBar: React.FC<NavProps> = ({ darkMode, setDarkMode }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const theme=useTheme()
   const userRole=useSelector((state:RootState)=>state.auth.user?.role)
      const baseNav = [...navOptions];
    if (userRole && ['Teacher', 'Student', 'Admin'].includes(userRole)) {
    baseNav.push(...roleBasedNavOptions[userRole as UserRole]);
  }else{
     baseNav.push(...navUnregisteredOptions);
  }
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "transparent", // Full transparency
        boxShadow: "none",  
                   // Remove shadow
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
          
        }}
      >
        {/* Menu Icon */}
        <IconButton onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? <Cancel sx={{color:theme.palette.text.primary}}/> : <Menu sx={{fontSize:30,color:theme.palette.text.primary}} />}
        </IconButton>

        {/* Drawer for Navigation Options */}
        <Drawer open={openMenu} onClose={() => setOpenMenu(false)}>
          <NavBarOptions openMenu={openMenu} setOpenMenu={setOpenMenu} />
          <IconButton onClick={() => setDarkMode(!darkMode)} sx={{width:"50px",height:"50px"}}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </IconButton>
        </Drawer>
        {/* <Box>
          <Typography variant="h6" fontWeight={600} sx={{textAlign:"center"}}>Cyber Range Learning Managment System </Typography>
        </Box> */}
      <Box>
        {baseNav&&baseNav.map((navopt=><Button component={Link} to={navopt.path} sx={
          {color:theme.palette.warning.light}
        }>
          {
            navopt.name
          }
        </Button>))}
      </Box>
        
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
