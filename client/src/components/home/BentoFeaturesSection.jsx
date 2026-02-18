"use client";

import { motion } from "framer-motion";
import {
  Users,
  Award,
  Shield,
  Clock,
  BarChart3,
  Heart,
  TrendingDown,
  Sparkles,
} from "lucide-react";

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay },
});

const features = [
  {
    icon: Users,
    title: "Niche-Based Matching",
    description:
      "Matched by niche, platform, and follower range for maximum relevance.",
  },
  {
    icon: Award,
    title: "Credit System",
    description:
      "Earn credits by engaging. Spend to post. Everyone contributes equally.",
  },
  {
    icon: Shield,
    title: "Platform Safe",
    description:
      "Time-distributed engagement mimics natural behavior. No penalties.",
  },
  {
    icon: BarChart3,
    title: "Weekly Analytics",
    description:
      "Track follower growth, reach, and engagement metrics to stay motivated.",
  },
  {
    icon: Heart,
    title: "Real Human Engagement",
    description:
      "No bots, no automation. Every interaction comes from a real creator.",
  },
  {
    icon: Clock,
    title: "Organic Timing",
    description:
      "Engagement spread naturally over time to avoid suspicious spikes.",
  },
];

const BentoFeaturesSection = () => {
  return (
    <section id="features" className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6">
        {/* Section header — left-aligned for editorial feel */}
        <motion.div {...anim()} className="mb-12 sm:mb-16 md:mb-20 max-w-2xl">
          <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mt-3 tracking-tight">
            Everything you need to{" "}
            <span className="text-gradient">grow organically</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* ── Hero card: problem → solution (spans 2 cols on lg) ── */}
          <motion.div
            {...anim(0)}
            className="md:col-span-2 bg-card rounded-3xl p-6 sm:p-8 md:p-10 border border-border/50 shadow-sm dark:shadow-none dark:border-border/30 relative overflow-hidden"
          >
            {/* Decorative gradient wash */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/[0.04] to-transparent dark:from-primary/[0.08] pointer-events-none" />

            <div className="relative z-10 max-w-xl">
              {/* Problem */}
              <div className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive mb-3">
                <TrendingDown className="h-3 w-3" />
                The Problem
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-2">
                Algorithms bury small creators
              </h3>
              <p className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed mb-8">
                Without early engagement your content never surfaces. Traditional
                pods are unsafe, filled with freeloaders, and risk your account.
              </p>

              {/* Solution */}
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-3">
                <Sparkles className="h-3 w-3" />
                The Solution
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-2">
                Squad-based engagement that works
              </h3>
              <p className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed">
                Engazium matches you with real creators in your niche. Engage
                authentically, boost each other's reach, and grow together — safely.
              </p>
            </div>
          </motion.div>

          {/* ── Stat accent card ── */}
          <motion.div
            {...anim(0.08)}
            className="bg-primary rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[200px] lg:min-h-0"
          >
            <Sparkles className="h-6 w-6 text-primary-foreground/50" />
            <div>
              <p className="text-4xl sm:text-5xl font-heading font-bold text-primary-foreground">
                3x
              </p>
              <p className="text-sm sm:text-[15px] text-primary-foreground/70 mt-1">
                Average reach boost in 30 days
              </p>
            </div>
          </motion.div>

          {/* ── Feature cards ── */}
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              {...anim(0.04 * i)}
              className="bg-card rounded-3xl p-6 sm:p-7 border border-border/50 shadow-sm dark:shadow-none dark:border-border/30 group hover:border-primary/20 dark:hover:border-primary/20 transition-colors duration-300"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/8 dark:bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/12 dark:group-hover:bg-primary/15 transition-colors">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1.5 text-[15px] sm:text-base">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoFeaturesSection;

