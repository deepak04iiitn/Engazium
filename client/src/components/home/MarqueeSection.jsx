"use client";

const items = [
  "10,000+ Active Creators",
  "500+ Engagement Squads",
  "3x Average Reach Boost",
  "Real Human Engagement",
  "100% Platform Safe",
  "Zero Bots or Fake Likes",
  "Niche-Based Squad Matching",
  "Credit-Based Fairness System",
];

const MarqueeSection = () => {
  return (
    <section className="py-4 sm:py-5 overflow-hidden border-y border-border/40 bg-secondary/40 dark:bg-secondary/30">
      <div className="relative">
        <div className="flex animate-marquee">
          {[...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center shrink-0 mx-5 sm:mx-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mr-3 sm:mr-4" />
              <span className="text-sm sm:text-[15px] font-medium text-muted-foreground whitespace-nowrap">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;

