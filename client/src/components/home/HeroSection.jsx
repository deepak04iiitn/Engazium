"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  Users,
  Activity,
  Rocket,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.215, 0.61, 0.355, 1] },
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden noise-overlay"
    >
      {/* Mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 grid-pattern" />

      {/* Animated orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[10%] right-[15%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full blur-[120px] md:blur-[200px] bg-primary/8 dark:bg-primary/15 animate-pulse-glow"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[15%] left-[5%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full blur-[100px] md:blur-[180px] bg-glow-secondary/5 dark:bg-glow-secondary/10 animate-pulse-glow"
      />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] rounded-full blur-[150px] md:blur-[250px] bg-primary/3 dark:bg-primary/6 animate-scale-pulse" />

      <motion.div
        style={{ opacity }}
        className="container relative z-10 mx-auto px-5 sm:px-6 pt-28 sm:pt-32 md:pt-0 pb-16 md:pb-0"
      >
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* ═══════ LEFT — Content ═══════ */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div {...fadeUp(0.1)} className="mb-7 sm:mb-8">
              <span className="inline-flex items-center gap-2.5 rounded-full bg-card/80 dark:bg-card/60 backdrop-blur-sm border border-border/50 dark:border-border/30 px-5 py-2 text-xs sm:text-sm font-medium text-muted-foreground shadow-sm dark:shadow-none">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                The engagement platform for serious creators
                <Rocket className="h-3.5 w-3.5 text-primary" />
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.2)}
              className="text-[2.75rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-heading font-bold tracking-tighter mb-5 sm:mb-6"
            >
              Build Engagement.
              <br />
              <span className="text-gradient-animated">Expand Reach.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              {...fadeUp(0.35)}
              className="text-[15px] sm:text-base md:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed"
            >
              Join a community-driven ecosystem where micro creators grow
              together through meaningful, safe, and structured engagement.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp(0.5)}
              className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 lg:justify-start justify-center mb-10 lg:mb-0"
            >
              <Link href="/sign-up" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box-intense px-8 py-6 rounded-2xl font-heading font-semibold group w-full sm:w-auto text-[15px]"
                >
                  Start Growing Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Button>
              </Link>
              <Link href="/how-it-works" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border/60 dark:border-border/40 text-foreground hover:bg-card/80 dark:hover:bg-card/50 backdrop-blur-sm px-8 py-6 rounded-2xl font-heading w-full sm:w-auto text-[15px]"
                >
                  See How It Works
                </Button>
              </Link>
            </motion.div>

            {/* Trust signals — desktop */}
            <motion.div
              {...fadeUp(0.65)}
              className="hidden lg:flex items-center gap-5 mt-10"
            >
              {["100% Platform Safe", "Real Humans Only", "No Bots Ever"].map(
                (item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    {item}
                  </span>
                )
              )}
            </motion.div>
          </div>

          {/* ═══════ RIGHT — Floating Stats Dashboard ═══════ */}
          <motion.div
            style={{ y: cardY }}
            className="relative hidden lg:block"
          >
            <div
              className="relative w-full max-w-[520px] mx-auto aspect-[4/3.8]"
              style={{
                transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)`,
                transition: "transform 0.8s cubic-bezier(0.33, 1, 0.68, 1)",
              }}
            >
              {/* ── Main metric card — Engagement Rate ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="absolute top-[6%] left-[0%] w-[65%] z-20"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="bg-card/90 dark:bg-card/70 backdrop-blur-md rounded-2xl p-5 border border-border/50 dark:border-border/25 shadow-xl dark:shadow-none"
                >
                  <div className="flex items-center gap-3 mb-3.5">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Engagement Rate
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Last 30 days
                      </p>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2.5 mb-3">
                    <p className="text-3xl font-heading font-bold text-foreground tracking-tight">
                      92%
                    </p>
                    <span className="text-xs text-primary font-semibold bg-primary/8 dark:bg-primary/10 px-2 py-0.5 rounded-full">
                      ↑ 24%
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2 bg-secondary/80 dark:bg-secondary/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* ── Active Creators card ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="absolute top-[2%] right-[0%] w-[42%] z-10"
              >
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="bg-card/90 dark:bg-card/70 backdrop-blur-md rounded-2xl p-4 border border-border/50 dark:border-border/25 shadow-lg dark:shadow-none"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[11px] font-medium text-muted-foreground">
                      Active Creators
                    </span>
                  </div>
                  <p className="text-2xl font-heading font-bold text-foreground tracking-tight">
                    10,240+
                  </p>
                  {/* Mini avatar stack */}
                  <div className="flex -space-x-1.5 mt-2.5">
                    {["PS", "AM", "SR", "KN", "+"].map((initials, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-primary/10 border-2 border-card flex items-center justify-center"
                      >
                        <span className="text-[8px] font-bold text-primary">
                          {initials}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* ── Engagement chart card ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="absolute bottom-[12%] right-[-2%] w-[55%] z-20"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="bg-card/90 dark:bg-card/70 backdrop-blur-md rounded-2xl p-4 border border-border/50 dark:border-border/25 shadow-lg dark:shadow-none"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-3.5 w-3.5 text-primary" />
                      <span className="text-[11px] font-medium text-muted-foreground">
                        Weekly Growth
                      </span>
                    </div>
                    <span className="text-xs text-primary font-semibold">
                      ↑ 12%
                    </span>
                  </div>
                  {/* Bar chart */}
                  <div className="flex items-end gap-[4px] h-16 mt-1">
                    {[40, 55, 48, 65, 58, 72, 68, 78, 74, 85, 82, 92].map(
                      (h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{
                            duration: 0.8,
                            delay: 1.2 + i * 0.05,
                            ease: "easeOut",
                          }}
                          className={`flex-1 rounded-sm min-w-0 ${
                            i === 11
                              ? "bg-primary"
                              : "bg-primary/20 dark:bg-primary/30"
                          }`}
                        />
                      )
                    )}
                  </div>
                </motion.div>
              </motion.div>

              {/* ── Squads card ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.1 }}
                className="absolute bottom-[0%] left-[3%] z-10"
              >
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                  className="bg-card/90 dark:bg-card/70 backdrop-blur-md rounded-2xl p-4 border border-border/50 dark:border-border/25 shadow-lg dark:shadow-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Activity className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <div>
                      <p className="text-base font-heading font-bold text-foreground">
                        500+ Squads
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        Active & Growing
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Decorative rotating ring behind cards */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-dashed border-primary/[0.06] dark:border-primary/[0.1] animate-spin-slow pointer-events-none"
              />
            </div>
          </motion.div>
        </div>

        {/* ═══════ Mobile stat cards ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="lg:hidden mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {[
            { icon: Users, value: "10K+", label: "Creators" },
            { icon: Activity, value: "500+", label: "Squads" },
            { icon: TrendingUp, value: "92%", label: "Engagement" },
            { icon: BarChart3, value: "100%", label: "Safe" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card/70 dark:bg-card/50 backdrop-blur-sm rounded-xl p-3.5 text-center border border-border/40 dark:border-border/20"
            >
              <stat.icon className="h-4 w-4 text-primary mx-auto mb-1.5" />
              <p className="text-lg font-heading font-bold text-foreground">
                {stat.value}
              </p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default HeroSection;
