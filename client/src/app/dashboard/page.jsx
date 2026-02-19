"use client";

import { useState, useEffect, useCallback } from "react";
import {
  User,
  Users,
  CreditCard,
  BarChart3,
  Home,
  Menu,
  LayoutDashboard,
  MessageSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSuccess, deleteUserSuccess } from "@/redux/user/userSlice";
import { slugify } from "@/lib/slugify";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import UserSidebar from "@/components/dashboard/UserSidebar";

// Imported Components
import UserOverview from "@/components/dashboard/user/UserOverview";
import UserProfile from "@/components/dashboard/user/UserProfile";
import UserSquads from "@/components/dashboard/user/UserSquads";
import UserSubscriptions from "@/components/dashboard/user/UserSubscriptions";
import UserAnalytics from "@/components/dashboard/user/UserAnalytics";
import UserTestimonial from "@/components/dashboard/user/UserTestimonial";

const subscriptions = [
  { id: 1, plan: "Growth Squad", squad: "Tech Creators Hub", price: "₹100/mo", nextBilling: "Mar 10, 2026", status: "Active", since: "Jan 2026" },
  { id: 2, plan: "Growth Squad", squad: "SaaS Growth Squad", price: "₹100/mo", nextBilling: "Mar 15, 2026", status: "Active", since: "Feb 2026" },
  { id: 3, plan: "Starter Squad", squad: "Startup Builders", price: "₹50/mo", nextBilling: "Mar 20, 2026", status: "Active", since: "Feb 2026" },
];

const sidebarItems = [
  { key: "overview", label: "Overview", icon: Home },
  { key: "profile", label: "Profile", icon: User },
  { key: "squads", label: "My Squads", icon: Users },
  { key: "testimonial", label: "Testimonial", icon: MessageSquare },
  { key: "subscriptions", label: "Subscriptions", icon: CreditCard },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
];

// Mobile bottom tabs - a subset of the sidebar items
const mobileTabItems = [
  { key: "overview", label: "Home", icon: LayoutDashboard },
  { key: "squads", label: "Squads", icon: Users },
  { key: "profile", label: "Profile", icon: User },
  { key: "analytics", label: "Stats", icon: BarChart3 },
  { key: "subscriptions", label: "Billing", icon: CreditCard },
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

  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window !== "undefined") {
      const tab = sessionStorage.getItem("dashboard_tab");
      if (tab) {
        sessionStorage.removeItem("dashboard_tab");
        return tab;
      }
    }
    return "overview";
  });
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
      const s = data.squad;
      router.push(`/squads/${slugify(s.niche)}/${s.slug || slugify(s.name)}`);
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

  const renderContent = () => (
    <div className="p-4 sm:p-5 md:p-6 pb-20 md:pb-6">
      {/* Overview Section */}
      {activeSection === "overview" && (
        <UserOverview 
          currentUser={currentUser}
          computedAnalytics={computedAnalytics}
          profileCompletion={profileCompletion}
          squadsLoading={squadsLoading}
          mySquads={mySquads}
          setActiveSection={setActiveSection}
        />
      )}

      {/* Profile Section */}
      {activeSection === "profile" && (
        <UserProfile 
          currentUser={currentUser}
          profile={profile}
          setProfile={setProfile}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          profileLoading={profileLoading}
          profileSaving={profileSaving}
          profileError={profileError}
          setProfileError={setProfileError}
          profileSuccess={profileSuccess}
          handleSaveProfile={handleSaveProfile}
          handleCancelEdit={handleCancelEdit}
          profileCompletion={profileCompletion}
          formatJoinDate={formatJoinDate}
          togglePlatform={togglePlatform}
          updatePlatformStat={updatePlatformStat}
          selectedPlatforms={selectedPlatforms}
          passwordForm={passwordForm}
          setPasswordForm={setPasswordForm}
          passwordLoading={passwordLoading}
          handleChangePassword={handleChangePassword}
          deleteDialogOpen={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          deletePassword={deletePassword}
          setDeletePassword={setDeletePassword}
          deleteLoading={deleteLoading}
          handleDeleteAccount={handleDeleteAccount}
        />
      )}

      {/* Squads Section & Create Squad Section */}
      {(activeSection === "squads" || activeSection === "create-squad") && (
        <UserSquads 
          activeSection={activeSection}
          squadsLoading={squadsLoading}
          mySquads={mySquads}
          createSquadForm={createSquadForm}
          setCreateSquadForm={setCreateSquadForm}
          handleCreateSquad={handleCreateSquad}
          createSquadLoading={createSquadLoading}
        />
      )}

      {/* Testimonial Section */}
      {activeSection === "testimonial" && (
        <UserTestimonial currentUser={currentUser} />
      )}

      {/* Subscriptions Section */}
      {activeSection === "subscriptions" && (
        <UserSubscriptions subscriptions={subscriptions} />
      )}

      {/* Analytics Section */}
      {activeSection === "analytics" && (
        <UserAnalytics 
          squadsLoading={squadsLoading}
          computedAnalytics={computedAnalytics}
          mySquads={mySquads}
          selectedSquadAnalytics={selectedSquadAnalytics}
          setSelectedSquadAnalytics={setSelectedSquadAnalytics}
        />
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar - handles its own mobile/desktop visibility */}
      <UserSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative transition-all duration-300">
        <div className="flex-1 overflow-y-auto">
          {/* Desktop Header */}
          <header className="sticky top-0 z-30 glass-strong border-b border-border/20 h-14 sm:h-16 flex items-center px-4 md:px-6 gap-3 sm:gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-muted-foreground mr-1 sm:mr-2 h-9 w-9" 
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={18} />
            </Button>
            <div className="flex items-center gap-2 sm:gap-3">
              {sidebarItems.find(i => i.key === activeSection) && (
                <>
                  {(() => {
                    const Icon = sidebarItems.find(i => i.key === activeSection).icon;
                    return <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />;
                  })()}
                  <h1 className="font-heading font-bold text-base sm:text-lg md:text-xl text-foreground">
                    {sidebarItems.find(i => i.key === activeSection)?.label || "Dashboard"}
                  </h1>
                </>
              )}
            </div>
            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <Badge className="bg-primary/20 text-primary border-primary/30 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-semibold">
                <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 sm:mr-1.5" />
                {mySquads.length} Squad{mySquads.length !== 1 ? "s" : ""}
              </Badge>
            </div>
          </header>

          {renderContent()}
        </div>
      </main>

      {/* Mobile Bottom Tab Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/20 safe-area-bottom">
        <div className="flex items-center justify-around h-16">
          {mobileTabItems.map((item) => {
            const isActive = activeSection === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground"
                }`}
              >
                <div className={`p-1 rounded-lg transition-all duration-200 ${isActive ? "bg-primary/15" : ""}`}>
                  <item.icon className={`h-5 w-5 transition-transform duration-200 ${isActive ? "scale-110" : ""}`} />
                </div>
                <span className={`text-[10px] font-medium leading-none truncate ${isActive ? "font-bold" : ""}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

    </div>
  );
};

export default Dashboard;
