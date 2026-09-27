import { useCallback } from "react";
import DecisionControls from "./components/DecisionControls";
import Header from "./components/Header";
import TrackInfo from "./components/TrackInfo";
import TrackNavigation from "./components/TrackNavigation";
import AudioPlayer from "./components/AudioPlayer";
import LibraryStats from "./components/LibraryStats";
import { usePlayback } from "./hooks/usePlayback";
import { useReviewSession } from "./hooks/useReviewSession";
import { useReviewShortcuts } from "./hooks/useReviewShortcuts";
import type { Decision } from "./types";

export default function App() {
  const { currentTrack, summary, canGoBack, canGoForward, decide, goBack, goForward } =
    useReviewSession();
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

  useReviewShortcuts({
    enabled: Boolean(currentTrack),
    onDecide: handleDecide,
    onTogglePlayback: toggle,
  });

  return (
    <div className="flex min-h-full flex-col">
      <Header reviewed={summary.reviewed} total={summary.total} />
      <main className="flex flex-1 flex-col items-center justify-center gap-14 px-6 pb-16">
        {currentTrack ? (
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
          <p className="text-sm font-medium text-muted">Library reviewed</p>
        )}
      </main>
      <LibraryStats summary={summary} />
    </div>
  );
}
