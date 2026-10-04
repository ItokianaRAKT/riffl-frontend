import { useCallback, useRef, useState } from "react";
import DecisionControls from "./components/DecisionControls";
import Header from "./components/Header";
import TrackInfo from "./components/TrackInfo";
import AudioPlayer from "./components/AudioPlayer";
import LibraryStats from "./components/LibraryStats";
import ReviewComplete from "./components/ReviewComplete";
import InitialEmptyState from "./components/InitialEmptyState";
import { usePlayback } from "./hooks/usePlayback";
import { useReviewSession } from "./hooks/useReviewSession";
import { useReviewShortcuts } from "./hooks/useReviewShortcuts";
import { useTrackEdits } from "./hooks/useTrackEdits";
import {
  ApiError,
  scanFolder,
  sendAction,
  toTrack,
  undoLastAction,
} from "./api/client";
import type { Decision, Track } from "./types";

export default function App() {
  const [screen, setScreen] = useState<"reviewing" | "empty">("empty");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [folderPath, setFolderPath] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const actionInFlightRef = useRef(false);

  const { currentTrack, summary, decide, undo, reset } = useReviewSession({
    tracks,
  });

  const trackEdits = useTrackEdits(currentTrack);

  const handleDecide = useCallback(
    async (decision: Decision) => {
      if (!currentTrack || actionInFlightRef.current) return;

      actionInFlightRef.current = true;
      try {
        await sendAction(currentTrack.id, decision);
        setActionError(null);
        decide(decision);
      } catch (actionFailure) {
        setActionError(
          actionFailure instanceof ApiError
            ? actionFailure.message
            : "Unable to reach the backend.",
        );
      } finally {
        actionInFlightRef.current = false;
      }
    },
    [currentTrack, decide],
  );

  const handleTrackEnded = useCallback(() => {
    if (!currentTrack) return;
    handleDecide("skip");
  }, [currentTrack, handleDecide]);

  const { audioRef, currentTime, duration, isPlaying, error, seek, toggle } =
    usePlayback(
      currentTrack?.id ?? "no-track",
      currentTrack?.duration ?? 0,
      handleTrackEnded,
    );

  const isReviewing = screen === "reviewing";

  useReviewShortcuts({
    enabled: isReviewing && Boolean(currentTrack),
    onDecide: handleDecide,
    onTogglePlayback: toggle,
  });

  const handleReviewQueue = useCallback(() => {}, []);

  const handleUndo = useCallback(async () => {
    if (actionInFlightRef.current || summary.reviewed === 0) return;

    actionInFlightRef.current = true;
    try {
      await undoLastAction();
      setActionError(null);
      undo();
    } catch (undoFailure) {
      setActionError(
        undoFailure instanceof ApiError
          ? undoFailure.message
          : "Unable to reach the backend.",
      );
    } finally {
      actionInFlightRef.current = false;
    }
  }, [summary.reviewed, undo]);

  const handleFinishCleanup = useCallback(() => setScreen("empty"), []);

  const handleChooseFolder = useCallback(async () => {
    const path = folderPath.trim();
    if (!path || scanning) return;

    setScanning(true);
    setScanError(null);
    setActionError(null);

    try {
      const result = await scanFolder(path);

      if (result.files.length === 0) {
        setScanError("No audio files found in this folder.");
        return;
      }

      reset();
      setTracks(result.files.map(toTrack));
      setScreen("reviewing");
    } catch (scanFailure) {
      setScanError(
        scanFailure instanceof ApiError
          ? scanFailure.message
          : "Unable to reach the backend.",
      );
    } finally {
      setScanning(false);
    }
  }, [folderPath, scanning, reset]);

  return (
    <div className="flex min-h-full flex-col">
      <Header
        reviewed={isReviewing ? summary.reviewed : undefined}
        total={isReviewing ? summary.total : undefined}
      />
      <main className="flex flex-1 flex-col items-center justify-center px-6 gap-14 sm:gap-16 lg:gap-20 xl:gap-24">
        {screen === "empty" ? (
          <InitialEmptyState
            value={folderPath}
            error={scanError}
            scanning={scanning}
            onChange={setFolderPath}
            onSubmit={handleChooseFolder}
          />
        ) : currentTrack ? (
          <>
            <TrackInfo
              track={currentTrack}
              duration={duration}
              titleValue={trackEdits.title}
              artistValue={trackEdits.artist}
              onTitleChange={trackEdits.setTitle}
              onArtistChange={trackEdits.setArtist}
            />
            <AudioPlayer
              audioRef={audioRef}
              src={currentTrack.audioUrl}
              currentTime={currentTime}
              duration={duration}
              isPlaying={isPlaying}
              error={error}
              onSeek={seek}
              onToggle={toggle}
            />
            <DecisionControls
              onDecide={handleDecide}
              onUndo={handleUndo}
              canUndo={summary.reviewed > 0}
            />
            {actionError ? (
              <p role="alert" className="max-w-md px-6 text-center text-sm font-medium text-alert">
                {actionError}
              </p>
            ) : null}
          </>
        ) : (
          <ReviewComplete
            summary={summary}
            onReviewQueue={handleReviewQueue}
            onFinish={handleFinishCleanup}
          />
        )}
      </main>
      {isReviewing ? <LibraryStats summary={summary} /> : null}
    </div>
  );
}
