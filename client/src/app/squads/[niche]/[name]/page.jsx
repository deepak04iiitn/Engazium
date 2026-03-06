"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
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
  ShieldCheck,
  Heart,
  Activity,
  Trophy,
  AlertTriangle,
  UserRoundCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
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
import SquadRulesDialog from "@/components/squads/details/SquadRulesDialog";
import FeedToolbar from "@/components/squads/details/FeedToolbar";

const mobileTabItems = [
  { key: "feed", label: "Feed", icon: MessageCircle },
  { key: "share", label: "Post", icon: PenSquare },
  { key: "members", label: "Members", icon: Users },
  { key: "stats", label: "Stats", icon: BarChart3 },
];
const MIN_POST_ENGAGEMENT_PERCENT = 30;
const MIN_ENGAGEMENT_SECONDS = 20;

const getEngagementColor = (pct) => {
  if (pct >= 70) return "text-primary";
  if (pct >= 30) return "text-amber-400";
  return "text-destructive";
};

const getEngagementBg = (pct) => {
  if (pct >= 70) return "bg-primary/15 text-primary border-primary/25";
  if (pct >= 30) return "bg-amber-400/15 text-amber-400 border-amber-400/25";
  return "bg-destructive/15 text-destructive border-destructive/25";
};

const getProfileCompletion = (user) => {
  if (!user) return 0;
  let filled = 0;
  const total = 5;

  if (user.username) filled++;
  if (user.email) filled++;
  if (user.bio) filled++;
  if (user.niche && user.niche !== "Other") filled++;
  if (user.platformStats?.length > 0) filled++;

  return Math.round((filled / total) * 100);
};

