"use client";

import { motion } from "framer-motion";
import {
  Users,
  Search,
  Shield,
  TrendingUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const AdminSquads = ({ adminSquads }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-2xl font-heading font-bold text-foreground mb-0.5 sm:mb-1">Squads Overview</h2>
          <p className="text-muted-foreground text-xs sm:text-sm">Monitor community growth and performance</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search squads..." 
          className="pl-9 sm:pl-11 bg-card/50 border-border/50 rounded-xl h-10 sm:h-12 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {adminSquads.map((squad, index) => (
          <motion.div 
            key={squad.id} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: index * 0.1 }} 
            className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 gradient-border hover:bg-card/60 transition-all group"
          >
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="min-w-0 flex-1">
                <h3 className="font-heading font-bold text-sm sm:text-lg text-foreground mb-0.5 sm:mb-1 group-hover:text-primary transition-colors truncate">{squad.name}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">{squad.niche}</p>
              </div>
              <Badge className={`text-[10px] sm:text-xs shrink-0 ml-2 ${squad.status === "Active" ? "bg-primary/20 text-primary border-primary/30" : "bg-secondary text-muted-foreground"}`}>
                {squad.status}
              </Badge>
            </div>

            <div className="mb-3 sm:mb-4">
              <div className="flex justify-between text-xs sm:text-sm mb-1.5 sm:mb-2">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  Capacity
                </span>
                <span className="font-semibold text-foreground">
                  {squad.members}/{squad.max}
                </span>
              </div>
              <Progress value={(squad.members / squad.max) * 100} className="h-1.5 sm:h-2 bg-secondary/50 rounded-full" />
            </div>

            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border/20">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                <span className="text-[10px] sm:text-xs font-semibold text-foreground">{squad.type}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 text-primary">
                <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span className="text-xs sm:text-sm font-bold">{squad.revenue}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminSquads;
