import { useCallback, useEffect, useState } from "react";

const TICK_MS = 100;

interface PlaybackState {
  currentTime: number;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  seek: (time: number) => void;
}

export function usePlayback(duration: number, trackId: string): PlaybackState {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(false);
  }, [trackId]);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = window.setInterval(() => {
      setCurrentTime((previous) => Math.min(duration, previous + TICK_MS / 1000));
    }, TICK_MS);

    return () => window.clearInterval(timer);
  }, [isPlaying, duration]);

  useEffect(() => {
    if (isPlaying && currentTime >= duration) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentTime, duration]);

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);
  const toggle = useCallback(() => {
    setIsPlaying((previous) => !previous);
  }, []);

  const seek = useCallback(
    (time: number) => {
      setCurrentTime(Math.min(duration, Math.max(0, time)));
    },
    [duration],
  );

  return { currentTime, isPlaying, play, pause, toggle, seek };
}
