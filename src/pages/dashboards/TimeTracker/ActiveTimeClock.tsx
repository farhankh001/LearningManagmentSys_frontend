import { Typography, Paper, useTheme, Box, alpha } from '@mui/material';
import { useGetActiveStudyTimeQuery } from '../../../app/api/studentDashApis';
import { Bolt } from '@mui/icons-material';

export const formatTimeGlobel = (secs: number) => {
  const h = Math.floor(secs / 3600).toString().padStart(2, '0');
  const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};
export default function ActiveTimeClock({ courseId }: any) {

  const { data: activeStudyTime } = useGetActiveStudyTimeQuery({ courseId })

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };
  const theme = useTheme()
  return (
    <Box sx={{ background: alpha(theme.palette.primary.dark, 0.75), border: "1px solid", borderColor: theme.palette.divider, borderRadius: 3, p: 2.5, display: "flex", flexDirection: "column", alignItems: 'center', gap: 1.2, width: "100%" }}>
      <Bolt />
      <Typography
        variant="h5"
        component="div"
        sx={{
          fontFamily: 'monospace',
          fontWeight: 'bold',
          letterSpacing: '0.1rem',
          textAlign: "center",
          color: theme.palette.text.primary, fontSize: "1.5rem"
        }}
      >
        {formatTime(activeStudyTime?.studyTime ? activeStudyTime.studyTime : 0)}
      </Typography>
      <Typography variant='body2' fontWeight={550} sx={{ color: theme.palette.text.secondary }} >Active Study Clock</Typography>
    </Box>
  );
}
