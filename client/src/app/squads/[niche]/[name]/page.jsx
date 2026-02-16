"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  Users,
  Loader2,
  ArrowLeft,
  MessageCircle,
  PenSquare,
  BarChart3,
  Crown,
  TrendingUp,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

const mobileTabItems = [
  { key: "feed", label: "Feed", icon: MessageCircle },
  { key: "share", label: "Post", icon: PenSquare },
  { key: "members", label: "Members", icon: Users },
  { key: "stats", label: "Stats", icon: BarChart3 },
];

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

  const id = squad?._id;

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
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
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
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
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

  // Tab content — shared between mobile & desktop
  const renderTabContent = () => (
    <>
      {/* Not a member message */}
      {!isMember && !loading && (
        <div className="flex flex-col items-center justify-center py-16 md:py-28 gap-5 text-center px-4">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-muted/50 flex items-center justify-center">
            <Users className="h-8 w-8 md:h-10 md:w-10 text-muted-foreground/50" />
          </div>
          <h3 className="font-heading font-bold text-lg md:text-xl text-foreground">
            You&apos;re not a member
          </h3>
          <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
            Join this squad to view the feed, engage with posts, and
            connect with other creators.
          </p>
          <Link href="/squads#browse-squads">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8 py-3 text-sm font-semibold mt-2">
              Browse & Join Squads
            </Button>
          </Link>
        </div>
      )}

      {/* Share Post Tab */}
      {isMember && activeTab === "share" && (
        <CreatePostForm
          onSubmit={handleCreatePost}
          newPostLink={newPostLink}
          setNewPostLink={setNewPostLink}
          newPostCaption={newPostCaption}
          setNewPostCaption={setNewPostCaption}
          loading={createPostLoading}
          postCount={postCount}
        />
      )}

      {/* Feed Tab */}
      {isMember && activeTab === "feed" && (
        <div className="space-y-4 md:space-y-6">
          <EngagementTimer
            engagingPostId={engagingPostId}
            activeEngagementId={activeEngagementId}
            timerSeconds={timerSeconds}
            onValidate={handleValidateEngagement}
            onCancel={handleCancelEngagement}
          />
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
    </>
  );

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════ */}
      {/* MOBILE APP-LIKE VIEW (< md) */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="md:hidden min-h-screen bg-background">
        {/* Spacer for main app Navbar */}
        <div className="h-20" />

        {/* Sticky Squad Info Bar — sits below the main Navbar */}
        <div className="sticky top-[72px] z-40 bg-background/95 backdrop-blur-xl border-b border-border/20">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-heading font-bold text-foreground text-sm truncate">
                    {squad.name}
                  </h1>
                  <Badge className="bg-primary/15 text-primary border-primary/25 text-[9px] px-1.5 py-0.5 flex-shrink-0">
                    <Crown className="h-2.5 w-2.5 mr-0.5" />
                    {squad.plan}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-[11px] truncate">
                  {squad.niche} · {squad.memberCount} members
                </p>
              </div>
            </div>
            {isMember && engagementStats && (
              <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                <TrendingUp className="h-3 w-3 text-primary" />
                <span className="text-primary font-heading font-bold text-xs">
                  {engagementStats.engagementPercentage}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Content — padding at bottom for the fixed bottom nav */}
        <div className="px-4 py-4 pb-20 space-y-4">
          {renderTabContent()}
        </div>

        {/* Fixed Bottom Tab Bar — iOS/Android style */}
        {isMember && (
          <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border/20">
            <div className="flex items-center justify-around h-16 px-2">
              {mobileTabItems.map(({ key, label, icon: Icon }) => {
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground active:text-foreground"
                    }`}
                  >
                    <div className={`relative p-1.5 rounded-xl transition-all duration-200 ${
                      isActive ? "bg-primary/15" : ""
                    }`}>
                      <Icon className={`h-5 w-5 transition-all ${isActive ? "scale-110" : ""}`} />
                    </div>
                    <span className={`text-[10px] font-heading font-medium transition-all ${
                      isActive ? "font-semibold" : ""
                    }`}>
                      {label}
                    </span>
                  </button>
                );
              })}
              {/* Leave button in bottom nav */}
              <button
                onClick={handleLeaveSquad}
                disabled={leaveLoading}
                className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 rounded-xl text-muted-foreground active:text-destructive transition-all duration-200"
              >
                <div className="p-1.5">
                  {leaveLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <LogOut className="h-5 w-5" />
                  )}
                </div>
                <span className="text-[10px] font-heading font-medium">Leave</span>
              </button>
            </div>
          </nav>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* DESKTOP VIEW (>= md) */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="hidden md:block min-h-screen bg-background">
        {/* Background effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-glow-secondary/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full mx-auto px-6 lg:px-10 xl:px-16 py-8 lg:py-10 pt-32 lg:pt-36 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass rounded-2xl lg:rounded-3xl gradient-border overflow-hidden">
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
              <div className="p-8 lg:p-10 min-h-[500px]">
                {renderTabContent()}
              </div>
            </div>

            {/* Annotation */}
            {!isMember && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center text-muted-foreground/60 text-xs mt-6 italic"
              >
                Join this squad to access the full feed, members list, and
                engagement tracking.
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SquadDetailPage;
