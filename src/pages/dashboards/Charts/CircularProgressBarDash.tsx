import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Box, Typography, Paper, useTheme } from '@mui/material';

interface GaugeChartProps {
  value: number; // e.g. 0–100
  title: string;
  color?: string;
}

const GaugeChartDash = ({ value, title, color }: GaugeChartProps) => {
  const theme = useTheme();

  const angleValue = Math.min(value, 100); // clamp to 100 max
  const data = [
    { name: 'Progress', value: angleValue },
    { name: 'Remaining', value: 100 - angleValue },
  ];

  const COLORS = [color || '#10B981', theme.palette.grey[800]];

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        height: '100%',
        p: 2,
        border: '1px solid',
        borderRadius: 4,
        borderColor: theme.palette.divider,
        background: theme.palette.primary.dark,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="body2" fontWeight={600} mb={1}>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="100%" // move to bottom
            startAngle={180}
            endAngle={0}
            innerRadius={70}
            outerRadius={100}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          {/* Center label */}
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="24"
            fontWeight="bold"
            fill={color || '#10B981'}
        
          >
            {value}%
          </text>
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default GaugeChartDash;
