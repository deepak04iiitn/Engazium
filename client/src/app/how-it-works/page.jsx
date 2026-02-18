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
  },
  {
    step: 2,
    title: "Pick Your Squad Plan",
    description:
      "Growth (1 post/day), Pro (2 posts/day), or Momentum (3 posts/day) — choose based on your posting frequency.",
    icon: Users,
  },
  {
    step: 3,
    title: "Join Instantly",
    description:
      "Click to join any open squad. No payments, no credits — just tap Join and you're in.",
    icon: Zap,
  },
  {
    step: 4,
    title: "Engage & Grow",
    description:
      "Engage with squad posts authentically. Your engagement percentage drives accountability — stay active or get warned.",
    icon: Award,
  },
];

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay },
});

const HowItWorks = () => {
  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="relative pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 dot-grid" />
          <div className="absolute top-20 right-1/4 w-[280px] sm:w-[420px] md:w-[500px] h-[280px] sm:h-[420px] md:h-[500px] rounded-full blur-[100px] md:blur-[160px] bg-primary/5 dark:bg-primary/10" />
          <div className="absolute bottom-0 left-1/4 w-[200px] sm:w-[320px] md:w-[400px] h-[200px] sm:h-[320px] md:h-[400px] rounded-full blur-[80px] md:blur-[130px] bg-glow-secondary/3 dark:bg-glow-secondary/8" />

          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <motion.div {...anim(0)} className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 dark:bg-primary/10 border border-primary/12 dark:border-primary/20 px-4 py-1.5 text-xs font-medium text-primary mb-6">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Simple & Effective
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-5">
                How Engazium <span className="text-gradient">works</span>
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
                A simple, engagement-first platform designed to help creators grow together.
                No bots, no fake likes—just real people supporting real content.
              </p>
            </motion.div>
          </div>
        </section>

        {/* How Squad Formation Works */}
        <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <motion.div {...anim(0)} className="mb-12 sm:mb-16 max-w-2xl">
              <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Squad Formation
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mt-3 tracking-tight">
                How squads <span className="text-gradient">come together</span>
              </h2>
              <p className="text-muted-foreground mt-4 text-sm sm:text-base md:text-lg max-w-lg">
                Four simple steps from sign-up to your first squad engagement.
              </p>
            </motion.div>

            <div className="max-w-4xl">
              {formationSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  {...anim(0.08 * index)}
                  className="relative flex items-start gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8 last:mb-0"
                >
                  {index < formationSteps.length - 1 && (
                    <div className="absolute left-5 sm:left-6 md:left-7 top-14 sm:top-16 w-px h-[calc(100%-1.5rem)] bg-border/60" />
                  )}

                  <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-primary/8 dark:bg-primary/10 border border-primary/15 dark:border-primary/25 flex items-center justify-center relative z-10">
                    <step.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                  </div>

                  <div className="bg-card rounded-2xl p-5 sm:p-6 border border-border/50 shadow-sm dark:shadow-none dark:border-border/30 flex-1 group hover:border-primary/20 dark:hover:border-primary/20 transition-colors duration-300">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1.5">
                      <span className="text-primary font-heading font-bold text-xs sm:text-sm">
                        Step {step.step}
                      </span>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                      <h3 className="font-heading font-semibold text-foreground text-sm sm:text-base md:text-lg">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Squad Section */}
        <div id="demo-squad">
          <DemoSquadSection />
        </div>

        {/* Safety Section */}
        <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <motion.div {...anim(0)} className="mb-12 sm:mb-16 max-w-2xl">
              <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Safety First
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mt-3 tracking-tight">
                Your account, <span className="text-gradient">always protected</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-4xl">
              {[
                {
                  icon: Clock,
                  title: "Time-Distributed",
                  desc: "Engagement is spread naturally over time — never sudden spikes that flag algorithms.",
                },
                {
                  icon: Shield,
                  title: "Anti-Fake Engagement",
                  desc: "Smart validation ensures every engagement is real — minimum time thresholds and activity tracking.",
                },
                {
                  icon: Award,
                  title: "Quality Standards",
                  desc: "Engagement percentages enforce accountability. Low engagers get warned and removed automatically.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  {...anim(0.08 * index)}
                  className="bg-card rounded-2xl p-6 sm:p-7 border border-border/50 shadow-sm dark:shadow-none dark:border-border/30 text-center"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/8 dark:bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-1.5 text-[15px] sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <motion.div
              {...anim(0)}
              className="bg-card rounded-3xl p-8 sm:p-10 md:p-14 border border-border/50 shadow-sm dark:shadow-none dark:border-border/30 text-center max-w-3xl mx-auto"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold tracking-tight mb-4">
                Ready to join the{" "}
                <span className="text-gradient">revolution?</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8">
                Join hundreds of creators who are growing their audience authentically.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box rounded-xl px-8 font-heading font-semibold w-full sm:w-auto text-[15px]"
                  >
                    <Rocket className="mr-2 h-4 w-4" />
                    Get Started Now
                  </Button>
                </Link>
                <Link href="/squads">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border text-foreground hover:bg-secondary/80 rounded-xl px-8 font-heading w-full sm:w-auto text-[15px]"
                  >
                    Browse Squads
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HowItWorks;
