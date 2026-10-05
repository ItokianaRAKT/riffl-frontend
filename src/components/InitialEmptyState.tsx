import { useState, type FormEvent } from "react";
import FolderPicker from "./FolderPicker";

interface InitialEmptyStateProps {
  value: string;
  error: string | null;
  scanning: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function InitialEmptyState({
  value,
  error,
  scanning,
  onChange,
  onSubmit,
}: InitialEmptyStateProps) {
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (scanning || !value.trim()) return;
    onSubmit();
  };

  return (
    <section className="flex w-full max-w-xl flex-col items-center px-6 text-center">
      <h1 className="text-[32px] leading-[1.1] font-semibold tracking-[-0.025em] text-ink sm:text-[44px]">
        Start with a music folder
      </h1>
      <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink">
        Browse to a local folder or enter its path, and Riffl will scan your
        music files.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-11 flex w-full max-w-md flex-col items-center gap-4"
      >
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch">
          <label htmlFor="folder-path" className="sr-only">
            Music folder path
          </label>
          <input
            id="folder-path"
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="/home/you/Music"
            autoComplete="off"
            spellCheck={false}
            disabled={scanning}
            className="h-14 w-full min-w-0 flex-1 rounded-lg border border-[#172026]/15 bg-white px-4 text-left text-sm text-ink placeholder:text-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum disabled:opacity-60"
          />
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            disabled={scanning}
            className="h-14 shrink-0 cursor-pointer rounded-lg border border-[#172026]/15 bg-white px-6 text-sm font-bold tracking-[0.1em] uppercase text-ink transition-colors duration-150 hover:bg-[#172026]/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 disabled:active:translate-y-0"
          >
            Browse…
          </button>
        </div>
        <button
          type="submit"
          disabled={scanning || !value.trim()}
          className="h-14 w-full cursor-pointer rounded-lg bg-petroleum px-11 text-sm font-bold tracking-[0.1em] uppercase text-white transition-colors duration-150 hover:bg-[#0f3d4e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-petroleum disabled:active:translate-y-0"
        >
          {scanning ? "Scanning…" : "Choose folder"}
        </button>
      </form>

      {error ? (
        <p role="alert" className="mt-6 max-w-md text-sm font-medium text-alert">
          {error}
        </p>
      ) : null}

      {pickerOpen ? (
        <FolderPicker
          onSelect={(path) => {
            onChange(path);
            setPickerOpen(false);
          }}
          onClose={() => setPickerOpen(false)}
        />
      ) : null}
    </section>
  );
}
