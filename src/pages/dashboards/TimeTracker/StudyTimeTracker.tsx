import { useEffect, useRef, useState } from 'react';
import { useIdleTimerContext } from 'react-idle-timer';
import { useUpdateActiveStudyTimeMutation } from '../../../app/api/studentDashApis';
import toast from 'react-hot-toast';

const FIVE_MINUTES = 150;

type StudyTimeTrackerProps = {
  courseId: string
}

export function StudyTimeTracker({ courseId }: StudyTimeTrackerProps) {
  const [updateTimer, { isError, error }] = useUpdateActiveStudyTimeMutation()

  useEffect(() => {
    if (isError && error && "data" in error) {
      console.log(error)
      toast.error(`${JSON.stringify((error.data as any).error)}`)
    }
  }, [isError, error]);

  const [seconds, setSeconds] = useState(0);
  const secondsRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Keep ref in sync with state
  secondsRef.current = seconds;

  const { isIdle } = useIdleTimerContext();

  const isTabVisible = () => document.visibilityState === 'visible';
  const shouldTrackTime = () => !isIdle() && isTabVisible();

  const startTimer = () => {
    if (intervalRef.current) return; // Prevent multiple intervals
    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Handle idle state and visibility changes
  useEffect(() => {
    const handleVisibility = () => {
      if (shouldTrackTime()) {
        startTimer();
      } else {
        stopTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    // Check initial state
    if (shouldTrackTime()) {
      startTimer();
    } else {
      stopTimer();
    }

    return () => {
      stopTimer();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isIdle]); // Only depend on isIdle changes

  // Handle 5-minute updates
  useEffect(() => {
    if (seconds >= FIVE_MINUTES) {
      updateTimer({ seconds, courseId });
      setSeconds(0);
    }
  }, [seconds, courseId, updateTimer]);

  // Handle page unload and component unmount
  useEffect(() => {
    const handleUnload = () => {
      const currentSeconds = secondsRef.current;
      if (currentSeconds > 0) {
        const blob = new Blob(
          [JSON.stringify({ seconds: currentSeconds, courseId })],
          { type: 'application/json' }
        );
        navigator.sendBeacon(`${import.meta.env.BASE_URL}/update-active-study-time`, blob);
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    // Component unmount cleanup
    return () => {
      const currentSeconds = secondsRef.current;
      if (currentSeconds > 0) {
        updateTimer({ seconds: currentSeconds, courseId });
      }
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [courseId, updateTimer]); // Stable dependencies only

  return null;
}