const SquadDetailPage = () => {
  const { niche, name } = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser } = useSelector((state) => state.user);

  // Core data
  const [squad, setSquad] = useState(null);
  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [engagementStats, setEngagementStats] = useState(null);
  const [postCount, setPostCount] = useState(null);

  // Pagination
  const [postsPage, setPostsPage] = useState(1);
  const [totalPostPages, setTotalPostPages] = useState(1);
  const [totalPostCount, setTotalPostCount] = useState(0);
  const [loadingMorePosts, setLoadingMorePosts] = useState(false);

  // Feed search, filter, sort
  const [feedSearch, setFeedSearch] = useState("");
  const [feedSort, setFeedSort] = useState("pending_first");
  const [feedFilter, setFeedFilter] = useState("");
  const [feedTimeRange, setFeedTimeRange] = useState("");
  const [pendingEngagementCount, setPendingEngagementCount] = useState(0);

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
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [isValidatingEngagement, setIsValidatingEngagement] = useState(false);
  const engagementIntervalRef = useRef(null);

  // Leave squad
  const [leaveLoading, setLeaveLoading] = useState(false);

  // Rules dialog
  const [showRulesDialog, setShowRulesDialog] = useState(false);
  const [acceptRulesLoading, setAcceptRulesLoading] = useState(false);
  const [showFirstPostModal, setShowFirstPostModal] = useState(false);
  const [hasSeenFirstPostModal, setHasSeenFirstPostModal] = useState(false);

  // Check if current user is a member
  const currentMembership = members.find(
    (m) => m.user?._id === currentUser?._id
  );
  const isAdmin = currentMembership?.role === "admin";
  const isMember = !!currentMembership;
  const hasAcceptedRules = currentMembership?.rulesAccepted === true;
  const currentEngagementPercentage = Number(
    currentMembership?.engagementPercentage ??
      engagementStats?.engagementPercentage ??
      100
  );
  const isShareBlockedByEngagement =
    isMember && currentEngagementPercentage < MIN_POST_ENGAGEMENT_PERCENT;
  const profileCompletion = getProfileCompletion(currentUser);

  const id = squad?._id;
  const firstPostModalStorageKey = useMemo(() => {
    if (!id || !currentUser?._id) return null;
    return `engazium:first-post-guide:${id}:${currentUser._id}`;
  }, [id, currentUser?._id]);

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

  // Fetch posts (page 1 = fresh load, page > 1 = append)
  const fetchPosts = useCallback(async (page = 1) => {
    if (!isMember || !id) return;
    if (page === 1) {
      setPostsLoading(true);
    } else {
      setLoadingMorePosts(true);
    }
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "10",
        sortBy: feedSort,
      });
      if (feedSearch) params.set("search", feedSearch);
      if (feedFilter) params.set("filter", feedFilter);
      if (feedTimeRange) params.set("timeRange", feedTimeRange);

      const res = await fetch(`/api/posts/squad/${id}?${params.toString()}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch posts");
      if (page === 1) {
        setPosts(data.posts || []);
      } else {
        setPosts((prev) => [...prev, ...(data.posts || [])]);
      }
      setPostsPage(data.pagination?.currentPage || page);
      setTotalPostPages(data.pagination?.totalPages || 1);
      setTotalPostCount(data.pagination?.total ?? 0);
      setPendingEngagementCount(data.pendingEngagementCount ?? 0);
    } catch (err) {
      if (page === 1) setPosts([]);
    } finally {
      setPostsLoading(false);
      setLoadingMorePosts(false);
    }
  }, [id, isMember, feedSearch, feedSort, feedFilter, feedTimeRange]);

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
      router.push(`/sign-in?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    fetchSquad();
  }, [currentUser, fetchSquad, router, pathname]);

  // Fetch engagement stats & post count (only when squad/membership changes)
  useEffect(() => {
    if (isMember && id) {
      fetchEngagementStats();
      fetchPostCount();
    }
  }, [isMember, id, fetchEngagementStats, fetchPostCount]);

  // Fetch posts (re-triggers on search/filter/sort changes via fetchPosts deps)
  useEffect(() => {
    if (isMember && id) {
      fetchPosts();
    }
  }, [isMember, id, fetchPosts]);

  // Timer effect: only count time when tab is hidden (user is viewing content)
  useEffect(() => {
    if (!engagingPostId || !activeEngagementId) {
      if (engagementIntervalRef.current) {
        clearInterval(engagementIntervalRef.current);
        engagementIntervalRef.current = null;
      }
      return;
    }

    const startCounting = () => {
      if (!engagementIntervalRef.current) {
        engagementIntervalRef.current = setInterval(() => {
          setTimerSeconds((prev) => prev + 1);
        }, 1000);
      }
    };

    const stopCounting = () => {
      if (engagementIntervalRef.current) {
        clearInterval(engagementIntervalRef.current);
        engagementIntervalRef.current = null;
      }
    };

    const handleVisibilityChange = () => {
      const hidden = document.visibilityState === "hidden";
      setIsTabVisible(!hidden);
      if (hidden) {
        startCounting();
      } else {
        stopCounting();
      }
    };

    // Set initial state (tab may already be hidden after window.open)
    const initiallyHidden = document.visibilityState === "hidden";
    setIsTabVisible(!initiallyHidden);
    if (initiallyHidden) {
      startCounting();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      stopCounting();
    };
  }, [engagingPostId, activeEngagementId]);

  // Read one-time post-guide visibility from localStorage (per user + squad).
  useEffect(() => {
    if (!firstPostModalStorageKey || typeof window === "undefined") return;
    const alreadySeen = localStorage.getItem(firstPostModalStorageKey) === "1";
    setHasSeenFirstPostModal(alreadySeen);
  }, [firstPostModalStorageKey]);

  // Show post-guide modal the first time member opens Post tab in this squad.
  useEffect(() => {
    if (!isMember || activeTab !== "share") return;
    if (!firstPostModalStorageKey || hasSeenFirstPostModal) return;

    setShowFirstPostModal(true);
    setHasSeenFirstPostModal(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(firstPostModalStorageKey, "1");
    }
  }, [activeTab, isMember, firstPostModalStorageKey, hasSeenFirstPostModal]);

  // Accept squad rules handler
  const handleAcceptRules = async () => {
    setAcceptRulesLoading(true);
    try {
      const res = await fetch(`/api/squads/${id}/accept-rules`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to accept rules");
      toast.success("Rules accepted! You can now share posts.");
      setShowRulesDialog(false);
      fetchSquad();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setAcceptRulesLoading(false);
    }
  };

  // Create post handler
  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (isShareBlockedByEngagement) {
      toast.error(
        `Posting is disabled while your engagement is below ${MIN_POST_ENGAGEMENT_PERCENT}%. Increase it to at least ${MIN_POST_ENGAGEMENT_PERCENT}% to share again.`
      );
      return;
    }

    if (profileCompletion < 100) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("dashboard_tab", "profile");
      }
      toast.error("Complete your profile to 100% before sharing posts.");
      router.push("/dashboard");
      return;
    }

    if (!hasAcceptedRules) {
      setShowRulesDialog(true);
      return;
    }

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
      setActiveTab("feed");
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
      setIsTabVisible(true);
      window.open(link, "_blank");
      toast.info(
        "Engagement started! The timer only runs while you're viewing the content."
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Validate engagement
  const handleValidateEngagement = useCallback(async () => {
    if (!activeEngagementId || isValidatingEngagement) return;
    setIsValidatingEngagement(true);
    try {
      const res = await fetch("/api/engagement/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          engagementId: activeEngagementId,
          timeSpent: timerSeconds,
          awayTime: timerSeconds,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Validation failed");

      toast.success("Engagement validated!");
      setEngagingPostId(null);
      setActiveEngagementId(null);
      setTimerSeconds(0);
      setIsTabVisible(true);
      fetchPosts();
      fetchEngagementStats();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsValidatingEngagement(false);
    }
  }, [activeEngagementId, timerSeconds, isValidatingEngagement, fetchPosts, fetchEngagementStats]);

  // Auto-validate once the required time is reached.
  useEffect(() => {
    if (!engagingPostId || !activeEngagementId || isValidatingEngagement) return;
    if (timerSeconds < MIN_ENGAGEMENT_SECONDS) return;
    handleValidateEngagement();
  }, [
    timerSeconds,
    engagingPostId,
    activeEngagementId,
    isValidatingEngagement,
    handleValidateEngagement,
  ]);

  const handleCancelEngagement = () => {
    setEngagingPostId(null);
    setActiveEngagementId(null);
    setTimerSeconds(0);
    setIsTabVisible(true);
    setIsValidatingEngagement(false);
  };

  // Load more posts
  const handleLoadMorePosts = () => {
    if (postsPage < totalPostPages && !loadingMorePosts) {
      fetchPosts(postsPage + 1);
    }
  };

  const hasMorePosts = postsPage < totalPostPages;

  // Feed toolbar handlers (reset to page 1 on every change)
  const handleFeedSearchChange = (value) => {
    setFeedSearch(value);
    setPostsPage(1);
  };
  const handleFeedSortChange = (value) => {
    setFeedSort(value);
    setPostsPage(1);
  };
  const handleFeedFilterChange = (value) => {
    setFeedFilter(value);
    setPostsPage(1);
  };
  const handleFeedTimeRangeChange = (value) => {
    setFeedTimeRange(value);
    setPostsPage(1);
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

  // Sorted members for leaderboard
  const topMembers = [...members]
    .sort((a, b) => b.engagementPercentage - a.engagementPercentage)
    .slice(0, 5);

  // ── Desktop Right Sidebar (memoized to prevent re-render on unrelated state changes like typing) ──
  const desktopSidebar = useMemo(() => (
    <div className="space-y-4">
      {/* Quick Stats */}
      {isMember && engagementStats && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-2xl p-5 gradient-border"
        >
          <h3 className="font-heading font-semibold text-foreground text-sm mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Your Activity
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary/50 dark:bg-secondary/25 rounded-xl p-3.5 text-center border border-border/30 dark:border-transparent">
              <div className={`font-heading font-bold text-2xl leading-tight ${getEngagementColor(engagementStats.engagementPercentage)}`}>
                {engagementStats.engagementPercentage}%
              </div>
              <div className="text-muted-foreground text-[10px] uppercase tracking-wider mt-1">Engagement</div>
            </div>
            <div className="bg-secondary/50 dark:bg-secondary/25 rounded-xl p-3.5 text-center border border-border/30 dark:border-transparent">
              <div className="font-heading font-bold text-2xl text-foreground leading-tight">
                {engagementStats.validEngagements || 0}
              </div>
              <div className="text-muted-foreground text-[10px] uppercase tracking-wider mt-1">Engaged</div>
            </div>
            <div className="bg-secondary/50 dark:bg-secondary/25 rounded-xl p-3.5 text-center border border-border/30 dark:border-transparent">
              <div className="font-heading font-bold text-2xl text-foreground leading-tight">
                {engagementStats.totalOpportunities || 0}
              </div>
              <div className="text-muted-foreground text-[10px] uppercase tracking-wider mt-1">Opportunities</div>
            </div>
            <div className="bg-secondary/50 dark:bg-secondary/25 rounded-xl p-3.5 text-center border border-border/30 dark:border-transparent">
              <div className="font-heading font-bold text-2xl text-foreground leading-tight">
                {squad?.avgEngagement || 0}%
              </div>
              <div className="text-muted-foreground text-[10px] uppercase tracking-wider mt-1">Squad Avg</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Top Engagers Mini */}
      {isMember && members.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass rounded-2xl p-5 gradient-border"
        >
          <h3 className="font-heading font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            Top Engagers
          </h3>
          <div className="space-y-1.5">
            {topMembers.map((member, index) => (
              <div
                key={member._id}
                className="flex items-center gap-2.5 py-2 px-2 rounded-lg hover:bg-secondary/40 dark:hover:bg-secondary/25 transition-colors"
              >
                <span className="w-5 text-[11px] font-heading font-bold text-muted-foreground text-center flex-shrink-0">
                  {index + 1}
                </span>
                <Avatar className="h-7 w-7 flex-shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-[9px] font-heading font-bold">
                    {getInitials(member.user?.username)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-heading font-medium text-foreground text-[13px] flex-1 truncate">
                  {member.user?.username || "Unknown"}
                </span>
                <Badge
                  className={`${getEngagementBg(member.engagementPercentage)} text-[10px] font-heading font-bold px-2 py-0 rounded-md`}
                >
                  {Math.round(member.engagementPercentage)}%
                </Badge>
              </div>
            ))}
          </div>
          {members.length > 5 && (
            <button
              onClick={() => setActiveTab("members")}
              className="cursor-pointer w-full mt-3 text-primary text-xs font-heading font-medium hover:underline"
            >
              View all {members.length} members →
            </button>
          )}
        </motion.div>
      )}

      {/* Squad Description */}
      {squad?.description && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass rounded-2xl p-5 gradient-border"
        >
          <h3 className="font-heading font-semibold text-foreground text-sm mb-2">
            About
          </h3>
          <p className="text-muted-foreground text-[13px] leading-relaxed">
            {squad.description}
          </p>
        </motion.div>
      )}
    </div>
  ), [isMember, engagementStats, squad, members, topMembers]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Loader2 className="h-7 w-7 text-primary animate-spin" />
          </div>
          <p className="text-muted-foreground text-sm font-heading">
            Loading squad...
          </p>
        </motion.div>
      </div>
    );
  }

  // Squad not found
  if (!squad) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-muted-foreground/50" />
          </div>
          <h2 className="font-heading font-bold text-xl text-foreground mb-2">
            Squad not found
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            This squad may have been deleted or doesn&apos;t exist.
          </p>
          <Link className="cursor-pointer" href="/squads">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse Squads
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // ── Tab content for main area ──
  const renderMainContent = () => (
    <>
      {/* Not a member */}
      {!isMember && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 lg:py-32 gap-5 text-center"
        >
          <div className="w-20 h-20 rounded-3xl bg-muted/30 flex items-center justify-center">
            <Users className="h-10 w-10 text-muted-foreground/40" />
          </div>
          <h3 className="font-heading font-bold text-xl text-foreground">
            You&apos;re not a member yet
          </h3>
          <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
            Join this squad to view the feed, engage with posts, and
            connect with other creators.
          </p>
          <Link className="cursor-pointer" href="/squads#browse-squads">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-8 py-3 text-sm font-semibold mt-2 glow-box">
              Browse & Join Squads
            </Button>
          </Link>
        </motion.div>
      )}

      {/* Share Post Tab */}
      {isMember && activeTab === "share" && (
        <>
          {isShareBlockedByEngagement && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6 mb-5 text-center"
            >
              <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
              <h4 className="font-heading font-semibold text-foreground text-base mb-1">
                Posting Disabled
              </h4>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Your engagement is currently {Math.round(currentEngagementPercentage)}%.
                Posting is enabled again once you are at least {MIN_POST_ENGAGEMENT_PERCENT}%.
              </p>
            </motion.div>
          )}
          {!hasAcceptedRules && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary/5 border border-primary/15 rounded-2xl p-6 mb-5 text-center"
            >
              <ShieldCheck className="h-8 w-8 text-primary mx-auto mb-2" />
              <h4 className="font-heading font-semibold text-foreground text-base mb-1">
                Accept Squad Rules First
              </h4>
              <p className="text-muted-foreground text-sm mb-4 max-w-md mx-auto">
                Before sharing your first post, read and accept the squad
                rules and guidelines.
              </p>
              <Button
                onClick={() => setShowRulesDialog(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-sm font-semibold px-6"
              >
                <ShieldCheck className="h-4 w-4 mr-2" />
                View & Accept Rules
              </Button>
            </motion.div>
          )}
          <CreatePostForm
            onSubmit={handleCreatePost}
            newPostLink={newPostLink}
            setNewPostLink={setNewPostLink}
            newPostCaption={newPostCaption}
            setNewPostCaption={setNewPostCaption}
            loading={createPostLoading}
            postCount={postCount}
            hasAcceptedRules={hasAcceptedRules}
            onRulesRequired={() => setShowRulesDialog(true)}
            profileCompletion={profileCompletion}
            onProfileRequired={() => {
              if (typeof window !== "undefined") {
                sessionStorage.setItem("dashboard_tab", "profile");
              }
              router.push("/dashboard");
            }}
            shareBlocked={isShareBlockedByEngagement}
            shareBlockedMessage={`Posting is disabled while your engagement is below ${MIN_POST_ENGAGEMENT_PERCENT}%. Increase it to at least ${MIN_POST_ENGAGEMENT_PERCENT}% to share again.`}
          />
        </>
      )}

      {/* Feed Tab */}
      {isMember && activeTab === "feed" && (
        <div className="space-y-5">
          <EngagementTimer
            engagingPostId={engagingPostId}
            activeEngagementId={activeEngagementId}
            timerSeconds={timerSeconds}
            isTabVisible={isTabVisible}
            onCancel={handleCancelEngagement}
          />

          {/* Pending Engagement Banner */}
          {pendingEngagementCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/30 dark:border-primary/15 shadow-sm dark:shadow-none"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                <Heart className="h-5 w-5 text-primary animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-heading font-semibold text-foreground">
                  {pendingEngagementCount} post
                  {pendingEngagementCount !== 1 ? "s" : ""} waiting for your
                  engagement
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Engage with squad members&apos; posts to boost your activity
                </p>
              </div>
              <Badge
                className={`text-xs px-2.5 py-1 rounded-lg font-heading font-bold ${getEngagementBg(
                  engagementStats?.percentage ?? 0
                )}`}
              >
                {Math.round(engagementStats?.percentage ?? 0)}%
              </Badge>
            </motion.div>
          )}

          <FeedToolbar
            search={feedSearch}
            onSearchChange={handleFeedSearchChange}
            sortBy={feedSort}
            onSortChange={handleFeedSortChange}
            filter={feedFilter}
            onFilterChange={handleFeedFilterChange}
            timeRange={feedTimeRange}
            onTimeRangeChange={handleFeedTimeRangeChange}
            totalResults={totalPostCount}
            pendingCount={pendingEngagementCount}
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
            hasMore={hasMorePosts}
            loadingMore={loadingMorePosts}
            onLoadMore={handleLoadMorePosts}
            hasActiveFilters={!!(feedSearch || feedFilter || feedTimeRange || feedSort !== "pending_first")}
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
        <div className="h-20" />

        {/* Sticky Squad Info Bar */}
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

        {/* Content */}
        <div className="px-4 py-4 pb-20 space-y-4">
          {renderMainContent()}
        </div>

        {/* Fixed Bottom Tab Bar */}
        {isMember && (
          <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border/20">
            <div className="flex items-center justify-around h-16 px-2">
              {mobileTabItems.map(({ key, label, icon: Icon }) => {
                const isActive = activeTab === key;
                const isShareTabDisabled =
                  key === "share" && isShareBlockedByEngagement;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      if (isShareTabDisabled) {
                        toast.error(
                          `Posting is disabled while engagement is below ${MIN_POST_ENGAGEMENT_PERCENT}%`
                        );
                        return;
                      }
                      setActiveTab(key);
                    }}
                    disabled={isShareTabDisabled}
                    className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground active:text-foreground"
                    } ${isShareTabDisabled ? "opacity-45 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div
                      className={`relative p-1.5 rounded-xl transition-all duration-200 ${
                        isActive ? "bg-primary/15" : ""
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 transition-all ${
                          isActive ? "scale-110" : ""
                        }`}
                      />
                    </div>
                    <span
                      className={`text-[10px] font-heading font-medium transition-all ${
                        isActive ? "font-semibold" : ""
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
              <button
                onClick={handleLeaveSquad}
                disabled={leaveLoading}
                className="cursor-pointer flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 rounded-xl text-muted-foreground active:text-destructive transition-all duration-200"
              >
                <div className="p-1.5">
                  {leaveLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <LogOut className="h-5 w-5" />
                  )}
                </div>
                <span className="text-[10px] font-heading font-medium">
                  Leave
                </span>
              </button>
            </div>
          </nav>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* DESKTOP VIEW (>= md) — Full-page immersive layout */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="hidden md:block min-h-screen bg-background">
        {/* Spacer for fixed main navbar */}
        <div className="h-[72px]" />

        {/* Ambient background glows */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-glow-secondary/[0.03] rounded-full blur-[120px]" />
        </div>

        {/* ── Sticky Header: Squad Info + Tabs ── */}
        <div className="sticky top-[72px] z-30 bg-background backdrop-blur-2xl border-t border-b border-border/60 dark:border-border/30 shadow-sm dark:shadow-none">
          {/* Squad Info Row */}
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 xl:px-14 pt-5 pb-3">
            <SquadInfoCard
              squad={squad}
              engagementStats={engagementStats}
              isMember={isMember}
              currentMembership={currentMembership}
            />
          </div>

          {/* Tabs Row */}
          {isMember && (
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 xl:px-14">
              <SquadTabsNavbar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isMember={isMember}
                onLeave={handleLeaveSquad}
                leaveLoading={leaveLoading}
                shareDisabled={isShareBlockedByEngagement}
                onShareDisabled={() =>
                  toast.error(
                    `Posting is disabled while engagement is below ${MIN_POST_ENGAGEMENT_PERCENT}%`
                  )
                }
              />
            </div>
          )}
        </div>

        {/* ── Main Content Area: 2-column layout ── */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 xl:px-14 py-6 lg:py-8">
          <div className="flex gap-6 lg:gap-8">
            {/* Main Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`flex-1 min-w-0 ${isMember ? "" : "w-full"}`}
            >
              {renderMainContent()}
            </motion.div>

            {/* Right Sidebar — sticky, only for members */}
            {isMember && (
              <div className="hidden lg:block w-[340px] xl:w-[380px] flex-shrink-0">
                <div className="sticky top-[200px]">
                  {desktopSidebar}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Non-member annotation */}
        {!isMember && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-muted-foreground/60 text-xs pb-10 italic"
          >
            Join this squad to access the full feed, members list, and
            engagement tracking.
          </motion.p>
        )}
      </div>

      {/* Squad Rules Dialog */}
      <Dialog open={showFirstPostModal} onOpenChange={setShowFirstPostModal}>
        <DialogContent className="sm:max-w-[680px] p-0 gap-0 border-border/50 bg-card/95 backdrop-blur-xl">
          <DialogTitle className="sr-only">Before your first post</DialogTitle>
          <DialogDescription className="sr-only">
            Complete required setup before sharing your first post in this squad.
          </DialogDescription>

          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-primary/[0.03]" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

            <div className="relative p-5 sm:p-6 md:p-7">
              <div className="flex items-start gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/12 border border-primary/20 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground text-lg sm:text-xl tracking-tight">
                    Before your first post
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Complete these two quick steps to start posting smoothly.
                  </p>
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="rounded-2xl border border-primary/20 bg-primary/[0.05] p-4 sm:p-4.5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading font-semibold text-foreground text-sm sm:text-base">
                        Accept squad rules before first post
                      </p>
                      <p className="text-muted-foreground text-xs sm:text-sm mt-1 mb-3">
                        Read the guidelines and accept them to unlock posting.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-xl border-primary/25 text-primary hover:bg-primary/10 text-xs sm:text-sm"
                        onClick={() => {
                          setShowFirstPostModal(false);
                          setShowRulesDialog(true);
                        }}
                      >
                        Open Rules Modal
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/40 bg-secondary/20 p-4 sm:p-4.5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/12 border border-border/30 flex items-center justify-center shrink-0">
                      <UserRoundCheck className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading font-semibold text-foreground text-sm sm:text-base">
                        Complete your profile to 100%
                      </p>
                      <p className="text-muted-foreground text-xs sm:text-sm mt-1 mb-3">
                        Current completion: <span className="font-semibold text-foreground">{profileCompletion}%</span>. A complete profile builds trust and improves squad quality.
                      </p>
                      <Link
                        className="inline-flex"
                        href="/dashboard"
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            sessionStorage.setItem("dashboard_tab", "profile");
                          }
                          setShowFirstPostModal(false);
                        }}
                      >
                        <Button
                          type="button"
                          variant="outline"
                          className="rounded-xl border-border/50 text-foreground hover:bg-secondary/60 text-xs sm:text-sm"
                        >
                          Go to Dashboard
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5 flex justify-end">
                <Button
                  type="button"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-5"
                  onClick={() => setShowFirstPostModal(false)}
                >
                  Continue to Post Tab
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <SquadRulesDialog
        open={showRulesDialog}
        onOpenChange={setShowRulesDialog}
        onAccept={handleAcceptRules}
        loading={acceptRulesLoading}
      />
    </>
  );
};

export default SquadDetailPage;
