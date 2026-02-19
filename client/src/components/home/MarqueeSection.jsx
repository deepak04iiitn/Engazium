"use client";

const items = [
  "10,000+ Active Creators",
  "500+ Engagement Squads",
  "92% Avg Engagement Rate",
  "Real Human Engagement",
  "100% Platform Safe",
  "Zero Bots or Fake Likes",
  "Niche-Based Squad Matching",
  "Engagement Percentage Tracking",
];

const MarqueeSection = () => {
  return (
    <section className="relative py-0 overflow-hidden">
      {/* Diagonal band — rotated to cut across the screen */}
      <div className="diagonal-band">
        {/* Row 1 */}
        <div className="py-3.5 sm:py-4 bg-primary/[0.04] dark:bg-primary/[0.06] border-y border-primary/[0.08] dark:border-primary/[0.1]">
          <div className="flex animate-marquee-fast">
            {[...items, ...items, ...items].map((item, i) => (
              <div
                key={`r1-${i}`}
                className="flex items-center shrink-0 mx-5 sm:mx-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mr-3 sm:mr-4 opacity-60" />
                <span className="text-sm sm:text-[15px] font-heading font-medium text-foreground/70 whitespace-nowrap uppercase tracking-wider">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — reverse direction */}
        <div className="py-3.5 sm:py-4 bg-primary/[0.02] dark:bg-primary/[0.03] border-b border-primary/[0.06] dark:border-primary/[0.08]">
          <div className="flex animate-marquee-reverse">
            {[...items, ...items, ...items].map((item, i) => (
              <div
                key={`r2-${i}`}
                className="flex items-center shrink-0 mx-5 sm:mx-8"
              >
                <span className="w-1 h-1 rounded-full bg-muted-foreground shrink-0 mr-3 sm:mr-4 opacity-40" />
                <span className="text-xs sm:text-sm font-medium text-muted-foreground/60 whitespace-nowrap tracking-wide">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
