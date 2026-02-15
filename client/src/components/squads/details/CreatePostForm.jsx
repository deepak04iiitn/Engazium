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
      className="bg-secondary/30 rounded-xl p-5 border border-border/20"
    >
      <form onSubmit={onSubmit}>
        <div className="flex items-center gap-2 mb-3">
          <Plus className="h-4 w-4 text-primary" />
          <h4 className="font-heading font-semibold text-foreground text-sm">
            Share a Post
          </h4>
          {postCount && (
            <Badge
              variant="outline"
              className="ml-auto text-[10px] border-primary/30 text-primary"
            >
              {postCount.remaining}/{postCount.dailyLimit} posts remaining today
            </Badge>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 space-y-2">
            <Input
              placeholder="Paste your content link (e.g. https://instagram.com/p/...)"
              value={newPostLink}
              onChange={(e) => setNewPostLink(e.target.value)}
              className="bg-background/50 border-border/30 rounded-lg text-sm"
            />
            <Input
              placeholder="Optional caption — tell your squad what it's about"
              value={newPostCaption}
              onChange={(e) => setNewPostCaption(e.target.value)}
              className="bg-background/50 border-border/30 rounded-lg text-sm"
              maxLength={280}
            />
          </div>
          <Button
            type="submit"
            disabled={loading || !newPostLink.trim()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-auto self-end"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Send className="h-4 w-4 mr-1.5" />
                Post
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreatePostForm;
