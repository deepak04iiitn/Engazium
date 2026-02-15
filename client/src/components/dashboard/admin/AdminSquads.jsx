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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-1">Squads Overview</h2>
          <p className="text-muted-foreground text-sm">Monitor community growth and performance</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search squads..." 
          className="pl-11 bg-card/50 border-border/50 rounded-xl h-12"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSquads.map((squad, index) => (
          <motion.div 
            key={squad.id} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: index * 0.1 }} 
            className="glass rounded-3xl p-6 gradient-border hover:bg-card/60 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">{squad.name}</h3>
                <p className="text-muted-foreground text-sm">{squad.niche}</p>
              </div>
              <Badge className={`text-xs ${squad.status === "Active" ? "bg-primary/20 text-primary border-primary/30" : "bg-secondary text-muted-foreground"}`}>
                {squad.status}
              </Badge>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  Capacity
                </span>
                <span className="font-semibold text-foreground">
                  {squad.members}/{squad.max}
                </span>
              </div>
              <Progress value={(squad.members / squad.max) * 100} className="h-2 bg-secondary/50 rounded-full" />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border/20">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold text-foreground">{squad.type}</span>
              </div>
              <div className="flex items-center gap-1.5 text-primary">
                <TrendingUp className="h-3.5 w-3.5" />
                <span className="text-sm font-bold">{squad.revenue}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminSquads;
