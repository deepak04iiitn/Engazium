"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Award,
  Calendar,
  Clock,
  Target,
  BarChart3,
} from "lucide-react";

const AdminEarnings = ({ earnings }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-1">Earnings Dashboard</h2>
        <p className="text-muted-foreground text-sm">Revenue analytics and insights</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Lifetime", value: earnings.lifetime, icon: Award },
          { label: "This Month", value: earnings.thisMonth, icon: Target },
          { label: "Last Month", value: earnings.lastMonth, icon: Clock },
          { label: "Growth", value: earnings.growth, icon: TrendingUp },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6 gradient-border text-center hover:bg-card/60 transition-all group"
          >
            <stat.icon className="h-6 w-6 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <div className="text-2xl font-heading font-bold text-foreground mb-2">{stat.value}</div>
            <div className="text-muted-foreground text-xs uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-3xl p-8 gradient-border">
        <h3 className="font-heading font-bold text-xl text-foreground mb-6 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Monthly Revenue Breakdown
        </h3>
        <div className="flex items-end gap-4 h-72">
          {earnings.monthlyBreakdown.map((m, index) => {
            const maxAmount = Math.max(...earnings.monthlyBreakdown.map(x => x.amount));
            const heightPercent = (m.amount / maxAmount) * 100;
            return (
              <motion.div 
                key={m.month}
                initial={{ height: 0 }}
                animate={{ height: `${heightPercent}%` }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                className="flex-1 flex flex-col items-center gap-3"
              >
                <span className="text-foreground text-sm font-heading font-semibold">₹{(m.amount / 1000).toFixed(1)}K</span>
                <div className="w-full bg-gradient-to-t from-primary via-primary/80 to-primary/40 rounded-t-xl hover:from-primary hover:via-primary hover:to-primary/60 transition-all cursor-pointer shadow-lg shadow-primary/20" style={{ height: `${heightPercent}%` }} />
                <span className="text-muted-foreground text-sm font-semibold">{m.month}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminEarnings;
