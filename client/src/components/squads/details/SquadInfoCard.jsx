import React from "react";
import { Users, Crown, TrendingUp, Calendar } from "lucide-react";
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
    <div className="px-5 sm:px-8 lg:px-10 py-6 sm:py-8 border-b border-border/20">
      {/* Top row: Squad identity */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/15 flex items-center justify-center flex-shrink-0">
            <Users className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="font-heading font-bold text-foreground text-xl sm:text-2xl">
                {squad.name}
              </h2>
              <Badge className="bg-primary/15 text-primary border-primary/25 text-xs px-2.5 py-1">
                <Crown className="h-3 w-3 mr-1.5" />
                {squad.plan}
              </Badge>
            </div>
            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-muted-foreground text-sm">
              <span>{squad.niche}</span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {squad.memberCount} Members
              </span>
              {squad.platform && (
                <>
                  <span className="text-border">·</span>
                  <span>{squad.platform}</span>
                </>
              )}
              <span className="text-border">·</span>
              <span>{getPlanPostLimit(squad.plan)} post/day</span>
            </div>
          </div>
        </div>

        {/* Stats pills */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          {isMember && engagementStats && (
            <div className="bg-secondary/40 rounded-xl px-5 py-3 text-center min-w-[90px]">
              <div className="text-primary font-heading font-bold text-xl sm:text-2xl">
                {engagementStats.engagementPercentage}%
              </div>
              <div className="text-muted-foreground text-[11px] uppercase tracking-wider mt-0.5">
                Your Engagement
              </div>
            </div>
          )}
          <div className="bg-secondary/40 rounded-xl px-5 py-3 text-center min-w-[90px]">
            <div className="text-primary font-heading font-bold text-xl sm:text-2xl flex items-center justify-center gap-1.5">
              <TrendingUp className="h-4 w-4" />
              {squad.avgEngagement || 0}%
            </div>
            <div className="text-muted-foreground text-[11px] uppercase tracking-wider mt-0.5">
              Avg Engagement
            </div>
          </div>
          {isMember && currentMembership && (
            <div className="bg-secondary/40 rounded-xl px-5 py-3 text-center min-w-[90px]">
              <div className="text-foreground font-heading font-bold text-xl sm:text-2xl flex items-center justify-center gap-1.5">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                {getWeeksActive(currentMembership.joinedAt)}
              </div>
              <div className="text-muted-foreground text-[11px] uppercase tracking-wider mt-0.5">
                Week Active
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SquadInfoCard;
