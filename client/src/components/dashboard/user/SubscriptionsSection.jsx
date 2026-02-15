"use client"

import { motion } from "framer-motion";
import {
  CreditCard,
  Calendar,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const subscriptions = [
  { id: 1, plan: "Growth Squad", squad: "Tech Creators Hub", price: "₹100/mo", nextBilling: "Mar 10, 2026", status: "Active", since: "Jan 2026" },
  { id: 2, plan: "Growth Squad", squad: "SaaS Growth Squad", price: "₹100/mo", nextBilling: "Mar 15, 2026", status: "Active", since: "Feb 2026" },
  { id: 3, plan: "Starter Squad", squad: "Startup Builders", price: "₹50/mo", nextBilling: "Mar 20, 2026", status: "Active", since: "Feb 2026" },
];

const SubscriptionsSection = () => {
  return (
    <div className="space-y-6">
      {subscriptions.map((sub, index) => (
        <motion.div 
          key={sub.id} 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: index * 0.1 }} 
          className="glass rounded-2xl p-6 gradient-border hover:bg-card/60 transition-all"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-heading font-bold text-lg text-foreground">{sub.squad}</h3>
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                    {sub.plan}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="h-3.5 w-3.5" />
                    {sub.price}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Next billing: {sub.nextBilling}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    Since {sub.since}
                  </span>
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-destructive/30 text-destructive hover:bg-destructive/10 rounded-xl"
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      ))}

      <div className="glass rounded-2xl p-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <CreditCard className="h-5 w-5 text-primary" />
          <p className="text-muted-foreground text-sm">
            Total Monthly: <span className="text-foreground font-heading font-bold text-xl ml-2">₹250</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsSection;

