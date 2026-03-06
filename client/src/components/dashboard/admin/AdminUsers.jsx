"use client";

import { motion } from "framer-motion";
import {
  Users,
  Search,
  Eye,
  Trash2,
  ShieldCheck,
  ShieldOff,
  Loader2,
  AlertTriangle,
  RefreshCw,
  X,
  ChevronRight,
  ChevronLeft,
  Wifi,
  Clock,
  TrendingUp,
  UserPlus,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ONLINE_MS = 5 * 60 * 1000;
const ACTIVE_DAY_MS = 24 * 60 * 60 * 1000;

function getActiveStatus(lastSeen) {
  if (!lastSeen) return "inactive";
  const diff = Date.now() - new Date(lastSeen).getTime();
  if (diff < ONLINE_MS) return "online";
  if (diff < ACTIVE_DAY_MS) return "today";
  return "inactive";
}

const STATUS_CONFIG = {
  online: { label: "Online", color: "bg-emerald-500", text: "text-emerald-400", ring: "ring-emerald-500/30" },
  today: { label: "Active today", color: "bg-amber-400", text: "text-amber-400", ring: "ring-amber-400/30" },
  inactive: { label: "Inactive", color: "bg-zinc-500", text: "text-zinc-400", ring: "ring-zinc-500/30" },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl p-3 border border-border/40 shadow-xl text-xs">
        <p className="text-muted-foreground mb-1">{label}</p>
        <p className="text-primary font-heading font-bold text-sm">
          +{payload[0].value} <span className="text-muted-foreground font-normal">new users</span>
        </p>
      </div>
    );
  }
  return null;
};

