import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Paper, Typography, useTheme } from '@mui/material';

interface PieChartDataItem {
  name: string;
  value: number;
}

interface PieChartDashProps {
  data: PieChartDataItem[];
  colors?: string[];
  title?: string;
  height?: number | string;
  showLegend?: boolean;
}

export const PieChartDashComparison: React.FC<PieChartDashProps> = ({
  data,
  colors = ['#00C49F', '#FF8042', '#8884d8', '#82ca9d'],
  title = 'Pie Chart',
  height = "90%",
  showLegend = true,
}) => {
  const theme=useTheme()
  return (
    <Paper elevation={3} sx={{ width: '100%', height: '100%', p: 2,border:"1px solid", borderRadius:4,borderColor:theme.palette.divider,background:theme.palette.primary.dark,display:"flex",flexDirection:"column",alignItems:"center"}}>
      <Typography variant="body2" fontWeight={600} sx={{ mb: 2 }}>
        {title}
      </Typography>
      <ResponsiveContainer width="90%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
             labelLine={false} // hides lines
            label
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          {showLegend && <Legend />}
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
};
