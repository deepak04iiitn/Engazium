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

const SquadCard = ({ squad, viewMode, index, joiningId, onJoin }) => {
  if (viewMode === "grid") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="glass rounded-2xl gradient-border p-5 group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-foreground text-base truncate">
              {squad.name}
            </h3>
            <p className="text-muted-foreground text-xs mt-1 truncate">
              {squad.niche}
              {squad.platform ? ` · ${squad.platform}` : ""}
            </p>
          </div>
          <Badge
            variant={squad.status === "Recruiting" ? "default" : "secondary"}
            className={`ml-2 text-[10px] flex-shrink-0 ${
              squad.status === "Recruiting"
                ? "bg-primary/20 text-primary border-primary/40"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {squad.status}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-2 bg-secondary/20 rounded-lg">
            <div className="text-foreground font-heading font-bold text-base">
              {squad.memberCount}/{squad.maxMembers}
            </div>
            <div className="text-muted-foreground text-[9px] uppercase tracking-wider mt-0.5">
              Members
            </div>
          </div>
          <div className="text-center p-2 bg-secondary/20 rounded-lg">
            <div className="text-foreground font-heading font-bold text-base flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3 text-primary" />
              {squad.avgEngagement || 0}%
            </div>
            <div className="text-muted-foreground text-[9px] uppercase tracking-wider mt-0.5">
              Engagement
            </div>
          </div>
          <div className="text-center p-2 bg-secondary/20 rounded-lg">
            <div className="text-foreground font-heading font-bold text-base flex items-center justify-center gap-1">
              {getPlanIcon(squad.plan)}
              <span className="text-xs">{squad.plan}</span>
            </div>
            <div className="text-muted-foreground text-[9px] uppercase tracking-wider mt-0.5">
              {getPlanPostLimit(squad.plan)} post/day
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">Capacity</span>
            <span className="text-xs font-semibold text-foreground">
              {Math.round((squad.memberCount / squad.maxMembers) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 bg-secondary/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${(squad.memberCount / squad.maxMembers) * 100}%`,
              }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
              className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full"
            />
          </div>
          <p className="text-muted-foreground text-[10px] mt-1">
            {squad.maxMembers - squad.memberCount} spot
            {squad.maxMembers - squad.memberCount !== 1 ? "s" : ""} remaining
          </p>
        </div>

        <Button
          size="sm"
          className={`w-full rounded-xl font-heading font-semibold transition-all duration-200 ${
            squad.status === "Recruiting"
              ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
          disabled={squad.status !== "Recruiting" || joiningId === squad._id}
          onClick={() => onJoin(squad._id)}
        >
          {joiningId === squad._id ? (
            <>
              <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
              Joining...
            </>
          ) : squad.status === "Recruiting" ? (
            <>
              Join Squad
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </>
          ) : (
            <span>Squad Full</span>
          )}
        </Button>
      </motion.div>
    );
  }

  // List View
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="glass rounded-2xl gradient-border p-6 flex items-center gap-6 group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-foreground text-lg truncate">
              {squad.name}
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              {squad.niche}
              {squad.platform ? ` · ${squad.platform}` : ""}
            </p>
          </div>
          <Badge
            variant={squad.status === "Recruiting" ? "default" : "secondary"}
            className={`ml-3 ${
              squad.status === "Recruiting"
                ? "bg-primary/20 text-primary border-primary/40"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {squad.status}
          </Badge>
        </div>

        <div className="flex items-center gap-6 mb-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">
              {squad.memberCount}/{squad.maxMembers}
            </span>
            <span className="text-xs text-muted-foreground">members</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              {squad.avgEngagement || 0}%
            </span>
            <span className="text-xs text-muted-foreground">engagement</span>
          </div>
          <div className="flex items-center gap-2">
            {getPlanIcon(squad.plan)}
            <span className="text-sm font-semibold text-foreground">
              {squad.plan}
            </span>
            <span className="text-xs text-muted-foreground">
              ({getPlanPostLimit(squad.plan)} post/day)
            </span>
          </div>
        </div>

        <div className="w-full max-w-md">
          <div className="w-full h-2 bg-secondary/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${(squad.memberCount / squad.maxMembers) * 100}%`,
              }}
              transition={{ duration: 0.8 }}
              className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full"
            />
          </div>
          <p className="text-muted-foreground text-xs mt-1.5">
            {squad.maxMembers - squad.memberCount} spot
            {squad.maxMembers - squad.memberCount !== 1 ? "s" : ""} remaining
          </p>
        </div>
      </div>

      <Button
        size="default"
        className={`flex-shrink-0 rounded-xl font-heading font-semibold px-8 ${
          squad.status === "Recruiting"
            ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        }`}
        disabled={squad.status !== "Recruiting" || joiningId === squad._id}
        onClick={() => onJoin(squad._id)}
      >
        {joiningId === squad._id ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Joining...
          </>
        ) : squad.status === "Recruiting" ? (
          <>
            Join Squad
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </>
        ) : (
          <span>Squad Full</span>
        )}
      </Button>
    </motion.div>
  );
};

export default SquadCard;
