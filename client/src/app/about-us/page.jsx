"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Users,
  Target,
  Heart,
  Zap,
  Globe,
  Shield,
  ArrowRight,
  MousePointerClick,
  Rocket,
  TrendingUp,
  MessageCircle,
  BarChart3,
  Lightbulb,
  Flag,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { delay, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
});

const values = [
  {
    icon: Users,
    title: "Community First",
    description:
      "We believe growth is a collective effort. Engazium brings creators together in squads so no one grows alone.",
    color: "from-violet-500/20 to-violet-500/5",
    iconBg: "bg-violet-500/10 dark:bg-violet-500/15",
    iconColor: "text-violet-500",
  },
  {
    icon: Shield,
    title: "Safety & Trust",
    description:
      "Every interaction is verified through our credit system. No bots, no fake engagement — only real creators helping each other.",
    color: "from-blue-500/20 to-blue-500/5",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/15",
    iconColor: "text-blue-500",
  },
  {
    icon: Zap,
    title: "Smart Engagement",
    description:
      "Our algorithm ensures fair, meaningful interactions. Credits keep the ecosystem balanced and rewarding for everyone.",
    color: "from-amber-500/20 to-amber-500/5",
    iconBg: "bg-amber-500/10 dark:bg-amber-500/15",
    iconColor: "text-amber-500",
  },
  {
    icon: Target,
    title: "Goal-Oriented Growth",
    description:
      "Whether you want 1K followers or 100K, our squad system scales with your ambitions and keeps you accountable.",
    color: "from-emerald-500/20 to-emerald-500/5",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    iconColor: "text-emerald-500",
  },
  {
    icon: Globe,
    title: "Platform Agnostic",
    description:
      "Instagram, YouTube, X, LinkedIn — Engazium works across every major social platform so you can grow everywhere.",
    color: "from-cyan-500/20 to-cyan-500/5",
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/15",
    iconColor: "text-cyan-500",
  },
  {
    icon: Heart,
    title: "Creator Empathy",
    description:
      "Built by creators, for creators. We understand the struggle of low reach and designed every feature to solve it.",
    color: "from-rose-500/20 to-rose-500/5",
    iconBg: "bg-rose-500/10 dark:bg-rose-500/15",
    iconColor: "text-rose-500",
  },
];

const milestones = [
  {
    year: "2025",
    quarter: "Q1",
    event: "Engazium idea born from creator frustration with declining organic reach",
    icon: Lightbulb,
  },
  {
    year: "2025",
    quarter: "Q3",
    event: "Squad-based engagement system designed and prototyped",
    icon: Target,
  },
  {
    year: "2026",
    quarter: "Q1",
    event: "Beta launch with early creator community",
    icon: Rocket,
  },
  {
    year: "2026",
    quarter: "Q2",
    event: "Credit-based engagement verification system goes live",
    icon: Zap,
  },
  {
    year: "2026",
    quarter: "Q3",
    event: "Multi-platform support across Instagram, YouTube, X & LinkedIn",
    icon: Globe,
  },
];

const stats = [
  { value: "500+", label: "Active Creators" },
  { value: "50+", label: "Squads Running" },
  { value: "4", label: "Platforms Supported" },
  { value: "3.2x", label: "Avg Reach Boost" },
];

