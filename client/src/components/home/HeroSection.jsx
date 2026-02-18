"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid" />

      {/* Gradient orbs */}
      <div className="absolute top-[15%] right-[20%] w-[280px] h-[280px] md:w-[500px] md:h-[500px] rounded-full blur-[100px] md:blur-[160px] bg-primary/6 dark:bg-primary/12 animate-pulse-glow" />
      <div className="absolute bottom-[20%] left-[10%] w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full blur-[80px] md:blur-[130px] bg-glow-secondary/4 dark:bg-glow-secondary/8 animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="container relative z-10 mx-auto px-5 sm:px-6 pt-28 sm:pt-32 md:pt-0 pb-16 md:pb-0">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
          {/* Left — Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 dark:bg-primary/10 border border-primary/12 dark:border-primary/20 px-4 py-1.5 text-xs font-medium text-primary mb-7 sm:mb-8">
                <Sparkles className="h-3.5 w-3.5" />
                The engagement hub for creators
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[2.6rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-heading font-bold tracking-tight mb-5 sm:mb-6"
            >
              Build Engagement.
              <br />
              <span className="text-gradient">Expand Reach.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="text-[15px] sm:text-base md:text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed"
            >
              Join a community-driven ecosystem where micro creators grow
              together through meaningful, safe, and structured engagement.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 lg:justify-start justify-center"
            >
              <Link href="/sign-up" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box px-8 py-6 rounded-2xl font-heading font-semibold group w-full sm:w-auto text-[15px]"
                >
                  Start Growing Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/how-it-works" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border text-foreground hover:bg-secondary/80 px-8 py-6 rounded-2xl font-heading w-full sm:w-auto text-[15px]"
                >
                  See How It Works
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right — Floating metric cards (desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-[4/3.5] max-w-[480px] mx-auto">
              {/* Main metric card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[8%] left-[2%] w-[68%] bg-card rounded-2xl p-5 border border-border/60 shadow-lg dark:shadow-none dark:border-border/40"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Reach Boost</p>
                    <p className="text-[11px] text-muted-foreground">Last 30 days</p>
                  </div>
                </div>
                <p className="text-3xl font-heading font-bold text-foreground mb-2">+312%</p>
                {/* Mini chart */}
                <div className="flex items-end gap-[3px]">
                  {[35, 50, 40, 65, 55, 75, 60, 85, 70, 95, 80, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-primary/15 dark:bg-primary/25 min-w-0"
                      style={{ height: `${h * 0.35}px` }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Creators count */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[3%] right-[2%] w-[48%] bg-card rounded-2xl p-4 border border-border/60 shadow-lg dark:shadow-none dark:border-border/40"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Users className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[11px] font-medium text-muted-foreground">Active Creators</span>
                </div>
                <p className="text-2xl font-heading font-bold text-foreground">10,240+</p>
              </motion.div>

              {/* Engagement multiplier */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-[14%] right-[0%] w-[52%] bg-card rounded-2xl p-4 border border-border/60 shadow-lg dark:shadow-none dark:border-border/40"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Zap className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[11px] font-medium text-muted-foreground">Avg Engagement</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-heading font-bold text-foreground">3.2x</p>
                  <span className="text-xs text-primary font-semibold">↑ 42%</span>
                </div>
              </motion.div>

              {/* Squad avatars */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[2%] left-[5%] bg-card rounded-2xl p-4 border border-border/60 shadow-lg dark:shadow-none dark:border-border/40"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {["PS", "AM", "SR", "KN"].map((initials, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full bg-primary/10 border-2 border-card flex items-center justify-center"
                      >
                        <span className="text-[9px] font-bold text-primary">{initials}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">500+ Squads</p>
                    <p className="text-[11px] text-muted-foreground">Active & Growing</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Mobile stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="lg:hidden mt-10 grid grid-cols-3 gap-2.5 sm:gap-3"
        >
          {[
            { value: "10K+", label: "Creators", icon: Users },
            { value: "500+", label: "Squads", icon: Zap },
            { value: "3x", label: "Reach Boost", icon: TrendingUp },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl p-3 text-center border border-border/60 shadow-sm dark:shadow-none dark:border-border/40"
            >
              <stat.icon className="h-4 w-4 text-primary mx-auto mb-1.5" />
              <p className="text-lg font-heading font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
