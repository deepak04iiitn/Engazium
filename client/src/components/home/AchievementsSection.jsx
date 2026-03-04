"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  TrendingUp,
  ArrowUp,
  Clock,
  Rocket,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

const platformIcons = {
  Instagram: "📸",
  YouTube: "🎬",
  TikTok: "🎵",
  Facebook: "📘",
  X: "𝕏",
  LinkedIn: "💼",
  Twitch: "🎮",
  Snapchat: "👻",
  Other: "🌐",
};

const platformGradients = {
  Instagram: "from-pink-500/10 to-purple-500/10 border-pink-500/15",
  YouTube: "from-red-500/10 to-red-600/10 border-red-500/15",
  TikTok: "from-slate-400/10 to-pink-500/10 border-slate-400/15",
  Facebook: "from-blue-500/10 to-blue-600/10 border-blue-500/15",
  X: "from-slate-400/10 to-slate-500/10 border-slate-400/15",
  LinkedIn: "from-blue-600/10 to-sky-500/10 border-blue-600/15",
  Twitch: "from-purple-500/10 to-purple-600/10 border-purple-500/15",
  Snapchat: "from-yellow-400/10 to-yellow-500/10 border-yellow-400/15",
  Other: "from-primary/10 to-primary/5 border-primary/15",
};

const MIN_REAL_ACHIEVEMENTS = 4;

function getInitials(name) {
  if (!name) return "??";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatNumber(num) {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num?.toString() || "0";
}

const AchievementCard = ({ achievement, index }) => {
  const a = achievement;
  const gradient =
    platformGradients[a.platform] || platformGradients.Other;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} border p-5 sm:p-6 hover:shadow-lg dark:hover:shadow-primary/5 transition-all duration-500`}
    >
      {/* Growth badge */}
      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/20 dark:border-emerald-400/20 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          <ArrowUp className="h-3 w-3" />
          {a.metric}
        </span>
      </div>

      {/* Platform icon */}
      <div className="text-2xl mb-3">{platformIcons[a.platform]}</div>

      {/* Growth visual */}
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl sm:text-3xl font-heading font-bold text-foreground tracking-tight">
          {formatNumber(a.latestFollowers)}
        </span>
        <span className="text-sm text-muted-foreground">
          from {formatNumber(a.baselineFollowers)}
        </span>
      </div>

      {/* Mini progress bar */}
      <div className="w-full h-1.5 bg-secondary/50 dark:bg-secondary/30 rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{
            width: `${Math.min(
              (a.latestFollowers / Math.max(a.latestFollowers, 1)) * 100,
              100
            )}%`,
          }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
          className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
        />
      </div>

      {/* User info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-primary/8 dark:bg-primary/12 border border-border/30 flex items-center justify-center shrink-0">
            <span className="text-[9px] font-bold text-primary font-heading">
              {getInitials(a.username)}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-heading font-semibold text-foreground text-xs sm:text-sm truncate">
              {a.username}
            </p>
            <p className="text-muted-foreground text-[10px] sm:text-xs truncate">
              {a.niche}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground shrink-0">
          <Clock className="h-3 w-3" />
          <span>{a.daysSinceJoin}d</span>
        </div>
      </div>
    </motion.div>
  );
};

const AchievementsSection = () => {
  const [achievements, setAchievements] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch("/api/growth/achievements");
        const data = await res.json();
        if (res.ok && Array.isArray(data.achievements)) {
          setAchievements(data.achievements);
        }
      } catch {
        // Keep section hidden until enough verified achievements exist.
      }
    };
    fetchAchievements();
  }, []);

  const hasMinimumRealAchievements =
    achievements.length >= MIN_REAL_ACHIEVEMENTS;

  // Hide the entire section until we have enough real achievements.
  if (!hasMinimumRealAchievements) return null;

  return (
    <section className="relative py-24 sm:py-32 md:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 dark:bg-primary/10 border border-primary/12 dark:border-primary/20 px-4 py-1.5 text-xs font-medium text-primary mb-6">
            <Trophy className="h-3 w-3" />
            Real Growth Results
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tighter">
            Creators are{" "}
            <span className="text-gradient-animated">thriving</span>
          </h2>
          <p className="text-muted-foreground mt-5 sm:mt-6 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Real growth tracked by real creators across platforms.
          </p>
        </motion.div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto mb-12 sm:mb-16">
          {achievements.slice(0, 6).map((a, i) => (
            <AchievementCard key={`${a.username}-${a.platform}-${i}`} achievement={a} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <Link className="cursor-pointer" href={currentUser ? "/dashboard" : "/sign-up"}>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box-intense px-8 py-6 rounded-2xl font-heading font-semibold group text-[15px]"
              >
                <Rocket className="h-4 w-4 mr-2" />
                {currentUser ? "Go to Dashboard" : "Start Your Growth Journey"}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Button>
            </Link>
            <span className="text-muted-foreground text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Track your growth weekly
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;

