import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  CheckCircle2,
  Activity,
  Link2,
  ExternalLink,
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
      transition={{ delay: index * 0.05 }}
      className="bg-secondary/30 rounded-xl p-5 border border-border/20 hover:border-border/40 transition-colors"
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-heading font-bold">
            {getInitials(post.author?.username)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="font-heading font-semibold text-foreground text-sm">
                {post.author?.username || "Unknown"}
              </span>
              {post.isOwnPost && (
                <Badge className="bg-secondary text-muted-foreground text-[9px] px-1.5 py-0">
                  You
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {timeAgo(post.createdAt)}
              </span>
              {post.userEngagement?.isValid && (
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              )}
            </div>
          </div>

          {post.caption && (
            <p className="text-secondary-foreground text-sm leading-relaxed mb-3">
              {post.caption}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Activity className="h-3.5 w-3.5" />
                {post.engagementCount || 0} engagements
              </span>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary/70 hover:text-primary transition-colors"
              >
                <Link2 className="h-3 w-3" />
                View link
              </a>
            </div>

            <div className="flex items-center gap-2">
              {/* Delete button for own posts or admin */}
              {(post.isOwnPost || isAdmin) && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDeletePost(post._id)}
                  className="text-muted-foreground hover:text-destructive rounded-lg text-xs h-8 px-2"
                >
                  &times;
                </Button>
              )}

              {/* Engage button — only for other people's posts */}
              {!post.isOwnPost && (
                <>
                  {post.userEngagement?.isValid ? (
                    <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Engaged
                    </Badge>
                  ) : engagingPostId === post._id ? (
                    <Badge className="bg-amber-400/20 text-amber-400 border-amber-400/30 text-xs animate-pulse">
                      <Clock className="h-3 w-3 mr-1" />
                      {timerSeconds}s
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary/30 text-primary hover:bg-primary/10 rounded-lg text-xs h-8 px-3"
                      onClick={() => handleStartEngagement(post._id, post.link)}
                      disabled={!!engagingPostId}
                    >
                      <ExternalLink className="h-3 w-3 mr-1.5" />
                      Engage
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;
