interface InitialEmptyStateProps {
  onChooseFolder: () => void;
}

export default function InitialEmptyState({
  onChooseFolder,
}: InitialEmptyStateProps) {
  return (
    <section className="flex w-full max-w-xl flex-col items-center px-6 text-center">
      <h1 className="text-[32px] leading-[1.1] font-semibold tracking-[-0.025em] text-ink sm:text-[44px]">
        Start with a music folder
      </h1>
      <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink">
        Choose a local folder and Riffl will scan your music files.
      </p>
      <button
        type="button"
        onClick={onChooseFolder}
        className="mt-11 h-14 cursor-pointer rounded-lg bg-petroleum px-11 text-sm font-bold tracking-[0.1em] uppercase text-white transition-colors duration-150 hover:bg-[#0f3d4e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petroleum active:translate-y-px"
      >
        Choose folder
      </button>
    </section>
  );
}
