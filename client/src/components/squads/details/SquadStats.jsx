import React from "react";
import { motion } from "framer-motion";
import { Heart, TrendingUp, Activity, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const getEngagementBg = (pct) => {
  if (pct >= 70) return "bg-primary/20 text-primary border-primary/30";
  if (pct >= 30) return "bg-amber-400/20 text-amber-400 border-amber-400/30";
  return "bg-destructive/20 text-destructive border-destructive/30";
};

const SquadStats = ({ squad, engagementStats, members, getInitials }) => {
  return (
    <div className="space-y-6">
      {/* Weekly Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Engagements",
            value: engagementStats?.totalValidEngagements || 0,
            icon: Heart,
          },
          {
            label: "Your Engagement",
            value: `${engagementStats?.engagementPercentage || 0}%`,
            icon: TrendingUp,
          },
          {
            label: "Squad Avg Eng",
            value: `${squad.avgEngagement || 0}%`,
            icon: Activity,
          },
          {
            label: "Active Members",
            value: `${squad.memberCount}/${squad.maxMembers}`,
            icon: Users,
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-secondary/30 rounded-xl p-4 border border-border/20 text-center"
          >
            <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
            <div className="font-heading font-bold text-foreground text-xl">
              {stat.value}
            </div>
            <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Member Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-secondary/30 rounded-xl p-5 border border-border/20"
      >
        <h4 className="font-heading font-semibold text-foreground text-sm mb-4">
          Top Engagers
        </h4>
        <div className="space-y-3">
          {[...members]
            .sort((a, b) => b.engagementPercentage - a.engagementPercentage)
            .slice(0, 5)
            .map((member, index) => (
              <div key={member._id} className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-heading font-bold ${
                    index === 0
                      ? "bg-primary/20 text-primary"
                      : index === 1
                      ? "bg-muted text-muted-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </span>
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-heading font-bold">
                    {getInitials(member.user?.username)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-heading font-medium text-foreground text-sm flex-1">
                  {member.user?.username || "Unknown"}
                </span>
                <Badge
                  className={`${getEngagementBg(
                    member.engagementPercentage
                  )} text-xs font-heading font-bold`}
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
