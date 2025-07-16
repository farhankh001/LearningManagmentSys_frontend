import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Typography, useTheme, alpha, Box } from '@mui/material';

type DataType = {
  name: string;
  count: number;
};

interface PieChartTechStackProps {
  title: string;
  data: DataType[];
}

const COLORS = [
  '#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA',
  '#F472B6', '#22D3EE', '#FDBA74', '#4ADE80', '#818CF8',
];

const RADIAN = Math.PI / 180;

// Label showing tech stack + % inside slice
const renderCustomLabel = ({
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

  const trimmedName =
    typeof payload.name === 'string'
      ? payload.name.split(' ').slice(0, 3).join(' ')
      : payload.name;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fontWeight={600}
    >
      {`${trimmedName} (${value})`}
    </text>
  );
};


const PieChartWithoutHoleMainDash: React.FC<PieChartTechStackProps> = ({ title, data }) => {
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
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={115}
            label={renderCustomLabel}
            labelLine={false}
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
            formatter={(value: number, name: string) => [
              `${value} Users`,
              name,
            ]}
            contentStyle={{
              backgroundColor: alpha(theme.palette.grey[900], 0.95),
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 8,
              fontSize: 13,
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

export default PieChartWithoutHoleMainDash;
