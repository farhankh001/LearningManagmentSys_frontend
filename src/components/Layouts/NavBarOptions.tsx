import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { FaBars, FaTimes, FaUserAlt } from "react-icons/fa"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { RootState } from "../../app/store";
import { JSX } from "react";
import { Home, Login, Logout, Settings } from "@mui/icons-material";

const navOptions=[
    {
        name:"Home",
        path:"/",
        icon:<Home/>
    }, 

   

]
const navUnregisteredOptions=[
   {
        name:"Register",
        path:"/register",
        icon:<FaUserAlt/>
    },
    {
        name:"LogIn",
        path:"/login",
        icon:<Login/>
    },
]

type UserRole = 'Teacher' | 'Student' | 'Admin';
const roleBasedNavOptions:Record<UserRole, { name: string; path: string; icon: JSX.Element }[]> = {
  Teacher: [
    {
      name: "Teacher Dash",
      path: "/teacher-dash",
      icon: <Settings />
    },
     {
        name:"LogOut",
        path:"/logout",
        icon:<Logout/>

    }
     
    // Add more teacher-specific nav options here
  ],
  Student: [
    {
      name: "Student Dash",
      path: "/student-dash",
      icon: <Settings />
    },
     {
        name:"LogOut",
        path:"/logout",
        icon:<Logout/>

    }
    // Add more student-specific nav options here
  ],
  Admin: [
    {
      name: "Admin Dash",
      path: "/admin-dash",
      icon: <Settings />
    },
     {
        name:"LogOut",
        path:"/logout",
        icon:<Logout/>

    }
    // Add admin-specific options
  ]
};

interface NavOptionsProp{
    openMenu:boolean;
    setOpenMenu:(preState:boolean)=>void;
}

const NavBarOptions:React.FC<NavOptionsProp> = ({openMenu,setOpenMenu}) => {
    const userRole=useSelector((state:RootState)=>state.auth.user?.role)
    const baseNav = [...navOptions];
  if (userRole && ['Teacher', 'Student', 'Admin'].includes(userRole)) {
  baseNav.push(...roleBasedNavOptions[userRole as UserRole]);
}else{
   baseNav.push(...navUnregisteredOptions);
}
  return (
    <List 
    subheader={
       <ListSubheader  sx={{width:200,padding:0}}>
        <IconButton onClick={()=>setOpenMenu(!openMenu)} >
            {openMenu?<FaTimes/>:<FaBars/>}
        </IconButton>
       </ListSubheader>
    }
    >
      {baseNav && baseNav.map((item)=>(
        <Box  key={item.name}>
        <ListItem disablePadding>
        <ListItemButton  component={Link} to={item.path}>
            <ListItemIcon >
                {item.icon}
            </ListItemIcon>
            <ListItemText >
                {item.name}
            </ListItemText>
      </ListItemButton>
      </ListItem>
      <Divider/>
      </Box>
      ))}
    </List>
  )
}

export default NavBarOptions
