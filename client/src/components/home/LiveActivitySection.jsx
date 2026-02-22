"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  Heart,
  TrendingUp,
  Radio,
  MessageCircle,
  Share2,
  Bookmark,
  Users,
} from "lucide-react";

// ─── Fallback Activity Data (shown when not enough real data) ────────

const fallbackActivityPool = [
  // ── Squad Joins ──
  { type: "join", user: "Priya S.", squad: "Lifestyle Creators" },
  { type: "join", user: "Arjun M.", squad: "Tech Reviewers" },
  { type: "join", user: "Sneha R.", squad: "Fashion & Beauty" },
  { type: "join", user: "Karthik N.", squad: "Fitness Motivation" },
  { type: "join", user: "Meera J.", squad: "Content Writers" },
  { type: "join", user: "Vikram S.", squad: "Travel Vloggers" },
  { type: "join", user: "Divya P.", squad: "Design Enthusiasts" },
  { type: "join", user: "Rohan G.", squad: "Photography Hub" },
  { type: "join", user: "Neha K.", squad: "Cooking Creators" },
  { type: "join", user: "Aditya R.", squad: "Gaming Squad" },

  // ── Engagements ──
  { type: "engage", user: "Ananya D.", targetUser: "Priya S.", action: "liked", content: "latest reel" },
  { type: "engage", user: "Priya S.", targetUser: "Arjun M.", action: "commented on", content: "tech review" },
  { type: "engage", user: "Karthik N.", targetUser: "Sneha R.", action: "shared", content: "styling tips" },
  { type: "engage", user: "Meera J.", targetUser: "Vikram S.", action: "saved", content: "travel vlog" },
  { type: "engage", user: "Rohan G.", targetUser: "Divya P.", action: "liked", content: "design showcase" },
  { type: "engage", user: "Vikram S.", targetUser: "Ananya D.", action: "commented on", content: "recipe post" },
  { type: "engage", user: "Arjun M.", targetUser: "Karthik N.", action: "shared", content: "workout routine" },
  { type: "engage", user: "Divya P.", targetUser: "Meera J.", action: "liked", content: "writing tips" },
  { type: "engage", user: "Neha K.", targetUser: "Rohan G.", action: "saved", content: "landscape shot" },
  { type: "engage", user: "Aditya R.", targetUser: "Neha K.", action: "commented on", content: "cooking tutorial" },

  // ── Growth Milestones ──
  { type: "growth", user: "Priya S.", metric: "followers", increase: "340%", days: 21 },
  { type: "growth", user: "Arjun M.", metric: "reach", increase: "520%", days: 30 },
  { type: "growth", user: "Sneha R.", metric: "engagement", increase: "180%", days: 14 },
  { type: "growth", user: "Karthik N.", metric: "followers", increase: "460%", days: 28 },
  { type: "growth", user: "Ananya D.", metric: "reach", increase: "290%", days: 18 },
  { type: "growth", user: "Rohan G.", metric: "engagement", increase: "210%", days: 25 },
  { type: "growth", user: "Meera J.", metric: "followers", increase: "380%", days: 35 },
  { type: "growth", user: "Vikram S.", metric: "reach", increase: "440%", days: 22 },
];

// Minimum real activities required before switching from fallback
const MIN_REAL_ACTIVITIES = 10;

// How often to poll the API for fresh activities (ms)
const POLL_INTERVAL = 60000; // 1 minute

const timeLabels = [
  "Just now",
  "1m ago",
  "2m ago",
  "3m ago",
  "5m ago",
  "8m ago",
  "12m ago",
  "15m ago",
];

const engageIcons = {
  liked: Heart,
  "commented on": MessageCircle,
  shared: Share2,
  saved: Bookmark,
};

