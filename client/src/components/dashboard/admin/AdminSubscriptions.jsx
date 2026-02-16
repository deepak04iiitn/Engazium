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
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-2xl font-heading font-bold text-foreground mb-0.5 sm:mb-1">Subscriptions</h2>
          <p className="text-muted-foreground text-xs sm:text-sm">{adminSubscriptions.length} total · {activeSubs} active</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search subscriptions..." 
          value={subSearch} 
          onChange={(e) => setSubSearch(e.target.value)} 
          className="pl-9 sm:pl-11 bg-card/50 border-border/50 rounded-xl h-10 sm:h-12 text-sm"
        />
      </div>

      <div className="space-y-2 sm:space-y-3">
        {filteredSubs.map((sub, index) => (
          <motion.div 
            key={sub.id} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: index * 0.05 }} 
            className="glass rounded-xl sm:rounded-2xl p-3 sm:p-5 gradient-border hover:bg-card/60 transition-all"
          >
            {/* Mobile Layout */}
            <div className="sm:hidden">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-sm text-foreground truncate">{sub.user}</h3>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{sub.squad}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    <Badge className={`text-[10px] px-1.5 py-0 ${sub.status === "Active" ? "bg-primary/20 text-primary border-primary/30" : "bg-destructive/20 text-destructive border-destructive/30"}`}>
                      {sub.status}
                    </Badge>
                    <Badge className="text-[10px] px-1.5 py-0 bg-secondary text-muted-foreground">{sub.plan}</Badge>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-heading font-bold text-foreground">{sub.price}</div>
                  <div className="text-[10px] text-muted-foreground">/mo</div>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:block">
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
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminSubscriptions;
