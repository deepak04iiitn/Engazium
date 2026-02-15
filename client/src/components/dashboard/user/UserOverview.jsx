"use client";

import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Zap,
  Target,
  ArrowUp,
  Activity,
  BarChart3,
  User,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const UserOverview = ({ currentUser, computedAnalytics, profileCompletion, squadsLoading, mySquads, setActiveSection }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl glass p-8 gradient-border"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                Welcome back, <span className="text-gradient">{currentUser?.username}</span>! 👋
              </h2>
              <p className="text-muted-foreground">Here's what's happening with your engagement today</p>
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30">
              <Activity className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Squads", value: computedAnalytics.totalSquads, icon: Users, color: "text-primary", trend: `${computedAnalytics.totalSquads} joined`, up: computedAnalytics.totalSquads > 0 },
          { label: "Avg Engagement", value: `${computedAnalytics.avgEngagement}%`, icon: TrendingUp, color: "text-primary", trend: computedAnalytics.avgEngagement >= 70 ? "On track" : "Needs work", up: computedAnalytics.avgEngagement >= 70 },
          { label: "Posts Engaged", value: computedAnalytics.totalPostsEngaged, icon: Zap, color: "text-primary", trend: `of ${computedAnalytics.totalPosts} total`, up: computedAnalytics.totalPostsEngaged > 0 },
          { label: "Profile Complete", value: `${profileCompletion}%`, icon: Target, color: "text-primary", trend: profileCompletion === 100 ? "Complete!" : `${100 - profileCompletion}% left`, up: profileCompletion >= 50 },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-5 gradient-border hover:bg-card/60 transition-all group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <Badge className={`text-xs ${stat.up ? 'bg-primary/20 text-primary border-primary/30' : 'bg-secondary text-muted-foreground'}`}>
                {stat.up && <ArrowUp className="h-3 w-3 mr-0.5" />}
                {stat.trend}
              </Badge>
            </div>
            <div className="text-2xl font-heading font-bold text-foreground mb-1">{stat.value}</div>
            <div className="text-muted-foreground text-xs uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* My Squads Summary & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Squads Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass rounded-2xl p-6 gradient-border"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              My Squads
            </h3>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10" onClick={() => setActiveSection("squads")}>View All</Button>
          </div>
          <div className="space-y-3">
            {squadsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
              </div>
            ) : mySquads.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">You haven't joined any squads yet.</p>
                <Button size="sm" className="mt-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl" asChild>
                  <Link href="/squads">Browse Squads</Link>
                </Button>
              </div>
            ) : (
              mySquads.slice(0, 4).map((membership, index) => (
                <motion.div
                  key={membership._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0 bg-primary/20 text-primary">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground font-medium truncate">{membership.squad?.name || "Unknown Squad"}</p>
                    <p className="text-xs text-muted-foreground">{membership.squad?.niche} · {membership.role}</p>
                  </div>
                  <Badge className={`text-xs shrink-0 ${
                    membership.engagementPercentage >= 70 
                      ? "bg-primary/20 text-primary border-primary/30" 
                      : "bg-destructive/20 text-destructive border-destructive/30"
                  }`}>
                    {Math.round(membership.engagementPercentage)}%
                  </Badge>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6 gradient-border"
        >
          <h3 className="font-heading font-semibold text-lg text-foreground mb-5 flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl glow-box justify-start" onClick={() => setActiveSection("squads")}>
              <Users className="h-4 w-4 mr-2" />
              View My Squads
            </Button>
            <Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/10 rounded-xl justify-start" onClick={() => setActiveSection("profile")}>
              <User className="h-4 w-4 mr-2" />
              Complete Profile
            </Button>
            <Button variant="outline" className="w-full border-border/50 hover:bg-secondary/50 rounded-xl justify-start" onClick={() => setActiveSection("analytics")}>
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
            <Button variant="outline" className="w-full border-border/50 hover:bg-secondary/50 rounded-xl justify-start" asChild>
              <Link href="/squads">
                <Users className="h-4 w-4 mr-2" />
                Browse Squads
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserOverview;
