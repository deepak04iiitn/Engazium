import React from "react";
import { motion } from "framer-motion";
import { Heart, TrendingUp, Activity, Users, Trophy } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const getEngagementBg = (pct) => {
  if (pct >= 70) return "bg-primary/15 text-primary border-primary/25";
  if (pct >= 30) return "bg-amber-400/15 text-amber-400 border-amber-400/25";
  return "bg-destructive/15 text-destructive border-destructive/25";
};

const getRankStyle = (index) => {
  if (index === 0) return "bg-amber-500/15 text-amber-500 border border-amber-500/20";
  if (index === 1) return "bg-slate-400/15 text-slate-400 border border-slate-400/20";
  if (index === 2) return "bg-amber-700/15 text-amber-700 border border-amber-700/20";
  return "bg-muted/50 text-muted-foreground";
};

const SquadStats = ({ squad, engagementStats, members, getInitials }) => {
  return (
    <div className="space-y-5 md:space-y-8">
      {/* Stats Grid */}
      <div>
        <h3 className="font-heading font-semibold text-foreground text-sm md:text-base mb-3 md:mb-5">
          Squad Overview
        </h3>
        <div className="grid grid-cols-2 gap-2.5 md:gap-5 lg:grid-cols-4">
          {[
            {
              label: "Engagements",
              fullLabel: "Total Engagements",
              value: engagementStats?.totalValidEngagements || 0,
              icon: Heart,
            },
            {
              label: "Your Eng.",
              fullLabel: "Your Engagement",
              value: `${engagementStats?.engagementPercentage || 0}%`,
              icon: TrendingUp,
            },
            {
              label: "Squad Avg",
              fullLabel: "Squad Avg Eng",
              value: `${squad.avgEngagement || 0}%`,
              icon: Activity,
            },
            {
              label: "Members",
              fullLabel: "Active Members",
              value: `${squad.memberCount}/${squad.maxMembers}`,
              icon: Users,
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="bg-secondary/20 rounded-xl md:rounded-2xl p-3.5 md:p-6 border border-border/15 text-center"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-2 md:mb-3">
                <stat.icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              </div>
              <div className="font-heading font-bold text-foreground text-lg md:text-2xl lg:text-3xl">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-[9px] md:text-xs uppercase tracking-wider mt-1">
                <span className="md:hidden">{stat.label}</span>
                <span className="hidden md:inline">{stat.fullLabel}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Member Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-secondary/20 rounded-xl md:rounded-2xl p-4 md:p-8 border border-border/15"
      >
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <Trophy className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          <h4 className="font-heading font-semibold text-foreground text-sm md:text-base">
            Top Engagers
          </h4>
        </div>
        <div className="space-y-2 md:space-y-3">
          {[...members]
            .sort((a, b) => b.engagementPercentage - a.engagementPercentage)
            .slice(0, 5)
            .map((member, index) => (
              <div
                key={member._id}
                className="flex items-center gap-2.5 md:gap-4 p-2.5 md:p-4 rounded-lg md:rounded-xl hover:bg-secondary/30 transition-colors"
              >
                <span
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-[10px] md:text-xs font-heading font-bold flex-shrink-0 ${getRankStyle(index)}`}
                >
                  {index + 1}
                </span>
                <Avatar className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-[9px] md:text-xs font-heading font-bold">
                    {getInitials(member.user?.username)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-heading font-medium text-foreground text-sm flex-1 truncate">
                  {member.user?.username || "Unknown"}
                </span>
                <Badge
                  className={`${getEngagementBg(
                    member.engagementPercentage
                  )} text-[10px] md:text-xs font-heading font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-lg md:rounded-xl`}
                >
                  {Math.round(member.engagementPercentage)}%
                </Badge>
              </div>
            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SquadStats;
