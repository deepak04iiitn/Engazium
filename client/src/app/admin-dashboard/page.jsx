"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Users,
  DollarSign,
  CreditCard,
  Shield,
  BarChart3,
  Menu,
  MessageSquare,
  MessageCircleWarning,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import AdminSidebar from "@/components/dashboard/AdminSidebar";

// Imported Components
import AdminOverview from "@/components/dashboard/admin/AdminOverview";
import AdminUsers from "@/components/dashboard/admin/AdminUsers";
import AdminEarnings from "@/components/dashboard/admin/AdminEarnings";
import AdminSubscriptions from "@/components/dashboard/admin/AdminSubscriptions";
import AdminSquads from "@/components/dashboard/admin/AdminSquads";
import AdminTestimonials from "@/components/dashboard/admin/AdminTestimonials";
import AdminFeedback from "@/components/dashboard/admin/AdminFeedback";

const earnings = {
  lifetime: "₹1,24,500", thisMonth: "₹18,750", lastMonth: "₹15,200", growth: "+23.4%",
  monthlyBreakdown: [
    { month: "Sep", amount: 8200 }, { month: "Oct", amount: 9800 }, { month: "Nov", amount: 12400 },
    { month: "Dec", amount: 14100 }, { month: "Jan", amount: 15200 }, { month: "Feb", amount: 18750 },
  ],
};

const adminSubscriptions = [
  { id: 1, user: "Alex Creator", squad: "Tech Creators Hub", plan: "Growth", price: "₹100", status: "Active", since: "Jan 2026" },
  { id: 2, user: "Priya Sharma", squad: "Fitness Growth Circle", plan: "Growth", price: "₹100", status: "Active", since: "Jan 2026" },
  { id: 3, user: "Raj Patel", squad: "Finance Gurus", plan: "Starter", price: "₹50", status: "Active", since: "Feb 2026" },
  { id: 4, user: "Maya Singh", squad: "Fashion Forward", plan: "Growth", price: "₹100", status: "Active", since: "Jan 2026" },
  { id: 5, user: "Alex Creator", squad: "SaaS Growth Squad", plan: "Growth", price: "₹100", status: "Active", since: "Feb 2026" },
  { id: 6, user: "Neha Gupta", squad: "Foodie Network", plan: "Starter", price: "₹50", status: "Active", since: "Jan 2026" },
  { id: 7, user: "Arjun Dev", squad: "Gaming Legends", plan: "Starter", price: "₹50", status: "Cancelled", since: "Jan 2026" },
  { id: 8, user: "Simran Kaur", squad: "Art & Design Collective", plan: "Growth", price: "₹100", status: "Active", since: "Jan 2026" },
];

const sidebarItems = [
  { key: "overview", label: "Overview", icon: BarChart3 },
  { key: "users", label: "All Users", icon: Users },
  { key: "feedback", label: "Feedback Hub", icon: MessageCircleWarning },
  { key: "earnings", label: "Earnings", icon: DollarSign },
  { key: "subscriptions", label: "Subs", icon: CreditCard },
  { key: "squads", label: "Squads", icon: Shield },
  { key: "testimonials", label: "Testimonials", icon: MessageSquare },
];

// Mobile bottom tabs for admin
const mobileTabItems = [
  { key: "overview", label: "Overview", icon: BarChart3 },
  { key: "users", label: "Users", icon: Users },
  { key: "feedback", label: "Feedback", icon: MessageCircleWarning },
  { key: "squads", label: "Squads", icon: Shield },
  { key: "testimonials", label: "Reviews", icon: MessageSquare },
];

const AdminDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const router = useRouter();
  const isAdminUser = Boolean(
    currentUser?.isUserAdmin || currentUser?.isAdmin || currentUser?.role === "admin"
  );
  const [activeSection, setActiveSection] = useState("overview");
  const [userSearch, setUserSearch] = useState("");
  const [subSearch, setSubSearch] = useState("");
  const [squadSearch, setSquadSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // ── Users state (API-driven) ──
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalUsers: 0, hasNextPage: false, hasPrevPage: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [squads, setSquads] = useState([]);
  const [squadsLoading, setSquadsLoading] = useState(false);
  const [squadsError, setSquadsError] = useState(null);
  const [squadsPagination, setSquadsPagination] = useState({ currentPage: 1, totalPages: 1, totalSquads: 0 });
  const [squadsStats, setSquadsStats] = useState({ activeSquads: 0, fullSquads: 0 });
  const [squadCurrentPage, setSquadCurrentPage] = useState(1);
  const [squadStatusFilter, setSquadStatusFilter] = useState("all");
  const [squadPlanFilter, setSquadPlanFilter] = useState("all");
  const [squadNicheFilter, setSquadNicheFilter] = useState("all");
  const [selectedSquad, setSelectedSquad] = useState(null);
  const [selectedSquadId, setSelectedSquadId] = useState(null);
  const [squadDetailsOpen, setSquadDetailsOpen] = useState(false);
  const [squadDetailsLoading, setSquadDetailsLoading] = useState(false);
  const [squadActionLoading, setSquadActionLoading] = useState(null);
  const [squadDetailQuery, setSquadDetailQuery] = useState({
    memberPage: 1,
    memberSearch: "",
    memberRole: "all",
    blockedPage: 1,
    blockedSearch: "",
    logsPage: 1,
  });
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState(null);
  const [feedbackSearch, setFeedbackSearch] = useState("");
  const [feedbackDebouncedSearch, setFeedbackDebouncedSearch] = useState("");
  const [feedbackStatusFilter, setFeedbackStatusFilter] = useState("pending");
  const [feedbackTypeFilter, setFeedbackTypeFilter] = useState("all");
  const [feedbackPage, setFeedbackPage] = useState(1);
  const [feedbackActionLoadingId, setFeedbackActionLoadingId] = useState(null);
  const [feedbackPagination, setFeedbackPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [feedbackStats, setFeedbackStats] = useState({
    pendingCount: 0,
    bugCount: 0,
    featureCount: 0,
    contactCount: 0,
  });

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // User detail dialog state
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewUser, setViewUser] = useState(null);

  // Toggle admin state
  const [toggleAdminLoading, setToggleAdminLoading] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      router.push(`/sign-in?redirect=${encodeURIComponent("/admin-dashboard")}`);
      return;
    }
    if (!isAdminUser) {
      router.replace("/dashboard");
    }
  }, [currentUser, isAdminUser, router]);

  // Fetch users from API
  const fetchUsers = useCallback(async (search = "", page = 1) => {
    setUsersLoading(true);
    setUsersError(null);
    try {
      const params = new URLSearchParams({ search, page: page.toString(), limit: "10" });
      const res = await fetch(`/api/admin/users?${params}`, { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch users");
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (err) {
      setUsersError(err.message);
      setUsers([]);
    } finally {
      setUsersLoading(false);
    }
  }, []);

  const fetchSquads = useCallback(async ({
    search = "",
    page = 1,
    status = "all",
    plan = "all",
    niche = "all",
  } = {}) => {
    setSquadsLoading(true);
    setSquadsError(null);
    try {
      const params = new URLSearchParams({
        search,
        page: page.toString(),
        limit: "12",
        status,
        plan,
        niche,
      });
      const res = await fetch(`/api/admin/squads?${params}`, { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch squads");
      setSquads(data.squads || []);
      setSquadsPagination(data.pagination || { currentPage: 1, totalPages: 1, totalSquads: 0 });
      setSquadsStats(data.stats || { activeSquads: 0, fullSquads: 0 });
    } catch (err) {
      setSquadsError(err.message);
      setSquads([]);
    } finally {
      setSquadsLoading(false);
    }
  }, []);

  const fetchFeedback = useCallback(async ({ search = "", status = "pending", type = "all", page = 1 } = {}) => {
    setFeedbackLoading(true);
    setFeedbackError(null);
    try {
      const params = new URLSearchParams({
        search,
        status,
        type,
        page: page.toString(),
        limit: "10",
      });
      const res = await fetch(`/api/admin/feedback?${params}`, { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch feedback");
      setFeedbackItems(data.feedback || []);
      setFeedbackPagination(data.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        hasNextPage: false,
        hasPrevPage: false,
      });
      setFeedbackStats(data.stats || { pendingCount: 0, bugCount: 0, featureCount: 0, contactCount: 0 });
    } catch (err) {
      setFeedbackError(err.message);
      setFeedbackItems([]);
    } finally {
      setFeedbackLoading(false);
    }
  }, []);

  // Initial fetch for overview stats
  useEffect(() => {
    fetchUsers("", 1);
    fetchSquads({ search: "", page: 1, status: "all", plan: "all", niche: "all" });
  }, [fetchUsers, fetchSquads]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeSection === "users") {
        setCurrentPage(1);
        fetchUsers(userSearch, 1);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [userSearch, activeSection, fetchUsers]);

  // Fetch when page changes
  useEffect(() => {
    if (activeSection === "users") {
      fetchUsers(userSearch, currentPage);
    }
  }, [currentPage, activeSection, fetchUsers, userSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeSection === "squads") {
        setSquadCurrentPage(1);
        fetchSquads({
          search: squadSearch,
          page: 1,
          status: squadStatusFilter,
          plan: squadPlanFilter,
          niche: squadNicheFilter,
        });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [activeSection, fetchSquads, squadSearch, squadStatusFilter, squadPlanFilter, squadNicheFilter]);

  useEffect(() => {
    if (activeSection !== "squads") return;
    fetchSquads({
      search: squadSearch,
      page: squadCurrentPage,
      status: squadStatusFilter,
      plan: squadPlanFilter,
      niche: squadNicheFilter,
    });
  }, [activeSection, fetchSquads, squadCurrentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFeedbackDebouncedSearch(feedbackSearch);
    }, 350);

    return () => clearTimeout(timer);
  }, [feedbackSearch]);

  useEffect(() => {
    if (activeSection !== "feedback") return;
    fetchFeedback({
      search: feedbackDebouncedSearch,
      status: feedbackStatusFilter,
      type: feedbackTypeFilter,
      page: feedbackPage,
    });
  }, [activeSection, feedbackPage, feedbackStatusFilter, feedbackTypeFilter, fetchFeedback, feedbackDebouncedSearch]);

  // Delete user handler
  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userToDelete._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete user");
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      fetchUsers(userSearch, currentPage);
    } catch (err) {
      setUsersError(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Toggle admin handler
  const handleToggleAdmin = async (user) => {
    setToggleAdminLoading(user._id);
    try {
      const res = await fetch(`/api/admin/users/${user._id}/toggle-admin`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to toggle admin");
      fetchUsers(userSearch, currentPage);
    } catch (err) {
      setUsersError(err.message);
    } finally {
      setToggleAdminLoading(null);
    }
  };

  const handleUpdateFeedbackStatus = async (id, status) => {
    setFeedbackActionLoadingId(id);
    try {
      const res = await fetch(`/api/admin/feedback/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update feedback status");
      fetchFeedback({
        search: feedbackSearch,
        status: feedbackStatusFilter,
        type: feedbackTypeFilter,
        page: feedbackPage,
      });
    } catch (err) {
      setFeedbackError(err.message);
    } finally {
      setFeedbackActionLoadingId(null);
    }
  };

  const handleViewSquadDetails = async (squadId, queryOverrides = {}) => {
    setSquadDetailsLoading(true);
    setSquadsError(null);
    try {
      const effectiveQuery = {
        ...squadDetailQuery,
        ...queryOverrides,
      };
      const params = new URLSearchParams({
        memberPage: String(effectiveQuery.memberPage || 1),
        memberLimit: "8",
        memberSearch: effectiveQuery.memberSearch || "",
        memberRole: effectiveQuery.memberRole || "all",
        blockedPage: String(effectiveQuery.blockedPage || 1),
        blockedLimit: "8",
        blockedSearch: effectiveQuery.blockedSearch || "",
        logsPage: String(effectiveQuery.logsPage || 1),
        logsLimit: "8",
      });
      const res = await fetch(`/api/admin/squads/${squadId}?${params}`, { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch squad details");
      setSelectedSquad(data);
      setSelectedSquadId(squadId);
      setSquadDetailQuery(effectiveQuery);
      setSquadDetailsOpen(true);
    } catch (err) {
      setSquadsError(err.message);
    } finally {
      setSquadDetailsLoading(false);
    }
  };

  const handleDeleteSquad = async (squadId) => {
    setSquadActionLoading(`delete-${squadId}`);
    setSquadsError(null);
    try {
      const res = await fetch(`/api/admin/squads/${squadId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete squad");
      if (selectedSquad?.squad?._id === squadId) {
        setSelectedSquad(null);
        setSquadDetailsOpen(false);
      }
      setSquadCurrentPage(1);
      fetchSquads({
        search: squadSearch,
        page: 1,
        status: squadStatusFilter,
        plan: squadPlanFilter,
        niche: squadNicheFilter,
      });
    } catch (err) {
      setSquadsError(err.message);
    } finally {
      setSquadActionLoading(null);
    }
  };

  const handleRemoveSquadMember = async (squadId, userId) => {
    setSquadActionLoading(`remove-${userId}`);
    setSquadsError(null);
    try {
      const res = await fetch(`/api/admin/squads/${squadId}/members/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to remove member");
      await Promise.all([
        handleViewSquadDetails(squadId),
        fetchSquads({
          search: squadSearch,
          page: squadCurrentPage,
          status: squadStatusFilter,
          plan: squadPlanFilter,
          niche: squadNicheFilter,
        }),
      ]);
    } catch (err) {
      setSquadsError(err.message);
    } finally {
      setSquadActionLoading(null);
    }
  };

  const handleSetSquadUserBlock = async (squadId, userId, block) => {
    setSquadActionLoading(`${block ? "block" : "unblock"}-${userId}`);
    setSquadsError(null);
    try {
      const res = await fetch(`/api/admin/squads/${squadId}/members/${userId}/block`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ block }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update block status");
      await Promise.all([
        handleViewSquadDetails(squadId),
        fetchSquads({
          search: squadSearch,
          page: squadCurrentPage,
          status: squadStatusFilter,
          plan: squadPlanFilter,
          niche: squadNicheFilter,
        }),
      ]);
    } catch (err) {
      setSquadsError(err.message);
    } finally {
      setSquadActionLoading(null);
    }
  };

  const handleTransferSquadOwnership = async (squadId, newOwnerId) => {
    setSquadActionLoading(`transfer-${newOwnerId}`);
    setSquadsError(null);
    try {
      const res = await fetch(`/api/admin/squads/${squadId}/transfer-ownership`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ newOwnerId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to transfer ownership");
      await Promise.all([
        handleViewSquadDetails(squadId),
        fetchSquads({
          search: squadSearch,
          page: squadCurrentPage,
          status: squadStatusFilter,
          plan: squadPlanFilter,
          niche: squadNicheFilter,
        }),
      ]);
    } catch (err) {
      setSquadsError(err.message);
    } finally {
      setSquadActionLoading(null);
    }
  };

  // Format date helper
  const formatJoinDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
  };

  // Get initials from username
  const getInitials = (username) => {
    if (!username) return "??";
    return username.slice(0, 2).toUpperCase();
  };

  // Static data for other tabs
  const filteredSubs = adminSubscriptions.filter(
    (s) => s.user.toLowerCase().includes(subSearch.toLowerCase()) || s.squad.toLowerCase().includes(subSearch.toLowerCase())
  );
  const activeSubs = adminSubscriptions.filter(s => s.status === "Active").length;

  const renderContent = () => (
    <div className="p-4 sm:p-5 md:p-6 pb-20 md:pb-6">
      {/* Overview Section */}
      {activeSection === "overview" && (
        <AdminOverview 
          pagination={pagination}
          earnings={earnings}
          activeSubs={activeSubs}
          adminSubscriptions={adminSubscriptions}
          totalSquads={squadsPagination.totalSquads}
          activeSquads={squadsStats.activeSquads}
        />
      )}

      {/* Users Section */}
      {activeSection === "users" && (
        <AdminUsers 
          pagination={pagination}
          fetchUsers={fetchUsers}
          usersLoading={usersLoading}
          usersError={usersError}
          setUsersError={setUsersError}
          users={users}
          userSearch={userSearch}
          setUserSearch={setUserSearch}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleDeleteUser={handleDeleteUser}
          handleToggleAdmin={handleToggleAdmin}
          toggleAdminLoading={toggleAdminLoading}
          formatJoinDate={formatJoinDate}
          getInitials={getInitials}
          deleteDialogOpen={deleteDialogOpen}
          setDeleteDialogOpen={setDeleteDialogOpen}
          userToDelete={userToDelete}
          setUserToDelete={setUserToDelete}
          deleteLoading={deleteLoading}
          viewDialogOpen={viewDialogOpen}
          setViewDialogOpen={setViewDialogOpen}
          viewUser={viewUser}
          setViewUser={setViewUser}
        />
      )}

      {/* Feedback Section */}
      {activeSection === "feedback" && (
        <AdminFeedback
          feedbackItems={feedbackItems}
          loading={feedbackLoading}
          error={feedbackError}
          setError={setFeedbackError}
          stats={feedbackStats}
          search={feedbackSearch}
          setSearch={setFeedbackSearch}
          statusFilter={feedbackStatusFilter}
          setStatusFilter={setFeedbackStatusFilter}
          typeFilter={feedbackTypeFilter}
          setTypeFilter={setFeedbackTypeFilter}
          pagination={feedbackPagination}
          setCurrentPage={setFeedbackPage}
          onRefresh={() => fetchFeedback({
            search: feedbackDebouncedSearch,
            status: feedbackStatusFilter,
            type: feedbackTypeFilter,
            page: feedbackPage,
          })}
          onUpdateStatus={handleUpdateFeedbackStatus}
          actionLoadingId={feedbackActionLoadingId}
        />
      )}

      {/* Earnings Section */}
      {activeSection === "earnings" && (
        <AdminEarnings earnings={earnings} />
      )}

      {/* Subscriptions Section */}
      {activeSection === "subscriptions" && (
        <AdminSubscriptions 
          adminSubscriptions={adminSubscriptions}
          activeSubs={activeSubs}
          subSearch={subSearch}
          setSubSearch={setSubSearch}
          filteredSubs={filteredSubs}
        />
      )}

      {/* Squads Section */}
      {activeSection === "squads" && (
        <AdminSquads
          adminSquads={squads}
          squadsLoading={squadsLoading}
          squadsError={squadsError}
          squadSearch={squadSearch}
          setSquadSearch={setSquadSearch}
          squadsPagination={squadsPagination}
          squadCurrentPage={squadCurrentPage}
          setSquadCurrentPage={setSquadCurrentPage}
          squadStatusFilter={squadStatusFilter}
          setSquadStatusFilter={setSquadStatusFilter}
          squadPlanFilter={squadPlanFilter}
          setSquadPlanFilter={setSquadPlanFilter}
          squadNicheFilter={squadNicheFilter}
          setSquadNicheFilter={setSquadNicheFilter}
          onRefresh={() => fetchSquads({
            search: squadSearch,
            page: squadCurrentPage,
            status: squadStatusFilter,
            plan: squadPlanFilter,
            niche: squadNicheFilter,
          })}
          onViewSquadDetails={handleViewSquadDetails}
          onDeleteSquad={handleDeleteSquad}
          onRemoveMember={handleRemoveSquadMember}
          onSetMemberBlock={handleSetSquadUserBlock}
          onTransferOwnership={handleTransferSquadOwnership}
          selectedSquadId={selectedSquadId}
          squadDetailQuery={squadDetailQuery}
          selectedSquad={selectedSquad}
          squadDetailsOpen={squadDetailsOpen}
          setSquadDetailsOpen={setSquadDetailsOpen}
          squadDetailsLoading={squadDetailsLoading}
          squadActionLoading={squadActionLoading}
        />
      )}

      {/* Testimonials Section */}
      {activeSection === "testimonials" && (
        <AdminTestimonials />
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar - handles its own mobile/desktop visibility */}
      <AdminSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative transition-all duration-300">
        <div className="flex-1 overflow-y-auto">
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
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <h1 className="font-heading font-bold text-base sm:text-lg md:text-xl text-foreground">
                {sidebarItems.find(i => i.key === activeSection)?.label || "Admin"}
              </h1>
            </div>
          </header>

          {renderContent()}
        </div>
      </main>

      {/* Mobile Bottom Tab Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/20 safe-area-bottom bg-background/95 backdrop-blur-xl">
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

export default AdminDashboard;
