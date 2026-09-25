import Header from "./components/Header";
import { initialSummary } from "./data/mockLibrary";

export default function App() {
  return (
    <div className="flex min-h-full flex-col">
      <Header reviewed={initialSummary.reviewed} total={initialSummary.total} />
    </div>
  );
}
