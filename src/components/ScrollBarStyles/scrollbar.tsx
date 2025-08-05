import { alpha, useTheme } from "@mui/material";
const theme = useTheme()
export const customScrollbarStyles = {
    // For webkit browsers (Chrome, Safari, Edge)
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: alpha(theme.palette.background.paper, 0.1),
        borderRadius: '4px',
        margin: '2px',
    },
    '&::-webkit-scrollbar-thumb': {
        background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.6)}, ${alpha(theme.palette.primary.light, 0.8)})`,
        borderRadius: '4px',
        border: '1px solid transparent',
        backgroundClip: 'padding-box',
        boxShadow: `inset 0 0 3px ${alpha(theme.palette.primary.main, 0.3)}`,
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.8)}, ${theme.palette.primary.light})`,
        boxShadow: `inset 0 0 6px ${alpha(theme.palette.primary.main, 0.5)}, 0 0 4px ${alpha(theme.palette.primary.light, 0.4)}`,
    },
    '&::-webkit-scrollbar-thumb:active': {
        background: theme.palette.primary.main,
    },
    '&::-webkit-scrollbar-corner': {
        background: 'transparent',
    },
    // For Firefox
    scrollbarWidth: 'thin',
    scrollbarColor: `${alpha(theme.palette.primary.main, 0.6)} ${alpha(theme.palette.background.paper, 0.1)}`,
};

// Alternative scrollbar designs (choose one)

// Minimal Design
const minimalScrollbar = {
    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        background: alpha(theme.palette.text.secondary, 0.3),
        borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: alpha(theme.palette.text.secondary, 0.5),
    },
    scrollbarWidth: 'thin',
    scrollbarColor: `${alpha(theme.palette.text.secondary, 0.3)} transparent`,
};

// Neon Glow Design
const neonScrollbar = {
    '&::-webkit-scrollbar': {
        width: '10px',
    },
    '&::-webkit-scrollbar-track': {
        background: alpha(theme.palette.background.paper, 0.1),
        borderRadius: '5px',
        boxShadow: 'inset 0 0 5px rgba(0,0,0,0.2)',
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.primary.main,
        borderRadius: '5px',
        boxShadow: `0 0 10px ${theme.palette.primary.main}, inset 0 0 3px rgba(255,255,255,0.1)`,
        border: '1px solid rgba(255,255,255,0.1)',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: theme.palette.primary.light,
        boxShadow: `0 0 15px ${theme.palette.primary.light}, inset 0 0 5px rgba(255,255,255,0.2)`,
    },
    scrollbarWidth: 'auto',
    scrollbarColor: `${theme.palette.primary.main} ${alpha(theme.palette.background.paper, 0.1)}`,
};

// Auto-hide Design
export const autoHideScrollbar = {
    '&::-webkit-scrollbar': {
        width: '8px',
        opacity: 0,
        transition: 'opacity 0.3s ease',
    },
    '&:hover::-webkit-scrollbar': {
        opacity: 1,
    },
    '&::-webkit-scrollbar-track': {
        background: alpha(theme.palette.background.paper, 0.05),
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
        background: alpha(theme.palette.primary.main, 0.4),
        borderRadius: '4px',
        transition: 'background 0.2s ease',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: alpha(theme.palette.primary.main, 0.7),
    },
    scrollbarWidth: 'thin',
    scrollbarColor: `${alpha(theme.palette.primary.main, 0.4)} transparent`,
};
