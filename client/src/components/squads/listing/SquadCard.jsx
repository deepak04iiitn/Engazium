import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Shield,
  Zap,
  Star,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const getPlanIcon = (plan) => {
  if (plan === "Momentum") return <Star className="h-3.5 w-3.5 text-primary" />;
  if (plan === "Pro") return <Zap className="h-3.5 w-3.5 text-primary" />;
  return <Shield className="h-3.5 w-3.5 text-muted-foreground" />;
};

const getPlanPostLimit = (plan) => {
  const limits = { Growth: 1, Pro: 2, Momentum: 3 };
  return limits[plan] || 1;
};

const SquadCard = ({ squad, index, joiningId, onJoin }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="glass rounded-2xl gradient-border p-6 flex flex-col md:flex-row md:items-center gap-6 group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-foreground text-xl truncate">
              {squad.name}
            </h3>
            <p className="text-muted-foreground text-sm mt-1 flex items-center gap-2">
              <span>{squad.niche}</span>
              {squad.platform && (
                <>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>{squad.platform}</span>
                </>
              )}
            </p>
          </div>
          <Badge
            variant={squad.status === "Active" ? "default" : "secondary"}
            className={`self-start md:self-center px-3 py-1 ${
              squad.status === "Active"
                ? "bg-primary/20 text-primary border-primary/40"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {squad.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-secondary/30 flex items-center justify-center shrink-0">
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <div className="text-base font-semibold text-foreground">
                {squad.memberCount}/{squad.maxMembers}
              </div>
              <div className="text-xs text-muted-foreground">Members</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-base font-semibold text-foreground">
                {squad.avgEngagement || 0}%
              </div>
              <div className="text-xs text-muted-foreground">Engagement</div>
            </div>
          </div>

          <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
            <div className="h-10 w-10 rounded-lg bg-secondary/30 flex items-center justify-center shrink-0">
              {getPlanIcon(squad.plan)}
            </div>
            <div>
              <div className="text-base font-semibold text-foreground">
                {squad.plan}
              </div>
              <div className="text-xs text-muted-foreground">
                {getPlanPostLimit(squad.plan)} post/day
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-lg">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-muted-foreground">Capacity</span>
            <span className="text-xs font-semibold text-foreground">
              {Math.round((squad.memberCount / squad.maxMembers) * 100)}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-secondary/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${(squad.memberCount / squad.maxMembers) * 100}%`,
              }}
              transition={{ duration: 0.8 }}
              className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full shadow-[0_0_10px_rgba(var(--primary),0.3)]"
            />
          </div>
           <p className="text-muted-foreground text-xs mt-2">
            {squad.maxMembers - squad.memberCount} spot
            {squad.maxMembers - squad.memberCount !== 1 ? "s" : ""} remaining
          </p>
        </div>
      </div>

      <div className="mt-4 md:mt-0 md:pl-6 md:border-l md:border-border/40 flex items-center justify-center">
        <Button
          size="lg"
          className={`w-full md:w-auto min-w-[160px] rounded-xl font-heading font-semibold transition-all duration-300 ${
            squad.status === "Active"
              ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
          disabled={squad.status === "Full" || squad.memberCount >= squad.maxMembers || joiningId === squad._id}
          onClick={() => onJoin(squad._id)}
        >
          {joiningId === squad._id ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Joining...
            </>
          ) : (squad.status === "Active" || (squad.status === "Recruiting" && squad.memberCount < squad.maxMembers) || (squad.status !== "Full" && squad.memberCount < squad.maxMembers)) ? (
            <>
              Join Squad
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </>
          ) : (
            <span>Squad Full</span>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default SquadCard;