const typeConfig = {
  join: {
    icon: UserPlus,
    accentText: "text-sky-500 dark:text-sky-400",
    accentBg: "bg-sky-500/10 dark:bg-sky-500/15",
    accentBorder: "border-sky-500/12 dark:border-sky-500/18",
    accentDot: "bg-sky-500",
    label: "Squad Join",
  },
  engage: {
    icon: Heart,
    accentText: "text-pink-500 dark:text-pink-400",
    accentBg: "bg-pink-500/10 dark:bg-pink-500/15",
    accentBorder: "border-pink-500/12 dark:border-pink-500/18",
    accentDot: "bg-pink-500",
    label: "Engagement",
  },
  growth: {
    icon: TrendingUp,
    accentText: "text-emerald-500 dark:text-emerald-400",
    accentBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    accentBorder: "border-emerald-500/12 dark:border-emerald-500/18",
    accentDot: "bg-emerald-500",
    label: "Growth Milestone",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────

const getInitials = (name) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// ─── Activity Text Renderer ─────────────────────────────────────────

const ActivityText = ({ activity }) => {
  switch (activity.type) {
    case "join":
      return (
        <p className="text-[13px] sm:text-sm text-foreground/75 leading-snug">
          <span className="font-semibold text-foreground">{activity.user}</span>
          {" joined "}
          <span className="font-semibold text-foreground">{activity.squad}</span>
          {" squad"}
        </p>
      );
    case "engage":
      return (
        <p className="text-[13px] sm:text-sm text-foreground/75 leading-snug">
          <span className="font-semibold text-foreground">{activity.user}</span>
          {` ${activity.action} `}
          <span className="font-semibold text-foreground">{activity.targetUser}</span>
          {"'s "}
          {activity.content}
        </p>
      );
    case "growth":
      return (
        <p className="text-[13px] sm:text-sm text-foreground/75 leading-snug">
          <span className="font-semibold text-foreground">{activity.user}</span>
          {"'s "}
          <span className="font-medium text-foreground">{activity.metric}</span>
          {" increased by "}
          <span className={`font-bold ${typeConfig.growth.accentText}`}>
            {activity.increase}
          </span>
          {" after "}
          <span className="font-medium text-foreground">{activity.days} days</span>
          {" on Engazium"}
        </p>
      );
    default:
      return null;
  }
};

// ─── Activity Card ──────────────────────────────────────────────────

const ActivityCard = ({ activity }) => {
  const config = typeConfig[activity.type];
  const Icon =
    activity.type === "engage"
      ? engageIcons[activity.action] || Heart
      : config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
      transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <div
        className={`relative flex items-start gap-3 rounded-xl sm:rounded-2xl p-3 sm:p-4 border ${config.accentBorder} bg-card/50 dark:bg-card/30 backdrop-blur-sm hover:bg-card/80 dark:hover:bg-card/50 transition-all duration-500 group overflow-hidden`}
      >
        {/* Subtle shimmer on new activity */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-primary/[0.03] to-transparent transition-opacity duration-700 pointer-events-none" />

        {/* Activity type icon */}
        <div
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg ${config.accentBg} flex items-center justify-center shrink-0 mt-0.5`}
        >
          <Icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${config.accentText}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <ActivityText activity={activity} />
          <div className="flex items-center gap-2 mt-1.5">
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-medium ${config.accentText} opacity-70`}
            >
              <span
                className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${config.accentDot}`}
              />
              {config.label}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {activity.timeLabel}
            </span>
          </div>
        </div>

        {/* User avatar */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/8 dark:bg-primary/12 border border-border/30 flex items-center justify-center shrink-0">
          <span className="text-[8px] sm:text-[9px] font-bold text-primary font-heading">
            {getInitials(activity.user)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Section ───────────────────────────────────────────────────

const VISIBLE_DESKTOP = 8;
const VISIBLE_MOBILE = 4;
const CYCLE_INTERVAL = 2800;

const LiveActivitySection = () => {
  const [activityPool, setActivityPool] = useState(fallbackActivityPool);
  const [recentCount, setRecentCount] = useState(247);

  const [visibleActivities, setVisibleActivities] = useState(() =>
    fallbackActivityPool.slice(0, VISIBLE_DESKTOP).map((a, i) => ({
      ...a,
      _id: i,
      timeLabel: timeLabels[i % timeLabels.length],
    }))
  );

  const poolIndexRef = useRef(VISIBLE_DESKTOP);
  const idCounterRef = useRef(VISIBLE_DESKTOP);
  const slotIndexRef = useRef(0);
  const activityPoolRef = useRef(fallbackActivityPool);

  // ── Fetch real activities from API ──
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("/api/growth/live-activity");
        const data = await res.json();

        if (
          res.ok &&
          data.activities &&
          data.activities.length >= MIN_REAL_ACTIVITIES
        ) {
          setActivityPool(data.activities);
          activityPoolRef.current = data.activities;
          if (data.recentCount) setRecentCount(data.recentCount);

          // Reset visible activities with real data
          const initial = data.activities
            .slice(0, VISIBLE_DESKTOP)
            .map((a, i) => ({
              ...a,
              _id: ++idCounterRef.current,
              timeLabel: timeLabels[i % timeLabels.length],
            }));
          setVisibleActivities(initial);
          poolIndexRef.current = VISIBLE_DESKTOP;
          slotIndexRef.current = 0;
        }
      } catch {
        // Silently fall back to hardcoded data
      }
    };

    fetchActivities();

    // Poll for fresh activities periodically
    const pollInterval = setInterval(fetchActivities, POLL_INTERVAL);
    return () => clearInterval(pollInterval);
  }, []);

  // ── Cycle visible activities ──
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleActivities((prev) => {
        const pool = activityPoolRef.current;
        const next = [...prev];
        const poolIndex = poolIndexRef.current % pool.length;
        const newActivity = {
          ...pool[poolIndex],
          _id: ++idCounterRef.current,
          timeLabel: "Just now",
        };

        // Round-robin replacement across all slots
        const slot = slotIndexRef.current % VISIBLE_DESKTOP;
        next[slot] = newActivity;

        poolIndexRef.current++;
        slotIndexRef.current++;

        // Age time labels for untouched items
        return next.map((item) => {
          if (item._id === newActivity._id) return item;
          const idx = timeLabels.indexOf(item.timeLabel);
          const nextIdx = Math.min(idx + 1, timeLabels.length - 1);
          return {
            ...item,
            timeLabel: timeLabels[nextIdx >= 0 ? nextIdx : 0],
          };
        });
      });
    }, CYCLE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // Split columns for desktop
  const leftCol = visibleActivities.filter((_, i) => i % 2 === 0);
  const rightCol = visibleActivities.filter((_, i) => i % 2 === 1);

  return (
    <section className="relative py-24 sm:py-32 md:py-40 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 mesh-gradient opacity-30" />
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Decorative blurred orbs */}
      <div className="absolute top-[20%] left-[5%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full blur-[120px] md:blur-[180px] bg-sky-500/5 dark:bg-sky-500/8 animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-[15%] right-[8%] w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full blur-[100px] md:blur-[160px] bg-pink-500/4 dark:bg-pink-500/6 animate-pulse-glow pointer-events-none" />
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full blur-[140px] md:blur-[220px] bg-emerald-500/3 dark:bg-emerald-500/5 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        {/* ═══════ Section Header ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 dark:bg-primary/10 border border-primary/12 dark:border-primary/20 px-4 py-1.5 text-xs font-medium text-primary mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Live Activity
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tighter">
            Happening{" "}
            <span className="text-gradient-animated">right now</span>
          </h2>
          <p className="text-muted-foreground mt-5 sm:mt-6 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Real creators engaging, growing, and building communities together
            on Engazium — every single minute.
          </p>
        </motion.div>

        {/* ═══════ Live Feed ═══════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="max-w-5xl mx-auto"
        >
          {/* Feed header bar */}
          <div className="flex items-center justify-between mb-4 sm:mb-5 px-1">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 dark:border-emerald-500/25">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-bold tracking-wide text-emerald-600 dark:text-emerald-400 uppercase">
                  Live
                </span>
              </div>
              <span className="text-[11px] sm:text-xs text-muted-foreground hidden sm:inline">
                {recentCount} activities in the last hour
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-muted-foreground">
              <Radio className="h-3 w-3 text-primary animate-pulse" />
              <span className="hidden sm:inline">Auto-updating</span>
            </div>
          </div>

          {/* ═══ Desktop — 2 columns ═══ */}
          <div className="hidden md:grid md:grid-cols-2 gap-3 lg:gap-4">
            {/* Left column */}
            <div className="space-y-3">
              {leftCol.map((activity, slotIndex) => (
                <AnimatePresence mode="wait" key={`slot-left-${slotIndex}`}>
                  <ActivityCard
                    key={activity._id}
                    activity={activity}
                  />
                </AnimatePresence>
              ))}
            </div>

            {/* Right column */}
            <div className="space-y-3">
              {rightCol.map((activity, slotIndex) => (
                <AnimatePresence mode="wait" key={`slot-right-${slotIndex}`}>
                  <ActivityCard
                    key={activity._id}
                    activity={activity}
                  />
                </AnimatePresence>
              ))}
            </div>
          </div>

          {/* ═══ Mobile — single column ═══ */}
          <div className="md:hidden space-y-2.5">
            {visibleActivities.slice(0, VISIBLE_MOBILE).map((activity, slotIndex) => (
              <AnimatePresence mode="wait" key={`slot-mobile-${slotIndex}`}>
                <ActivityCard
                  key={activity._id}
                  activity={activity}
                />
              </AnimatePresence>
            ))}
          </div>

          {/* ═══ Bottom tagline ═══ */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 sm:mt-10 text-center"
          >
            <p className="text-sm text-muted-foreground inline-flex items-center gap-2">
              <Users className="h-3.5 w-3.5 text-primary" />
              <span>
                Join{" "}
                <span className="font-semibold text-foreground">10,000+</span>{" "}
                creators building real engagement
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveActivitySection;

