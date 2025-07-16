import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
  LabelList,
  CartesianGrid,
} from 'recharts';
import { Typography, useTheme, alpha, Box } from '@mui/material';

type DataType = {
  name: string;   // e.g., "Score 1"
  count: number;  // number of users
};

interface BarChartScoreProps {
  title: string;
  data: DataType[];
}

const COLORS = [
  '#EF4444', // Red-500
  '#F59E0B', // Amber-500
  '#10B981', // Emerald-500
  '#3B82F6', // Blue-500
  '#8B5CF6', // Violet-500
];

const BarChartMainDash: React.FC<BarChartScoreProps> = ({ title, data }) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography
        variant="h6"
        fontWeight={600}
        textAlign="center"
        mb={0.7}
        color={theme.palette.text.primary}
      >
        {title}
      </Typography>

     <ResponsiveContainer width="100%" height="90%">
  <BarChart data={data} margin={{ top: 24, right: 20, left: 0, bottom: 5 }}>
    <CartesianGrid stroke={alpha(theme.palette.divider, 0.2)} />
    <XAxis
      type="category"
      dataKey="name"
      tickFormatter={(value) =>
        typeof value === 'string' ? value.split(' ').slice(0, 2).join(' ') : value
      }
      tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
      axisLine={false}
      tickLine={false}
    />
    <YAxis
      type="number"
      allowDecimals={false}
      tick={{ fontSize: 13, fill: theme.palette.text.secondary }}
      axisLine={false}
      tickLine={false}
      width={40}
    />
    <Tooltip
      cursor={{ fill: alpha(theme.palette.primary.light, 0.1) }}
      contentStyle={{
        backgroundColor: theme.palette.grey[900],
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 8,
        fontSize: 12,
        color: theme.palette.text.primary,
      }}
      labelStyle={{ color: theme.palette.text.secondary }}
      itemStyle={{ color: theme.palette.text.primary }}
    />
    <Bar dataKey="count" barSize={30} radius={[6, 6, 0, 0]}>
      {data.map((_, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
      <LabelList
        dataKey="count"
        position="top"
        style={{ fontSize: 12, fill: theme.palette.text.primary }}
      />
    </Bar>
  </BarChart>
</ResponsiveContainer>

    </Box>
  );
};

export default BarChartMainDash;