const AdminUsers = ({
  pagination,
  fetchUsers,
  fetchUserStats,
  userStats,
  usersLoading,
  usersError,
  setUsersError,
  users,
  userSearch,
  setUserSearch,
  currentPage,
  setCurrentPage,
  handleDeleteUser,
  handleToggleAdmin,
  toggleAdminLoading,
  formatJoinDate,
  getInitials,
  deleteDialogOpen,
  setDeleteDialogOpen,
  userToDelete,
  setUserToDelete,
  deleteLoading,
  viewDialogOpen,
  setViewDialogOpen,
  viewUser,
  setViewUser,
}) => {
  const metricCards = [
    {
      label: "Online Now",
      value: userStats?.onlineNow ?? "—",
      icon: Wifi,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      dot: "bg-emerald-500",
      pulse: true,
    },
    {
      label: "Active Today",
      value: userStats?.activeToday ?? "—",
      icon: Activity,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      dot: null,
    },
    {
      label: "Active This Week",
      value: userStats?.activeWeek ?? "—",
      icon: Clock,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      dot: null,
    },
    {
      label: "New This Month",
      value: userStats?.newThisMonth ?? "—",
      icon: UserPlus,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      dot: null,
    },
    {
      label: "MoM Growth",
      value:
        userStats != null
          ? `${userStats.growthPercent >= 0 ? "+" : ""}${userStats.growthPercent}%`
          : "—",
      icon: TrendingUp,
      color:
        (userStats?.growthPercent ?? 0) >= 0 ? "text-emerald-400" : "text-destructive",
      bg:
        (userStats?.growthPercent ?? 0) >= 0 ? "bg-emerald-500/10" : "bg-destructive/10",
      dot: null,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-2xl font-heading font-bold text-foreground mb-0.5 sm:mb-1">
            User Management
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm">
            {pagination.totalUsers} total users
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => { fetchUsers(userSearch, currentPage); fetchUserStats(); }}
          className="text-primary hover:bg-primary/10 h-8 sm:h-9 px-2 sm:px-3"
          disabled={usersLoading}
        >
          <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${usersLoading ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline ml-2">Refresh</span>
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
        {metricCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 gradient-border hover:bg-card/60 transition-all"
          >
            <div className={`h-7 w-7 sm:h-8 sm:w-8 rounded-lg ${card.bg} flex items-center justify-center mb-2 sm:mb-2.5`}>
              <card.icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${card.color}`} />
            </div>
            <div className="flex items-center gap-1.5">
              {card.pulse && card.dot && (
                <span className={`relative flex h-2 w-2`}>
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${card.dot} opacity-60`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${card.dot}`} />
                </span>
              )}
              <span className={`text-lg sm:text-xl font-heading font-bold ${card.color}`}>
                {card.value}
              </span>
            </div>
            <p className="text-muted-foreground text-[10px] sm:text-xs mt-0.5 leading-tight">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* User Growth Chart */}
      {userStats?.monthlyGrowth && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 gradient-border"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h3 className="font-heading font-bold text-sm sm:text-base text-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              User Growth (Last 12 Months)
            </h3>
            {userStats.newThisMonth > 0 && (
              <Badge className="text-[10px] sm:text-xs bg-primary/20 text-primary border-primary/30">
                +{userStats.newThisMonth} this month
              </Badge>
            )}
          </div>
          <div className="h-40 sm:h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userStats.monthlyGrowth} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="userGrowthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.3)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1, strokeDasharray: "4 4" }} />
                <Area
                  type="monotone"
                  dataKey="newUsers"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#userGrowthGrad)"
                  dot={{ fill: "hsl(var(--primary))", r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: "hsl(var(--primary))", strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          className="pl-9 sm:pl-11 bg-card/50 border-border/50 rounded-xl h-10 sm:h-12 text-sm"
        />
        {userSearch && (
          <button
            onClick={() => setUserSearch("")}
            className="cursor-pointer absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
          className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-destructive/30 bg-destructive/5"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive shrink-0" />
            <p className="text-destructive text-xs sm:text-sm flex-1 line-clamp-2">{usersError}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUsersError(null)}
              className="text-destructive hover:bg-destructive/10 h-7 w-7 p-0"
            >
              <X className="h-3.5 w-3.5" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Loading State */}
      {usersLoading && (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 gap-3 sm:gap-4">
          <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-spin" />
          <p className="text-muted-foreground text-xs sm:text-sm">Loading users...</p>
        </div>
      )}

      {/* Empty State */}
      {!usersLoading && !usersError && users.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12 sm:py-16 gap-3 sm:gap-4"
        >
          <Users className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50" />
          <p className="text-muted-foreground text-base sm:text-lg font-heading">No users found</p>
          <p className="text-muted-foreground/70 text-xs sm:text-sm">
            {userSearch ? "Try adjusting your search query" : "No users have signed up yet"}
          </p>
        </motion.div>
      )}

      {/* Users List */}
      {!usersLoading && users.length > 0 && (
        <div className="space-y-2 sm:space-y-3">
          {users.map((user, index) => {
            const status = getActiveStatus(user.lastSeen);
            const statusCfg = STATUS_CONFIG[status];
            return (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-xl sm:rounded-2xl p-3 sm:p-5 gradient-border hover:bg-card/60 transition-all group"
              >
                {/* Mobile Layout */}
                <div className="sm:hidden">
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <Avatar className="h-10 w-10 border-2 border-primary/30 ring-2 ring-primary/10">
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-heading text-xs font-bold">
                          {getInitials(user.username)}
                        </AvatarFallback>
                      </Avatar>
                      <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ${statusCfg.color} border-2 border-background ${status === "online" ? "animate-pulse" : ""}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h3 className="font-heading font-semibold text-sm text-foreground truncate">{user.username}</h3>
                        {user.isUserAdmin && (
                          <Badge className="text-[9px] bg-amber-500/20 text-amber-400 border-amber-500/30 px-1 py-0">
                            <ShieldCheck className="h-2.5 w-2.5 mr-0.5" />
                            Admin
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                        <span>{user.niche || "Other"}</span>
                        <span>·</span>
                        <span>{formatJoinDate(user.createdAt)}</span>
                        <span>·</span>
                        <span className={statusCfg.text}>{statusCfg.label}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/10">
                    <div className="flex gap-4 text-center">
                      <div>
                        <div className="text-foreground font-heading font-bold text-sm">
                          {user.platformStats?.reduce((sum, ps) => sum + (ps.numberOfFollowers || 0), 0).toLocaleString() || 0}
                        </div>
                        <div className="text-muted-foreground text-[9px]">Followers</div>
                      </div>
                      <div>
                        <div className="text-foreground font-heading font-bold text-sm">{user.platformStats?.length || 0}</div>
                        <div className="text-muted-foreground text-[9px]">Platforms</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 h-8 w-8 p-0" onClick={() => { setViewUser(user); setViewDialogOpen(true); }}>
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-amber-400 hover:bg-amber-500/10 h-8 w-8 p-0" onClick={() => handleToggleAdmin(user)} disabled={toggleAdminLoading === user._id}>
                        {toggleAdminLoading === user._id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : user.isUserAdmin ? <ShieldOff className="h-3.5 w-3.5" /> : <ShieldCheck className="h-3.5 w-3.5" />}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 h-8 w-8 p-0" onClick={() => { setUserToDelete(user); setDeleteDialogOpen(true); }}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:block">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="relative shrink-0">
                      <Avatar className="h-12 w-12 border-2 border-primary/30 ring-2 ring-primary/10">
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-heading text-sm font-bold">
                          {getInitials(user.username)}
                        </AvatarFallback>
                      </Avatar>
                      <span className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full ${statusCfg.color} border-2 border-background ${status === "online" ? "animate-pulse" : ""}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-heading font-semibold text-foreground truncate">{user.username}</h3>
                        {user.isUserAdmin && (
                          <Badge className="text-xs bg-amber-500/20 text-amber-400 border-amber-500/30">
                            <ShieldCheck className="h-3 w-3 mr-1" />
                            Admin
                          </Badge>
                        )}
                        <Badge className={`text-[10px] border px-1.5 py-0 ${statusCfg.text} bg-transparent border-current/30`}>
                          <span className={`inline-block h-1.5 w-1.5 rounded-full ${statusCfg.color} mr-1 ${status === "online" ? "animate-pulse" : ""}`} />
                          {statusCfg.label}
                        </Badge>
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
                        <div className="text-foreground font-heading font-bold text-lg">
                          {user.platformStats?.reduce((sum, ps) => sum + (ps.numberOfFollowers || 0), 0).toLocaleString() || 0}
                        </div>
                        <div className="text-muted-foreground text-xs">Followers</div>
                      </div>
                      <div>
                        <div className="text-foreground font-heading font-bold text-lg">{user.platformStats?.length || 0}</div>
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
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {!usersLoading && pagination.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 sm:pt-4">
          <p className="text-muted-foreground text-xs sm:text-sm order-2 sm:order-1">
            Page {pagination.currentPage} of {pagination.totalPages} · {pagination.totalUsers} users
          </p>
          <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={!pagination.hasPrevPage}
              className="text-primary hover:bg-primary/10 h-8 sm:h-9 px-2 sm:px-3"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline ml-1">Previous</span>
            </Button>
            <div className="flex items-center gap-0.5 sm:gap-1">
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
                    className={`h-8 w-8 sm:h-9 sm:w-9 p-0 text-xs sm:text-sm ${pageNum === currentPage ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-primary/10"}`}
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
              className="text-primary hover:bg-primary/10 h-8 sm:h-9 px-2 sm:px-3"
            >
              <span className="hidden sm:inline mr-1">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="glass border-border/50 mx-4 max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading text-foreground text-base sm:text-lg">Delete User</AlertDialogTitle>
            <AlertDialogDescription className="text-xs sm:text-sm">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">{userToDelete?.username}</span>?
              This action cannot be undone and will permanently remove this user from the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel disabled={deleteLoading} className="h-9 text-sm">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              disabled={deleteLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 text-sm"
            >
              {deleteLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* View User Detail Dialog */}
      <AlertDialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <AlertDialogContent className="glass border-border/50 mx-4 max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading text-foreground flex items-center gap-2 sm:gap-3 text-base sm:text-lg">
              <div className="relative">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-primary/30">
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-heading text-xs sm:text-sm font-bold">
                    {getInitials(viewUser?.username)}
                  </AvatarFallback>
                </Avatar>
                {viewUser && (
                  <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ${STATUS_CONFIG[getActiveStatus(viewUser.lastSeen)].color} border-2 border-background`} />
                )}
              </div>
              <span className="truncate">{viewUser?.username}</span>
              {viewUser?.isUserAdmin && (
                <Badge className="text-[10px] sm:text-xs bg-amber-500/20 text-amber-400 border-amber-500/30 shrink-0">Admin</Badge>
              )}
              {viewUser && (
                <Badge className={`text-[10px] sm:text-xs shrink-0 ${STATUS_CONFIG[getActiveStatus(viewUser.lastSeen)].text} bg-transparent border-current/30`}>
                  {STATUS_CONFIG[getActiveStatus(viewUser.lastSeen)].label}
                </Badge>
              )}
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3 sm:space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div className="bg-secondary/30 rounded-lg sm:rounded-xl p-2.5 sm:p-3">
                    <div className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider mb-0.5 sm:mb-1">Email</div>
                    <div className="text-foreground text-xs sm:text-sm font-medium truncate">{viewUser?.email}</div>
                  </div>
                  <div className="bg-secondary/30 rounded-lg sm:rounded-xl p-2.5 sm:p-3">
                    <div className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider mb-0.5 sm:mb-1">Niche</div>
                    <div className="text-foreground text-xs sm:text-sm font-medium">{viewUser?.niche || "Other"}</div>
                  </div>
                  <div className="bg-secondary/30 rounded-lg sm:rounded-xl p-2.5 sm:p-3">
                    <div className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider mb-0.5 sm:mb-1">Followers</div>
                    <div className="text-foreground text-xs sm:text-sm font-medium">
                      {viewUser?.platformStats?.reduce((sum, ps) => sum + (ps.numberOfFollowers || 0), 0).toLocaleString() || 0}
                    </div>
                  </div>
                  <div className="bg-secondary/30 rounded-lg sm:rounded-xl p-2.5 sm:p-3">
                    <div className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider mb-0.5 sm:mb-1">Joined</div>
                    <div className="text-foreground text-xs sm:text-sm font-medium">{formatJoinDate(viewUser?.createdAt)}</div>
                  </div>
                  <div className="bg-secondary/30 rounded-lg sm:rounded-xl p-2.5 sm:p-3 col-span-2">
                    <div className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider mb-0.5 sm:mb-1">Last Seen</div>
                    <div className="text-foreground text-xs sm:text-sm font-medium">
                      {viewUser?.lastSeen
                        ? new Date(viewUser.lastSeen).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
                        : "Never"}
                    </div>
                  </div>
                </div>
                {viewUser?.platformStats?.length > 0 && (
                  <div className="space-y-2 sm:space-y-3">
                    <div className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-wider">Platform Stats</div>
                    {viewUser.platformStats.map((ps) => (
                      <div key={ps.platform} className="bg-secondary/20 rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-border/20">
                        <Badge className="text-[10px] sm:text-xs bg-primary/20 text-primary border-primary/30 mb-2">{ps.platform}</Badge>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                          <div>
                            <div className="text-foreground text-xs sm:text-sm font-bold">{ps.numberOfFollowers?.toLocaleString() || 0}</div>
                            <div className="text-muted-foreground text-[9px] sm:text-[10px] uppercase">Followers</div>
                          </div>
                          <div>
                            <div className="text-foreground text-xs sm:text-sm font-bold">{ps.avgLikes?.toLocaleString() || 0}</div>
                            <div className="text-muted-foreground text-[9px] sm:text-[10px] uppercase">Avg Likes</div>
                          </div>
                          <div>
                            <div className="text-foreground text-xs sm:text-sm font-bold">{ps.avgComments?.toLocaleString() || 0}</div>
                            <div className="text-muted-foreground text-[9px] sm:text-[10px] uppercase">Comments</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-9 text-sm">Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminUsers;
