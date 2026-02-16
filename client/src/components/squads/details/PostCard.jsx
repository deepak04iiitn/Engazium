import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  CheckCircle2,
  Activity,
  Link2,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PostCard = ({
  post,
  index,
  getInitials,
  timeAgo,
  handleDeletePost,
  handleStartEngagement,
  isAdmin,
  engagingPostId,
  timerSeconds,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-secondary/20 rounded-xl md:rounded-2xl p-4 md:p-6 border border-border/15 hover:border-border/30 transition-all duration-200"
    >
      {/* Header: Avatar + Name + Time */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-9 w-9 md:h-11 md:w-11 flex-shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary text-xs md:text-sm font-heading font-bold">
            {getInitials(post.author?.username)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-heading font-semibold text-foreground text-sm truncate">
              {post.author?.username || "Unknown"}
            </span>
            {post.isOwnPost && (
              <Badge className="bg-secondary text-muted-foreground text-[9px] px-1.5 py-0 rounded-md flex-shrink-0">
                You
              </Badge>
            )}
          </div>
          <span className="text-muted-foreground text-[11px] md:text-xs flex items-center gap-1">
            <Clock className="h-2.5 w-2.5 md:h-3 md:w-3" />
            {timeAgo(post.createdAt)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {post.userEngagement?.isValid && (
            <CheckCircle2 className="h-4 w-4 text-primary" />
          )}
          {(post.isOwnPost || isAdmin) && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleDeletePost(post._id)}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg h-8 w-8 p-0"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Caption */}
      {post.caption && (
        <p className="text-secondary-foreground text-sm leading-relaxed mb-3 pl-0 md:pl-14">
          {post.caption}
        </p>
      )}

      {/* Footer: Engagements + Actions */}
      <div className="flex items-center justify-between pl-0 md:pl-14">
        <div className="flex items-center gap-3 md:gap-5 text-xs md:text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Activity className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{post.engagementCount || 0} engagements</span>
            <span className="sm:hidden">{post.engagementCount || 0}</span>
          </span>
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary/70 hover:text-primary transition-colors"
          >
            <Link2 className="h-3 w-3 md:h-3.5 md:w-3.5" />
            <span className="hidden sm:inline">View link</span>
            <span className="sm:hidden">Link</span>
          </a>
        </div>

        {/* Engage / Status */}
        {!post.isOwnPost && (
          <div className="flex-shrink-0">
            {post.userEngagement?.isValid ? (
              <Badge className="bg-primary/15 text-primary border-primary/25 text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-lg md:rounded-xl">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Engaged
              </Badge>
            ) : engagingPostId === post._id ? (
              <Badge className="bg-amber-400/15 text-amber-400 border-amber-400/25 text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-lg md:rounded-xl animate-pulse">
                <Clock className="h-3 w-3 mr-1" />
                {timerSeconds}s
              </Badge>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10 rounded-lg md:rounded-xl text-[11px] md:text-xs h-8 px-3 md:px-4"
                onClick={() => handleStartEngagement(post._id, post.link)}
                disabled={!!engagingPostId}
              >
                <ExternalLink className="h-3 w-3 mr-1 md:mr-2" />
                Engage
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PostCard;
