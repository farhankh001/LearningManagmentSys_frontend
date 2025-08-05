import { alpha, Box, CircularProgress, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import ProgressCircle from "./ProgressCircular";

const LessonProgressCard = ({ title, icon, percentage, completed, total, color }: any) => {
    const theme = useTheme()
    return (
        <Box
            sx={{
                px: 1, py: 2,
                borderRadius: 3,
                textAlign: "center",
                backgroundColor: alpha(theme.palette.primary.dark, 0.75),
                border: "1px solid", borderColor: theme.palette.divider,
                display: "flex", flexDirection: "column", gap: 1.3
            }}
        >
            {/* <Typography variant="caption" fontWeight={400} sx={{ color: theme.palette.text.secondary, fontSize: "0.7rem" }}>
                {title}
            </Typography> */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 3, }}>
                <Box sx={{ background: alpha(color, 0.15), p: 1.5, borderRadius: "50%", display: "flex", alignItems: "center" }}>{icon}</Box>
                <ProgressCircle color={color} percentage={percentage} />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", px: 3 }}>
                <Box sx={{ width: "100%", display: "flex", flexDirection: 'row', alignItems: "center", gap: 1 }}> <Typography variant="body1" fontWeight={600} sx={{}}>{completed}</Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ color }}>{title}</Typography></Box>
                <Box sx={{ display: "flex", gap: 0.6 }}>
                    <Typography variant="body2" fontWeight={600} sx={{ color: theme.palette.text.secondary }}>Out of</Typography>
                    <Typography fontWeight={600} >{total}</Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ color: theme.palette.text.secondary }}>Completed</Typography></Box>
            </Box>


        </Box>
    );
};
export default LessonProgressCard