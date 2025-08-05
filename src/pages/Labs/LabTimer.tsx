import { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { alpha, Box, Paper, Typography, useTheme } from '@mui/material';
import { UpdateDisabled } from '@mui/icons-material';

type LabTimerProps = {
    activatedAt: string | null;
    timeLimitInMinutes: number;
    isActive: boolean;
};

const LabTimer = ({ activatedAt, timeLimitInMinutes, isActive }: LabTimerProps) => {
    const theme = useTheme();

    const calculateExpiry = () => {
        if (!isActive || !activatedAt) return new Date(); // expired
        const start = new Date(activatedAt);
        return new Date(start.getTime() + timeLimitInMinutes * 60 * 1000);
    };

    const expiryTimestamp = calculateExpiry();

    const { seconds, minutes, hours, restart } = useTimer({
        expiryTimestamp,
        autoStart: true,
        onExpire: () => {
            localStorage.removeItem('lab-timer');
        },
    });

    useEffect(() => {
        if (isActive && activatedAt) {
            localStorage.setItem(
                'lab-timer',
                JSON.stringify({
                    activatedAt,
                    timeLimitInMinutes,
                    expiry: expiryTimestamp.toISOString(),
                })
            );
        } else {
            localStorage.removeItem('lab-timer');
        }

        restart(calculateExpiry(), true);
    }, [activatedAt, timeLimitInMinutes, isActive]);

    return (
        <Paper
            elevation={3}
            sx={{
                px: 3,
                py: 1,
                borderRadius: 2,
                display: 'inline-block',
                bgcolor: alpha(theme.palette.background.paper, 0.6),
                color: 'green',
                border: "1px solid",
                borderColor: "divider"
            }}
        >
            {isActive ? (
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                        letterSpacing: '0.1rem',
                        textAlign: "center",
                        color: theme.palette.error.light
                    }}
                >
                    {String(hours).padStart(2, '0')}:
                    {String(minutes).padStart(2, '0')}:
                    {String(seconds).padStart(2, '0')}
                </Typography>
            ) : (
                <Typography variant='caption' fontWeight={700} sx={{ color: theme.palette.error.light, display: "flex", alignItems: 'center', gap: 0.5 }}><UpdateDisabled sx={{ fontSize: 15 }} /><span>Lab currently Inactive</span></Typography>
            )}
        </Paper>
    );
};

export default LabTimer;
