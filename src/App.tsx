import Header from "./components/Header";
import TrackInfo from "./components/TrackInfo";
import AudioPlayer from "./components/AudioPlayer";
import { initialSummary, mockTracks } from "./data/mockLibrary";
import { usePlayback } from "./hooks/usePlayback";

const track = mockTracks[0];

export default function App() {
  const { currentTime, isPlaying, seek, toggle } = usePlayback(
    track.duration,
    track.id,
  );

  return (
    <div className="flex min-h-full flex-col">
      <Header reviewed={initialSummary.reviewed} total={initialSummary.total} />
      <main className="flex flex-1 flex-col items-center justify-center gap-14 px-6 pb-16">
        <TrackInfo track={track} />
        <AudioPlayer
          currentTime={currentTime}
          duration={track.duration}
          isPlaying={isPlaying}
          onSeek={seek}
          onToggle={toggle}
        />
      </main>
    </div>
  );
}
