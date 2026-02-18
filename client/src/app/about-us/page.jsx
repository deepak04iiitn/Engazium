"use client"

import { motion } from "framer-motion";
import { Users, Target, Heart, Zap, Globe, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { delay, duration: 0.5, ease: "easeOut" },
});

const values = [
  {
    icon: Users,
    title: "Community First",
    description:
      "We believe growth is a collective effort. Engazium brings creators together in squads so no one grows alone.",
  },
  {
    icon: Shield,
    title: "Safety & Trust",
    description:
      "Every interaction is verified through our credit system. No bots, no fake engagement — only real creators helping each other.",
  },
  {
    icon: Zap,
    title: "Smart Engagement",
    description:
      "Our algorithm ensures fair, meaningful interactions. Credits keep the ecosystem balanced and rewarding for everyone.",
  },
  {
    icon: Target,
    title: "Goal-Oriented Growth",
    description:
      "Whether you want 1K followers or 100K, our squad system scales with your ambitions and keeps you accountable.",
  },
  {
    icon: Globe,
    title: "Platform Agnostic",
    description:
      "Instagram, YouTube, X, LinkedIn — Engazium works across every major social platform so you can grow everywhere.",
  },
  {
    icon: Heart,
    title: "Creator Empathy",
    description:
      "Built by creators, for creators. We understand the struggle of low reach and designed every feature to solve it.",
  },
];

const milestones = [
  { year: "2025", event: "Engazium idea born from creator frustration with declining organic reach" },
  { year: "2025", event: "Squad-based engagement system designed and prototyped" },
  { year: "2026", event: "Beta launch with early creator community" },
  { year: "2026", event: "Credit-based engagement verification system goes live" },
  { year: "2026", event: "Multi-platform support across Instagram, YouTube, X & LinkedIn" },
];

const About = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 dot-grid" />
        <div className="absolute top-1/4 left-1/4 w-[280px] sm:w-[420px] md:w-[500px] h-[280px] sm:h-[420px] md:h-[500px] rounded-full blur-[100px] md:blur-[140px] bg-primary/5 dark:bg-primary/10" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] sm:w-[320px] md:w-[400px] h-[200px] sm:h-[320px] md:h-[400px] rounded-full blur-[80px] md:blur-[120px] bg-glow-secondary/3 dark:bg-glow-secondary/8" />

        <div className="container mx-auto px-5 sm:px-6 relative z-10">
          <motion.div
            {...anim(0)}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 dark:bg-primary/10 border border-primary/12 dark:border-primary/20 px-4 py-1.5 text-xs font-medium text-primary mb-6">
              Our Story
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
              Empowering creators to{" "}
              <span className="text-gradient">grow together</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">
              Engazium was born from a simple truth — social media algorithms
              don&apos;t favour small creators. We built a platform where creators
              help each other rise through genuine, squad-based engagement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20 md:py-28 relative">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center">
            <motion.div {...anim(0)}>
              <span className="text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 block">
                Our Mission
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-5">
                Democratising social media growth
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                Social media growth shouldn&apos;t be reserved for those who can
                afford expensive ads or already have a massive following.
                Engazium levels the playing field through its innovative
                squad-based engagement system.
              </p>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                By connecting creators into focused squads and using a
                credit-based verification system, we ensure that every like,
                comment, and share is genuine — creating a ripple effect that
                algorithms can&apos;t ignore.
              </p>
            </motion.div>

            <motion.div
              {...anim(0.1)}
              className="bg-card rounded-2xl p-6 sm:p-8 border border-border/50 shadow-sm dark:shadow-none dark:border-border/30"
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 dark:bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1 text-[15px] sm:text-base">
                      Vision
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      A world where every creator — regardless of follower
                      count — has the tools and community to reach their
                      audience authentically.
                    </p>
                  </div>
                </div>
                <div className="border-t border-border/30" />
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 dark:bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-1 text-[15px] sm:text-base">
                      Purpose
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      To replace the isolation of solo content creation with
                      the power of collective growth — one squad at a time.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 md:py-28 relative">
        <div className="container mx-auto px-5 sm:px-6 relative z-10">
          <motion.div {...anim(0)} className="mb-12 sm:mb-16 max-w-2xl">
            <span className="text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 block">
              What Drives Us
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Our core values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                {...anim(0.04 * i)}
                className="bg-card rounded-2xl p-6 sm:p-7 border border-border/50 shadow-sm dark:shadow-none dark:border-border/30 group hover:border-primary/20 dark:hover:border-primary/20 transition-colors duration-300"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/8 dark:bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/12 dark:group-hover:bg-primary/15 transition-colors">
                  <value.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1.5 text-[15px] sm:text-base">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20 md:py-28 relative">
        <div className="container mx-auto px-5 sm:px-6">
          <motion.div {...anim(0)} className="mb-12 sm:mb-16 max-w-2xl">
            <span className="text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 block">
              Our Journey
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Key milestones
            </h2>
          </motion.div>

          <div className="max-w-2xl">
            {milestones.map((milestone, i) => (
              <motion.div
                key={i}
                {...anim(0.06 * i)}
                className="flex gap-5 sm:gap-6 relative"
              >
                {/* Line */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary shrink-0 mt-1.5 shadow-sm" />
                  {i < milestones.length - 1 && (
                    <div className="w-px flex-1 bg-border/60" />
                  )}
                </div>

                <div className="pb-8 sm:pb-10">
                  <span className="text-primary text-xs font-semibold tracking-wider uppercase">
                    {milestone.year}
                  </span>
                  <p className="text-foreground text-sm sm:text-[15px] mt-1 leading-relaxed">
                    {milestone.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 md:py-28 relative">
        <div className="container mx-auto px-5 sm:px-6">
          <motion.div
            {...anim(0)}
            className="bg-card rounded-3xl p-8 sm:p-10 md:p-14 border border-border/50 shadow-sm dark:shadow-none dark:border-border/30 text-center max-w-3xl mx-auto"
          >
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to join the movement?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-lg mx-auto">
              Thousands of creators are already growing together on Engazium.
              Be part of the community that&apos;s rewriting the rules of social
              media growth.
            </p>
            <Link href="/sign-up">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box px-8 py-5 rounded-xl font-heading font-semibold text-[15px]">
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;
