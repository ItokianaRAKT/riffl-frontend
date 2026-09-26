import DecisionControls from "./components/DecisionControls";
import Header from "./components/Header";
import TrackInfo from "./components/TrackInfo";
import AudioPlayer from "./components/AudioPlayer";
import { usePlayback } from "./hooks/usePlayback";
import { useReviewSession } from "./hooks/useReviewSession";

export default function App() {
  const { currentTrack, summary, decide } = useReviewSession();
  const { currentTime, isPlaying, seek, toggle } = usePlayback(
    currentTrack?.duration ?? 0,
    currentTrack?.id ?? "no-track",
  );

  return (
    <div className="flex min-h-full flex-col">
      <Header reviewed={summary.reviewed} total={summary.total} />
      <main className="flex flex-1 flex-col items-center justify-center gap-14 px-6 pb-16">
        {currentTrack ? (
          <>
            <TrackInfo track={currentTrack} />
            <AudioPlayer
              currentTime={currentTime}
              duration={currentTrack.duration}
              isPlaying={isPlaying}
              onSeek={seek}
              onToggle={toggle}
            />
            <DecisionControls onDecide={decide} />
          </>
        ) : (
          <p className="text-sm font-medium text-muted">Library reviewed</p>
        )}
      </main>
    </div>
  );
}
