import { createTheme, ThemeOptions } from "@mui/material/styles";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const sharedTypography = {
  fontFamily: [
    'Roboto',
    '-apple-system',
    'BlinkMacSystemFont',
    'Arial',
    'sans-serif',
  ].join(','),
};

export const darkTheme: ThemeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4477CE", //deep teal
      light: "#e1774b", //coral orange
      dark: "#04182e",//bright purple 
      contrastText: "#ffffff"
    },  
    secondary: {
      main: "#3D4141", 
      light: "#090a0d", 
      dark: "#262626",
      contrastText: "#FAFAFA"
    },
    grey:{
      "100":"#0c1217"
    },
    error: {
      main: "#FF3D57",
      light: "#FF667A",
      dark: "#CC3146",
      contrastText: "#ffffff"
    },
    success: {
      main: "#00C853",
      light: "#33D375",
      dark: "#00A042",
      contrastText: "#ffffff"
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)"
    },
    background: {
      default: "#02051f", //very dark gray
      paper: "#222A32", //slightly lighter gary
    
    }
  },
  typography: sharedTypography
});

export const lightTheme: ThemeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0e3639", //deep teal
      light: "#e1774b", //coral orange
      dark: "#528468", //bright purple
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#fafae8",
      light: "#D5C482",
      dark: "#fafacd",
      contrastText: "#ffffff"
    },
    error: {
      main: "#EF4444",
      light: "#F87171",
      dark: "#ada472",
      contrastText: "#ffffff"
    },
    success: {
      main: "#10B981",
      light: "#34D399",
      dark: "#059669",
      contrastText: "#ffffff"
    },
    text: {
      primary: "#111827",
      secondary: "#4B5563",
      disabled: "#9CA3AF"
    },
    background: {
      default: "#fffdf0",
      paper: "#ffffff",
      
    }
  },
  typography: sharedTypography
});