
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { alpha,  useTheme } from '@mui/material';
import dayjs from 'dayjs';

interface DailyEnrollment {
  date: string; // yyyy-MM-dd
  count: number;
}

interface Props {
  data: DailyEnrollment[];
  title?: string;
}

export default function DailyEnrollmentChart({ data, }: Props) {
  const theme = useTheme();

  const formatDate = (date: string) => dayjs(date).format("MMM D");

  return (
   

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorEnrollments" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.8} />
              <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
            </linearGradient>
          </defs>
 
          <CartesianGrid
  strokeDasharray="3 3"
  stroke={theme.palette.grey[700]} // or any custom grid line color
  fill={theme.palette.background.paper} // background fill for chart area
/>

          <XAxis
  dataKey="date"
  tickFormatter={formatDate}
  tick={{
    fontSize: 10,
    fill: theme.palette.text.secondary,
    fontWeight: 600,
  }}
/>

<YAxis
  allowDecimals={false}
  tick={{
    fontSize: 10,
    fill: theme.palette.text.secondary,
    fontWeight: 600,
  }}
/>
      <Tooltip
  formatter={(value: number) => [`${value} enrollments`, '']}
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

          <Area
            type="monotone"
            dataKey="count"
            stroke={theme.palette.primary.main}
            fillOpacity={1}
            fill="url(#colorEnrollments)"
          />
        </AreaChart>
      </ResponsiveContainer>
   
  );
}
