"use client"

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Users,
  CreditCard,
  BarChart3,
  TrendingUp,
  Heart,
  MessageCircle,
  Settings,
  Save,
  XCircle,
  Zap,
  Calendar,
  Home,
  Target,
  Activity,
  Clock,
  ArrowUp,
  ChevronDown,
  Loader2,
  AlertTriangle,
  Lock,
  Trash2,
  CheckCircle2,
  X,
  KeyRound,
  Pencil,
  Info,
  Plus,
  Minus,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSuccess, deleteUserSuccess, logoutSuccess } from "@/redux/user/userSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "lucide-react";
import { toast } from "sonner";
import UserSidebar from "@/components/dashboard/UserSidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NICHE_OPTIONS = [
  "Art & Creativity", "Technology", "Gaming", "Education", "Business & Finance",
  "Health & Fitness", "Lifestyle", "Fashion & Beauty", "Food & Cooking", "Travel",
  "Self Improvement", "Entertainment", "Music", "Photography & Videography",
  "Podcasting", "News & Commentary", "DIY & Crafts", "Sports", "Science",
  "Pets & Animals", "Nature & Environment", "Spirituality", "Parenting & Family",
  "Vlogs", "Automotive", "Real Estate", "Politics", "Non Profit & Social Impact", "Other"
];

const PLATFORM_OPTIONS = [
  "Instagram", "YouTube", "TikTok", "Facebook", "X", "LinkedIn", "Twitch", "Snapchat", "Other"
];

const subscriptions = [
  { id: 1, plan: "Growth Squad", squad: "Tech Creators Hub", price: "₹100/mo", nextBilling: "Mar 10, 2026", status: "Active", since: "Jan 2026" },
  { id: 2, plan: "Growth Squad", squad: "SaaS Growth Squad", price: "₹100/mo", nextBilling: "Mar 15, 2026", status: "Active", since: "Feb 2026" },
  { id: 3, plan: "Starter Squad", squad: "Startup Builders", price: "₹50/mo", nextBilling: "Mar 20, 2026", status: "Active", since: "Feb 2026" },
];


