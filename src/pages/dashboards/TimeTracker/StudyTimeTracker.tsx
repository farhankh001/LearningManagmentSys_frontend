import { useEffect, useRef, useState } from 'react';
import { useIdleTimerContext } from 'react-idle-timer';
import { useUpdateActiveStudyTimeMutation } from '../../../app/api/studentDashApis';
import { BASEURL } from '../../../app/api/baseApi';
import toast from 'react-hot-toast';

const FIVE_MINUTES = 1;

export function StudyTimeTracker() {
  const [updateTimer,{isError,error}]=useUpdateActiveStudyTimeMutation()
useEffect(() => {
    if(isError&&error&&"data" in error){
      console.log(error)
      toast.error(`${JSON.stringify((error.data as any).error)}`)
    }
  
}, [isError, error]);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { isIdle } = useIdleTimerContext();

  const isTabVisible = () => document.visibilityState === 'visible';

  const shouldTrackTime = () => !isIdle() && isTabVisible();

  const startTimer = () => {
    if (intervalRef.current) return;
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

  useEffect(() => {
    const handleVisibility = () => {
      if (shouldTrackTime()) {
        startTimer();
      } else {
        stopTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    // Check on mount
    if (shouldTrackTime()) {
      startTimer();
    }

    return () => {
      stopTimer();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isIdle]);

  useEffect(() => {
    if (seconds >= FIVE_MINUTES) {
      // Replace with your API call
      updateTimer({seconds})
      setSeconds(0);
    }
  }, [seconds]);

  useEffect(() => {
    const handleUnload = () => {
      if (seconds > 0) {
        const blob = new Blob(
        [JSON.stringify({ seconds })],
        { type: 'application/json' }
    );
    navigator.sendBeacon(`${BASEURL}/update-active-study-time`, blob);
      }
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, [seconds]);

  return null;
}

