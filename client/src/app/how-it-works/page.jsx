"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Shield,
  Zap,
  Target,
  Award,
  ChevronRight,
  ArrowRight,
  Clock,
  Rocket,
  CheckCircle2,
  MousePointerClick,
  TrendingUp,
  MessageCircle,
  Heart,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DemoSquadSection from "@/components/squads/DemoSquadSection";

const formationSteps = [
  {
    step: 1,
    title: "Choose Your Niche",
    description:
      "Select your content niche, platform, and follower range. We match you with creators who share your audience.",
    icon: Target,
    color: "from-violet-500/20 to-violet-500/5",
    iconBg: "bg-violet-500/10 dark:bg-violet-500/15",
    iconColor: "text-violet-500",
    borderColor: "border-violet-500/20 dark:border-violet-500/30",
    detail: "Niche · Platform · Audience",
  },
  {
    step: 2,
    title: "Pick Your Squad Plan",
    description:
      "Growth (1 post/day), Pro (2 posts/day), or Momentum (3 posts/day) — choose based on your posting frequency.",
    icon: Users,
    color: "from-blue-500/20 to-blue-500/5",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/15",
    iconColor: "text-blue-500",
    borderColor: "border-blue-500/20 dark:border-blue-500/30",
    detail: "Growth · Pro · Momentum",
  },
  {
    step: 3,
    title: "Join Instantly",
    description:
      "Click to join any open squad. No payments, no credits — just tap Join and you're in.",
    icon: Zap,
    color: "from-amber-500/20 to-amber-500/5",
    iconBg: "bg-amber-500/10 dark:bg-amber-500/15",
    iconColor: "text-amber-500",
    borderColor: "border-amber-500/20 dark:border-amber-500/30",
    detail: "Free · Instant · No barriers",
  },
  {
    step: 4,
    title: "Engage & Grow",
    description:
      "Engage with squad posts authentically. Your engagement percentage drives accountability — stay active or get warned.",
    icon: Award,
    color: "from-emerald-500/20 to-emerald-500/5",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    iconColor: "text-emerald-500",
    borderColor: "border-emerald-500/20 dark:border-emerald-500/30",
    detail: "Track · Engage · Grow",
  },
];

const safetyFeatures = [
  {
    icon: Clock,
    title: "Time-Distributed",
    desc: "Engagement is spread naturally over time — never sudden spikes that flag algorithms.",
    stat: "24h",
    statLabel: "Spread window",
  },
  {
    icon: Shield,
    title: "Anti-Fake Engagement",
    desc: "Smart validation ensures every engagement is real — minimum time thresholds and activity tracking.",
    stat: "100%",
    statLabel: "Human verified",
  },
  {
    icon: Award,
    title: "Quality Standards",
    desc: "Engagement percentages enforce accountability. Low engagers get warned and removed automatically.",
    stat: "70%",
    statLabel: "Minimum threshold",
  },
];

const benefits = [
  { icon: TrendingUp, label: "3x average reach boost" },
  { icon: Heart, label: "Authentic engagement only" },
  { icon: MessageCircle, label: "Meaningful interactions" },
  { icon: BarChart3, label: "Real-time analytics" },
];

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] },
});

