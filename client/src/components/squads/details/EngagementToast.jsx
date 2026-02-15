import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const EngagementToast = ({ engagementStats }) => {
  if (!engagementStats) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-xl px-4 py-3 mt-4"
    >
      <TrendingUp className="h-5 w-5 text-primary flex-shrink-0" />
      <div>
        <p className="text-sm font-heading font-semibold text-foreground">
          Your Engagement: {engagementStats.engagementPercentage}%
        </p>
        <p className="text-xs text-muted-foreground">
          You engaged with {engagementStats.validEngagements} out of{" "}
          {engagementStats.totalOpportunities} squad posts this week.{" "}
          {engagementStats.engagementPercentage >= 70
            ? "Keep it up!"
            : engagementStats.engagementPercentage >= 30
            ? "Try to engage more!"
            : "Warning: Your engagement is low."}
        </p>
      </div>
    </motion.div>
  );
};

export default EngagementToast;
