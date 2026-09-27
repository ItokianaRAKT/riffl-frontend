import { useCallback, useState } from "react";
import DecisionControls from "./components/DecisionControls";
import Header from "./components/Header";
import TrackInfo from "./components/TrackInfo";
import TrackNavigation from "./components/TrackNavigation";
import AudioPlayer from "./components/AudioPlayer";
import LibraryStats from "./components/LibraryStats";
import ReviewComplete from "./components/ReviewComplete";
import InitialEmptyState from "./components/InitialEmptyState";
import { usePlayback } from "./hooks/usePlayback";
import { useReviewSession } from "./hooks/useReviewSession";
import { useReviewShortcuts } from "./hooks/useReviewShortcuts";
import { finalSummary } from "./data/mockLibrary";
import type { Decision } from "./types";

export default function App() {
  const {
    currentTrack,
    summary,
    canGoBack,
    canGoForward,
    decide,
    goBack,
    goForward,
    reset,
  } = useReviewSession();
  const [screen, setScreen] = useState<"reviewing" | "empty">("reviewing");
  const { currentTime, isPlaying, seek, toggle } = usePlayback(
    currentTrack?.duration ?? 0,
    currentTrack?.id ?? "no-track",
  );

  const handleDecide = useCallback(
    (decision: Decision) => {
      if (!currentTrack) return;
      decide(decision);
    },
    [currentTrack, decide],
  );

  const isComplete = !currentTrack;
  const displaySummary = isComplete ? finalSummary : summary;
  const isReviewing = screen === "reviewing";

  useReviewShortcuts({
    enabled: isReviewing && Boolean(currentTrack),
    onDecide: handleDecide,
    onTogglePlayback: toggle,
    onPreviousTrack: goBack,
    onNextTrack: goForward,
  });

  const handleReviewQueue = useCallback(() => {}, []);

  const handleFinishCleanup = useCallback(() => setScreen("empty"), []);

  const handleChooseFolder = useCallback(() => {
    reset();
    setScreen("reviewing");
  }, [reset]);

  return (
    <div className="flex min-h-full flex-col">
      <Header
        reviewed={isReviewing ? displaySummary.reviewed : undefined}
        total={isReviewing ? displaySummary.total : undefined}
      />
      <main className="flex flex-1 flex-col items-center justify-center px-6 gap-14 sm:gap-16 lg:gap-20 xl:gap-24">
        {screen === "empty" ? (
          <InitialEmptyState onChooseFolder={handleChooseFolder} />
        ) : currentTrack ? (
          <>
            <TrackNavigation
              canGoBack={canGoBack}
              canGoForward={canGoForward}
              onBack={goBack}
              onForward={goForward}
            >
              <TrackInfo track={currentTrack} />
            </TrackNavigation>
            <AudioPlayer
              currentTime={currentTime}
              duration={currentTrack.duration}
              isPlaying={isPlaying}
              onSeek={seek}
              onToggle={toggle}
            />
            <DecisionControls onDecide={handleDecide} />
          </>
        ) : (
          <ReviewComplete
            summary={displaySummary}
            onReviewQueue={handleReviewQueue}
            onFinish={handleFinishCleanup}
          />
        )}
      </main>
      {isReviewing ? <LibraryStats summary={displaySummary} /> : null}
    </div>
  );
}
