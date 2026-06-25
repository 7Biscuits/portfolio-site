export default function Footer() {
  return (
    <footer className="border-t-4 border-black dark:border-white bg-[var(--card)]/50 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs font-bold text-[var(--text-primary)] text-center sm:text-left uppercase">
          Built by Rudransh Srivastava. © 2026.
        </p>
        <p className="font-mono text-[10px] font-bold text-[var(--text-muted)] text-center sm:text-right tracking-wider uppercase">
          DESIGNED WITH // SLEEP DEPRIVED EYES
        </p>
      </div>
    </footer>
  );
}
