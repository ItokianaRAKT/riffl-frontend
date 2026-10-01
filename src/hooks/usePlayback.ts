import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

interface PlaybackState {
  audioRef: RefObject<HTMLAudioElement | null>;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  error: boolean;
  seek: (time: number) => void;
  toggle: () => void;
}

export function usePlayback(
  trackId: string,
  fallbackDuration: number,
  onEnded: () => void,
): PlaybackState {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastTrackIdRef = useRef<string | null>(null);
  const onEndedRef = useRef(onEnded);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(fallbackDuration);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    onEndedRef.current = onEnded;
  }, [onEnded]);

  useEffect(() => {
    const isTrackChange =
      lastTrackIdRef.current !== null && lastTrackIdRef.current !== trackId;
    lastTrackIdRef.current = trackId;

    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(
        Number.isFinite(audio.duration) && audio.duration > 0
          ? audio.duration
          : fallbackDuration,
      );
      onEndedRef.current();
    };
    const handleError = () => {
      setIsPlaying(false);
      setError(true);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("durationchange", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    setCurrentTime(0);
    setDuration(fallbackDuration);
    setIsPlaying(false);
    setError(false);

    if (isTrackChange) {
      audio.play().catch(() => setIsPlaying(false));
    }

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("durationchange", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [trackId, fallbackDuration]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, []);

  const seek = useCallback(
    (time: number) => {
      const audio = audioRef.current;
      if (!audio) return;

      const limit =
        Number.isFinite(audio.duration) && audio.duration > 0
          ? audio.duration
          : duration;
      const clamped = Math.min(Math.max(0, time), limit);
      audio.currentTime = clamped;
      setCurrentTime(clamped);
    },
    [duration],
  );

  return { audioRef, currentTime, duration, isPlaying, error, seek, toggle };
}
