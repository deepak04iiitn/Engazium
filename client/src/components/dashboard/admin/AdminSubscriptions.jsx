"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  Search,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const AdminSubscriptions = ({
  adminSubscriptions,
  activeSubs,
  subSearch,
  setSubSearch,
  filteredSubs
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-1">Subscription Management</h2>
          <p className="text-muted-foreground text-sm">{adminSubscriptions.length} total · {activeSubs} active</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search subscriptions..." 
          value={subSearch} 
          onChange={(e) => setSubSearch(e.target.value)} 
          className="pl-11 bg-card/50 border-border/50 rounded-xl h-12"
        />
      </div>

      <div className="space-y-3">
        {filteredSubs.map((sub, index) => (
          <motion.div 
            key={sub.id} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: index * 0.05 }} 
            className="glass rounded-2xl p-5 gradient-border hover:bg-card/60 transition-all"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-heading font-semibold text-foreground">{sub.user}</h3>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{sub.squad}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={`text-xs ${sub.status === "Active" ? "bg-primary/20 text-primary border-primary/30" : "bg-destructive/20 text-destructive border-destructive/30"}`}>
                      {sub.status}
                    </Badge>
                    <Badge className="text-xs bg-secondary text-muted-foreground">{sub.plan}</Badge>
                    <span className="text-xs text-muted-foreground">Since {sub.since}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-heading font-bold text-foreground">{sub.price}</div>
                <div className="text-xs text-muted-foreground">per month</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminSubscriptions;
