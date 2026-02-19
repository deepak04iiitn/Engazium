"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  Zap,
  ArrowRight,
  Rocket,
  MousePointerClick,
  Heart,
  Users,
  Shield,
  BarChart3,
  Clock,
  Globe,
  Award,
  MessageCircle,
  Percent,
  Target,
  Gift,
  BadgeCheck,
  Infinity,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay, ease: [0.215, 0.61, 0.355, 1] },
});

const allFeatures = [
  "Unlimited squad memberships",
  "Niche-based squad matching",
  "Real-time engagement % tracking",
  "Platform-safe time distribution",
  "Weekly analytics dashboard",
  "Multi-platform support (Instagram, YouTube, X, LinkedIn)",
  "Meaningful comment guidelines",
  "Anti-freeloading protection",
  "Squad leaderboards",
  "Smart notifications",
  "Engagement streaks",
  "Community support",
];

const whyFree = [
  {
    icon: Heart,
    title: "Built for Creators",
    description:
      "We're creators too. We know the struggle of low reach and empty wallets. Growth tools should be accessible to everyone — not just those who can afford premium subscriptions.",
  },
  {
    icon: Users,
    title: "Community-Powered",
    description:
      "Engazium works because creators help each other. The value comes from the community itself — we just provide the platform to connect you.",
  },
  {
    icon: Target,
    title: "Growth-First Philosophy",
    description:
      "Our mission is to democratise social media growth. Putting a paywall in front of that would go against everything we believe in.",
  },
];

