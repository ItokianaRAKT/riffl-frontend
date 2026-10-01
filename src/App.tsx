import { useCallback, useState } from "react";
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
import { ApiError, scanFolder, toTrack } from "./api/client";
import type { Decision, Track } from "./types";

export default function App() {
  const [screen, setScreen] = useState<"reviewing" | "empty">("empty");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [folderPath, setFolderPath] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  const { currentTrack, summary, decide, reset } = useReviewSession({ tracks });

  const handleTrackEnded = useCallback(() => {
    if (!currentTrack) return;
    decide("skip");
  }, [currentTrack, decide]);

  const { audioRef, currentTime, duration, isPlaying, error, seek, toggle } =
    usePlayback(
      currentTrack?.id ?? "no-track",
      currentTrack?.duration ?? 0,
      handleTrackEnded,
    );

  const handleDecide = useCallback(
    (decision: Decision) => {
      if (!currentTrack) return;
      decide(decision);
    },
    [currentTrack, decide],
  );

  const isReviewing = screen === "reviewing";

  useReviewShortcuts({
    enabled: isReviewing && Boolean(currentTrack),
    onDecide: handleDecide,
    onTogglePlayback: toggle,
  });

  const handleReviewQueue = useCallback(() => {}, []);

  const handleFinishCleanup = useCallback(() => setScreen("empty"), []);

  const handleChooseFolder = useCallback(async () => {
    const path = folderPath.trim();
    if (!path || scanning) return;

    setScanning(true);
    setScanError(null);

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
            <TrackInfo track={currentTrack} duration={duration} />
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
            <DecisionControls onDecide={handleDecide} />
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
