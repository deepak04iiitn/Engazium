"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  TrendingUp,
  Zap,
  BarChart3,
  Loader2,
  ChevronDown,
} from "lucide-react";

const UserAnalytics = ({
  squadsLoading,
  computedAnalytics,
  mySquads,
  selectedSquadAnalytics,
  setSelectedSquadAnalytics
}) => {
  return (
    <div className="space-y-8">
      {squadsLoading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-muted-foreground text-sm">Loading analytics...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Active Squads", value: computedAnalytics.totalSquads, icon: Users },
              { label: "Posts Engaged", value: computedAnalytics.totalPostsEngaged, icon: Zap },
              { label: "Avg Engagement", value: `${computedAnalytics.avgEngagement}%`, icon: TrendingUp },
              { label: "Total Posts", value: computedAnalytics.totalPosts, icon: BarChart3 },
            ].map((stat, i) => (
              <motion.div 
                key={stat.label} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.08 }} 
                className="glass rounded-2xl p-6 gradient-border text-center hover:bg-card/60 transition-all group"
              >
                <stat.icon className="h-6 w-6 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-heading font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground text-xs uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Per Squad Engagement Bars */}
          {mySquads.length > 0 && (
            <div className="glass rounded-3xl p-8 gradient-border">
              <h3 className="font-heading font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Squad Engagement Overview
              </h3>
              <div className="flex items-end gap-4 h-56">
                {mySquads.map((membership, index) => (
                  <motion.div 
                    key={membership._id} 
                    initial={{ height: 0 }}
                    animate={{ height: `${membership.engagementPercentage || 0}%` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                    className="flex-1 flex flex-col items-center gap-3"
                  >
                    <div 
                      className={`w-full rounded-t-xl transition-all shadow-lg ${
                        membership.engagementPercentage >= 70 
                          ? "bg-gradient-to-t from-primary via-primary/80 to-primary/40 shadow-primary/20" 
                          : "bg-gradient-to-t from-destructive via-destructive/80 to-destructive/40 shadow-destructive/20"
                      }`} 
                      style={{ height: `${membership.engagementPercentage || 0}%` }} 
                    />
                    <span className="text-muted-foreground text-xs font-semibold text-center truncate max-w-full px-1">
                      {membership.squad?.name?.split(" ").slice(0, 2).join(" ") || "Squad"}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Per Squad Analytics */}
          <div>
            <h3 className="font-heading font-bold text-xl text-foreground mb-5 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Per Squad Analytics
            </h3>
            {mySquads.length === 0 ? (
              <div className="glass rounded-2xl p-8 text-center">
                <Users className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">Join squads to see analytics here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {mySquads.map((membership) => {
                  const squad = membership.squad;
                  if (!squad) return null;
                  return (
                    <div 
                      key={membership._id} 
                      className="glass rounded-2xl p-6 gradient-border cursor-pointer hover:bg-card/60 transition-all" 
                      onClick={() => setSelectedSquadAnalytics(selectedSquadAnalytics === membership._id ? null : membership._id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-heading font-bold text-foreground">{squad.name}</h4>
                            <p className="text-muted-foreground text-sm">{squad.niche} · {membership.role}</p>
                          </div>
                        </div>
                        <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${selectedSquadAnalytics === membership._id ? "rotate-180" : ""}`} />
                      </div>
                      <AnimatePresence>
                        {selectedSquadAnalytics === membership._id && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: "auto" }} 
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 pt-6 border-t border-border/30"
                          >
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                              <div className="bg-secondary/30 rounded-xl p-4 text-center">
                                <div className="text-foreground font-heading font-bold text-xl">{Math.round(membership.engagementPercentage)}%</div>
                                <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Engagement</div>
                              </div>
                              <div className="bg-secondary/30 rounded-xl p-4 text-center">
                                <div className="text-foreground font-heading font-bold text-xl">{membership.postsEngaged || 0}</div>
                                <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Posts Engaged</div>
                              </div>
                              <div className="bg-secondary/30 rounded-xl p-4 text-center">
                                <div className="text-foreground font-heading font-bold text-xl">{membership.totalPosts || 0}</div>
                                <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Total Posts</div>
                              </div>
                              <div className="bg-secondary/30 rounded-xl p-4 text-center">
                                <div className="text-foreground font-heading font-bold text-xl">{Math.round(membership.squadAvgEngagement || 0)}%</div>
                                <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Squad Avg</div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserAnalytics;
