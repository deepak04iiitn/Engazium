import React from "react";
import { motion } from "framer-motion";
import { Plus, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CreatePostForm = ({
  onSubmit,
  newPostLink,
  setNewPostLink,
  newPostCaption,
  setNewPostCaption,
  loading,
  postCount,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-secondary/20 rounded-xl md:rounded-2xl p-4 md:p-8 border border-border/15"
    >
      <form onSubmit={onSubmit}>
        <div className="flex items-center justify-between gap-3 mb-4 md:mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Plus className="h-4 w-4 text-primary" />
            </div>
            <h4 className="font-heading font-semibold text-foreground text-sm md:text-base">
              Share a Post
            </h4>
          </div>
          {postCount && (
            <Badge
              variant="outline"
              className="text-[10px] md:text-xs border-primary/30 text-primary px-2 md:px-3 py-0.5 md:py-1"
            >
              {postCount.remaining}/{postCount.dailyLimit} left
            </Badge>
          )}
        </div>
        <div className="space-y-3">
          <Input
            placeholder="Paste your content link..."
            value={newPostLink}
            onChange={(e) => setNewPostLink(e.target.value)}
            className="bg-background/50 border-border/30 rounded-lg md:rounded-xl text-sm h-11 md:h-12 px-3.5 md:px-4"
          />
          <Input
            placeholder="Optional caption..."
            value={newPostCaption}
            onChange={(e) => setNewPostCaption(e.target.value)}
            className="bg-background/50 border-border/30 rounded-lg md:rounded-xl text-sm h-11 md:h-12 px-3.5 md:px-4"
            maxLength={280}
          />
          <Button
            type="submit"
            disabled={loading || !newPostLink.trim()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg md:rounded-xl h-11 w-full md:w-auto md:ml-auto md:flex text-sm font-semibold px-6"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
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
