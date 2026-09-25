import Header from "./components/Header";
import TrackInfo from "./components/TrackInfo";
import { initialSummary, mockTracks } from "./data/mockLibrary";

export default function App() {
  return (
    <div className="flex min-h-full flex-col">
      <Header reviewed={initialSummary.reviewed} total={initialSummary.total} />
      <main className="flex flex-1 flex-col items-center justify-center gap-14 px-6 pb-16">
        <TrackInfo track={mockTracks[0]} />
      </main>
    </div>
  );
}
