interface ScrollMarqueeProps {
  items: string[];
}

export default function ScrollMarquee({ items }: ScrollMarqueeProps) {
  return (
    <div className="w-full overflow-hidden py-3 border-y border-[var(--border)] bg-neutral-50 dark:bg-neutral-900/50 text-neutral-500 dark:text-neutral-400 select-none">
      <div className="flex w-max animate-marquee">
        {/* First track */}
        <div className="flex items-center gap-8 md:gap-16 pr-8 md:pr-16 whitespace-nowrap">
          {items.map((item, index) => (
            <div key={`track1-${index}`} className="flex items-center gap-8 md:gap-16">
              <span className="font-mono text-xs md:text-sm font-semibold tracking-widest uppercase">
                {item}
              </span>
              <span className="text-neutral-300 dark:text-neutral-700 text-sm font-bold">•</span>
            </div>
          ))}
        </div>

        {/* Second track (identical copy for seamless loops) */}
        <div className="flex items-center gap-8 md:gap-16 pr-8 md:pr-16 whitespace-nowrap" aria-hidden="true">
          {items.map((item, index) => (
            <div key={`track2-${index}`} className="flex items-center gap-8 md:gap-16">
              <span className="font-mono text-xs md:text-sm font-semibold tracking-widest uppercase">
                {item}
              </span>
              <span className="text-neutral-300 dark:text-neutral-700 text-sm font-bold">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