const comparisons = [
  {
    feature: "Price",
    engazium: "Completely free",
    others: "₹500–₹5,000/mo",
  },
  {
    feature: "Real engagement",
    engazium: "100% human",
    others: "Often bot-driven",
  },
  {
    feature: "Account safety",
    engazium: "Time-distributed",
    others: "Risky bulk actions",
  },
  {
    feature: "Accountability",
    engazium: "Engagement % tracked",
    others: "No tracking",
  },
  {
    feature: "Niche matching",
    engazium: "Smart matching",
    others: "Random groups",
  },
  {
    feature: "Freeloading protection",
    engazium: "Auto warnings & removal",
    others: "None",
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <main>
        {/* ───────── Hero Section ───────── */}
        <section className="relative pt-28 sm:pt-32 md:pt-40 pb-20 sm:pb-28 md:pb-36 overflow-hidden">
          <div className="absolute inset-0 dot-grid" />
          <div className="absolute top-20 left-1/3 w-[280px] sm:w-[420px] md:w-[600px] h-[280px] sm:h-[420px] md:h-[600px] rounded-full blur-[100px] md:blur-[180px] bg-primary/5 dark:bg-primary/10" />
          <div className="absolute bottom-0 right-1/4 w-[200px] sm:w-[320px] md:w-[500px] h-[200px] sm:h-[320px] md:h-[500px] rounded-full blur-[80px] md:blur-[150px] bg-glow-secondary/3 dark:bg-glow-secondary/8" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] rounded-full blur-[200px] bg-primary/[0.02] dark:bg-primary/[0.04]" />

          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div {...anim(0)}>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 dark:bg-primary/10 border border-primary/12 dark:border-primary/20 px-4 py-1.5 text-xs font-medium text-primary mb-6">
                  <Gift className="h-3.5 w-3.5" />
                  Pricing
                </span>
              </motion.div>

              <motion.h1
                {...anim(0.1)}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tighter mb-6"
              >
                Free for the first{" "}
                <span className="text-gradient-animated">1,000 users</span>
              </motion.h1>

              <motion.p
                {...anim(0.2)}
                className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
              >
                Be among the first 1,000 creators to get full access — completely
                free. No credit card, no hidden fees, no strings attached.
              </motion.p>

              <motion.div {...anim(0.3)}>
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box rounded-xl sm:rounded-2xl px-8 sm:px-10 py-6 font-heading font-semibold text-[15px] sm:text-base"
                  >
                    <MousePointerClick className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Get Started — It&apos;s Free
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───────── The Free Plan Card ───────── */}
        <section className="relative py-4 sm:py-8 overflow-hidden">
          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <motion.div {...anim(0)} className="max-w-4xl mx-auto">
              <div className="relative bg-card/80 dark:bg-card/60 backdrop-blur-sm rounded-3xl sm:rounded-[2rem] border border-primary/20 dark:border-primary/30 overflow-hidden">
                {/* Top gradient accent */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-primary/[0.02] pointer-events-none" />

                <div className="relative z-10 p-8 sm:p-10 md:p-14">
                  {/* Header */}
                  <div className="text-center mb-10 sm:mb-14">
                    <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-heading font-semibold px-5 py-2 rounded-full glow-box mb-6">
                      <Zap className="h-3.5 w-3.5" />
                      Free for First 1,000 Users
                    </div>
                    <div className="flex items-baseline justify-center gap-2 mb-3">
                      <span className="text-6xl sm:text-7xl md:text-8xl font-heading font-bold text-foreground tracking-tighter">
                        ₹0
                      </span>
                      <span className="text-muted-foreground text-lg sm:text-xl">
                        /month
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
                      Everything included. Claim your spot before it&apos;s gone.
                    </p>
                  </div>

                  {/* Features grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-10 sm:mb-14">
                    {allFeatures.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 bg-secondary/30 dark:bg-secondary/20 rounded-xl px-4 py-3 border border-border/20 dark:border-border/10"
                      >
                        <div className="w-5 h-5 rounded-full bg-primary/15 dark:bg-primary/20 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm text-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="text-center">
                    <Link href="/sign-up">
                      <Button
                        size="lg"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box rounded-xl sm:rounded-2xl px-10 sm:px-14 py-6 font-heading font-semibold text-[15px] sm:text-base"
                      >
                        Claim Your Free Spot
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                    </Link>
                    <p className="text-muted-foreground/60 text-xs mt-4">
                      No credit card required · Limited to first 1,000 users
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ───────── Why It's Free ───────── */}
        <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
          <div className="absolute top-1/3 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[120px] md:blur-[180px] bg-primary/[0.03] dark:bg-primary/[0.06]" />

          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <motion.div
              {...anim(0)}
              className="text-center mb-16 sm:mb-20"
            >
              <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Our Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tighter mt-3">
                Why is it <span className="text-gradient">free?</span>
              </h2>
              <p className="text-muted-foreground mt-4 sm:mt-5 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
                We&apos;re rewarding early believers. Here&apos;s why the first
                1,000 users get everything for free.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
              {whyFree.map((item, i) => (
                <motion.div
                  key={item.title}
                  {...anim(0.1 * i)}
                  className="group relative bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/40 dark:border-border/20 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-500 overflow-hidden text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.00] to-primary/[0.00] group-hover:from-primary/[0.03] group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary/30 to-transparent transition-all duration-500" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-primary/8 dark:bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/12 dark:group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-500">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground mb-2 text-base sm:text-lg tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Comparison Table ───────── */}
        <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full blur-[100px] md:blur-[150px] bg-glow-secondary/[0.03] dark:bg-glow-secondary/[0.06]" />

          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <motion.div
              {...anim(0)}
              className="text-center mb-16 sm:mb-20"
            >
              <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Comparison
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tighter mt-3">
                Engazium vs{" "}
                <span className="text-gradient">the rest</span>
              </h2>
            </motion.div>

            <motion.div {...anim(0.1)} className="max-w-4xl mx-auto">
              <div className="bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-border/40 dark:border-border/20 overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-3 gap-0 border-b border-border/30 dark:border-border/15">
                  <div className="p-4 sm:p-5 md:p-6">
                    <span className="text-xs sm:text-sm font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                      Feature
                    </span>
                  </div>
                  <div className="p-4 sm:p-5 md:p-6 text-center bg-primary/[0.03] dark:bg-primary/[0.05]">
                    <span className="text-xs sm:text-sm font-heading font-bold text-primary uppercase tracking-wider">
                      Engazium
                    </span>
                  </div>
                  <div className="p-4 sm:p-5 md:p-6 text-center">
                    <span className="text-xs sm:text-sm font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                      Others
                    </span>
                  </div>
                </div>

                {/* Table rows */}
                {comparisons.map((row, i) => (
                  <div
                    key={row.feature}
                    className={`grid grid-cols-3 gap-0 ${
                      i < comparisons.length - 1
                        ? "border-b border-border/20 dark:border-border/10"
                        : ""
                    }`}
                  >
                    <div className="p-4 sm:p-5 md:p-6 flex items-center">
                      <span className="text-xs sm:text-sm font-medium text-foreground">
                        {row.feature}
                      </span>
                    </div>
                    <div className="p-4 sm:p-5 md:p-6 flex items-center justify-center bg-primary/[0.03] dark:bg-primary/[0.05]">
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary">
                        <BadgeCheck className="h-4 w-4 shrink-0" />
                        {row.engazium}
                      </span>
                    </div>
                    <div className="p-4 sm:p-5 md:p-6 flex items-center justify-center">
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        {row.others}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ───────── FAQ Mini ───────── */}
        <section className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

          <div className="container relative z-10 mx-auto px-5 sm:px-6">
            <motion.div
              {...anim(0)}
              className="text-center mb-16 sm:mb-20"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tighter">
                Common questions
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5">
              {[
                {
                  q: "Is it really free? What's the catch?",
                  a: "Yes — for the first 1,000 users, everything is completely free. We're opening access to early adopters who believe in community-powered growth.",
                },
                {
                  q: "Will there be paid plans in the future?",
                  a: "We may introduce paid plans in the future, but the first 1,000 users who sign up now get full, unrestricted access. The earlier you join, the more you benefit.",
                },
                {
                  q: "How do you make money then?",
                  a: "We want to reward the creators who believe in us early. By offering free access to the first 1,000 users, we're building a strong founding community that helps shape the platform.",
                },
                {
                  q: "Are there any limits on the free plan?",
                  a: "No artificial limits. You get full access to squad memberships, engagement tracking, analytics, and all platform features. The only limits are natural ones — like squad sizes for quality.",
                },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  {...anim(0.08 * i)}
                  className="bg-card/80 dark:bg-card/50 backdrop-blur-sm rounded-2xl p-6 sm:p-7 border border-border/40 dark:border-border/20"
                >
                  <h3 className="font-heading font-bold text-foreground text-sm sm:text-base mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {faq.a}
                  </p>
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
                    Stop paying for{" "}
                    <span className="text-gradient-animated">growth</span>
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    Join the first 1,000 creators who get full access — completely
                    free. Don&apos;t miss your spot.
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
                    <Link href="/features">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-border text-foreground hover:bg-secondary/80 rounded-xl sm:rounded-2xl px-8 sm:px-10 py-6 font-heading w-full sm:w-auto text-[15px] sm:text-base"
                      >
                        Explore Features
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                    </Link>
                  </div>

                  {/* Trust line */}
                  <motion.div
                    {...anim(0.4)}
                    className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-10 sm:mt-14 pt-8 border-t border-border/30 dark:border-border/15"
                  >
                    {[
                      { val: "₹0", label: "For early users" },
                      { val: "1,000", label: "Free spots" },
                      { val: "No", label: "Credit card" },
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

export default Pricing;

