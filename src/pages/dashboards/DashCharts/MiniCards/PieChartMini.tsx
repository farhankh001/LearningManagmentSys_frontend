import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTheme, Box, alpha } from '@mui/material';

type DataType = {
  name: string;
  count: number;
};

interface MiniPieChartProps {
  data: DataType[];
  height?: number;
}

const COLORS = [
    '#10B981',
  '#3B82F6',
  '#8B5CF6',
  '#EF4444',
  '#F59E0B',
  
];

const RADIAN = Math.PI / 180;

const renderMiniLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  payload,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={10}
      fontWeight={500}
    >
      {`${payload.name} ${value}`}
    </text>
  );
};

const MiniPieChart: React.FC<MiniPieChartProps> = ({ data, height = 180 }) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="90%"
            labelLine={false}
            label={renderMiniLabel}
            isAnimationActive={true}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value: number, name: string) => [`${value} Users`, name]}
            contentStyle={{
              backgroundColor: alpha(theme.palette.grey[900], 0.95),
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 8,
              fontSize: 12,
              padding: 6,
              color: '#fff',
            }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MiniPieChart;
