import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Flame, AlertTriangle } from "lucide-react";

const EngagementToast = ({ engagementStats }) => {
  if (!engagementStats) return null;

  const pct = engagementStats.engagementPercentage;
  const isGood = pct >= 70;
  const isMedium = pct >= 30 && pct < 70;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className={`flex items-center gap-3 md:gap-4 rounded-xl md:rounded-2xl px-4 md:px-6 py-3.5 md:py-5 mt-1 md:mt-2 border ${
        isGood
          ? "bg-primary/10 border-primary/25"
          : isMedium
          ? "bg-amber-500/10 border-amber-500/25"
          : "bg-destructive/10 border-destructive/25"
      }`}
    >
      <div className={`w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 ${
        isGood
          ? "bg-primary/20"
          : isMedium
          ? "bg-amber-500/20"
          : "bg-destructive/20"
      }`}>
        {isGood ? (
          <Flame className="h-4 w-4 md:h-5 md:w-5 text-primary" />
        ) : isMedium ? (
          <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-amber-500" />
        ) : (
          <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 text-destructive" />
        )}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-heading font-semibold text-foreground">
          Engagement: {pct}%
        </p>
        <p className="text-[11px] md:text-sm text-muted-foreground mt-0.5 leading-relaxed">
          {engagementStats.validEngagements}/{engagementStats.totalOpportunities} posts this week.{" "}
          {isGood
            ? "Great work!"
            : isMedium
            ? "Engage more!"
            : "Low engagement!"}
        </p>
      </div>
    </motion.div>
  );
};

export default EngagementToast;
