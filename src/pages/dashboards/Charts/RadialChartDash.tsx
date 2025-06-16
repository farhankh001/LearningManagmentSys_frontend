import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from 'recharts';

interface RadialChartProps {
  overAllProgressPercentage: number;
  title: string;
}

function RadialChartDash({ overAllProgressPercentage, title }: RadialChartProps) {
  const data = [
    {
      name: 'Full',
      value: 100,
      fill: '#e0e0e0', // background circle
    },
    {
      name: 'Attempted',
      value: overAllProgressPercentage,
      fill: '#4caf50', // actual progress
    },
  ];

  return (
    <Paper elevation={3} sx={{ width: '100%', height: '100%', p: 3 }}>
      <Typography variant="body2" fontWeight={600} mb={1}>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height="90%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="80%"
          outerRadius="100%"
          barSize={15}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            
            background
          
            dataKey="value"
          />
          {/* Center label */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="24"
            fontWeight="bold"
            fill="#4caf50"
          >
            {overAllProgressPercentage}%
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export default RadialChartDash;
