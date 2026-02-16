import React from "react";
import { Loader2, MessageCircle } from "lucide-react";
import PostCard from "./PostCard";

const PostList = ({
  loading,
  posts,
  getInitials,
  timeAgo,
  handleDeletePost,
  handleStartEngagement,
  isAdmin,
  engagingPostId,
  timerSeconds,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 md:py-20">
        <Loader2 className="h-6 w-6 md:h-7 md:w-7 text-primary animate-spin" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16 md:py-20">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-3 md:mb-4">
          <MessageCircle className="h-7 w-7 md:h-8 md:w-8 text-muted-foreground/40" />
        </div>
        <p className="text-muted-foreground text-sm">
          No posts yet. Be the first to share!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 md:space-y-5">
      {posts.map((post, index) => (
        <PostCard
          key={post._id}
          post={post}
          index={index}
          getInitials={getInitials}
          timeAgo={timeAgo}
          handleDeletePost={handleDeletePost}
          handleStartEngagement={handleStartEngagement}
          isAdmin={isAdmin}
          engagingPostId={engagingPostId}
          timerSeconds={timerSeconds}
        />
      ))}
    </div>
  );
};

export default PostList;
