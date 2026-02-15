"use client"

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  DollarSign,
  CreditCard,
  Shield,
  Search,
  Eye,
  Home,
  Settings,
  TrendingUp,
  Activity,
  Award,
  Clock,
  ArrowUp,
  Sparkles,
  BarChart3,
  Target,
  UserCheck,
  UserX,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Trash2,
  ShieldCheck,
  ShieldOff,
  Loader2,
  AlertTriangle,
  RefreshCw,
  X
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu } from "lucide-react";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
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

  // Static data for other tabs (unchanged)
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
                          Admin <span className="text-gradient">Dashboard</span> 🛡️
                        </h2>
                        <p className="text-muted-foreground">Platform overview and management</p>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        <Shield className="h-3 w-3 mr-1" />
                        Administrator
                      </Badge>
                    </div>
                  </div>
                </motion.div>

                {/* Platform Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Total Users", value: pagination.totalUsers.toString(), icon: Users, color: "text-primary", trend: `${pagination.totalUsers} registered`, up: true },
                    { label: "Lifetime Earnings", value: earnings.lifetime, icon: DollarSign, color: "text-primary", trend: earnings.growth, up: true },
                    { label: "Active Subscriptions", value: activeSubs.toString(), icon: CreditCard, color: "text-primary", trend: `${adminSubscriptions.length} total`, up: true },
                    { label: "Total Squads", value: adminSquads.length.toString(), icon: Shield, color: "text-primary", trend: `${adminSquads.filter(s => s.status === "Active").length} active`, up: true },
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
                        <Badge className="text-xs bg-primary/20 text-primary border-primary/30">
                          {stat.up && <ArrowUp className="h-3 w-3 mr-0.5" />}
                          {stat.trend}
                        </Badge>
                      </div>
                      <div className="text-2xl font-heading font-bold text-foreground mb-1">{stat.value}</div>
                      <div className="text-muted-foreground text-xs uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Revenue Chart & Quick Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Revenue Chart */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 glass rounded-3xl p-8 gradient-border"
                  >
                    <h3 className="font-heading font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Monthly Revenue
                    </h3>
                    <div className="flex items-end gap-4 h-64">
                      {earnings.monthlyBreakdown.map((m, index) => {
                        const maxAmount = Math.max(...earnings.monthlyBreakdown.map(x => x.amount));
                        const heightPercent = (m.amount / maxAmount) * 100;
                        return (
                          <motion.div 
                            key={m.month} 
                            initial={{ height: 0 }}
                            animate={{ height: `${heightPercent}%` }}
                            transition={{ delay: 0.8 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                            className="flex-1 flex flex-col items-center gap-3"
                          >
                            <span className="text-foreground text-sm font-heading font-semibold">₹{(m.amount / 1000).toFixed(1)}K</span>
                            <div className="w-full bg-gradient-to-t from-primary via-primary/80 to-primary/40 rounded-t-xl hover:from-primary hover:via-primary hover:to-primary/60 transition-all shadow-lg shadow-primary/20" style={{ height: `${heightPercent}%` }} />
                            <span className="text-muted-foreground text-sm font-semibold">{m.month}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Revenue Stats */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass rounded-3xl p-6 gradient-border"
                  >
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-5 flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      Revenue Stats
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: "Lifetime", value: earnings.lifetime, icon: Award },
                        { label: "This Month", value: earnings.thisMonth, icon: Calendar },
                        { label: "Last Month", value: earnings.lastMonth, icon: Clock },
                        { label: "Growth", value: earnings.growth, icon: TrendingUp },
                      ].map((stat) => (
                        <div key={stat.label} className="bg-secondary/30 rounded-xl p-4 hover:bg-secondary/50 transition-colors">
                          <div className="flex items-center gap-2 mb-1">
                            <stat.icon className="h-4 w-4 text-primary" />
                            <div className="text-muted-foreground text-xs uppercase tracking-wider">{stat.label}</div>
                          </div>
                          <div className="text-xl font-heading font-bold text-foreground">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Users Section */}
            {activeSection === "users" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-1">User Management</h2>
                    <p className="text-muted-foreground text-sm">
                      {pagination.totalUsers} total users
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => fetchUsers(userSearch, currentPage)} 
                    className="text-primary hover:bg-primary/10"
                    disabled={usersLoading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${usersLoading ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                </div>

                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search users by name, email, or niche..." 
                    value={userSearch} 
                    onChange={(e) => setUserSearch(e.target.value)} 
                    className="pl-11 bg-card/50 border-border/50 rounded-xl h-12"
                  />
                  {userSearch && (
                    <button 
                      onClick={() => setUserSearch("")} 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Error State */}
                {usersError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-2xl p-4 border border-destructive/30 bg-destructive/5"
                  >
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
                      <p className="text-destructive text-sm flex-1">{usersError}</p>
                      <Button variant="ghost" size="sm" onClick={() => setUsersError(null)} className="text-destructive hover:bg-destructive/10">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Loading State */}
                {usersLoading && (
                  <div className="flex flex-col items-center justify-center py-16 gap-4">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    <p className="text-muted-foreground text-sm">Loading users...</p>
                  </div>
                )}

                {/* Empty State */}
                {!usersLoading && !usersError && users.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-16 gap-4"
                  >
                    <Users className="h-12 w-12 text-muted-foreground/50" />
                    <p className="text-muted-foreground text-lg font-heading">No users found</p>
                    <p className="text-muted-foreground/70 text-sm">
                      {userSearch ? "Try adjusting your search query" : "No users have signed up yet"}
                    </p>
                  </motion.div>
                )}

                {/* Users List */}
                {!usersLoading && users.length > 0 && (
                  <div className="space-y-3">
                    {users.map((user, index) => (
                      <motion.div 
                        key={user._id} 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: index * 0.05 }} 
                        className="glass rounded-2xl p-5 gradient-border hover:bg-card/60 transition-all group"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <Avatar className="h-12 w-12 border-2 border-primary/30 ring-2 ring-primary/10 shrink-0">
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-heading text-sm font-bold">
                              {getInitials(user.username)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="font-heading font-semibold text-foreground truncate">{user.username}</h3>
                              {user.isUserAdmin && (
                                <Badge className="text-xs bg-amber-500/20 text-amber-400 border-amber-500/30">
                                  <ShieldCheck className="h-3 w-3 mr-1" />
                                  Admin
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                              <span>{user.email}</span>
                              <span>·</span>
                              <span>{user.niche || "Other"}</span>
                              <span>·</span>
                              <span>Joined {formatJoinDate(user.createdAt)}</span>
                            </div>
                          </div>
                          <div className="flex gap-6 text-center">
                            <div>
                              <div className="text-foreground font-heading font-bold text-lg">{user.numberOfFollowers?.toLocaleString() || 0}</div>
                              <div className="text-muted-foreground text-xs">Followers</div>
                            </div>
                            <div>
                              <div className="text-foreground font-heading font-bold text-lg">{user.platforms?.length || 0}</div>
                              <div className="text-muted-foreground text-xs">Platforms</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-primary hover:bg-primary/10"
                              onClick={() => { setViewUser(user); setViewDialogOpen(true); }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-amber-400 hover:bg-amber-500/10"
                              onClick={() => handleToggleAdmin(user)}
                              disabled={toggleAdminLoading === user._id}
                            >
                              {toggleAdminLoading === user._id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : user.isUserAdmin ? (
                                <ShieldOff className="h-4 w-4" />
                              ) : (
                                <ShieldCheck className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => { setUserToDelete(user); setDeleteDialogOpen(true); }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {!usersLoading && pagination.totalPages > 1 && (
                  <div className="flex items-center justify-between pt-4">
                    <p className="text-muted-foreground text-sm">
                      Page {pagination.currentPage} of {pagination.totalPages} · {pagination.totalUsers} users
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={!pagination.hasPrevPage}
                        className="text-primary hover:bg-primary/10"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                          let pageNum;
                          if (pagination.totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= pagination.totalPages - 2) {
                            pageNum = pagination.totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          return (
                            <Button
                              key={pageNum}
                              variant={pageNum === currentPage ? "default" : "ghost"}
                              size="sm"
                              onClick={() => setCurrentPage(pageNum)}
                              className={pageNum === currentPage ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-primary/10"}
                            >
                              {pageNum}
                            </Button>
                          );
                        })}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.min(pagination.totalPages, p + 1))}
                        disabled={!pagination.hasNextPage}
                        className="text-primary hover:bg-primary/10"
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Delete Confirmation Dialog */}
                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                  <AlertDialogContent className="glass border-border/50">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-heading text-foreground">Delete User</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete <span className="font-semibold text-foreground">{userToDelete?.username}</span>?
                        This action cannot be undone and will permanently remove this user from the platform.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={deleteLoading}>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteUser}
                        disabled={deleteLoading}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {deleteLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
                        Delete User
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* View User Detail Dialog */}
                <AlertDialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
                  <AlertDialogContent className="glass border-border/50 max-w-lg">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-heading text-foreground flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-primary/30">
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-heading text-sm font-bold">
                            {getInitials(viewUser?.username)}
                          </AvatarFallback>
                        </Avatar>
                        {viewUser?.username}
                        {viewUser?.isUserAdmin && (
                          <Badge className="text-xs bg-amber-500/20 text-amber-400 border-amber-500/30">Admin</Badge>
                        )}
                      </AlertDialogTitle>
                      <AlertDialogDescription asChild>
                        <div className="space-y-4 pt-2">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-secondary/30 rounded-xl p-3">
                              <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Email</div>
                              <div className="text-foreground text-sm font-medium truncate">{viewUser?.email}</div>
                            </div>
                            <div className="bg-secondary/30 rounded-xl p-3">
                              <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Niche</div>
                              <div className="text-foreground text-sm font-medium">{viewUser?.niche || "Other"}</div>
                            </div>
                            <div className="bg-secondary/30 rounded-xl p-3">
                              <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Followers</div>
                              <div className="text-foreground text-sm font-medium">{viewUser?.numberOfFollowers?.toLocaleString() || 0}</div>
                            </div>
                            <div className="bg-secondary/30 rounded-xl p-3">
                              <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Avg Likes</div>
                              <div className="text-foreground text-sm font-medium">{viewUser?.avgLikes?.toLocaleString() || 0}</div>
                            </div>
                            <div className="bg-secondary/30 rounded-xl p-3">
                              <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Avg Comments</div>
                              <div className="text-foreground text-sm font-medium">{viewUser?.avgComments?.toLocaleString() || 0}</div>
                            </div>
                            <div className="bg-secondary/30 rounded-xl p-3">
                              <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Joined</div>
                              <div className="text-foreground text-sm font-medium">{formatJoinDate(viewUser?.createdAt)}</div>
                            </div>
                          </div>
                          {viewUser?.platforms?.length > 0 && (
                            <div>
                              <div className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Platforms</div>
                              <div className="flex flex-wrap gap-2">
                                {viewUser.platforms.map((p) => (
                                  <Badge key={p} className="text-xs bg-primary/20 text-primary border-primary/30">{p}</Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}

            {/* Earnings Section */}
            {activeSection === "earnings" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-1">Earnings Dashboard</h2>
                  <p className="text-muted-foreground text-sm">Revenue analytics and insights</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Lifetime", value: earnings.lifetime, icon: Award },
                    { label: "This Month", value: earnings.thisMonth, icon: Target },
                    { label: "Last Month", value: earnings.lastMonth, icon: Clock },
                    { label: "Growth", value: earnings.growth, icon: TrendingUp },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass rounded-2xl p-6 gradient-border text-center hover:bg-card/60 transition-all group"
                    >
                      <stat.icon className="h-6 w-6 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                      <div className="text-2xl font-heading font-bold text-foreground mb-2">{stat.value}</div>
                      <div className="text-muted-foreground text-xs uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="glass rounded-3xl p-8 gradient-border">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-6 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Monthly Revenue Breakdown
                  </h3>
                  <div className="flex items-end gap-4 h-72">
                    {earnings.monthlyBreakdown.map((m, index) => {
                      const maxAmount = Math.max(...earnings.monthlyBreakdown.map(x => x.amount));
                      const heightPercent = (m.amount / maxAmount) * 100;
                      return (
                        <motion.div 
                          key={m.month}
                          initial={{ height: 0 }}
                          animate={{ height: `${heightPercent}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.5, ease: "easeOut" }}
                          className="flex-1 flex flex-col items-center gap-3"
                        >
                          <span className="text-foreground text-sm font-heading font-semibold">₹{(m.amount / 1000).toFixed(1)}K</span>
                          <div className="w-full bg-gradient-to-t from-primary via-primary/80 to-primary/40 rounded-t-xl hover:from-primary hover:via-primary hover:to-primary/60 transition-all cursor-pointer shadow-lg shadow-primary/20" style={{ height: `${heightPercent}%` }} />
                          <span className="text-muted-foreground text-sm font-semibold">{m.month}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Subscriptions Section */}
            {activeSection === "subscriptions" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-1">Subscription Management</h2>
                    <p className="text-muted-foreground text-sm">{adminSubscriptions.length} total · {activeSubs} active</p>
                  </div>
                </div>

                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search subscriptions..." 
                    value={subSearch} 
                    onChange={(e) => setSubSearch(e.target.value)} 
                    className="pl-11 bg-card/50 border-border/50 rounded-xl h-12"
                  />
                </div>

                <div className="space-y-3">
                  {filteredSubs.map((sub, index) => (
                    <motion.div 
                      key={sub.id} 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: index * 0.05 }} 
                      className="glass rounded-2xl p-5 gradient-border hover:bg-card/60 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <CreditCard className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-heading font-semibold text-foreground">{sub.user}</h3>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">{sub.squad}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Badge className={`text-xs ${sub.status === "Active" ? "bg-primary/20 text-primary border-primary/30" : "bg-destructive/20 text-destructive border-destructive/30"}`}>
                                {sub.status}
                              </Badge>
                              <Badge className="text-xs bg-secondary text-muted-foreground">{sub.plan}</Badge>
                              <span className="text-xs text-muted-foreground">Since {sub.since}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-heading font-bold text-foreground">{sub.price}</div>
                          <div className="text-xs text-muted-foreground">per month</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Squads Section */}
            {activeSection === "squads" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-1">Squad Management</h2>
                  <p className="text-muted-foreground text-sm">{adminSquads.length} squads · {adminSquads.filter(s => s.status === "Active").length} active</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {adminSquads.map((squad, index) => (
                    <motion.div 
                      key={squad.id} 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: index * 0.08 }} 
                      className="glass rounded-3xl p-6 gradient-border hover:bg-card/60 transition-all group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px] group-hover:bg-primary/10 transition-colors" />
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-5">
                          <div className="flex-1">
                            <h3 className="font-heading font-bold text-lg text-foreground mb-1">{squad.name}</h3>
                            <p className="text-muted-foreground text-sm">{squad.niche}</p>
                          </div>
                          <Badge className={`text-xs font-semibold ${squad.status === "Recruiting" ? "bg-primary/20 text-primary border-primary/30" : "bg-secondary text-muted-foreground"}`}>
                            {squad.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-5">
                          <div className="text-center bg-secondary/30 rounded-xl p-3 group-hover:bg-secondary/50 transition-colors">
                            <div className="text-foreground font-heading font-bold text-lg">{squad.members}/{squad.max}</div>
                            <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Members</div>
                          </div>
                          <div className="text-center bg-secondary/30 rounded-xl p-3 group-hover:bg-secondary/50 transition-colors">
                            <div className="text-foreground font-heading font-bold text-sm">{squad.revenue}</div>
                            <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Revenue</div>
                          </div>
                          <div className="text-center bg-secondary/30 rounded-xl p-3 group-hover:bg-secondary/50 transition-colors">
                            <div className="text-foreground font-heading font-bold text-sm">{squad.type}</div>
                            <div className="text-muted-foreground text-xs uppercase tracking-wider mt-1">Type</div>
                          </div>
                        </div>

                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${(squad.members / squad.max) * 100}%` }}
                            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full" 
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
          </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