const sidebarItems = [
  { key: "overview", label: "Overview", icon: Home },
  { key: "profile", label: "Profile", icon: User },
  { key: "squads", label: "My Squads", icon: Users },
  { key: "subscriptions", label: "Subscriptions", icon: CreditCard },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
];

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  // Profile form state
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    bio: "",
    niche: "Other",
    platformStats: [],  // [{ platform, numberOfFollowers, avgLikes, avgComments }]
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [profileSuccess, setProfileSuccess] = useState(null);

  // Password change state
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Delete account state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [activeSection, setActiveSection] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedSquadAnalytics, setSelectedSquadAnalytics] = useState(null);

  // My Squads State (fetched from API)
  const [mySquads, setMySquads] = useState([]);
  const [squadsLoading, setSquadsLoading] = useState(true);

  // Create Squad State
  const [createSquadForm, setCreateSquadForm] = useState({
    name: "",
    niche: "",
    plan: "Growth",
    description: "",
  });
  const [createSquadLoading, setCreateSquadLoading] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      router.push("/sign-in");
    }
  }, [currentUser, router]);

  // Fetch profile from API on mount and when currentUser changes
  const fetchProfile = useCallback(async () => {
    setProfileLoading(true);
    try {
      const res = await fetch("/api/user/profile", { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
      const stats = (data.user.platformStats || []).map((ps) => ({
        platform: ps.platform,
        numberOfFollowers: ps.numberOfFollowers?.toString() || "",
        avgLikes: ps.avgLikes?.toString() || "",
        avgComments: ps.avgComments?.toString() || "",
      }));
      setProfile({
        username: data.user.username || "",
        email: data.user.email || "",
        bio: data.user.bio || "",
        niche: data.user.niche || "Other",
        platformStats: stats,
      });
    } catch (err) {
      setProfileError(err.message);
    } finally {
      setProfileLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentUser) fetchProfile();
  }, [currentUser, fetchProfile]);

  // Fetch user's squad memberships from API
  const fetchMySquads = useCallback(async () => {
    setSquadsLoading(true);
    try {
      const res = await fetch("/api/squads/my/memberships", { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch squads");
      setMySquads(data.memberships || []);
    } catch (err) {
      console.error("Failed to fetch squads:", err);
    } finally {
      setSquadsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentUser) fetchMySquads();
  }, [currentUser, fetchMySquads]);

  // Computed analytics from real squad data
  const computedAnalytics = {
    totalSquads: mySquads.length,
    avgEngagement: mySquads.length > 0
      ? Math.round(mySquads.reduce((sum, m) => sum + (m.engagementPercentage || 0), 0) / mySquads.length)
      : 0,
    totalPostsEngaged: mySquads.reduce((sum, m) => sum + (m.postsEngaged || 0), 0),
    totalPosts: mySquads.reduce((sum, m) => sum + (m.totalPosts || 0), 0),
  };

  // Save profile handler
  const handleSaveProfile = async () => {
    setProfileSaving(true);
    setProfileError(null);
    setProfileSuccess(null);
    try {
      // Convert string stat values to numbers before sending
      const payload = {
        ...profile,
        platformStats: profile.platformStats.map((ps) => ({
          platform: ps.platform,
          numberOfFollowers: parseInt(ps.numberOfFollowers) || 0,
          avgLikes: parseInt(ps.avgLikes) || 0,
          avgComments: parseInt(ps.avgComments) || 0,
        })),
      };
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");
      dispatch(updateUserSuccess(data.user));
      setProfileSuccess("Profile updated successfully!");
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      setProfileError(err.message);
      toast.error(err.message);
    } finally {
      setProfileSaving(false);
    }
  };

  // Change password handler
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }
    setPasswordLoading(true);
    try {
      const res = await fetch("/api/user/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to change password");
      toast.success("Password changed successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  // Delete account handler
  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast.error("Please enter your password");
      return;
    }
    setDeleteLoading(true);
    try {
      const res = await fetch("/api/user/delete-account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password: deletePassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete account");
      dispatch(deleteUserSuccess());
      toast.success("Account deleted successfully");
      router.push("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Handle Create Squad
  const handleCreateSquad = async (e) => {
    e.preventDefault();
    if (!createSquadForm.name || !createSquadForm.niche) {
      toast.error("Please fill in all required fields");
      return;
    }
    setCreateSquadLoading(true);
    try {
      const res = await fetch("/api/squads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(createSquadForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create squad");
      toast.success("Squad created successfully!");
      setCreateSquadForm({ name: "", niche: "", plan: "Growth", description: "" });
      router.push(`/squads/${data.squad._id}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setCreateSquadLoading(false);
    }
  };

  // Cancel editing — reset profile to currentUser data
  const handleCancelEdit = () => {
    setIsEditing(false);
    setProfileError(null);
    if (currentUser) {
      const stats = (currentUser.platformStats || []).map((ps) => ({
        platform: ps.platform,
        numberOfFollowers: ps.numberOfFollowers?.toString() || "",
        avgLikes: ps.avgLikes?.toString() || "",
        avgComments: ps.avgComments?.toString() || "",
      }));
      setProfile({
        username: currentUser.username || "",
        email: currentUser.email || "",
        bio: currentUser.bio || "",
        niche: currentUser.niche || "Other",
        platformStats: stats,
      });
    }
  };

  // Profile completion calculation
  const calcProfileCompletion = () => {
    if (!currentUser) return 0;
    let filled = 0;
    const total = 5;
    if (currentUser.username) filled++;
    if (currentUser.email) filled++;
    if (currentUser.bio) filled++;
    if (currentUser.niche && currentUser.niche !== "Other") filled++;
    if (currentUser.platformStats?.length > 0) filled++;
    return Math.round((filled / total) * 100);
  };

  const profileCompletion = calcProfileCompletion();

  // Format date
  const formatJoinDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-IN", { month: "short", year: "numeric" });
  };

  // Toggle platform selection — adds/removes a platformStats entry
  const togglePlatform = (platform) => {
    setProfile((prev) => {
      const exists = prev.platformStats.find((ps) => ps.platform === platform);
      if (exists) {
        // Remove this platform
        return { ...prev, platformStats: prev.platformStats.filter((ps) => ps.platform !== platform) };
      } else {
        // Add this platform with empty stats
        return { ...prev, platformStats: [...prev.platformStats, { platform, numberOfFollowers: "", avgLikes: "", avgComments: "" }] };
      }
    });
  };

  // Update a single stat for a specific platform
  const updatePlatformStat = (platform, field, value) => {
    setProfile((prev) => ({
      ...prev,
      platformStats: prev.platformStats.map((ps) =>
        ps.platform === platform ? { ...ps, [field]: value } : ps
      ),
    }));
  };

  // Get list of selected platform names
  const selectedPlatforms = profile.platformStats.map((ps) => ps.platform);

  if (!currentUser) return null;

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <UserSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative transition-all duration-300">
        <div className="flex-1 overflow-y-auto">
          <header className="sticky top-0 z-30 glass-strong border-b border-border/20 h-16 flex items-center px-4 md:px-6 gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-muted-foreground mr-2" 
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20} />
            </Button>
            <div className="flex items-center gap-3">
              {sidebarItems.find(i => i.key === activeSection) && (
                <>
                  {(() => {
                    const Icon = sidebarItems.find(i => i.key === activeSection).icon;
                    return <Icon className="h-5 w-5 text-primary" />;
                  })()}
                  <h1 className="font-heading font-bold text-xl text-foreground">
                    {sidebarItems.find(i => i.key === activeSection)?.label || "Dashboard"}
                  </h1>
                </>
              )}
            </div>
            <div className="ml-auto flex items-center gap-3">
              <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1.5 text-sm font-semibold">
                <Users className="h-3.5 w-3.5 mr-1.5" />
                {mySquads.length} Squad{mySquads.length !== 1 ? "s" : ""}
              </Badge>
            </div>
          </header>

          <div className="p-6">
            {/* Overview Section */}
            {activeSection === "overview" && (
              <div className="space-y-6">
                {/* Welcome Banner */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative overflow-hidden rounded-3xl glass p-8 gradient-border"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse-glow" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                          Welcome back, <span className="text-gradient">{currentUser?.username}</span>! 👋
                        </h2>
                        <p className="text-muted-foreground">Here's what's happening with your engagement today</p>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        <Activity className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </div>
                </motion.div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Active Squads", value: computedAnalytics.totalSquads, icon: Users, color: "text-primary", trend: `${computedAnalytics.totalSquads} joined`, up: computedAnalytics.totalSquads > 0 },
                    { label: "Avg Engagement", value: `${computedAnalytics.avgEngagement}%`, icon: TrendingUp, color: "text-primary", trend: computedAnalytics.avgEngagement >= 70 ? "On track" : "Needs work", up: computedAnalytics.avgEngagement >= 70 },
                    { label: "Posts Engaged", value: computedAnalytics.totalPostsEngaged, icon: Zap, color: "text-primary", trend: `of ${computedAnalytics.totalPosts} total`, up: computedAnalytics.totalPostsEngaged > 0 },
                    { label: "Profile Complete", value: `${profileCompletion}%`, icon: Target, color: "text-primary", trend: profileCompletion === 100 ? "Complete!" : `${100 - profileCompletion}% left`, up: profileCompletion >= 50 },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass rounded-2xl p-5 gradient-border hover:bg-card/60 transition-all group cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                          <stat.icon className="h-5 w-5" />
                        </div>
                        <Badge className={`text-xs ${stat.up ? 'bg-primary/20 text-primary border-primary/30' : 'bg-secondary text-muted-foreground'}`}>
                          {stat.up && <ArrowUp className="h-3 w-3 mr-0.5" />}
                          {stat.trend}
                        </Badge>
                      </div>
                      <div className="text-2xl font-heading font-bold text-foreground mb-1">{stat.value}</div>
                      <div className="text-muted-foreground text-xs uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* My Squads Summary & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* My Squads Summary */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 glass rounded-2xl p-6 gradient-border"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        My Squads
                      </h3>
                      <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10" onClick={() => setActiveSection("squads")}>View All</Button>
                    </div>
                    <div className="space-y-3">
                      {squadsLoading ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="h-6 w-6 text-primary animate-spin" />
                        </div>
                      ) : mySquads.length === 0 ? (
                        <div className="text-center py-8">
                          <Users className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                          <p className="text-muted-foreground text-sm">You haven't joined any squads yet.</p>
                          <Button size="sm" className="mt-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl" asChild>
                            <Link href="/squads">Browse Squads</Link>
                          </Button>
                        </div>
                      ) : (
                        mySquads.slice(0, 4).map((membership, index) => (
                          <motion.div
                            key={membership._id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                          >
                            <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0 bg-primary/20 text-primary">
                              <Users className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-foreground font-medium truncate">{membership.squad?.name || "Unknown Squad"}</p>
                              <p className="text-xs text-muted-foreground">{membership.squad?.niche} · {membership.role}</p>
                            </div>
                            <Badge className={`text-xs shrink-0 ${
                              membership.engagementPercentage >= 70 
                                ? "bg-primary/20 text-primary border-primary/30" 
                                : "bg-destructive/20 text-destructive border-destructive/30"
                            }`}>
                              {Math.round(membership.engagementPercentage)}%
                            </Badge>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </motion.div>

                  {/* Quick Actions */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass rounded-2xl p-6 gradient-border"
                  >
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-5 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl glow-box justify-start" onClick={() => setActiveSection("squads")}>
                        <Users className="h-4 w-4 mr-2" />
                        View My Squads
                      </Button>
                      <Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/10 rounded-xl justify-start" onClick={() => setActiveSection("profile")}>
                        <User className="h-4 w-4 mr-2" />
                        Complete Profile
                      </Button>
                      <Button variant="outline" className="w-full border-border/50 hover:bg-secondary/50 rounded-xl justify-start" onClick={() => setActiveSection("analytics")}>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Analytics
                      </Button>
                      <Button variant="outline" className="w-full border-border/50 hover:bg-secondary/50 rounded-xl justify-start" asChild>
                        <Link href="/squads">
                          <Users className="h-4 w-4 mr-2" />
                          Browse Squads
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Profile Section */}
            {activeSection === "profile" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

                {/* Error / Success Messages */}
                {profileError && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-4 border border-destructive/30 bg-destructive/5">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
                      <p className="text-destructive text-sm flex-1">{profileError}</p>
                      <Button variant="ghost" size="sm" onClick={() => setProfileError(null)} className="text-destructive hover:bg-destructive/10"><X className="h-4 w-4" /></Button>
                    </div>
                  </motion.div>
                )}

                {/* ── Profile Card ── */}
                <div className="glass rounded-3xl p-8 gradient-border">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="font-heading font-bold text-2xl text-foreground">Your Profile</h2>
                    {!isEditing ? (
                      <Button 
                        size="sm" 
                        className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box"
                        onClick={() => setIsEditing(true)}
                      >
                        <Settings className="h-4 w-4 mr-2" />Edit Profile
                      </Button>
                    ) : (
                      <Button 
                        variant="outline"
                        size="sm" 
                        className="border-destructive/30 text-destructive hover:bg-destructive/10"
                        onClick={handleCancelEdit}
                      >
                        <XCircle className="h-4 w-4 mr-2" />Cancel
                      </Button>
                    )}
                  </div>

                  {profileLoading ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-4">
                      <Loader2 className="h-8 w-8 text-primary animate-spin" />
                      <p className="text-muted-foreground text-sm">Loading profile...</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col sm:flex-row gap-8 mb-8">
                        <div className="flex flex-col items-center gap-4">
                          <Avatar className="h-32 w-32 border-4 border-primary/30 ring-4 ring-primary/10">
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-3xl font-heading font-bold">
                              {profile.username?.slice(0, 2).toUpperCase() || "??"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-center">
                            <p className="font-heading font-bold text-foreground">{profile.username}</p>
                            <p className="text-muted-foreground text-xs">Joined {formatJoinDate(currentUser?.createdAt)}</p>
                          </div>
                        </div>

                        <div className="flex-1 space-y-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Username */}
                            <div>
                              <label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block font-semibold flex items-center gap-1.5">
                                <User className="h-3 w-3" /> Username
                              </label>
                              <Input
                                value={profile.username}
                                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                disabled={!isEditing}
                                className="bg-secondary/50 border-border/50 rounded-xl disabled:opacity-70 focus:border-primary/50 transition-colors"
                              />
                            </div>

                            {/* Email */}
                            <div>
                              <label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block font-semibold flex items-center gap-1.5">
                                <User className="h-3 w-3" /> Email
                              </label>
                              <Input
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                disabled={!isEditing}
                                className="bg-secondary/50 border-border/50 rounded-xl disabled:opacity-70 focus:border-primary/50 transition-colors"
                              />
                            </div>

                            {/* Niche */}
                            <div>
                              <label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block font-semibold flex items-center gap-1.5">
                                <Target className="h-3 w-3" /> Niche
                              </label>
                              {isEditing ? (
                                <Select value={profile.niche} onValueChange={(value) => setProfile({ ...profile, niche: value })}>
                                  <SelectTrigger className="bg-secondary/50 border-border/50 rounded-xl focus:border-primary/50">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {NICHE_OPTIONS.map((n) => (
                                      <SelectItem key={n} value={n}>{n}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Input value={profile.niche} disabled className="bg-secondary/50 border-border/50 rounded-xl disabled:opacity-70" />
                              )}
                            </div>
                          </div>

                          {/* Bio */}
                          <div>
                            <label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block font-semibold flex items-center gap-1.5">
                              <Pencil className="h-3 w-3" /> Bio
                            </label>
                            <Input 
                              value={profile.bio} 
                              onChange={(e) => setProfile({ ...profile, bio: e.target.value })} 
                              disabled={!isEditing} 
                              placeholder="Tell others about yourself..."
                              maxLength={300}
                              className="bg-secondary/50 border-border/50 rounded-xl disabled:opacity-70 focus:border-primary/50 transition-colors" 
                            />
                            {isEditing && (
                              <p className="text-muted-foreground text-xs mt-1 text-right">{profile.bio?.length || 0}/300</p>
                            )}
                          </div>

                          {/* Platforms Selection */}
                          <div>
                            <label className="text-muted-foreground text-xs uppercase tracking-wider mb-3 block font-semibold flex items-center gap-1.5">
                              <Activity className="h-3 w-3" /> Your Platforms
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {PLATFORM_OPTIONS.map((platform) => (
                                <button
                                  key={platform}
                                  type="button"
                                  disabled={!isEditing}
                                  onClick={() => togglePlatform(platform)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border flex items-center gap-1.5 ${
                                    selectedPlatforms.includes(platform)
                                      ? "bg-primary/20 text-primary border-primary/30"
                                      : "bg-secondary/30 text-muted-foreground border-border/50 hover:bg-secondary/50"
                                  } ${!isEditing ? "opacity-70 cursor-default" : "cursor-pointer"}`}
                                >
                                  {selectedPlatforms.includes(platform) ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                                  {platform}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Per-Platform Stats */}
                          {profile.platformStats.length > 0 && (
                            <div className="space-y-4">
                              <label className="text-muted-foreground text-xs uppercase tracking-wider block font-semibold flex items-center gap-1.5">
                                <BarChart3 className="h-3 w-3" /> Platform Stats
                              </label>
                              {profile.platformStats.map((ps) => (
                                <div key={ps.platform} className="bg-secondary/20 rounded-2xl p-5 border border-border/30">
                                  <div className="flex items-center gap-2 mb-4">
                                    <Badge className="bg-primary/20 text-primary border-primary/30 text-xs font-semibold">{ps.platform}</Badge>
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                      <label className="text-muted-foreground text-xs mb-1.5 block font-medium flex items-center gap-1">
                                        <Users className="h-3 w-3" /> Followers
                                      </label>
                                      <Input
                                        type="number"
                                        min="0"
                                        value={ps.numberOfFollowers}
                                        onChange={(e) => updatePlatformStat(ps.platform, "numberOfFollowers", e.target.value)}
                                        disabled={!isEditing}
                                        placeholder="0"
                                        className="bg-secondary/50 border-border/50 rounded-xl disabled:opacity-70 focus:border-primary/50 transition-colors"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-muted-foreground text-xs mb-1.5 block font-medium flex items-center gap-1">
                                        <Heart className="h-3 w-3" /> Avg Likes
                                      </label>
                                      <Input
                                        type="number"
                                        min="0"
                                        value={ps.avgLikes}
                                        onChange={(e) => updatePlatformStat(ps.platform, "avgLikes", e.target.value)}
                                        disabled={!isEditing}
                                        placeholder="0"
                                        className="bg-secondary/50 border-border/50 rounded-xl disabled:opacity-70 focus:border-primary/50 transition-colors"
                                      />
                                    </div>
                                    <div>
                                      <label className="text-muted-foreground text-xs mb-1.5 block font-medium flex items-center gap-1">
                                        <MessageCircle className="h-3 w-3" /> Avg Comments
                                      </label>
                                      <Input
                                        type="number"
                                        min="0"
                                        value={ps.avgComments}
                                        onChange={(e) => updatePlatformStat(ps.platform, "avgComments", e.target.value)}
                                        disabled={!isEditing}
                                        placeholder="0"
                                        className="bg-secondary/50 border-border/50 rounded-xl disabled:opacity-70 focus:border-primary/50 transition-colors"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Save Button */}
                      {isEditing && (
                        <div className="flex justify-end pt-6 border-t border-border/30">
                          <Button 
                            onClick={handleSaveProfile} 
                            disabled={profileSaving}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl glow-box px-8"
                          >
                            {profileSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                            Save Changes
                          </Button>
                        </div>
                      )}

                      {/* Profile Completion */}
                      <div className="mt-8 pt-8 border-t border-border/30">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-heading font-semibold text-foreground flex items-center gap-2">
                            <Target className="h-4 w-4 text-primary" />
                            Profile Completion
                          </span>
                          <span className="text-primary font-heading font-bold text-lg">{profileCompletion}%</span>
                        </div>
                        <Progress value={profileCompletion} className="h-3 bg-secondary/50 rounded-full" />
                        <p className="text-muted-foreground text-xs mt-3 flex items-center gap-1.5">
                          {profileCompletion === 100
                            ? <><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Your profile is complete! You&apos;re all set.</>
                            : <><Info className="h-3.5 w-3.5 text-primary" /> Complete your bio, niche, and add platform stats to unlock full features!</>
                          }
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* ── Change Password Card ── */}
                <div className="glass rounded-3xl p-8 gradient-border">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                    <KeyRound className="h-5 w-5 text-primary" />
                    Change Password
                  </h3>
                  <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                    <div>
                      <label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block font-semibold">Current Password</label>
                      <Input
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        placeholder="••••••••"
                        className="bg-secondary/50 border-border/50 rounded-xl focus:border-primary/50"
                      />
                    </div>
                    <div>
                      <label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block font-semibold">New Password</label>
                      <Input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        placeholder="••••••••"
                        className="bg-secondary/50 border-border/50 rounded-xl focus:border-primary/50"
                      />
                      <p className="text-muted-foreground text-xs mt-1">Must be at least 8 characters</p>
                    </div>
                    <div>
                      <label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block font-semibold">Confirm New Password</label>
                      <Input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        placeholder="••••••••"
                        className="bg-secondary/50 border-border/50 rounded-xl focus:border-primary/50"
                      />
                    </div>
                    <Button type="submit" disabled={passwordLoading} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6">
                      {passwordLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Lock className="h-4 w-4 mr-2" />}
                      Update Password
                    </Button>
                  </form>
                </div>

                {/* ── Danger Zone ── */}
                <div className="glass rounded-3xl p-8 border border-destructive/20">
                  <h3 className="font-heading font-bold text-xl text-destructive mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button
                    variant="outline"
                    className="border-destructive/30 text-destructive hover:bg-destructive/10 rounded-xl"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>

                {/* Delete Account Dialog */}
                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                  <AlertDialogContent className="glass border-border/50">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-heading text-foreground flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        Delete Account
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete your account, profile, and all data. This action cannot be undone. Enter your password to confirm.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-2">
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        className="bg-secondary/50 border-border/50 rounded-xl"
                      />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={deleteLoading} onClick={() => setDeletePassword("")}>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        disabled={deleteLoading || !deletePassword}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {deleteLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
                        Delete My Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </motion.div>
            )}

            {/* Squads Section */}
            {activeSection === "squads" && (
              <div>
                {squadsLoading ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-4">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    <p className="text-muted-foreground text-sm">Loading your squads...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {mySquads.map((membership, index) => {
                      const squad = membership.squad;
                      if (!squad) return null;
                      return (
                        <Link href={`/squads/${squad._id}`} key={membership._id}>
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ delay: index * 0.1 }} 
                            className="glass rounded-3xl p-6 gradient-border hover:bg-card/60 transition-all group cursor-pointer relative overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] group-hover:bg-primary/10 transition-colors" />
                            <div className="relative z-10">
                              <div className="flex items-start justify-between mb-5">
                                <div className="flex-1">
                                  <h3 className="font-heading font-bold text-lg text-foreground mb-1 group-hover:text-gradient transition-colors">{squad.name}</h3>
                                  <p className="text-muted-foreground text-sm">{squad.niche}{squad.platform ? ` · ${squad.platform}` : ""}</p>
                                </div>
                                <Badge className="bg-primary/20 text-primary border-primary/30 text-xs font-semibold capitalize">
                                  {membership.role}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-2 gap-3 mb-5">
                                <div className="bg-secondary/30 rounded-xl p-4 text-center group-hover:bg-secondary/50 transition-colors">
                                  <div className="text-foreground font-heading font-bold text-xl">{membership.postsEngaged || 0}</div>
                                  <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Posts Engaged</div>
                                </div>
                                <div className="bg-secondary/30 rounded-xl p-4 text-center group-hover:bg-secondary/50 transition-colors">
                                  <div className="text-foreground font-heading font-bold text-xl">{membership.totalPosts || 0}</div>
                                  <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Total Posts</div>
                                </div>
                              </div>

                              <div className="mb-4">
                                <div className="flex justify-between text-sm mb-2">
                                  <span className="text-muted-foreground flex items-center gap-1.5">
                                    <TrendingUp className="h-3.5 w-3.5" />
                                    Engagement
                                  </span>
                                  <span className={`font-semibold ${membership.engagementPercentage >= 70 ? "text-primary" : "text-destructive"}`}>
                                    {Math.round(membership.engagementPercentage)}%
                                  </span>
                                </div>
                                <Progress value={membership.engagementPercentage} className="h-2 bg-secondary/50 rounded-full" />
                              </div>

                              <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border/20">
                                <span className="flex items-center gap-1.5">
                                  <Users className="h-3.5 w-3.5" />
                                  {squad.memberCount}/{squad.maxMembers} members
                                </span>
                                <Badge className="text-[10px]" variant={squad.status === "Recruiting" ? "default" : "secondary"}>
                                  {squad.status}
                                </Badge>
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      );
                    })}

                    {/* Add New Squad Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: mySquads.length * 0.1 }}
                      className="glass rounded-3xl p-6 gradient-border hover:bg-card/60 transition-all cursor-pointer border-dashed flex items-center justify-center min-h-[300px]"
                    >
                      <Link href="/squads" className="flex flex-col items-center gap-4 text-center">
                        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-lg text-foreground mb-1">Join More Squads</h3>
                          <p className="text-muted-foreground text-sm">Discover and join squads in your niche</p>
                        </div>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl glow-box">
                          Browse Squads
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                )}
              </div>
            )}

            {/* Create Squad Section */}
            {activeSection === "create-squad" && (
              <div className="max-w-3xl mx-auto space-y-6">
                 <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-3xl p-8 gradient-border"
                >
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Plus className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="font-heading font-bold text-3xl text-foreground mb-2">Create Your Squad</h2>
                    <p className="text-muted-foreground text-lg">Lead your own community and grow together</p>
                  </div>

                  <form onSubmit={handleCreateSquad} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Squad Name */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Squad Name</label>
                        <Input
                          placeholder="e.g. Tech Innovators"
                          value={createSquadForm.name}
                          onChange={(e) => setCreateSquadForm({ ...createSquadForm, name: e.target.value })}
                          className="bg-secondary/50 border-border/50 rounded-xl focus:border-primary/50"
                          maxLength={60}
                        />
                      </div>

                      {/* Niche */}
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Niche</label>
                        <Select 
                          value={createSquadForm.niche} 
                          onValueChange={(value) => setCreateSquadForm({ ...createSquadForm, niche: value })}
                        >
                          <SelectTrigger className="bg-secondary/50 border-border/50 rounded-xl focus:border-primary/50">
                            <SelectValue placeholder="Select niche" />
                          </SelectTrigger>
                          <SelectContent>
                            {NICHE_OPTIONS.map((n) => (
                              <SelectItem key={n} value={n}>{n}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Plan */}
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-semibold text-foreground">Plan Type</label>
                         <Select 
                          value={createSquadForm.plan} 
                          onValueChange={(value) => setCreateSquadForm({ ...createSquadForm, plan: value })}
                        >
                          <SelectTrigger className="bg-secondary/50 border-border/50 rounded-xl focus:border-primary/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Growth">Growth (1 post/day)</SelectItem>
                            <SelectItem value="Pro">Pro (2 posts/day)</SelectItem>
                            <SelectItem value="Momentum">Momentum (3 posts/day)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">Description</label>
                      <Input
                        placeholder="What is your squad about?"
                        value={createSquadForm.description}
                        onChange={(e) => setCreateSquadForm({ ...createSquadForm, description: e.target.value })}
                        className="bg-secondary/50 border-border/50 rounded-xl focus:border-primary/50"
                      />
                    </div>

                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        disabled={createSquadLoading}
                        className="w-full h-12 text-lg bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl glow-box font-semibold"
                      >
                        {createSquadLoading ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Creating Squad...
                          </>
                        ) : (
                          <>
                            <Zap className="h-5 w-5 mr-2" />
                            Create Squad
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}

            {/* Subscriptions Section */}
            {activeSection === "subscriptions" && (
              <div className="space-y-6">
                {subscriptions.map((sub, index) => (
                  <motion.div 
                    key={sub.id} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: index * 0.1 }} 
                    className="glass rounded-2xl p-6 gradient-border hover:bg-card/60 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <CreditCard className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-heading font-bold text-lg text-foreground">{sub.squad}</h3>
                            <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">
                              {sub.plan}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <CreditCard className="h-3.5 w-3.5" />
                              {sub.price}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              Next billing: {sub.nextBilling}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" />
                              Since {sub.since}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-destructive/30 text-destructive hover:bg-destructive/10 rounded-xl"
                      >
                        Cancel
                      </Button>
                    </div>
                  </motion.div>
                ))}

                <div className="glass rounded-2xl p-6 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <p className="text-muted-foreground text-sm">
                      Total Monthly: <span className="text-foreground font-heading font-bold text-xl ml-2">₹250</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Section */}
            {activeSection === "analytics" && (
              <div className="space-y-8">
                {squadsLoading ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-4">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    <p className="text-muted-foreground text-sm">Loading analytics...</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: "Active Squads", value: computedAnalytics.totalSquads, icon: Users },
                        { label: "Posts Engaged", value: computedAnalytics.totalPostsEngaged, icon: Zap },
                        { label: "Avg Engagement", value: `${computedAnalytics.avgEngagement}%`, icon: TrendingUp },
                        { label: "Total Posts", value: computedAnalytics.totalPosts, icon: BarChart3 },
                      ].map((stat, i) => (
                        <motion.div 
                          key={stat.label} 
                          initial={{ opacity: 0, y: 20 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          transition={{ delay: i * 0.08 }} 
                          className="glass rounded-2xl p-6 gradient-border text-center hover:bg-card/60 transition-all group"
                        >
                          <stat.icon className="h-6 w-6 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                          <div className="text-3xl font-heading font-bold text-foreground mb-2">{stat.value}</div>
                          <div className="text-muted-foreground text-xs uppercase tracking-wider">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Per Squad Engagement Bars */}
                    {mySquads.length > 0 && (
                      <div className="glass rounded-3xl p-8 gradient-border">
                        <h3 className="font-heading font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-primary" />
                          Squad Engagement Overview
                        </h3>
                        <div className="flex items-end gap-4 h-56">
                          {mySquads.map((membership, index) => (
                            <motion.div 
                              key={membership._id} 
                              initial={{ height: 0 }}
                              animate={{ height: `${membership.engagementPercentage || 0}%` }}
                              transition={{ delay: 0.3 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                              className="flex-1 flex flex-col items-center gap-3"
                            >
                              <div 
                                className={`w-full rounded-t-xl transition-all shadow-lg ${
                                  membership.engagementPercentage >= 70 
                                    ? "bg-gradient-to-t from-primary via-primary/80 to-primary/40 shadow-primary/20" 
                                    : "bg-gradient-to-t from-destructive via-destructive/80 to-destructive/40 shadow-destructive/20"
                                }`} 
                                style={{ height: `${membership.engagementPercentage || 0}%` }} 
                              />
                              <span className="text-muted-foreground text-xs font-semibold text-center truncate max-w-full px-1">
                                {membership.squad?.name?.split(" ").slice(0, 2).join(" ") || "Squad"}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Per Squad Analytics */}
                    <div>
                      <h3 className="font-heading font-bold text-xl text-foreground mb-5 flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        Per Squad Analytics
                      </h3>
                      {mySquads.length === 0 ? (
                        <div className="glass rounded-2xl p-8 text-center">
                          <Users className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                          <p className="text-muted-foreground text-sm">Join squads to see analytics here.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {mySquads.map((membership) => {
                            const squad = membership.squad;
                            if (!squad) return null;
                            return (
                              <div 
                                key={membership._id} 
                                className="glass rounded-2xl p-6 gradient-border cursor-pointer hover:bg-card/60 transition-all" 
                                onClick={() => setSelectedSquadAnalytics(selectedSquadAnalytics === membership._id ? null : membership._id)}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                                      <Users className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                      <h4 className="font-heading font-bold text-foreground">{squad.name}</h4>
                                      <p className="text-muted-foreground text-sm">{squad.niche} · {membership.role}</p>
                                    </div>
                                  </div>
                                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${selectedSquadAnalytics === membership._id ? "rotate-180" : ""}`} />
                                </div>
                                <AnimatePresence>
                                  {selectedSquadAnalytics === membership._id && (
                                    <motion.div 
                                      initial={{ opacity: 0, height: 0 }} 
                                      animate={{ opacity: 1, height: "auto" }} 
                                      exit={{ opacity: 0, height: 0 }}
                                      className="mt-6 pt-6 border-t border-border/30"
                                    >
                                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        <div className="bg-secondary/30 rounded-xl p-4 text-center">
                                          <div className="text-foreground font-heading font-bold text-xl">{Math.round(membership.engagementPercentage)}%</div>
                                          <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Engagement</div>
                                        </div>
                                        <div className="bg-secondary/30 rounded-xl p-4 text-center">
                                          <div className="text-foreground font-heading font-bold text-xl">{membership.postsEngaged || 0}</div>
                                          <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Posts Engaged</div>
                                        </div>
                                        <div className="bg-secondary/30 rounded-xl p-4 text-center">
                                          <div className="text-foreground font-heading font-bold text-xl">{membership.totalPosts || 0}</div>
                                          <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Total Posts</div>
                                        </div>
                                        <div className="bg-secondary/30 rounded-xl p-4 text-center">
                                          <div className="text-foreground font-heading font-bold text-xl">{Math.round(membership.squadAvgEngagement || 0)}%</div>
                                          <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Squad Avg</div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
        </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
