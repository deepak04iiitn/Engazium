"use client";

import { motion } from "framer-motion";
import {
  Users,
  DollarSign,
  CreditCard,
  Shield,
  TrendingUp,
  Award,
  Calendar,
  Clock,
  ArrowUp,
  BarChart3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AdminOverview = ({
  pagination,
  earnings,
  activeSubs,
  adminSubscriptions,
  adminSquads
}) => {
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
                Admin <span className="text-gradient">Dashboard</span> 🛡️
              </h2>
              <p className="text-muted-foreground">Platform overview and management</p>
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30">
              <Shield className="h-3 w-3 mr-1" />
              Administrator
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: pagination.totalUsers.toString(), icon: Users, color: "text-primary", trend: `${pagination.totalUsers} registered`, up: true },
          { label: "Lifetime Earnings", value: earnings.lifetime, icon: DollarSign, color: "text-primary", trend: earnings.growth, up: true },
          { label: "Active Subscriptions", value: activeSubs.toString(), icon: CreditCard, color: "text-primary", trend: `${adminSubscriptions.length} total`, up: true },
          { label: "Total Squads", value: adminSquads.length.toString(), icon: Shield, color: "text-primary", trend: `${adminSquads.filter(s => s.status === "Active").length} active`, up: true },
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
              <Badge className="text-xs bg-primary/20 text-primary border-primary/30">
                {stat.up && <ArrowUp className="h-3 w-3 mr-0.5" />}
                {stat.trend}
              </Badge>
            </div>
            <div className="text-2xl font-heading font-bold text-foreground mb-1">{stat.value}</div>
            <div className="text-muted-foreground text-xs uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass rounded-3xl p-8 gradient-border"
        >
          <h3 className="font-heading font-bold text-xl text-foreground mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Monthly Revenue
          </h3>
          <div className="flex items-end gap-4 h-64">
            {earnings.monthlyBreakdown.map((m, index) => {
              const maxAmount = Math.max(...earnings.monthlyBreakdown.map(x => x.amount));
              const heightPercent = (m.amount / maxAmount) * 100;
              return (
                <motion.div 
                  key={m.month} 
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                  className="flex-1 flex flex-col items-center gap-3"
                >
                  <span className="text-foreground text-sm font-heading font-semibold">₹{(m.amount / 1000).toFixed(1)}K</span>
                  <div className="w-full bg-gradient-to-t from-primary via-primary/80 to-primary/40 rounded-t-xl hover:from-primary hover:via-primary hover:to-primary/60 transition-all shadow-lg shadow-primary/20" style={{ height: `${heightPercent}%` }} />
                  <span className="text-muted-foreground text-sm font-semibold">{m.month}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Revenue Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-3xl p-6 gradient-border"
        >
          <h3 className="font-heading font-semibold text-lg text-foreground mb-5 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Revenue Stats
          </h3>
          <div className="space-y-4">
            {[
              { label: "Lifetime", value: earnings.lifetime, icon: Award },
              { label: "This Month", value: earnings.thisMonth, icon: Calendar },
              { label: "Last Month", value: earnings.lastMonth, icon: Clock },
              { label: "Growth", value: earnings.growth, icon: TrendingUp },
            ].map((stat) => (
              <div key={stat.label} className="bg-secondary/30 rounded-xl p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className="h-4 w-4 text-primary" />
                  <div className="text-muted-foreground text-xs uppercase tracking-wider">{stat.label}</div>
                </div>
                <div className="text-xl font-heading font-bold text-foreground">{stat.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminOverview;
