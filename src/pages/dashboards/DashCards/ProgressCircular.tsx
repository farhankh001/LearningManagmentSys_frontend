import { Box, CircularProgress, Typography, useTheme } from "@mui/material";

const ProgressCircle = ({ percentage = 0, color }: any) => {
    const theme = useTheme();

    return (
        <Box
            position="relative"
            display="inline-flex"
            justifyContent="center"
            alignItems="center"
            sx={{
                width: 50,
                height: 50,
            }}
        >
            {/* Background Track */}
            <CircularProgress
                variant="determinate"
                value={100}
                size={50}
                thickness={5.5}
                sx={{ color: theme.palette.grey[300] }}
            />

            {/* Foreground Progress */}
            <CircularProgress
                variant="determinate"
                value={percentage}
                size={50}
                thickness={5.5}
                sx={{
                    color: color || theme.palette.primary.main,
                    position: "absolute",
                    left: 0,
                    top: 0,
                    transition: "color 0.3s ease-in-out",
                }}
            />

            {/* Center Label */}
            <Box
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography
                    variant="caption"
                    fontSize={11}
                    fontWeight={400}
                    color="text.primary"
                >
                    {`${Math.round(percentage)}%`}
                </Typography>
            </Box>
        </Box>
    );
};

export default ProgressCircle;
