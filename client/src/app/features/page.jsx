"use client";

import React from "react";
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
  Zap,
  ArrowRight,
  CheckCircle2,
  MousePointerClick,
  Rocket,
  Globe,
  Lock,
  Bell,
  Eye,
  MessageCircle,
  Award,
  TrendingUp,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] },
});

const coreFeatures = [
  {
    icon: Users,
    title: "Niche-Based Squad Matching",
    description:
      "Get matched into squads of creators who share your niche, platform, and follower range. Every squad is curated for maximum relevance and mutual benefit.",
    color: "from-violet-500/20 to-violet-500/5",
    iconBg: "bg-violet-500/10 dark:bg-violet-500/15",
    iconColor: "text-violet-500",
    highlights: ["Niche filtering", "Follower range matching", "Platform-specific"],
  },
  {
    icon: Percent,
    title: "Real-Time Engagement Tracking",
    description:
      "Your engagement percentage is tracked live — see exactly how active you are and how your squad is performing. Consistency is rewarded, freeloaders are flagged.",
    color: "from-blue-500/20 to-blue-500/5",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/15",
    iconColor: "text-blue-500",
    highlights: ["Live tracking", "Accountability scores", "Auto warnings"],
  },
  {
    icon: Shield,
    title: "Platform-Safe Engagement",
    description:
      "All engagement is time-distributed to mimic natural behavior. No sudden spikes, no bot-like patterns — your account stays safe while your reach grows.",
    color: "from-emerald-500/20 to-emerald-500/5",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    iconColor: "text-emerald-500",
    highlights: ["Time-distributed", "Natural behavior", "Zero risk"],
  },
  {
    icon: BarChart3,
    title: "Weekly Analytics Dashboard",
    description:
      "Track your follower growth, reach, impressions, and engagement metrics week over week. See the direct impact of your squad activity on your growth.",
    color: "from-amber-500/20 to-amber-500/5",
    iconBg: "bg-amber-500/10 dark:bg-amber-500/15",
    iconColor: "text-amber-500",
    highlights: ["Growth charts", "Week-over-week", "Reach tracking"],
  },
  {
    icon: Heart,
    title: "100% Human Engagement",
    description:
      "No bots, no automation, no fake accounts. Every like, comment, save, and share comes from a real creator in your niche who genuinely cares about your content.",
    color: "from-rose-500/20 to-rose-500/5",
    iconBg: "bg-rose-500/10 dark:bg-rose-500/15",
    iconColor: "text-rose-500",
    highlights: ["Verified creators", "Authentic interactions", "Quality comments"],
  },
  {
    icon: Clock,
    title: "Smart Timing Engine",
    description:
      "Engagement is spread naturally over hours — not dumped all at once. This ensures algorithm-friendly distribution that maximises your content's reach window.",
    color: "from-cyan-500/20 to-cyan-500/5",
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/15",
    iconColor: "text-cyan-500",
    highlights: ["Spread over 24h", "Algorithm-friendly", "Max reach window"],
  },
];

const additionalFeatures = [
  {
    icon: Globe,
    title: "Multi-Platform Support",
    desc: "Instagram, YouTube, X, LinkedIn — grow on every platform from one dashboard.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    desc: "Get notified when squad members post new content so you never miss an engagement window.",
  },
  {
    icon: Lock,
    title: "Anti-Freeloading System",
    desc: "Members below the minimum engagement threshold get warned and eventually removed automatically.",
  },
  {
    icon: Eye,
    title: "Transparent Leaderboards",
    desc: "See who's contributing the most. Squad leaderboards keep everyone motivated and accountable.",
  },
  {
    icon: MessageCircle,
    title: "Meaningful Comment Guidelines",
    desc: "Quality over quantity — our guidelines ensure every comment adds real value to the post.",
  },
  {
    icon: Award,
    title: "Squad Tiers & Plans",
    desc: "Growth, Pro, and Momentum tiers let you pick the squad intensity that matches your posting frequency.",
  },
  {
    icon: Activity,
    title: "Engagement Streaks",
    desc: "Build consistency with engagement streaks. The longer your streak, the more visibility you earn.",
  },
  {
    icon: TrendingUp,
    title: "Algorithmic Boost",
    desc: "Early authentic engagement signals tell algorithms your content is worth surfacing to a wider audience.",
  },
];

