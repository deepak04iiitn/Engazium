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
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 text-primary animate-spin" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageCircle className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
        <p className="text-muted-foreground text-sm">
          No posts yet. Be the first to share!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