const About = () => {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <div className="min-h-screen">
      <main>
        {/* ───────── Hero Section ───────── */}
        <section className="relative pt-28 sm:pt-32 md:pt-40 pb-20 sm:pb-28 md:pb-36 overflow-hidden">
          <div className="absolute inset-0 dot-grid" />
          <div className="absolute top-20 left-1/4 w-[280px] sm:w-[420px] md:w-[600px] h-[280px] sm:h-[420px] md:h-[600px] rounded-full blur-[100px] md:blur-[180px] bg-primary/5 dark:bg-primary/10" />
          <div className="absolute bottom-0 right-1/4 w-[200px] sm:w-[320px] md:w-[500px] h-[200px] sm:h-[320px] md:h-[500px] rounded-full blur-[80px] md:blur-[150px] bg-glow-secondary/3 dark:bg-glow-secondary/8" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] rounded-full blur-[200px] bg-primary/[0.02] dark:bg-primary/[0.04]" />

          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div {...anim(0)}>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 dark:bg-primary/10 border border-primary/12 dark:border-primary/20 px-4 py-1.5 text-xs font-medium text-primary mb-6">
                  <Heart className="h-3.5 w-3.5" />
                  Our Story
                </span>
              </motion.div>

              <motion.h1
                {...anim(0.1)}
                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6"
              >
                Empowering creators to{" "}
                <span className="text-gradient-animated">grow together</span>
              </motion.h1>

              <motion.p
                {...anim(0.2)}
                className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 sm:mb-16"
              >
                Engazium was born from a simple truth — social media algorithms
                don&apos;t favour small creators. We built a platform where
                creators help each other rise through genuine, squad-based
                engagement.
              </motion.p>

              {/* Stats row */}
              <motion.div
                {...anim(0.3)}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto"
              >
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-card/80 dark:bg-card/50 backdrop-blur-sm border border-border/40 dark:border-border/20 rounded-2xl p-4 sm:p-5"
                  >
                    <div className="text-2xl sm:text-3xl font-heading font-bold text-primary">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───────── Mission Section ───────── */}
        <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            {/* Centered header */}
            <motion.div {...anim(0)} className="text-center mb-16 sm:mb-20">
              <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Our Mission
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mt-3">
                Democratising social media{" "}
                <span className="text-gradient">growth</span>
              </h2>
            </motion.div>

            {/* 2-column mission layout */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
              {/* Left — narrative */}
              <motion.div
                {...anim(0.1)}
                className="relative bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-10 border border-border/40 dark:border-border/20 flex flex-col justify-center overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.00] to-primary/[0.00] group-hover:from-primary/[0.03] group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary/30 to-transparent transition-all duration-500" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-primary/8 dark:bg-primary/10 flex items-center justify-center mb-6">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-5">
                    Social media growth shouldn&apos;t be reserved for those who
                    can afford expensive ads or already have a massive following.
                    Engazium levels the playing field through its innovative
                    squad-based engagement system.
                  </p>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    By connecting creators into focused squads and using a
                    credit-based verification system, we ensure that every like,
                    comment, and share is genuine — creating a ripple effect that
                    algorithms can&apos;t ignore.
                  </p>
                </div>
              </motion.div>

              {/* Right — Vision & Purpose cards */}
              <div className="flex flex-col gap-6 sm:gap-8">
                <motion.div
                  {...anim(0.15)}
                  className="relative bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-7 sm:p-8 border border-border/40 dark:border-border/20 flex-1 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.00] to-emerald-500/[0.00] group-hover:from-emerald-500/[0.04] group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/0 group-hover:via-emerald-500/30 to-transparent transition-all duration-500" />

                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Target className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground mb-2 text-lg sm:text-xl tracking-tight">
                        Vision
                      </h3>
                      <p className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed">
                        A world where every creator — regardless of follower
                        count — has the tools and community to reach their
                        audience authentically.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  {...anim(0.2)}
                  className="relative bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-7 sm:p-8 border border-border/40 dark:border-border/20 flex-1 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/[0.00] to-rose-500/[0.00] group-hover:from-rose-500/[0.04] group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-500/0 group-hover:via-rose-500/30 to-transparent transition-all duration-500" />

                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-rose-500/10 dark:bg-rose-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Heart className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground mb-2 text-lg sm:text-xl tracking-tight">
                        Purpose
                      </h3>
                      <p className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed">
                        To replace the isolation of solo content creation with
                        the power of collective growth — one squad at a time.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Values Section ───────── */}
        <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
          <div className="absolute top-1/2 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[120px] md:blur-[180px] bg-primary/[0.03] dark:bg-primary/[0.06]" />
          <div className="absolute bottom-0 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full blur-[100px] md:blur-[150px] bg-glow-secondary/[0.03] dark:bg-glow-secondary/[0.06]" />

          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            {/* Centered header */}
            <motion.div
              {...anim(0)}
              className="text-center mb-16 sm:mb-20 md:mb-24"
            >
              <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
                What Drives Us
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mt-3">
                Our core <span className="text-gradient">values</span>
              </h2>
              <p className="text-muted-foreground mt-4 sm:mt-5 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
                The principles that guide everything we build and every decision
                we make.
              </p>
            </motion.div>

            {/* Values grid — 3 cols with colored hover effects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  {...anim(0.08 * i)}
                  className="group relative bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/40 dark:border-border/20 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-500 overflow-hidden"
                >
                  {/* Gradient hover bg */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />
                  {/* Shimmer line */}
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary/30 to-transparent transition-all duration-500" />

                  <div className="relative z-10">
                    <div
                      className={`w-12 h-12 rounded-2xl ${value.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}
                    >
                      <value.icon className={`h-6 w-6 ${value.iconColor}`} />
                    </div>
                    <h3 className="font-heading font-bold text-foreground mb-2 text-base sm:text-lg tracking-tight">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Timeline Section ───────── */}
        <section
          ref={timelineRef}
          className="relative py-20 sm:py-28 md:py-36 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            {/* Centered header */}
            <motion.div
              {...anim(0)}
              className="text-center mb-16 sm:mb-20 md:mb-24"
            >
              <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Our Journey
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mt-3">
                Key <span className="text-gradient">milestones</span>
              </h2>
              <p className="text-muted-foreground mt-4 sm:mt-5 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
                From an idea sparked by frustration to a growing platform for
                creators worldwide.
              </p>
            </motion.div>

            {/* Timeline — centered alternating */}
            <div className="relative max-w-5xl mx-auto">
              {/* Animated vertical line */}
              <div className="absolute left-6 sm:left-8 lg:left-1/2 top-0 bottom-0 lg:-translate-x-1/2 w-px">
                <div className="w-full h-full bg-border/30 dark:bg-border/20" />
                <motion.div
                  className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-primary/50"
                  style={{ height: lineHeight }}
                />
              </div>

              <div className="space-y-8 lg:space-y-0">
                {milestones.map((milestone, i) => {
                  const isEven = i % 2 === 0;

                  return (
                    <motion.div
                      key={i}
                      {...anim(0.1 * i)}
                      className={`relative lg:flex items-center ${
                        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                      } lg:gap-16`}
                    >
                      {/* Content card */}
                      <div
                        className={`ml-14 sm:ml-18 lg:ml-0 lg:w-1/2 ${
                          isEven
                            ? "lg:text-right lg:pr-16"
                            : "lg:text-left lg:pl-16"
                        }`}
                      >
                        <div className="group bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-border/40 dark:border-border/20 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-500 overflow-hidden relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.00] to-primary/[0.00] group-hover:from-primary/[0.03] group-hover:to-transparent transition-all duration-500 pointer-events-none" />

                          <div className="relative z-10">
                            <div
                              className={`flex items-center gap-3 mb-2 ${
                                isEven ? "lg:justify-end" : ""
                              }`}
                            >
                              <span className="inline-flex items-center gap-1.5 text-primary text-xs font-heading font-semibold tracking-wider uppercase bg-primary/8 dark:bg-primary/10 rounded-full px-3 py-1">
                                {milestone.year} · {milestone.quarter}
                              </span>
                            </div>
                            <p className="text-foreground text-sm sm:text-[15px] leading-relaxed">
                              {milestone.event}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Center dot */}
                      <div className="absolute left-6 sm:left-8 lg:left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card border-2 border-primary/30 dark:border-primary/40 flex items-center justify-center z-10 shadow-lg dark:shadow-none">
                        <milestone.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>

                      {/* Empty side on desktop */}
                      <div className="hidden lg:block lg:w-1/2" />
                    </motion.div>
                  );
                })}
              </div>

              {/* End flag */}
              <motion.div
                {...anim(0.6)}
                className="flex justify-center mt-10 lg:mt-14"
              >
                <div className="flex items-center gap-2 text-muted-foreground/60">
                  <Flag className="h-4 w-4 text-primary/50" />
                  <span className="text-xs font-medium tracking-wider uppercase">
                    And we&apos;re just getting started
                  </span>
                  <TrendingUp className="h-4 w-4 text-primary/50" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───────── CTA Section ───────── */}
        <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[700px] h-[400px] md:h-[700px] rounded-full blur-[150px] md:blur-[250px] bg-primary/[0.04] dark:bg-primary/[0.08]" />

          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <motion.div
              {...anim(0)}
              className="relative max-w-4xl mx-auto text-center"
            >
              <div className="relative bg-card/80 dark:bg-card/60 backdrop-blur-sm rounded-3xl sm:rounded-[2rem] p-10 sm:p-14 md:p-20 border border-border/40 dark:border-border/20 overflow-hidden">
                {/* Decorative gradient border */}
                <div className="absolute inset-0 rounded-3xl sm:rounded-[2rem] bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2,
                    }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center mx-auto mb-8"
                  >
                    <Rocket className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                  </motion.div>

                  <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-5">
                    Ready to join the{" "}
                    <span className="text-gradient-animated">movement?</span>
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    Thousands of creators are already growing together on
                    Engazium. Be part of the community that&apos;s rewriting the
                    rules of social media growth.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/sign-up">
                      <Button
                        size="lg"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box rounded-xl sm:rounded-2xl px-8 sm:px-10 py-6 font-heading font-semibold w-full sm:w-auto text-[15px] sm:text-base"
                      >
                        <MousePointerClick className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        Get Started — It&apos;s Free
                      </Button>
                    </Link>
                    <Link href="/how-it-works">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-border text-foreground hover:bg-secondary/80 rounded-xl sm:rounded-2xl px-8 sm:px-10 py-6 font-heading w-full sm:w-auto text-[15px] sm:text-base"
                      >
                        See How It Works
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
