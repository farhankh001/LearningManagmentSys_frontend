import { Box, Paper, Typography } from '@mui/material';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Line, Legend,LineChart } from 'recharts'


interface QuizPerformanceLineChartProps{
    scores:number[],
    title:string
}

function QuizPerformanceLineChart({scores,title}:QuizPerformanceLineChartProps) {
    const quizScores = scores.map((score, index) => ({
  index: index + 1,
  score,
}));
  return (
     <Paper elevation={3} sx={{width:"100%", height:"100%",padding:2,overflow:"hidden"}}>
         <Typography variant='body2' fontWeight={600}>{title}</Typography>
    <ResponsiveContainer width="90%" height="85%">
  <LineChart data={quizScores}>
    
    <XAxis dataKey="index" label={{ value: 'Quiz #', position: 'insideBottomLeft', offset: -5 }} />
    <YAxis domain={[0, 100]} />
    <Tooltip />
    <Line type="monotone" dataKey="score" stroke="#1976d2" strokeWidth={3} dot />
  </LineChart>
 
</ResponsiveContainer>
</Paper>
  )
}

export default QuizPerformanceLineChart
