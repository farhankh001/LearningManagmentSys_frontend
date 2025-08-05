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
} from 'recharts';
import { Typography, useTheme, alpha, Box } from '@mui/material';

type DataType = {
  name: string;
  count: number;
};

interface BarChartScoreProps {
  title: string;
  data: DataType[];
}

const GRADIENT_COLORS = [
  { start: '#3B82F6', end: '#1E40AF' }, // Blue gradient
  { start: '#10B981', end: '#047857' }, // Emerald gradient
  { start: '#EF4444', end: '#B91C1C' }, // Red gradient
  { start: '#F59E0B', end: '#D97706' }, // Amber gradient
  { start: '#8B5CF6', end: '#6D28D9' }, // Violet gradient
  { start: '#06B6D4', end: '#0891B2' }, // Cyan gradient
  { start: '#EC4899', end: '#BE185D' }, // Pink gradient
  { start: '#84CC16', end: '#65A30D' }, // Lime gradient
];

const BarChartMainDash: React.FC<BarChartScoreProps> = ({ title, data }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',


      }}
    >
      <Typography
        variant="body1"
        fontWeight={700}
        textAlign="center"

        sx={{
          fontSize: '1rem',
          background: theme.palette.info.main,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          position: 'relative',
          zIndex: 1, mb: 0.5, mt: 1
        }}
      >
        {title}
      </Typography>

      <ResponsiveContainer width="100%" height="88%">
        <BarChart
          data={data}
          margin={{ top: 18, right: 18, left: 5, bottom: 10 }}
          barCategoryGap="20%"
        >
          <defs>
            {GRADIENT_COLORS.map((color, index) => (
              <linearGradient
                key={`gradient-${index}`}
                id={`gradient-${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={color.start} stopOpacity={1} />
                <stop offset="100%" stopColor={color.end} stopOpacity={0.8} />
              </linearGradient>
            ))}

            {/* Glow effect gradients */}
            {GRADIENT_COLORS.map((color, index) => (
              <filter
                key={`glow-${index}`}
                id={`glow-${index}`}
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
          </defs>

          <XAxis
            type="category"
            dataKey="name"

            tickFormatter={(value) =>
              typeof value === 'string' ? value.split(' ').slice(0, 2).join(' ') : value
            }
            tick={{
              fontSize: 11,
              fill: theme.palette.text.secondary,
              fontWeight: 500,
              dy: 8,
            }}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <YAxis
            type="number"
            allowDecimals={false}
            tick={{
              fontSize: 11,
              fill: theme.palette.text.secondary,
              fontWeight: 600,
            }}
            axisLine={false}
            tickLine={false}
            width={40}

          />
          <Tooltip
            cursor={{
              fill: alpha(theme.palette.primary.main, 0.08),
              stroke: alpha(theme.palette.primary.main, 0.2),
              strokeWidth: 1,
              radius: 2,
            }}
            contentStyle={{
              backgroundColor: alpha(theme.palette.background.paper, 0.95),
              border: `1px solid}`,
              borderColor: alpha(theme.palette.background.paper, 1),
              borderRadius: 8,
              fontSize: 12,
              color: theme.palette.text.primary,
              boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.15)}, 0 0 0 1px ${alpha(theme.palette.primary.main, 0.1)}`,
              backdropFilter: 'blur(12px)',
              padding: '8px 24px',
            }}
            labelStyle={{
              color: theme.palette.text.primary,
              fontWeight: 700,
              marginBottom: 2,
            }}
            itemStyle={{
              color: theme.palette.info.main,
              fontWeight: 600,
            }}
          />
          <Bar
            dataKey="count"
            radius={[6, 6, 2, 2]}
            maxBarSize={40}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#gradient-${index % GRADIENT_COLORS.length})`}
                style={{
                  filter: `url(#glow-${index % GRADIENT_COLORS.length})`,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
            <LabelList
              dataKey="count"
              position="top"
              offset={12}
              style={{
                fontSize: 12,
                fill: theme.palette.text.primary,
                fontWeight: 700,
                textShadow: `0 1px 3px ${alpha(theme.palette.common.black, 0.2)}`,
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Animated background elements */}



    </Box>
  );
};

export default BarChartMainDash;