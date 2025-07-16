import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { Box, useTheme } from '@mui/material';

type DataType = {
  name: string;
  count: number;
};

type Props = {
  title: string;
  data: DataType[];
};

const COLORS = [
  '#F59E0B', '#10B981', '#3B82F6',
  '#EF4444', '#8B5CF6', '#EC4899',
];

// Custom label renderer with smaller font and lighter weight
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
  name,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#ffffff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={13}
      fontWeight={500}
     
    >
      {`${name}: ${value}`}
    </text>
  );
};

const PieChartHoleMainDash: React.FC<Props> = ({  data }) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={4}
            label={renderCustomLabel}
            labelLine={false} // ✅ Remove the lines
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.default,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 8,
              fontSize: 12,
            }}
            itemStyle={{
              color: theme.palette.text.primary,
              fontSize: 13,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PieChartHoleMainDash;
