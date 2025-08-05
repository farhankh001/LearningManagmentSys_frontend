import {
  Paper,
  Typography,
  useTheme,
  alpha,
  Box,
} from '@mui/material';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
  CartesianGrid,
} from 'recharts';

interface QuizPerformanceLineChartProps {
  scores: number[];
  title: string;
}

function QuizPerformanceLineChart({ scores, title }: QuizPerformanceLineChartProps) {
  const theme = useTheme();

  const quizScores = scores.map((score, index) => ({
    index: index + 1,
    score,
  }));

  const hasData = scores && scores.length > 0;

  if (!hasData) {
    return (
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height: '100%',
          p: 3,
          borderRadius: 4,
          border: '1px solid',
          borderColor: theme.palette.divider,
          backgroundColor: alpha(theme.palette.primary.dark, 0.75),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary" fontWeight={600}>
          No quiz performance data available yet.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        height: '100%',
        p: 2,
        borderRadius: 4,
        border: '1px solid',
        borderColor: theme.palette.divider,
        backgroundColor: alpha(theme.palette.primary.dark, 0.1),
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="body1" fontWeight={600} mb={2.5} sx={{ textAlign: "center", color: theme.palette.text.secondary }}>
        {title}
      </Typography>

      <Box sx={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={quizScores} margin={{ top: 10, right: 20, left: 0, bottom: 3 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.grey[700]}
              fill={theme.palette.background.paper}
            />

            <XAxis
              dataKey="index"
              tick={{
                fontSize: 10,
                fill: theme.palette.text.secondary,
                fontWeight: 600,
              }}
              label={{ value: '', position: 'insideBottomLeft', offset: -5 }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{
                fontSize: 10,
                fill: theme.palette.text.secondary,
                fontWeight: 600,
              }}
            />
            <Tooltip
              formatter={(value: number) => [`${value} %`, 'Score']}
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
            <Line
              type="monotone"
              dataKey="score"
              stroke={theme.palette.primary.main}
              strokeWidth={3}
              dot={{ r: 3, stroke: theme.palette.primary.main, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}

export default QuizPerformanceLineChart;
