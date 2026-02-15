"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Users,
  DollarSign,
  CreditCard,
  Shield,
  BarChart3,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminSidebar from "@/components/dashboard/AdminSidebar";

// Imported Components
import AdminOverview from "@/components/dashboard/admin/AdminOverview";
import AdminUsers from "@/components/dashboard/admin/AdminUsers";
import AdminEarnings from "@/components/dashboard/admin/AdminEarnings";
import AdminSubscriptions from "@/components/dashboard/admin/AdminSubscriptions";
import AdminSquads from "@/components/dashboard/admin/AdminSquads";

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

const adminSquads = [
  { id: 1, name: "Tech Creators Hub", niche: "Tech & SaaS", members: 10, max: 10, revenue: "₹1,000/mo", status: "Active", type: "Starter" },
  { id: 2, name: "Fitness Growth Circle", niche: "Fitness", members: 17, max: 20, revenue: "₹1,700/mo", status: "Active", type: "Growth" },
  { id: 3, name: "Foodie Network", niche: "Food & Cooking", members: 9, max: 10, revenue: "₹450/mo", status: "Recruiting", type: "Starter" },
  { id: 4, name: "Fashion Forward", niche: "Fashion", members: 20, max: 20, revenue: "₹2,000/mo", status: "Active", type: "Growth" },
  { id: 5, name: "SaaS Growth Squad", niche: "Tech & SaaS", members: 18, max: 20, revenue: "₹1,800/mo", status: "Active", type: "Growth" },
  { id: 6, name: "Finance Gurus", niche: "Finance", members: 15, max: 20, revenue: "₹750/mo", status: "Recruiting", type: "Growth" },
];

const sidebarItems = [
  { key: "overview", label: "Overview", icon: BarChart3 },
  { key: "users", label: "All Users", icon: Users },
  { key: "earnings", label: "Earnings", icon: DollarSign },
  { key: "subscriptions", label: "Subscriptions", icon: CreditCard },
  { key: "squads", label: "All Squads", icon: Shield },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [userSearch, setUserSearch] = useState("");
  const [subSearch, setSubSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // ── Users state (API-driven) ──
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalUsers: 0, hasNextPage: false, hasPrevPage: false });
  const [currentPage, setCurrentPage] = useState(1);

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // User detail dialog state
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewUser, setViewUser] = useState(null);

  // Toggle admin state
  const [toggleAdminLoading, setToggleAdminLoading] = useState(null);

  // Fetch users from API
  const fetchUsers = useCallback(async (search = "", page = 1) => {
    setUsersLoading(true);
    setUsersError(null);
    try {
      const params = new URLSearchParams({ search, page: page.toString(), limit: "10" });
      const res = await fetch(`${API_BASE}/api/admin/users?${params}`, { credentials: "include" });
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

  // Initial fetch for overview stats
  useEffect(() => {
    fetchUsers("", 1);
  }, [fetchUsers]);

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
  }, [currentPage, activeSection, fetchUsers]);

  // Delete user handler
  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${userToDelete._id}`, {
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
      const res = await fetch(`${API_BASE}/api/admin/users/${user._id}/toggle-admin`, {
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

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <AdminSidebar 
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
              <Shield className="h-5 w-5 text-primary" />
              <h1 className="font-heading font-bold text-xl text-foreground">
                {sidebarItems.find(i => i.key === activeSection)?.label || "Admin"}
              </h1>
            </div>
          </header>

          <div className="p-6">
            {/* Overview Section */}
            {activeSection === "overview" && (
              <AdminOverview 
                pagination={pagination}
                earnings={earnings}
                activeSubs={activeSubs}
                adminSubscriptions={adminSubscriptions}
                adminSquads={adminSquads}
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
              <AdminSquads adminSquads={adminSquads} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
