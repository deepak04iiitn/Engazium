import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const getEngagementBg = (pct) => {
  if (pct >= 70) return "bg-primary/20 text-primary border-primary/30";
  if (pct >= 30) return "bg-amber-400/20 text-amber-400 border-amber-400/30";
  return "bg-destructive/20 text-destructive border-destructive/30";
};

const MemberList = ({ members, getInitials }) => {
  return (
    <div className="space-y-3">
      {members.map((member, index) => (
        <motion.div
          key={member._id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex items-center justify-between bg-secondary/30 rounded-xl px-4 py-3 border border-border/20 hover:border-border/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-heading font-bold">
                {getInitials(member.user?.username)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-semibold text-foreground text-sm">
                  {member.user?.username || "Unknown"}
                </span>
                {member.role === "admin" && (
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-[9px] px-1.5 py-0">
                    Admin
                  </Badge>
                )}
              </div>
              <span className="text-muted-foreground text-xs">
                {member.user?.email || ""}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {member.engagementPercentage < 30 && (
              <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
            )}
            <Badge
              className={`${getEngagementBg(
                member.engagementPercentage
              )} text-xs font-heading font-bold`}
            >
              {Math.round(member.engagementPercentage)}%
            </Badge>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MemberList;
