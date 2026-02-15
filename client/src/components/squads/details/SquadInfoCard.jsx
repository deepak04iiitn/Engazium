import React from "react";
import { Users, Crown, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const getWeeksActive = (dateStr) => {
  if (!dateStr) return 0;
  const now = new Date();
  const joined = new Date(dateStr);
  const weeks = Math.floor((now - joined) / (7 * 24 * 60 * 60 * 1000));
  return Math.max(1, weeks);
};

const getPlanPostLimit = (plan) => {
  const limits = { Growth: 1, Pro: 2, Momentum: 3 };
  return limits[plan] || 1;
};

const SquadInfoCard = ({ squad, engagementStats, isMember, currentMembership }) => {
  return (
    <div className="px-6 py-4 border-b border-border/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-heading font-bold text-foreground text-lg">
              {squad.name}
            </h3>
            <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px]">
              <Crown className="h-2.5 w-2.5 mr-1" />
              {squad.plan}
            </Badge>
          </div>
          <p className="text-muted-foreground text-xs">
            {squad.niche} · {squad.memberCount} Members
            {squad.platform ? ` · ${squad.platform}` : ""} ·{" "}
            {getPlanPostLimit(squad.plan)} post/day
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        {isMember && engagementStats && (
          <div className="text-center">
            <div className="text-primary font-heading font-bold text-lg">
              {engagementStats.engagementPercentage}%
            </div>
            <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
              Your Engagement
            </div>
          </div>
        )}
        <div className="text-center">
          <div className="text-primary font-heading font-bold text-lg flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" />
            {squad.avgEngagement || 0}%
          </div>
          <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
            Avg Eng
          </div>
        </div>
        {isMember && currentMembership && (
          <div className="text-center">
            <div className="text-foreground font-heading font-bold text-lg">
              Week {getWeeksActive(currentMembership.joinedAt)}
            </div>
            <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
              Active
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SquadInfoCard;
