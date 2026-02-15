"use client"

import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const SquadsSection = ({ mySquads, squadsLoading }) => {
  return (
    <div>
      {squadsLoading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-muted-foreground text-sm">Loading your squads...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {mySquads.map((membership, index) => {
            const squad = membership.squad;
            if (!squad) return null;
            return (
              <Link href={`/squads/${squad._id}`} key={membership._id}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: index * 0.1 }} 
                  className="glass rounded-3xl p-6 gradient-border hover:bg-card/60 transition-all group cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] group-hover:bg-primary/10 transition-colors" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-lg text-foreground mb-1 group-hover:text-gradient transition-colors">{squad.name}</h3>
                        <p className="text-muted-foreground text-sm">{squad.niche}{squad.platform ? ` · ${squad.platform}` : ""}</p>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-primary/30 text-xs font-semibold capitalize">
                        {membership.role}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="bg-secondary/30 rounded-xl p-4 text-center group-hover:bg-secondary/50 transition-colors">
                        <div className="text-foreground font-heading font-bold text-xl">{membership.postsEngaged || 0}</div>
                        <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Posts Engaged</div>
                      </div>
                      <div className="bg-secondary/30 rounded-xl p-4 text-center group-hover:bg-secondary/50 transition-colors">
                        <div className="text-foreground font-heading font-bold text-xl">{membership.totalPosts || 0}</div>
                        <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Total Posts</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <TrendingUp className="h-3.5 w-3.5" />
                          Engagement
                        </span>
                        <span className={`font-semibold ${membership.engagementPercentage >= 70 ? "text-primary" : "text-destructive"}`}>
                          {Math.round(membership.engagementPercentage)}%
                        </span>
                      </div>
                      <Progress value={membership.engagementPercentage} className="h-2 bg-secondary/50 rounded-full" />
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border/20">
                      <span className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        {squad.memberCount}/{squad.maxMembers} members
                      </span>
                      <Badge className="text-[10px]" variant={squad.status === "Recruiting" ? "default" : "secondary"}>
                        {squad.status}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}

          {/* Add New Squad Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: mySquads.length * 0.1 }}
            className="glass rounded-3xl p-6 gradient-border hover:bg-card/60 transition-all cursor-pointer border-dashed flex items-center justify-center min-h-[300px]"
          >
            <Link href="/squads" className="flex flex-col items-center gap-4 text-center">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-1">Join More Squads</h3>
                <p className="text-muted-foreground text-sm">Discover and join squads in your niche</p>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl glow-box">
                Browse Squads
              </Button>
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SquadsSection;