const Features = () => {
  return (
    <div className="min-h-screen">
      <main>
        {/* ───────── Hero Section ───────── */}
        <section className="relative pt-28 sm:pt-32 md:pt-40 pb-20 sm:pb-28 md:pb-36 overflow-hidden">
          <div className="absolute inset-0 dot-grid" />
          <div className="absolute top-20 right-1/4 w-[280px] sm:w-[420px] md:w-[600px] h-[280px] sm:h-[420px] md:h-[600px] rounded-full blur-[100px] md:blur-[180px] bg-primary/5 dark:bg-primary/10" />
          <div className="absolute bottom-0 left-1/4 w-[200px] sm:w-[320px] md:w-[500px] h-[200px] sm:h-[320px] md:h-[500px] rounded-full blur-[80px] md:blur-[150px] bg-glow-secondary/3 dark:bg-glow-secondary/8" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] rounded-full blur-[200px] bg-primary/[0.02] dark:bg-primary/[0.04]" />

          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div {...anim(0)}>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 dark:bg-primary/10 border border-primary/12 dark:border-primary/20 px-4 py-1.5 text-xs font-medium text-primary mb-6">
                  <Zap className="h-3.5 w-3.5" />
                  Features
                </span>
              </motion.div>

              <motion.h1
                {...anim(0.1)}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tighter mb-6"
              >
                Everything you need to{" "}
                <span className="text-gradient-animated">grow organically</span>
              </motion.h1>

              <motion.p
                {...anim(0.2)}
                className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              >
                A structured, transparent system that rewards consistency and
                real engagement. No shortcuts, no bots — just genuine growth.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ───────── Problem → Solution Block ───────── */}
        <section className="relative py-4 sm:py-8 overflow-hidden">
          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <motion.div {...anim(0)} className="max-w-6xl mx-auto">
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
                    Without early engagement your content never surfaces.
                    Traditional pods are unsafe, filled with freeloaders, and
                    risk your account.
                  </p>
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
                    Engazium matches you with real creators in your niche.
                    Engage authentically, boost each other&apos;s reach, and
                    grow together — safely.
                  </p>
                  <span className="absolute bottom-4 right-6 text-[8rem] sm:text-[10rem] font-heading font-bold text-primary/[0.06] dark:text-primary/[0.08] leading-none select-none pointer-events-none">
                    ✓
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ───────── Stat Highlight Bar ───────── */}
        <section className="relative py-10 sm:py-16 overflow-hidden">
          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <motion.div {...anim(0.05)} className="max-w-6xl mx-auto">
              <div className="relative bg-primary rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/[0.06] to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-black/[0.1] to-transparent pointer-events-none rounded-br-3xl" />

                <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
                  {[
                    { val: "92%", label: "Avg squad engagement rate" },
                    { val: "3.2x", label: "Average reach boost" },
                    { val: "500+", label: "Active creators" },
                    { val: "100%", label: "Completely free" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary-foreground tracking-tighter">
                        {s.val}
                      </p>
                      <p className="text-xs sm:text-sm text-primary-foreground/70 mt-1">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ───────── Core Features Section ───────── */}
        <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
          <div className="absolute top-1/3 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[120px] md:blur-[180px] bg-primary/[0.03] dark:bg-primary/[0.06]" />

          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <motion.div
              {...anim(0)}
              className="text-center mb-16 sm:mb-20 md:mb-24"
            >
              <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Core Features
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tighter mt-3">
                Built for{" "}
                <span className="text-gradient">serious creators</span>
              </h2>
              <p className="text-muted-foreground mt-4 sm:mt-5 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
                Every feature is designed to maximise your growth while keeping
                your account safe.
              </p>
            </motion.div>

            {/* Feature cards — 2-column grid with detail highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-6xl mx-auto">
              {coreFeatures.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  {...anim(0.08 * i)}
                  className="group relative bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/40 dark:border-border/20 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-500 overflow-hidden"
                >
                  {/* Gradient hover bg */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary/30 to-transparent transition-all duration-500" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
                      >
                        <feature.icon
                          className={`h-6 w-6 sm:h-7 sm:w-7 ${feature.iconColor}`}
                        />
                      </div>
                      <span className="text-6xl font-heading font-bold text-primary/10 dark:text-primary/15 leading-none group-hover:text-primary/20 dark:group-hover:text-primary/25 transition-colors duration-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-foreground text-lg sm:text-xl tracking-tight mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed mb-4">
                      {feature.description}
                    </p>

                    {/* Highlight tags */}
                    <div className="flex flex-wrap gap-2">
                      {feature.highlights.map((h) => (
                        <span
                          key={h}
                          className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-muted-foreground bg-secondary/60 dark:bg-secondary/40 rounded-full px-3 py-1"
                        >
                          <CheckCircle2 className="h-3 w-3 text-primary" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Additional Features Grid ───────── */}
        <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full blur-[100px] md:blur-[150px] bg-glow-secondary/[0.03] dark:bg-glow-secondary/[0.06]" />

          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <motion.div
              {...anim(0)}
              className="text-center mb-16 sm:mb-20"
            >
              <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
                And More
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tighter mt-3">
                Packed with{" "}
                <span className="text-gradient">powerful tools</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
              {additionalFeatures.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  {...anim(0.06 * i)}
                  className="group relative bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-border/40 dark:border-border/20 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.00] to-primary/[0.00] group-hover:from-primary/[0.03] group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary/30 to-transparent transition-all duration-500" />

                  <div className="relative z-10">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/8 dark:bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/12 dark:group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-500">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground mb-1.5 text-sm sm:text-[15px] tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
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

                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tighter mb-5">
                    Ready to{" "}
                    <span className="text-gradient-animated">
                      grow together?
                    </span>
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    All of these features are completely free. Start growing
                    your audience today.
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

export default Features;

