import { useState, useEffect, useRef, useCallback } from "react";

interface UseTimerOptions {
  initialSeconds?: number;
  autoStart?: boolean;
  onComplete?: () => void;
}

interface UseTimerReturn {
  seconds: number;
  isActive: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  formatTimer: (seconds?: number) => string;
}

export function useTimer({
  initialSeconds = 60,
  autoStart = true,
  onComplete,
}: UseTimerOptions = {}): UseTimerReturn {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer formatlash funksiyasi (MM:SS)
  const formatTimer = useCallback((secs?: number) => {
    const sec = secs !== undefined ? secs : seconds;
    const mins = Math.floor(sec / 60);
    const secsRemaining = sec % 60;
    return `${mins}:${secsRemaining.toString().padStart(2, "0")}`;
  }, [seconds]);

  // Timer ni boshlash
  const start = useCallback(() => {
    setIsActive(true);
  }, []);

  // Timer ni to'xtatish
  const pause = useCallback(() => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Timer ni qayta boshlash
  const reset = useCallback(() => {
    setSeconds(initialSeconds);
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [initialSeconds]);

  // Timer logikasi
  useEffect(() => {
    if (isActive && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            if (onComplete) {
              onComplete();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, seconds, onComplete]);

  // Auto-start
  useEffect(() => {
    if (autoStart && !isActive && seconds === initialSeconds && seconds > 0) {
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart, initialSeconds]);

  return {
    seconds,
    isActive,
    start,
    pause,
    reset,
    formatTimer,
  };
}

