import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Shield } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const getEngagementBg = (pct) => {
  if (pct >= 70) return "bg-primary/15 text-primary border-primary/25";
  if (pct >= 30) return "bg-amber-400/15 text-amber-400 border-amber-400/25";
  return "bg-destructive/15 text-destructive border-destructive/25";
};

const MemberList = ({ members, getInitials }) => {
  return (
    <div className="space-y-3 md:space-y-4">
      <div className="flex items-center justify-between mb-1 md:mb-2">
        <h3 className="font-heading font-semibold text-foreground text-sm md:text-base">
          All Members
        </h3>
        <span className="text-muted-foreground text-xs md:text-sm">
          {members.length} member{members.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-4">
        {members.map((member, index) => (
          <motion.div
            key={member._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="flex items-center justify-between bg-secondary/20 rounded-xl md:rounded-2xl px-3.5 md:px-5 py-3 md:py-4 border border-border/15 hover:border-border/30 transition-all duration-200"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Avatar className="h-9 w-9 md:h-11 md:w-11 flex-shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-xs md:text-sm font-heading font-bold">
                  {getInitials(member.user?.username)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="font-heading font-semibold text-foreground text-sm truncate">
                    {member.user?.username || "Unknown"}
                  </span>
                  {member.role === "admin" && (
                    <Badge className="bg-primary/15 text-primary border-primary/25 text-[9px] md:text-[10px] px-1.5 py-0 rounded-md flex-shrink-0">
                      <Shield className="h-2 w-2 md:h-2.5 md:w-2.5 mr-0.5" />
                      Admin
                    </Badge>
                  )}
                </div>
                <span className="text-muted-foreground text-[11px] md:text-xs block truncate">
                  {member.user?.email || ""}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2.5 flex-shrink-0 ml-2">
              {member.engagementPercentage < 30 && (
                <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
              )}
              <Badge
                className={`${getEngagementBg(
                  member.engagementPercentage
                )} text-[11px] md:text-xs font-heading font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-lg md:rounded-xl`}
              >
                {Math.round(member.engagementPercentage)}%
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MemberList;
