"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Users, Share2, TrendingUp, ArrowDown } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    num: "01",
    title: "Sign Up & Pick Your Niche",
    description:
      "Create your account and select your content niche, format, and language preferences. Our smart matching begins immediately.",
    visual: "🎯",
  },
  {
    icon: Users,
    num: "02",
    title: "Join a Squad",
    description:
      "Get matched into a squad of 10–20 creators in your niche with similar follower ranges. Every squad is curated for maximum relevance.",
    visual: "👥",
  },
  {
    icon: Share2,
    num: "03",
    title: "Share & Engage",
    description:
      "Post your content link. Squad members engage with meaningful comments, likes, and saves — all time-distributed for natural behavior.",
    visual: "🚀",
  },
  {
    icon: TrendingUp,
    num: "04",
    title: "Watch Your Reach Grow",
    description:
      "Early engagement signals boost your algorithmic reach organically and safely. Track your growth with detailed analytics.",
    visual: "📈",
  },
];

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.215, 0.61, 0.355, 1] },
});

const HowItWorksSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-28 sm:py-36 md:py-44 overflow-hidden"
    >
      <div className="container mx-auto px-5 sm:px-6">
        {/* Header */}
        <motion.div
          {...anim()}
          className="text-center mb-20 sm:mb-24 md:mb-28"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 dark:bg-primary/10 border border-primary/12 dark:border-primary/20 px-4 py-1.5 text-xs font-medium text-primary mb-6">
            <ArrowDown className="h-3 w-3" />
            How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tighter">
            Four steps to
            <br />
            <span className="text-gradient-animated">better engagement</span>
          </h2>
          <p className="text-muted-foreground mt-5 sm:mt-6 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            A simple, structured process that turns engagement from a struggle
            into a system.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Animated vertical line — desktop only */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px">
            <div className="w-full h-full bg-border/30 dark:bg-border/20" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-primary/50"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={step.num}
                  {...anim(0.1 * i)}
                  className={`relative lg:flex items-center ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } lg:gap-16`}
                >
                  {/* Content side */}
                  <div
                    className={`lg:w-1/2 ${
                      isEven ? "lg:text-right lg:pr-16" : "lg:text-left lg:pl-16"
                    }`}
                  >
                    <div
                      className={`bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/40 dark:border-border/20 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-500 group`}
                    >
                      {/* Step number — large watermark */}
                      <span className="block text-7xl sm:text-8xl font-heading font-bold text-primary/15 dark:text-primary/20 leading-none mb-3 group-hover:text-primary/25 dark:group-hover:text-primary/30 transition-colors duration-500">
                        {step.num}
                      </span>

                      <div className="flex items-center gap-3 mb-3 lg:mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/8 dark:bg-primary/10 flex items-center justify-center group-hover:bg-primary/12 dark:group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-500">
                          <step.icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-heading font-bold text-foreground text-lg sm:text-xl tracking-tight">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center dot — desktop only */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-card border-2 border-primary/30 dark:border-primary/40 items-center justify-center z-10 shadow-lg dark:shadow-none">
                    <span className="text-lg">{step.visual}</span>
                  </div>

                  {/* Empty space for the other side — desktop */}
                  <div className="hidden lg:block lg:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
