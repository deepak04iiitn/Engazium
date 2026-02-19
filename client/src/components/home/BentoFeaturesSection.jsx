"use client";

import { motion } from "framer-motion";
import {
  Users,
  Percent,
  Shield,
  Clock,
  BarChart3,
  Heart,
  TrendingDown,
  Target,
  Activity,
  Zap,
} from "lucide-react";

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.215, 0.61, 0.355, 1] },
});

const features = [
  {
    icon: Users,
    title: "Niche-Based Matching",
    description:
      "Matched by niche, platform, and follower range for maximum relevance.",
    accent: "from-primary/10 to-primary/5",
  },
  {
    icon: Percent,
    title: "Engagement % Tracking",
    description:
      "Your engagement percentage is tracked in real time — stay consistent, stay visible.",
    accent: "from-glow-secondary/10 to-glow-secondary/5",
  },
  {
    icon: Shield,
    title: "Platform Safe",
    description:
      "Time-distributed engagement mimics natural behavior. No penalties.",
    accent: "from-primary/10 to-primary/5",
  },
  {
    icon: BarChart3,
    title: "Weekly Analytics",
    description:
      "Track follower growth, reach, and engagement metrics to stay motivated.",
    accent: "from-glow-secondary/10 to-glow-secondary/5",
  },
  {
    icon: Heart,
    title: "Real Human Engagement",
    description:
      "No bots, no automation. Every interaction comes from a real creator.",
    accent: "from-primary/10 to-primary/5",
  },
  {
    icon: Clock,
    title: "Organic Timing",
    description:
      "Engagement spread naturally over time to avoid suspicious spikes.",
    accent: "from-glow-secondary/10 to-glow-secondary/5",
  },
];

const BentoFeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative py-28 sm:py-36 md:py-44 overflow-hidden"
    >
      {/* Subtle background mesh */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        {/* Section header — centered with large typography */}
        <motion.div {...anim()} className="text-center mb-20 sm:mb-24 md:mb-28">
          <motion.span
            {...anim(0.05)}
            className="inline-flex items-center gap-2 rounded-full bg-primary/8 dark:bg-primary/10 border border-primary/12 dark:border-primary/20 px-4 py-1.5 text-xs font-medium text-primary mb-6"
          >
            <Zap className="h-3 w-3" />
            Features
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tighter">
            Everything you need to
            <br />
            <span className="text-gradient-animated">grow organically</span>
          </h2>
          <p className="text-muted-foreground mt-5 sm:mt-6 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            A structured, transparent system that rewards consistency and real
            engagement.
          </p>
        </motion.div>

        {/* Problem → Solution editorial block */}
        <motion.div
          {...anim(0)}
          className="mb-16 sm:mb-20 max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-0 rounded-[2rem] overflow-hidden border border-border/40 dark:border-border/20">
            {/* Problem */}
            <div className="relative p-8 sm:p-10 md:p-12 bg-destructive/[0.03] dark:bg-destructive/[0.04]">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-destructive/20 to-transparent" />
              <div className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-3.5 py-1.5 text-xs font-medium text-destructive mb-5">
                <TrendingDown className="h-3 w-3" />
                The Problem
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
                Algorithms bury small creators
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md">
                Without early engagement your content never surfaces. Traditional
                pods are unsafe, filled with freeloaders, and risk your account.
              </p>
              {/* Decorative large number */}
              <span className="absolute bottom-4 right-6 text-[8rem] sm:text-[10rem] font-heading font-bold text-destructive/[0.04] dark:text-destructive/[0.06] leading-none select-none pointer-events-none">
                ✕
              </span>
            </div>

            {/* Solution */}
            <div className="relative p-8 sm:p-10 md:p-12 bg-primary/[0.03] dark:bg-primary/[0.04]">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary mb-5">
                <Target className="h-3 w-3" />
                The Solution
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
                Squad-based engagement that works
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md">
                Engazium matches you with real creators in your niche. Engage
                authentically, boost each other's reach, and grow together —
                safely.
              </p>
              {/* Decorative large checkmark */}
              <span className="absolute bottom-4 right-6 text-[8rem] sm:text-[10rem] font-heading font-bold text-primary/[0.06] dark:text-primary/[0.08] leading-none select-none pointer-events-none">
                ✓
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stat highlight bar */}
        <motion.div
          {...anim(0.05)}
          className="mb-16 sm:mb-20 max-w-6xl mx-auto"
        >
          <div className="relative bg-primary rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/[0.06] to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-black/[0.1] to-transparent pointer-events-none rounded-br-3xl" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <p className="text-6xl sm:text-7xl md:text-8xl font-heading font-bold text-primary-foreground tracking-tighter">
                  92%
                </p>
                <p className="text-sm sm:text-base text-primary-foreground/70 mt-1 max-w-sm">
                  Average engagement rate across active squads — outperforming
                  industry averages by 8x
                </p>
              </div>

              <div className="flex gap-3 sm:gap-4">
                {[40, 55, 48, 62, 58, 72, 65, 78, 74, 85, 80, 92].map(
                  (h, i) => (
                    <div
                      key={i}
                      className="w-2 sm:w-2.5 rounded-full bg-primary-foreground/20"
                      style={{ height: `${h * 0.8}px` }}
                    >
                      <div
                        className="w-full rounded-full bg-primary-foreground/60 transition-all duration-700"
                        style={{
                          height: `${h}%`,
                          marginTop: `${100 - h}%`,
                        }}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature cards — staggered masonry-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              {...anim(0.06 * i)}
              className={`group relative bg-card/80 dark:bg-card/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/40 dark:border-border/20 hover:border-primary/25 dark:hover:border-primary/25 transition-all duration-500 overflow-hidden ${
                i === 0 || i === 5 ? "lg:row-span-1" : ""
              }`}
            >
              {/* Hover gradient wash */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.00] to-primary/[0.00] group-hover:from-primary/[0.03] group-hover:to-transparent transition-all duration-500 pointer-events-none" />

              {/* Shimmer line on hover */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary/30 to-transparent transition-all duration-500" />

              <div className="relative z-10">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-primary/8 dark:bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/12 dark:group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-500">
                  <feature.icon className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2 text-base sm:text-lg tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Large decorative number */}
              <span className="absolute -bottom-4 -right-2 text-[6rem] font-heading font-bold text-foreground/[0.02] dark:text-foreground/[0.03] leading-none select-none pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoFeaturesSection;
