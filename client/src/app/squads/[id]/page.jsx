"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  TrendingUp,
  Eye,
  Clock,
  BarChart3,
  CheckCircle2,
  Crown,
  AlertTriangle,
  Activity,
  ExternalLink,
  Loader2,
  ArrowLeft,
  LogOut,
  Plus,
  Link2,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const SquadDetailPage = () => {
  const { id } = useParams();
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
  const [engagementTimer, setEngagementTimer] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [activeEngagementId, setActiveEngagementId] = useState(null);

  // Leave squad
  const [leaveLoading, setLeaveLoading] = useState(false);

  // Check if current user is a member
  const currentMembership = members.find(
    (m) => m.user?._id === currentUser?._id
  );
  const isAdmin = currentMembership?.role === "admin";
  const isMember = !!currentMembership;

  // Fetch squad details + members
  const fetchSquad = useCallback(async () => {
    try {
      const res = await fetch(`/api/squads/${id}`, { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch squad");
      setSquad(data.squad);
      setMembers(data.squad.members || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Fetch posts
  const fetchPosts = useCallback(async () => {
    if (!isMember) return;
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
    if (!isMember) return;
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
    if (!isMember) return;
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
    if (isMember) {
      fetchPosts();
      fetchEngagementStats();
      fetchPostCount();
    }
  }, [isMember, fetchPosts, fetchEngagementStats, fetchPostCount]);

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

      toast.info("Engagement started! Spend at least 25 seconds on the content, then come back to validate.");
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
  const getEngagementColor = (pct) => {
    if (pct >= 70) return "text-primary";
    if (pct >= 30) return "text-amber-400";
    return "text-destructive";
  };

  const getEngagementBg = (pct) => {
    if (pct >= 70) return "bg-primary/20 text-primary border-primary/30";
    if (pct >= 30) return "bg-amber-400/20 text-amber-400 border-amber-400/30";
    return "bg-destructive/20 text-destructive border-destructive/30";
  };

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

  const getWeeksActive = (dateStr) => {
    if (!dateStr) return 0;
    const now = new Date();
    const joined = new Date(dateStr);
    const weeks = Math.floor((now - joined) / (7 * 24 * 60 * 60 * 1000));
    return Math.max(1, weeks);
  };

  const getPlanPostLimit = (plan) => {
    const limits = { Growth: 1, Pro: 2, Momentum: 3 };
    return limits[plan] || 1;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-muted-foreground text-sm font-heading">Loading squad...</p>
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
          <h2 className="font-heading font-bold text-xl text-foreground mb-2">Squad not found</h2>
          <p className="text-muted-foreground text-sm mb-6">This squad may have been deleted or doesn&apos;t exist.</p>
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

        {/* Squad Card — mirrors DemoSquadSection exactly */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass rounded-2xl gradient-border overflow-hidden">
            {/* Top Bar */}
            <div className="px-6 py-4 border-b border-border/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-foreground text-lg">
                      {squad.name}
                    </h3>
                    <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px]">
                      <Crown className="h-2.5 w-2.5 mr-1" />
                      {squad.plan}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {squad.niche} · {squad.memberCount} Members
                    {squad.platform ? ` · ${squad.platform}` : ""} ·{" "}
                    {getPlanPostLimit(squad.plan)} post/day
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                {isMember && engagementStats && (
                  <div className="text-center">
                    <div className="text-primary font-heading font-bold text-lg">
                      {engagementStats.engagementPercentage}%
                    </div>
                    <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                      Your Engagement
                    </div>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-primary font-heading font-bold text-lg flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5" />
                    {squad.avgEngagement || 0}%
                  </div>
                  <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                    Avg Eng
                  </div>
                </div>
                {isMember && currentMembership && (
                  <div className="text-center">
                    <div className="text-foreground font-heading font-bold text-lg">
                      Week {getWeeksActive(currentMembership.joinedAt)}
                    </div>
                    <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                      Active
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="px-6 pt-3 border-b border-border/30 flex items-center justify-between">
              <div className="flex gap-1">
                {["feed", "members", "stats"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2.5 text-sm font-heading font-medium rounded-t-lg transition-all duration-200 capitalize ${
                      activeTab === tab
                        ? "bg-primary/10 text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab === "feed" && (
                      <MessageCircle className="h-3.5 w-3.5 inline mr-1.5" />
                    )}
                    {tab === "members" && (
                      <Users className="h-3.5 w-3.5 inline mr-1.5" />
                    )}
                    {tab === "stats" && (
                      <BarChart3 className="h-3.5 w-3.5 inline mr-1.5" />
                    )}
                    {tab}
                  </button>
                ))}
              </div>

              {/* Leave / Actions */}
              {isMember && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLeaveSquad}
                  disabled={leaveLoading}
                  className="text-muted-foreground hover:text-destructive text-xs"
                >
                  {leaveLoading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <>
                      <LogOut className="h-3.5 w-3.5 mr-1.5" />
                      Leave
                    </>
                  )}
                </Button>
              )}
            </div>

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
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-secondary/30 rounded-xl p-5 border border-border/20"
                  >
                    <form onSubmit={handleCreatePost}>
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
                            {postCount.remaining}/{postCount.dailyLimit} posts
                            remaining today
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
                          disabled={createPostLoading || !newPostLink.trim()}
                          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-auto self-end"
                        >
                          {createPostLoading ? (
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

                  {/* Engagement Timer Bar */}
                  <AnimatePresence>
                    {engagingPostId && activeEngagementId && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-xl px-4 py-3"
                      >
                        <Clock className="h-5 w-5 text-primary flex-shrink-0 animate-pulse" />
                        <div className="flex-1">
                          <p className="text-sm font-heading font-semibold text-foreground">
                            Engaging... {timerSeconds}s elapsed
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {timerSeconds < 25
                              ? `Spend at least ${25 - timerSeconds}s more on the content`
                              : "Ready to validate!"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {timerSeconds >= 25 && (
                            <Button
                              size="sm"
                              onClick={handleValidateEngagement}
                              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-xs h-8"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                              Validate
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCancelEngagement}
                            className="text-muted-foreground hover:text-foreground rounded-lg text-xs h-8"
                          >
                            Cancel
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Posts List */}
                  {postsLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="h-6 w-6 text-primary animate-spin" />
                    </div>
                  ) : posts.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageCircle className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
                      <p className="text-muted-foreground text-sm">
                        No posts yet. Be the first to share!
                      </p>
                    </div>
                  ) : (
                    posts.map((post, index) => (
                      <motion.div
                        key={post._id}
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
                                        onClick={() =>
                                          handleStartEngagement(
                                            post._id,
                                            post.link
                                          )
                                        }
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
                    ))
                  )}

                  {/* Engagement Info Toast — same style as demo */}
                  {isMember && engagementStats && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-xl px-4 py-3"
                    >
                      <TrendingUp className="h-5 w-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-sm font-heading font-semibold text-foreground">
                          Your Engagement: {engagementStats.engagementPercentage}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          You engaged with {engagementStats.validEngagements} out of{" "}
                          {engagementStats.totalOpportunities} squad posts this
                          week.{" "}
                          {engagementStats.engagementPercentage >= 70
                            ? "Keep it up!"
                            : engagementStats.engagementPercentage >= 30
                            ? "Try to engage more!"
                            : "Warning: Your engagement is low."}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Members Tab */}
              {isMember && activeTab === "members" && (
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
              )}

              {/* Stats Tab */}
              {isMember && activeTab === "stats" && (
                <div className="space-y-6">
                  {/* Weekly Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      {
                        label: "Total Engagements",
                        value: engagementStats?.totalValidEngagements || 0,
                        icon: Heart,
                      },
                      {
                        label: "Your Engagement",
                        value: `${engagementStats?.engagementPercentage || 0}%`,
                        icon: TrendingUp,
                      },
                      {
                        label: "Squad Avg Eng",
                        value: `${squad.avgEngagement || 0}%`,
                        icon: Activity,
                      },
                      {
                        label: "Active Members",
                        value: `${squad.memberCount}/${squad.maxMembers}`,
                        icon: Users,
                      },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-secondary/30 rounded-xl p-4 border border-border/20 text-center"
                      >
                        <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                        <div className="font-heading font-bold text-foreground text-xl">
                          {stat.value}
                        </div>
                        <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Member Leaderboard */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-secondary/30 rounded-xl p-5 border border-border/20"
                  >
                    <h4 className="font-heading font-semibold text-foreground text-sm mb-4">
                      Top Engagers
                    </h4>
                    <div className="space-y-3">
                      {[...members]
                        .sort(
                          (a, b) =>
                            b.engagementPercentage - a.engagementPercentage
                        )
                        .slice(0, 5)
                        .map((member, index) => (
                          <div
                            key={member._id}
                            className="flex items-center gap-3"
                          >
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-heading font-bold ${
                                index === 0
                                  ? "bg-primary/20 text-primary"
                                  : index === 1
                                  ? "bg-muted text-muted-foreground"
                                  : "bg-secondary text-muted-foreground"
                              }`}
                            >
                              {index + 1}
                            </span>
                            <Avatar className="h-7 w-7">
                              <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-heading font-bold">
                                {getInitials(member.user?.username)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-heading font-medium text-foreground text-sm flex-1">
                              {member.user?.username || "Unknown"}
                            </span>
                            <Badge
                              className={`${getEngagementBg(
                                member.engagementPercentage
                              )} text-xs font-heading font-bold`}
                            >
                              {Math.round(member.engagementPercentage)}%
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>

          {/* Annotation — same as demo */}
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

