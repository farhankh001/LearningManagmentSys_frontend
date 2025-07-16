import { Box, Typography, useTheme } from '@mui/material';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import 'react-tooltip/dist/react-tooltip.css'; // Make sure this line is added!
import type { ReactCalendarHeatmapValue } from 'react-calendar-heatmap';

const EnrollmentTrendHeatmap = ({ courseData }: any) => {
  const theme = useTheme();
  const tooltipId = 'enrollment-tooltip';

  const enrollmentTrend = courseData?.courseDetails?.enrollmentTrend || [];

  const validEnrollmentTrend = enrollmentTrend.filter(
    (item: any): item is ReactCalendarHeatmapValue<string> =>
      item && typeof item === 'object' && item.date && typeof item.count === 'number'
  );

  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const maxCount =
    validEnrollmentTrend.length > 0
      ? Math.max(...validEnrollmentTrend.map((item: any) => item.count), 1)
      : 1;

  const classForValue = (value: ReactCalendarHeatmapValue<string> | undefined) => {
    if (!value || value.count === 0) return 'color-empty';
    const intensity = Math.ceil((value.count / maxCount) * 4);
    return `color-scale-${intensity}`;
  };

  // ✅ Use react-tooltip v5 attributes
  const tooltipDataAttrs = (
    value: ReactCalendarHeatmapValue<string> | undefined
  ): { [key: string]: string } => {
    return value && value.date
      ? {
          'data-tooltip-id': tooltipId,
          'data-tooltip-content': `${value.date} - ${value.count} Enrollment${value.count === 1 ? '' : 's'}`,
        }
      : {};
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Box
        sx={{
          '& .react-calendar-heatmap': {
            fontFamily: theme.typography.fontFamily,
          },
          '& .react-calendar-heatmap text': {
            fontSize: '8px !important',
            fill: theme.palette.text.secondary,
          },
          '& .react-calendar-heatmap .react-calendar-heatmap-month-label': {
            fontSize: '8px !important',
            fill: theme.palette.text.secondary,
          },
          '& .react-calendar-heatmap .react-calendar-heatmap-weekday-label': {
            fontSize: '7px !important',
            fill: theme.palette.text.secondary,
          },
          '& .react-calendar-heatmap .color-empty': {
            fill: '#343c3aff',
          },
          '& .react-calendar-heatmap .color-scale-1': {
            fill: 'hsl(210, 100%, 85%)',
          },
          '& .react-calendar-heatmap .color-scale-2': {
            fill: 'hsl(210, 100%, 65%)',
          },
          '& .react-calendar-heatmap .color-scale-3': {
            fill: 'hsl(210, 100%, 45%)',
          },
          '& .react-calendar-heatmap .color-scale-4': {
            fill: 'hsl(210, 100%, 30%)',
          },
           '& .react-calendar-heatmap rect:focus': {
      outline: 'none',
      stroke: 'none',
    },
        }}
      >
        <CalendarHeatmap
          startDate={oneYearAgo}
          endDate={today}
          values={validEnrollmentTrend}
          classForValue={classForValue}
          tooltipDataAttrs={tooltipDataAttrs}
          showWeekdayLabels
          showMonthLabels
        />
        <ReactTooltip id={tooltipId} />
      </Box>

      {/* Legend */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontSize: '12px',
          color: theme.palette.text.secondary,
          justifyContent: 'center',
          mt: 0.5,
        }}
      >
        <Typography variant="caption">Less</Typography>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {[0, 1, 2, 3, 4].map((level) => (
            <Box
              key={level}
              sx={{
                width: 12,
                height: 12,
                backgroundColor:
                  level === 0
                    ? '#191919ff'
                    : level === 1
                      ? 'hsl(210, 100%, 85%)'
                      : level === 2
                        ? 'hsl(210, 100%, 65%)'
                        : level === 3
                          ? 'hsl(210, 100%, 45%)'
                          : 'hsl(210, 100%, 30%)',
                border: '1px solid #ccc',
              }}
            />
          ))}
        </Box>
        <Typography variant="caption">More</Typography>
      </Box>

      {/* Stats */}
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Total Enrollments:{' '}
          {validEnrollmentTrend.reduce(({sum, item}:any) => sum + (item?.count || 0), 0)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Peak Day: {maxCount} enrollments
        </Typography>
      </Box>
    </Box>
  );
};

export default EnrollmentTrendHeatmap;
