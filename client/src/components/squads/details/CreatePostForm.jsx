import React from "react";
import { motion } from "framer-motion";
import { Plus, Send, Loader2, Link2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const CreatePostForm = ({
  onSubmit,
  newPostLink,
  setNewPostLink,
  newPostCaption,
  setNewPostCaption,
  loading,
  postCount,
  hasAcceptedRules,
  onRulesRequired,
}) => {
  const limitReached = postCount && postCount.remaining <= 0;
  const rulesBlocked = !hasAcceptedRules;

  const handleRulesBlocked = () => {
    toast.error("Please accept squad rules before sharing a post.");
    onRulesRequired?.();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rulesBlocked) {
      handleRulesBlocked();
      return;
    }
    if (limitReached) {
      toast.error(
        `Daily post limit reached. Your plan allows ${postCount.dailyLimit} post${postCount.dailyLimit !== 1 ? "s" : ""} per day.`
      );
      return;
    }
    onSubmit(e);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-5 md:p-7 gradient-border"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/15 flex items-center justify-center">
              <Plus className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-foreground text-sm md:text-base">
                Share a Post
              </h4>
              <p className="text-muted-foreground text-[11px] md:text-xs">
                Share your content link for the squad to engage with.
              </p>
            </div>
          </div>
          {postCount && (
            <Badge
              variant="outline"
              className={`text-[10px] md:text-xs px-2.5 py-1 rounded-lg ${
                limitReached
                  ? "border-destructive/25 text-destructive bg-destructive/5"
                  : "border-primary/25 text-primary"
              }`}
            >
              {postCount.remaining}/{postCount.dailyLimit} left
            </Badge>
          )}
        </div>

        <div className="space-y-3">
          <div className="relative">
            <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
            <Input
              placeholder="Paste your content link..."
              value={newPostLink}
              onChange={(e) => setNewPostLink(e.target.value)}
              className="bg-secondary/20 border-border/20 focus:border-primary/40 rounded-xl text-sm h-11 md:h-12 pl-10 pr-4 transition-colors"
            />
          </div>
          <Input
            placeholder="Add a caption (optional)..."
            value={newPostCaption}
            onChange={(e) => setNewPostCaption(e.target.value)}
            className="bg-secondary/20 border-border/20 focus:border-primary/40 rounded-xl text-sm h-11 md:h-12 px-4 transition-colors"
            maxLength={280}
          />
          <Button
            type={rulesBlocked ? "button" : "submit"}
            disabled={loading || !newPostLink.trim() || limitReached}
            onClick={rulesBlocked ? handleRulesBlocked : undefined}
            className={`bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-11 w-full text-sm font-semibold transition-all duration-200 disabled:opacity-40 ${
              rulesBlocked ? "opacity-50 cursor-not-allowed hover:bg-primary" : ""
            }`}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : limitReached ? (
              "Daily Limit Reached"
            ) : rulesBlocked ? (
              "Accept Rules to Share"
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Share Post
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreatePostForm;
