import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
  
} from 'recharts';
import { useTheme, Box, alpha } from '@mui/material';

type DataType = {
  name: string;
  count: number;
};

interface MiniBarChartProps {
  data: DataType[];
  height?: number;
}

const COLORS = [
  '#EF4444',
  '#F59E0B',
  '#10B981',
  '#3B82F6',
  '#8B5CF6',
];

const MiniBarChart: React.FC<MiniBarChartProps> = ({ data }) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%',height:"100%"}}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
        >
          {/* <CartesianGrid
            strokeDasharray="0" // solid lines
            stroke={alpha(theme.palette.divider, 0.1)} // slightly bolder for visibility
            vertical={true}
            horizontal={true}
          /> */}

          <XAxis
  dataKey="name"
  tick={{
    fontSize: 9,
    fill: theme.palette.text.secondary,
            
  }}
  tickLine={false}
  axisLine={false}
/>

          <YAxis
            tick={{ fontSize: 10, fill: theme.palette.text.secondary }}
            tickLine={false}
            axisLine={false}
            width={20}
          />

          <Tooltip
            cursor={{ fill: alpha(theme.palette.primary.light, 0.1) }}
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 6,
              fontSize: 11,
              padding: 6,
            }}
            labelStyle={{ color: theme.palette.text.secondary }}
            itemStyle={{ color: theme.palette.text.primary }}
          />

          <Bar dataKey="count" barSize={20} radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MiniBarChart;
