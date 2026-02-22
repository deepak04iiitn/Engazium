import React from "react";
import { Users, Crown, TrendingUp, Calendar, Globe } from "lucide-react";
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
    <div className="w-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Left — squad identity */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-primary/25 to-primary/5 border border-primary/15 flex items-center justify-center flex-shrink-0">
            <Users className="h-6 w-6 lg:h-7 lg:w-7 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="font-heading font-bold text-foreground text-xl lg:text-2xl truncate">
                {squad.name}
              </h1>
              <Badge className="bg-primary/15 text-primary border-primary/20 text-[11px] px-2 py-0.5 rounded-lg">
                <Crown className="h-3 w-3 mr-1" />
                {squad.plan}
              </Badge>
            </div>
            <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5 text-muted-foreground text-[13px] mt-1">
              <span>{squad.niche}</span>
              <span className="text-border/60">·</span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {squad.memberCount}/{squad.maxMembers}
              </span>
              {squad.platform && (
                <>
                  <span className="text-border/60">·</span>
                  <span className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    {squad.platform}
                  </span>
                </>
              )}
              <span className="text-border/60">·</span>
              <span>{getPlanPostLimit(squad.plan)} post/day</span>
            </div>
          </div>
        </div>

        {/* Right — quick stat chips */}
        <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
          {isMember && engagementStats && (
            <div className="glass rounded-xl px-4 py-2.5 text-center min-w-[80px] shadow-sm dark:shadow-none">
              <div className="text-primary font-heading font-bold text-lg leading-tight">
                {engagementStats.engagementPercentage}%
              </div>
              <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                You
              </div>
            </div>
          )}
          <div className="glass rounded-xl px-4 py-2.5 text-center min-w-[80px] shadow-sm dark:shadow-none">
            <div className="text-foreground font-heading font-bold text-lg leading-tight flex items-center justify-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              {squad.avgEngagement || 0}%
            </div>
            <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
              Squad
            </div>
          </div>
          {isMember && currentMembership && (
            <div className="hidden sm:block glass rounded-xl px-4 py-2.5 text-center min-w-[80px] shadow-sm dark:shadow-none">
              <div className="text-foreground font-heading font-bold text-lg leading-tight flex items-center justify-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                {getWeeksActive(currentMembership.joinedAt)}w
              </div>
              <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                Active
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SquadInfoCard;
