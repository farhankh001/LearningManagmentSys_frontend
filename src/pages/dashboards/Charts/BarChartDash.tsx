import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Cell,
} from 'recharts';
import { Box, Typography, Paper, useTheme } from '@mui/material';

export interface ChartDataItem {
  name: string;
  value: number;
}

interface BarChartDashProps {
  title?: string;
  data: ChartDataItem[];
  colors?: { [key: string]: string };
  legendItems?: { label: string; value: number }[];
  height?: string | number;
}

const BarChartDash: React.FC<BarChartDashProps> = ({
  title = 'Chart',
  data,
  colors = {},
  legendItems,
  height = '90%',
}) => {
  const theme=useTheme()
  return (
    <Paper elevation={3} sx={{ width: '100%', height: '100%', p: 2,border:"1px solid", borderRadius:4,borderColor:theme.palette.divider,background:theme.palette.primary.dark,display:"flex",flexDirection:"column",alignItems:"center"}}>
      <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>
        {title}
      </Typography>
      <ResponsiveContainer width="98%" height={height}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 14 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 14 }} />
          <Tooltip />
          {legendItems && (
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: '14px' }}
              content={
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 2,
                    py: 1,
                  }}
                >
                  {legendItems.map((item, i) => (
                    <Typography variant="caption" key={i}>
                      {item.label} - {item.value}
                    </Typography>
                  ))}
                </Box>
              }
            />
          )}
          <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[entry.name] || '#8884d8'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default BarChartDash;
