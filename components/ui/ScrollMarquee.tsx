interface ScrollMarqueeProps {
  items: string[];
}

export default function ScrollMarquee({ items }: ScrollMarqueeProps) {
  return (
    <div className="w-full overflow-hidden py-4 border-y-4 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black select-none">
      <div className="flex w-max animate-marquee">
        {/* First track */}
        <div className="flex items-center gap-8 md:gap-16 pr-8 md:pr-16 whitespace-nowrap">
          {items.map((item, index) => (
            <div key={`track1-${index}`} className="flex items-center gap-8 md:gap-16">
              <span className="font-mono text-sm md:text-base font-bold tracking-widest uppercase">
                {item}
              </span>
              <span className="text-brutal-coral text-lg font-black">+</span>
            </div>
          ))}
        </div>

        {/* Second track (identical copy for seamless loops) */}
        <div className="flex items-center gap-8 md:gap-16 pr-8 md:pr-16 whitespace-nowrap" aria-hidden="true">
          {items.map((item, index) => (
            <div key={`track2-${index}`} className="flex items-center gap-8 md:gap-16">
              <span className="font-mono text-sm md:text-base font-bold tracking-widest uppercase">
                {item}
              </span>
              <span className="text-brutal-coral text-lg font-black">+</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