const HowItWorks = () => {
  return (
    <div className="min-h-screen">
      <main>
        {/* ───────── Hero Section ───────── */}
        <section className="relative pt-28 sm:pt-32 md:pt-40 pb-20 sm:pb-28 md:pb-36 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 dot-grid" />
          <div className="absolute top-20 right-1/4 w-[280px] sm:w-[420px] md:w-[600px] h-[280px] sm:h-[420px] md:h-[600px] rounded-full blur-[100px] md:blur-[180px] bg-primary/5 dark:bg-primary/10" />
          <div className="absolute bottom-0 left-1/4 w-[200px] sm:w-[320px] md:w-[500px] h-[200px] sm:h-[320px] md:h-[500px] rounded-full blur-[80px] md:blur-[150px] bg-glow-secondary/3 dark:bg-glow-secondary/8" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] rounded-full blur-[200px] bg-primary/[0.02] dark:bg-primary/[0.04]" />

          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div {...anim(0)}>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 dark:bg-primary/10 border border-primary/12 dark:border-primary/20 px-4 py-1.5 text-xs font-medium text-primary mb-6">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Simple & Effective
                </span>
              </motion.div>

              <motion.h1
                {...anim(0.1)}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tighter mb-6"
              >
                How Engazium{" "}
                <span className="text-gradient-animated">works</span>
              </motion.h1>

              <motion.p
                {...anim(0.2)}
                className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-14"
              >
                A simple, engagement-first platform designed to help creators
                grow together. No bots, no fake likes — just real people
                supporting real content.
              </motion.p>

              {/* Benefit pills */}
              <motion.div
                {...anim(0.3)}
                className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
              >
                {benefits.map((b, i) => (
                  <div
                    key={b.label}
                    className="flex items-center gap-2 bg-card/80 dark:bg-card/50 backdrop-blur-sm border border-border/40 dark:border-border/20 rounded-full px-4 py-2 text-sm text-muted-foreground"
                  >
                    <b.icon className="h-4 w-4 text-primary" />
                    <span>{b.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-muted-foreground/50 text-xs font-medium tracking-wider uppercase">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border-2 border-muted-foreground/20 flex items-start justify-center p-1"
            >
              <div className="w-1 h-2 rounded-full bg-primary/60" />
            </motion.div>
          </motion.div>
        </section>

        {/* ───────── How Squad Formation Works ───────── */}
        <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            {/* Section header — centered */}
            <motion.div {...anim(0)} className="text-center mb-16 sm:mb-20 md:mb-24">
              <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Squad Formation
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mt-3 tracking-tighter">
                How squads{" "}
                <span className="text-gradient">come together</span>
              </h2>
              <p className="text-muted-foreground mt-4 sm:mt-5 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
                Four simple steps from sign-up to your first squad engagement.
              </p>
            </motion.div>

            {/* Steps — Creative alternating layout */}
            <div className="max-w-6xl mx-auto">
              {/* Desktop: 2-column zigzag grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
                {formationSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    {...anim(0.1 * index)}
                    className={`relative group ${
                      index % 2 === 1 ? "md:translate-y-12" : ""
                    }`}
                  >
                    {/* Card */}
                    <div
                      className={`relative bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/40 dark:border-border/20 hover:${step.borderColor} transition-all duration-500 overflow-hidden h-full`}
                    >
                      {/* Gradient background on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                      />

                      {/* Shimmer line */}
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary/30 to-transparent transition-all duration-500" />

                      <div className="relative z-10">
                        {/* Step number — large watermark */}
                        <div className="flex items-start justify-between mb-4">
                          <span className="text-6xl sm:text-7xl font-heading font-bold text-primary/10 dark:text-primary/15 leading-none group-hover:text-primary/20 dark:group-hover:text-primary/25 transition-colors duration-500">
                            0{step.step}
                          </span>
                          <div
                            className={`${step.iconBg} w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
                          >
                            <step.icon
                              className={`h-6 w-6 sm:h-7 sm:w-7 ${step.iconColor}`}
                            />
                          </div>
                        </div>

                        {/* Detail tag */}
                        <span className="inline-block text-[10px] sm:text-xs font-medium text-muted-foreground bg-secondary/60 dark:bg-secondary/40 rounded-full px-3 py-1 mb-3">
                          {step.detail}
                        </span>

                        <h3 className="font-heading font-bold text-foreground text-lg sm:text-xl tracking-tight mb-2">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-sm sm:text-[15px] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Connector arrow (desktop only, between 1→2 and 3→4) */}
                    {index % 2 === 0 && index < formationSteps.length - 1 && (
                      <div className="hidden md:block absolute -right-4 top-1/2 translate-x-0 -translate-y-1/2 z-20">
                        <div className="w-8 h-8 rounded-full bg-card border border-border/50 dark:border-border/30 flex items-center justify-center shadow-sm">
                          <ChevronRight className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Flow line connecting steps on desktop */}
              <motion.div
                {...anim(0.5)}
                className="hidden md:flex items-center justify-center mt-10 gap-2"
              >
                <div className="flex items-center gap-3 text-muted-foreground/60">
                  <Zap className="h-4 w-4 text-primary/50" />
                  <span className="text-xs font-medium tracking-wider uppercase">
                    From signup to growth in minutes
                  </span>
                  <Zap className="h-4 w-4 text-primary/50" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───────── Demo Squad Section ───────── */}
        <div id="demo-squad">
          <DemoSquadSection />
        </div>

        {/* ───────── Safety Section ───────── */}
        <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
          <div className="absolute top-1/2 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[120px] md:blur-[180px] bg-primary/[0.03] dark:bg-primary/[0.06]" />

          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            {/* Section header — centered */}
            <motion.div {...anim(0)} className="text-center mb-16 sm:mb-20">
              <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Safety First
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mt-3 tracking-tighter">
                Your account,{" "}
                <span className="text-gradient">always protected</span>
              </h2>
              <p className="text-muted-foreground mt-4 sm:mt-5 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
                Built-in safeguards that keep your account safe while
                maximizing organic reach.
              </p>
            </motion.div>

            {/* Safety cards — centered 3-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
              {safetyFeatures.map((item, index) => (
                <motion.div
                  key={item.title}
                  {...anim(0.1 * index)}
                  className="group relative bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/40 dark:border-border/20 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-500 overflow-hidden text-center"
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.00] to-primary/[0.00] group-hover:from-primary/[0.03] group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary/30 to-transparent transition-all duration-500" />

                  <div className="relative z-10">
                    {/* Big stat */}
                    <div className="text-3xl sm:text-4xl font-heading font-bold text-primary/80 mb-1">
                      {item.stat}
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
                      {item.statLabel}
                    </span>

                    <div className="w-12 h-12 rounded-2xl bg-primary/8 dark:bg-primary/10 flex items-center justify-center mx-auto my-5 group-hover:bg-primary/12 dark:group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-500">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>

                    <h3 className="font-heading font-bold text-foreground mb-2 text-base sm:text-lg tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── CTA Section ───────── */}
        <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[700px] h-[400px] md:h-[700px] rounded-full blur-[150px] md:blur-[250px] bg-primary/[0.04] dark:bg-primary/[0.08]" />

          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <motion.div
              {...anim(0)}
              className="relative max-w-4xl mx-auto text-center"
            >
              {/* Main CTA card */}
              <div className="relative bg-card/80 dark:bg-card/60 backdrop-blur-sm rounded-3xl sm:rounded-[2rem] p-10 sm:p-14 md:p-20 border border-border/40 dark:border-border/20 overflow-hidden">
                {/* Decorative gradient border effect */}
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
                    Ready to join the{" "}
                    <span className="text-gradient-animated">revolution?</span>
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    Join hundreds of creators who are growing their audience
                    authentically. Start your journey today.
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
                    <Link href="/squads">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-border text-foreground hover:bg-secondary/80 rounded-xl sm:rounded-2xl px-8 sm:px-10 py-6 font-heading w-full sm:w-auto text-[15px] sm:text-base"
                      >
                        Browse Squads
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                    </Link>
                  </div>

                  {/* Trust badges */}
                  <motion.div
                    {...anim(0.4)}
                    className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-10 sm:mt-14 pt-8 border-t border-border/30 dark:border-border/15"
                  >
                    {[
                      { val: "500+", label: "Active Creators" },
                      { val: "50+", label: "Squads Running" },
                      { val: "3.2x", label: "Avg Reach Boost" },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <div className="text-xl sm:text-2xl font-heading font-bold text-primary">
                          {s.val}
                        </div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HowItWorks;
