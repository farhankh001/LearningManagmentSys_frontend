import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { Box, Typography, Paper, useTheme } from '@mui/material';
// BarChartDashDataProps

interface PieChartDashProps {
  totalEnrolled: number;
  inprogress: number;
  completed: number;
  label1:string,
  label2:string,
  label3:string,
  title:string
}
const COLORS = ['#FBBF24', '#10B981', '#EF4444'];

const PieChartDash: React.FC<PieChartDashProps> = ({
  totalEnrolled,
  completed,
  inprogress,
  label1,
  label2,
  label3,title
}) => {
//   

  const data = [
    { name: label1, value: totalEnrolled },
    { name: label2, value: completed },
    { name: label3, value: inprogress },
  ];
   const theme=useTheme()
  return (
    <Paper elevation={3} sx={{ width: '100%', height: '100%', p: 2,border:"1px solid", borderRadius:4,borderColor:theme.palette.divider,background:theme.palette.primary.dark,display:"flex",flexDirection:"column",alignItems:"center"}}>
    <Typography variant='body2' fontWeight={600} sx={{margin:1}}>{title}</Typography>
  <ResponsiveContainer width="90%" height="90%">
  <PieChart>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      innerRadius={75}
      outerRadius={100}
      dataKey="value"
      
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
   <Tooltip
  formatter={(value: number, name: string) => [`${value}`, name]}
  
/>
    <Legend
    content={<Box sx={{display:"flex",flexDirection:"row",gap:1,alignItems:"center",justifyContent:"space-between",margin:1}}>
      <Typography variant='caption'>{label1} - {totalEnrolled}</Typography>
      <Typography variant='caption'>{label2} - {completed}</Typography>
      <Typography variant='caption'>{label3} - {inprogress}</Typography>
    </Box>}
    />
  </PieChart>
  {/* Center label overlay */}
 
</ResponsiveContainer>

    </Paper>
  );
};

export default PieChartDash;
