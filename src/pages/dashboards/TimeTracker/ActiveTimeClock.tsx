import { Box, Typography, Paper, useTheme } from '@mui/material';
import { useGetActiveStudyTimeQuery } from '../../../app/api/studentDashApis';


export default function ActiveTimeClock() {
 
    const {data:activeStudyTime}=useGetActiveStudyTimeQuery()

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };
  const theme=useTheme()
  return (
    <Paper
      elevation={3}
      sx={{
        px: 3,
        py: 1,
        borderRadius: 2,
        display: 'inline-block',
        bgcolor: 'Background.default',
        color: 'green',
        border:"1px solid",
        borderColor:"divider"
      }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{
          fontFamily: 'monospace',
          fontWeight: 'bold',
          letterSpacing: '0.1rem',
          textAlign:"center",
          color:theme.palette.warning.light
        }}
      >
        {formatTime(activeStudyTime?.studyTime?activeStudyTime.studyTime:0)}
      </Typography>
    </Paper>
  );
}
