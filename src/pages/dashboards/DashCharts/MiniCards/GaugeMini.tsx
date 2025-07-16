import React from 'react';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from 'recharts';
import { Box, useTheme, alpha } from '@mui/material';

interface MiniRadialChartProps {
  value: number;
  barColor?: string;

}

const MiniRadialChart: React.FC<MiniRadialChartProps> = ({
  value,
  barColor,
 
}) => {
  const theme = useTheme();

  const progressColor = barColor || theme.palette.success.main;

  const data = [
    { name: 'Full', value: 100, fill: alpha(theme.palette.divider, 0.3) },
    { name: 'Progress', value: value, fill: progressColor },
  ];

  return (
    <Box sx={{ width: '100%', height:"100%"}}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="80%"
          outerRadius="100%"
          barSize={12}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            background
            dataKey="value"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fontWeight="600"
            fill={progressColor}
          >
            {`${value}%`}
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MiniRadialChart;
