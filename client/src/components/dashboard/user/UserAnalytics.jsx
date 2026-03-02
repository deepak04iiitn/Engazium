"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  TrendingUp,
  Zap,
  BarChart3,
  Loader2,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Heart,
  MessageCircle,
  CalendarCheck,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

const platformColorMap = {
  Instagram: { stroke: "#E1306C", fill: "#E1306C" },
  YouTube: { stroke: "#FF0000", fill: "#FF0000" },
  TikTok: { stroke: "#69C9D0", fill: "#69C9D0" },
  Facebook: { stroke: "#1877F2", fill: "#1877F2" },
  X: { stroke: "#1DA1F2", fill: "#1DA1F2" },
  LinkedIn: { stroke: "#0A66C2", fill: "#0A66C2" },
  Twitch: { stroke: "#9146FF", fill: "#9146FF" },
  Snapchat: { stroke: "#FFFC00", fill: "#FFFC00" },
  Other: { stroke: "hsl(175 80% 40%)", fill: "hsl(175 80% 40%)" },
};

function formatNumber(num) {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num?.toString() || "0";
}

function formatWeek(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-popover/95 backdrop-blur-md border border-border/40 rounded-xl px-4 py-3 shadow-xl">
      <p className="text-xs text-muted-foreground mb-2 font-medium">
        Week of {label}
      </p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.stroke || entry.color }}
          />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-semibold text-foreground">
            {formatNumber(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

const UserAnalytics = ({
  squadsLoading,
  computedAnalytics,
  mySquads,
  selectedSquadAnalytics,
  setSelectedSquadAnalytics,
}) => {
  const [growthData, setGrowthData] = useState(null);
  const [growthLoading, setGrowthLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [activeMetric, setActiveMetric] = useState("followers");

  const fetchGrowthHistory = useCallback(async () => {
    setGrowthLoading(true);
    try {
      const res = await fetch("/api/growth/history", { credentials: "include" });
      const data = await res.json();
      if (res.ok && data.success) {
        setGrowthData(data);
        // Auto-select first platform
        const platforms = Object.keys(data.history || {});
        if (platforms.length > 0 && !selectedPlatform) {
          setSelectedPlatform(platforms[0]);
        }
      }
    } catch {
      // Silently fail
    } finally {
      setGrowthLoading(false);
    }
  }, [selectedPlatform]);

  useEffect(() => {
    fetchGrowthHistory();
  }, [fetchGrowthHistory]);

  const platforms = Object.keys(growthData?.history || {});
  const currentHistory = selectedPlatform
    ? growthData?.history?.[selectedPlatform] || []
    : [];
  const currentGrowth = selectedPlatform
    ? growthData?.growthSummary?.[selectedPlatform]
    : null;

  // Prepare chart data
  const chartData = currentHistory.map((snap) => ({
    week: formatWeek(snap.weekStart),
    followers: snap.followers,
    avgLikes: snap.avgLikes,
    avgComments: snap.avgComments,
    avgReach: snap.avgReach,
  }));

  const metricOptions = [
    { key: "followers", label: "Followers", icon: Users, color: "text-primary" },
    { key: "avgLikes", label: "Avg Likes", icon: Heart, color: "text-pink-500" },
    { key: "avgComments", label: "Comments", icon: MessageCircle, color: "text-blue-500" },
    { key: "avgReach", label: "Reach", icon: Eye, color: "text-amber-500" },
  ];

  const isLoading = squadsLoading || growthLoading;

  return (
    <div className="space-y-6 sm:space-y-8">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-muted-foreground text-sm">Loading analytics...</p>
        </div>
      ) : (
        <>
          {/* ── Squad Engagement Stats (existing) ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: "Active Squads", value: computedAnalytics.totalSquads, icon: Users },
              { label: "Posts Engaged", value: computedAnalytics.totalPostsEngaged, icon: Zap },
              { label: "Avg Engagement", value: `${computedAnalytics.avgEngagement}%`, icon: TrendingUp },
              { label: "Total Posts", value: computedAnalytics.totalPosts, icon: BarChart3 },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-4 sm:p-6 gradient-border text-center hover:bg-card/60 transition-all group"
              >
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Growth Analytics Section ── */}
          {platforms.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
                  Platform Growth
                </h3>
              </div>

              {/* Platform Selector Tabs */}
              <div className="flex flex-wrap gap-2 mb-5">
                {platforms.map((plat) => {
                  const growth = growthData?.growthSummary?.[plat];
                  return (
                    <button className="cursor-pointer"
                      key={plat}
                      onClick={() => setSelectedPlatform(plat)}
                      className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border ${
                        selectedPlatform === plat
                          ? "bg-primary/10 text-primary border-primary/30 shadow-[0_0_15px_-5px_hsl(var(--primary)/0.3)]"
                          : "bg-secondary/30 text-muted-foreground border-border/30 hover:bg-secondary/50 hover:text-foreground"
                      }`}
                    >
                      <span className="text-base sm:text-lg">
                        {platformIcons[plat]}
                      </span>
                      <span className="hidden sm:inline">{plat}</span>
                      {growth && growth.followerPct > 0 && (
                        <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] px-1.5 py-0 ml-0.5">
                          <ArrowUp className="h-2.5 w-2.5 mr-0.5" />
                          {growth.followerPct}%
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Growth Summary Cards */}
              {currentGrowth && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {[
                    {
                      label: "Follower Growth",
                      value: `+${formatNumber(currentGrowth.followerGrowth)}`,
                      sub: `${currentGrowth.followerPct}% increase`,
                      positive: currentGrowth.followerGrowth > 0,
                      icon: Users,
                    },
                    {
                      label: "Current Followers",
                      value: formatNumber(currentGrowth.latestFollowers),
                      sub: `from ${formatNumber(currentGrowth.baselineFollowers)}`,
                      positive: true,
                      icon: TrendingUp,
                    },
                    {
                      label: "Likes Growth",
                      value: `+${formatNumber(currentGrowth.likeGrowth)}`,
                      sub: `${currentGrowth.likePct}% increase`,
                      positive: currentGrowth.likeGrowth > 0,
                      icon: Heart,
                    },
                    {
                      label: "Data Points",
                      value: currentGrowth.weeks,
                      sub: `weeks tracked`,
                      positive: true,
                      icon: CalendarCheck,
                    },
                  ].map((card, i) => (
                    <motion.div
                      key={card.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="glass rounded-xl p-3 sm:p-4 gradient-border"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <card.icon className="h-3.5 w-3.5 text-primary" />
                        <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider truncate">
                          {card.label}
                        </span>
                      </div>
                      <div className={`text-lg sm:text-xl font-heading font-bold ${card.positive ? "text-foreground" : "text-destructive"}`}>
                        {card.value}
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        {card.positive ? (
                          <ArrowUp className="h-2.5 w-2.5 text-emerald-500" />
                        ) : (
                          <ArrowDown className="h-2.5 w-2.5 text-destructive" />
                        )}
                        {card.sub}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Metric Toggle */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                {metricOptions.map((m) => (
                  <button className="cursor-pointer"
                    key={m.key}
                    onClick={() => setActiveMetric(m.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                      activeMetric === m.key
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <m.icon className={`h-3 w-3 ${activeMetric === m.key ? m.color : ""}`} />
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Growth Chart */}
              <div className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 gradient-border">
                {chartData.length < 2 ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-3">
                    <CalendarCheck className="h-10 w-10 text-muted-foreground/40" />
                    <p className="text-muted-foreground text-sm text-center">
                      Submit at least 2 weekly check-ins to see your growth chart.
                    </p>
                  </div>
                ) : (
                  <div className="h-64 sm:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={chartData}
                        margin={{ top: 5, right: 5, left: -15, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient
                            id={`gradient-${selectedPlatform}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor={
                                platformColorMap[selectedPlatform]?.stroke ||
                                "hsl(175 80% 40%)"
                              }
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor={
                                platformColorMap[selectedPlatform]?.stroke ||
                                "hsl(175 80% 40%)"
                              }
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="hsl(var(--border))"
                          opacity={0.3}
                        />
                        <XAxis
                          dataKey="week"
                          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                          axisLine={{ stroke: "hsl(var(--border))", opacity: 0.3 }}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={formatNumber}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey={activeMetric}
                          name={
                            metricOptions.find((m) => m.key === activeMetric)?.label ||
                            activeMetric
                          }
                          stroke={
                            platformColorMap[selectedPlatform]?.stroke ||
                            "hsl(175 80% 40%)"
                          }
                          strokeWidth={2.5}
                          fill={`url(#gradient-${selectedPlatform})`}
                          dot={{
                            r: 4,
                            fill: "hsl(var(--background))",
                            stroke:
                              platformColorMap[selectedPlatform]?.stroke ||
                              "hsl(175 80% 40%)",
                            strokeWidth: 2,
                          }}
                          activeDot={{
                            r: 6,
                            stroke:
                              platformColorMap[selectedPlatform]?.stroke ||
                              "hsl(175 80% 40%)",
                            strokeWidth: 2,
                            fill: "hsl(var(--background))",
                          }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* No Growth Data Yet */}
          {platforms.length === 0 && !growthLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl sm:rounded-3xl p-8 sm:p-12 gradient-border text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <TrendingUp className="h-8 w-8 text-primary/50" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                No Growth Data Yet
              </h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto mb-5">
                Add platforms to your profile and complete your first weekly check-in to start tracking your growth journey.
              </p>
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                <CalendarCheck className="h-3.5 w-3.5 mr-1.5" />
                Weekly check-ins start tracking your progress
              </Badge>
            </motion.div>
          )}

          {/* ── Squad Engagement Bars (existing) ── */}
          {mySquads.length > 0 && (
            <div className="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 gradient-border">
              <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground mb-6 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Squad Engagement Overview
              </h3>
              <div className="flex items-end gap-3 sm:gap-4 h-44 sm:h-56">
                {mySquads.map((membership, index) => (
                  <motion.div
                    key={membership._id}
                    initial={{ height: 0 }}
                    animate={{
                      height: `${membership.engagementPercentage || 0}%`,
                    }}
                    transition={{
                      delay: 0.3 + index * 0.1,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    className="flex-1 flex flex-col items-center gap-2 sm:gap-3"
                  >
                    <div
                      className={`w-full rounded-t-xl transition-all shadow-lg ${
                        membership.engagementPercentage >= 70
                          ? "bg-gradient-to-t from-primary via-primary/80 to-primary/40 shadow-primary/20"
                          : "bg-gradient-to-t from-destructive via-destructive/80 to-destructive/40 shadow-destructive/20"
                      }`}
                      style={{
                        height: `${membership.engagementPercentage || 0}%`,
                      }}
                    />
                    <span className="text-muted-foreground text-[10px] sm:text-xs font-semibold text-center truncate max-w-full px-1">
                      {membership.squad?.name?.split(" ").slice(0, 2).join(" ") ||
                        "Squad"}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ── Per Squad Analytics (existing) ── */}
          <div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground mb-4 sm:mb-5 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Per Squad Analytics
            </h3>
            {mySquads.length === 0 ? (
              <div className="glass rounded-2xl p-8 text-center">
                <Users className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">
                  Join squads to see analytics here.
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {mySquads.map((membership) => {
                  const squad = membership.squad;
                  if (!squad) return null;
                  return (
                    <div
                      key={membership._id}
                      className="glass rounded-2xl p-5 sm:p-6 gradient-border cursor-pointer hover:bg-card/60 transition-all"
                      onClick={() =>
                        setSelectedSquadAnalytics(
                          selectedSquadAnalytics === membership._id
                            ? null
                            : membership._id
                        )
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                            <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-heading font-bold text-foreground text-sm sm:text-base">
                              {squad.name}
                            </h4>
                            <p className="text-muted-foreground text-xs sm:text-sm">
                              {squad.niche} · {membership.role}
                            </p>
                          </div>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 text-muted-foreground transition-transform ${
                            selectedSquadAnalytics === membership._id
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </div>
                      <AnimatePresence>
                        {selectedSquadAnalytics === membership._id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border/30"
                          >
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                              <div className="bg-secondary/30 rounded-xl p-3 sm:p-4 text-center">
                                <div className="text-foreground font-heading font-bold text-lg sm:text-xl">
                                  {Math.round(membership.engagementPercentage)}%
                                </div>
                                <div className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider mt-1">
                                  Engagement
                                </div>
                              </div>
                              <div className="bg-secondary/30 rounded-xl p-3 sm:p-4 text-center">
                                <div className="text-foreground font-heading font-bold text-lg sm:text-xl">
                                  {membership.postsEngaged || 0}
                                </div>
                                <div className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider mt-1">
                                  Posts Engaged
                                </div>
                              </div>
                              <div className="bg-secondary/30 rounded-xl p-3 sm:p-4 text-center">
                                <div className="text-foreground font-heading font-bold text-lg sm:text-xl">
                                  {membership.totalPosts || 0}
                                </div>
                                <div className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider mt-1">
                                  Total Posts
                                </div>
                              </div>
                              <div className="bg-secondary/30 rounded-xl p-3 sm:p-4 text-center">
                                <div className="text-foreground font-heading font-bold text-lg sm:text-xl">
                                  {Math.round(
                                    membership.squadAvgEngagement || 0
                                  )}
                                  %
                                </div>
                                <div className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider mt-1">
                                  Squad Avg
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserAnalytics;
