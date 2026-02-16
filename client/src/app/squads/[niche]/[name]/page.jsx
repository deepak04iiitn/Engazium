"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Users, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Components
import SquadInfoCard from "@/components/squads/details/SquadInfoCard";
import SquadTabsNavbar from "@/components/squads/details/SquadTabsNavbar";
import CreatePostForm from "@/components/squads/details/CreatePostForm";
import EngagementTimer from "@/components/squads/details/EngagementTimer";
import PostList from "@/components/squads/details/PostList";
import EngagementToast from "@/components/squads/details/EngagementToast";
import MemberList from "@/components/squads/details/MemberList";
import SquadStats from "@/components/squads/details/SquadStats";

const SquadDetailPage = () => {
  const { niche, name } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.user);

  // Core data
  const [squad, setSquad] = useState(null);
  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [engagementStats, setEngagementStats] = useState(null);
  const [postCount, setPostCount] = useState(null);

  // UI state
  const [activeTab, setActiveTab] = useState("feed");
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);

  // Create post state
  const [newPostLink, setNewPostLink] = useState("");
  const [newPostCaption, setNewPostCaption] = useState("");
  const [createPostLoading, setCreatePostLoading] = useState(false);

  // Engagement tracking
  const [engagingPostId, setEngagingPostId] = useState(null);
  const [activeEngagementId, setActiveEngagementId] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Leave squad
  const [leaveLoading, setLeaveLoading] = useState(false);

  // Check if current user is a member
  const currentMembership = members.find(
    (m) => m.user?._id === currentUser?._id
  );
  const isAdmin = currentMembership?.role === "admin";
  const isMember = !!currentMembership;

  const id = squad?._id; // Get mongo ID after squad is fetched

  // Fetch squad details + members by niche and name
  const fetchSquad = useCallback(async () => {
    try {
      const res = await fetch(`/api/squads/niche/${niche}/slug/${name}`, { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch squad");
      setSquad(data.squad);
      setMembers(data.squad.members || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [niche, name]);

  // Fetch posts
  const fetchPosts = useCallback(async () => {
    if (!isMember || !id) return;
    setPostsLoading(true);
    try {
      const res = await fetch(`/api/posts/squad/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch posts");
      setPosts(data.posts || []);
    } catch (err) {
      // Silently fail for non-members
      setPosts([]);
    } finally {
      setPostsLoading(false);
    }
  }, [id, isMember]);

  // Fetch engagement stats
  const fetchEngagementStats = useCallback(async () => {
    if (!isMember || !id) return;
    try {
      const res = await fetch(`/api/engagement/stats/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setEngagementStats(data.stats);
    } catch {
      // silent
    }
  }, [id, isMember]);

  // Fetch post count
  const fetchPostCount = useCallback(async () => {
    if (!isMember || !id) return;
    try {
      const res = await fetch(`/api/posts/my-count/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setPostCount(data);
    } catch {
      // silent
    }
  }, [id, isMember]);

  useEffect(() => {
    if (!currentUser) {
      router.push("/sign-in");
      return;
    }
    fetchSquad();
  }, [currentUser, fetchSquad, router]);

  // Fetch posts and stats once we know user is a member
  useEffect(() => {
    if (isMember && id) {
      fetchPosts();
      fetchEngagementStats();
      fetchPostCount();
    }
  }, [isMember, id, fetchPosts, fetchEngagementStats, fetchPostCount]);

  // Timer effect for engagement tracking
  useEffect(() => {
    let interval;
    if (engagingPostId && activeEngagementId) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [engagingPostId, activeEngagementId]);

  // Create post handler
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPostLink.trim()) {
      toast.error("Please enter a link");
      return;
    }
    setCreatePostLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          squadId: id,
          link: newPostLink.trim(),
          caption: newPostCaption.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create post");
      toast.success("Post created successfully!");
      setNewPostLink("");
      setNewPostCaption("");
      fetchPosts();
      fetchPostCount();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setCreatePostLoading(false);
    }
  };

  // Start engagement
  const handleStartEngagement = async (postId, link) => {
    try {
      const res = await fetch("/api/engagement/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ postId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to start engagement");

      setEngagingPostId(postId);
      setActiveEngagementId(data.engagement.id);
      setTimerSeconds(0);

      // Open the link in a new tab
      window.open(link, "_blank");

      toast.info(
        "Engagement started! Spend at least 25 seconds on the content, then come back to validate."
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Validate engagement
  const handleValidateEngagement = async () => {
    if (!activeEngagementId) return;
    try {
      const res = await fetch("/api/engagement/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          engagementId: activeEngagementId,
          timeSpent: timerSeconds,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Validation failed");

      toast.success("Engagement validated!");
      setEngagingPostId(null);
      setActiveEngagementId(null);
      setTimerSeconds(0);
      fetchPosts();
      fetchEngagementStats();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Cancel engagement tracking
  const handleCancelEngagement = () => {
    setEngagingPostId(null);
    setActiveEngagementId(null);
    setTimerSeconds(0);
  };

  // Leave squad
  const handleLeaveSquad = async () => {
    setLeaveLoading(true);
    try {
      const res = await fetch(`/api/squads/${id}/leave`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to leave squad");
      toast.success("You have left the squad");
      router.push("/squads");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLeaveLoading(false);
    }
  };

  // Delete post
  const handleDeletePost = async (postId) => {
    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete post");
      toast.success("Post deleted");
      fetchPosts();
      fetchPostCount();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Helpers
  const getInitials = (name) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const timeAgo = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const seconds = Math.floor((now - date) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-muted-foreground text-sm font-heading">
            Loading squad...
          </p>
        </div>
      </div>
    );
  }

  // Squad not found
  if (!squad) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Users className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
          <h2 className="font-heading font-bold text-xl text-foreground mb-2">
            Squad not found
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            This squad may have been deleted or doesn&apos;t exist.
          </p>
          <Link href="/squads">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse Squads
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-glow-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8 pt-28 max-w-5xl">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            href="/squads"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-heading font-medium">Back to Squads</span>
          </Link>
        </motion.div>

        {/* Squad Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass rounded-2xl gradient-border overflow-hidden">
            {/* Squad Info Card */}
            <SquadInfoCard
              squad={squad}
              engagementStats={engagementStats}
              isMember={isMember}
              currentMembership={currentMembership}
            />

            {/* Tab Navigation */}
            <SquadTabsNavbar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isMember={isMember}
              onLeave={handleLeaveSquad}
              leaveLoading={leaveLoading}
            />

            {/* Tab Content */}
            <div className="p-6 min-h-[400px]">
              {/* Not a member message */}
              {!isMember && !loading && (
                <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                  <Users className="h-12 w-12 text-muted-foreground/50" />
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    You&apos;re not a member
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-sm">
                    Join this squad to view the feed, engage with posts, and
                    connect with other creators.
                  </p>
                  <Link href="/squads#browse-squads">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
                      Browse & Join Squads
                    </Button>
                  </Link>
                </div>
              )}

              {/* Feed Tab */}
              {isMember && activeTab === "feed" && (
                <div className="space-y-4">
                  {/* Create Post Form */}
                  <CreatePostForm
                    onSubmit={handleCreatePost}
                    newPostLink={newPostLink}
                    setNewPostLink={setNewPostLink}
                    newPostCaption={newPostCaption}
                    setNewPostCaption={setNewPostCaption}
                    loading={createPostLoading}
                    postCount={postCount}
                  />

                  {/* Engagement Timer Bar */}
                  <EngagementTimer
                    engagingPostId={engagingPostId}
                    activeEngagementId={activeEngagementId}
                    timerSeconds={timerSeconds}
                    onValidate={handleValidateEngagement}
                    onCancel={handleCancelEngagement}
                  />

                  {/* Posts List */}
                  <PostList
                    loading={postsLoading}
                    posts={posts}
                    getInitials={getInitials}
                    timeAgo={timeAgo}
                    handleDeletePost={handleDeletePost}
                    handleStartEngagement={handleStartEngagement}
                    isAdmin={isAdmin}
                    engagingPostId={engagingPostId}
                    timerSeconds={timerSeconds}
                  />

                  {/* Engagement Info Toast */}
                  <EngagementToast engagementStats={engagementStats} />
                </div>
              )}

              {/* Members Tab */}
              {isMember && activeTab === "members" && (
                <MemberList members={members} getInitials={getInitials} />
              )}

              {/* Stats Tab */}
              {isMember && activeTab === "stats" && (
                <SquadStats
                  squad={squad}
                  engagementStats={engagementStats}
                  members={members}
                  getInitials={getInitials}
                />
              )}
            </div>
          </div>

          {/* Annotation */}
          {!isMember && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center text-muted-foreground/60 text-xs mt-4 italic"
            >
              Join this squad to access the full feed, members list, and
              engagement tracking.
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SquadDetailPage;
