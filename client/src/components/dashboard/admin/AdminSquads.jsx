"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Shield,
  TrendingUp,
  Loader2,
  AlertTriangle,
  RefreshCw,
  X,
  Eye,
  Trash2,
  UserMinus,
  Ban,
  Unlock,
  Activity,
  FileText,
  ChevronLeft,
  ChevronRight,
  Crown,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

const AdminSquads = ({
  adminSquads,
  squadsLoading,
  squadsError,
  squadSearch,
  setSquadSearch,
  onRefresh,
  onViewSquadDetails,
  onDeleteSquad,
  onRemoveMember,
  onSetMemberBlock,
  onTransferOwnership,
  squadsPagination,
  squadCurrentPage,
  setSquadCurrentPage,
  squadStatusFilter,
  setSquadStatusFilter,
  squadPlanFilter,
  setSquadPlanFilter,
  squadNicheFilter,
  setSquadNicheFilter,
  selectedSquadId,
  squadDetailQuery,
  selectedSquad,
  squadDetailsOpen,
  setSquadDetailsOpen,
  squadDetailsLoading,
  squadActionLoading,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [squadToDelete, setSquadToDelete] = useState(null);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const isLoadingAction = (key) => squadActionLoading === key;
  const memberPagination = selectedSquad?.memberPagination || {};
  const blockedPagination = selectedSquad?.blockedPagination || {};
  const auditLogsPagination = selectedSquad?.auditLogsPagination || {};
  const selectedSquadData = selectedSquad?.squad || null;

  const openDetailsWithQuery = (updates = {}) => {
    if (!selectedSquadId) return;
    onViewSquadDetails(selectedSquadId, updates);
  };

  const maxPageButtons = 5;
  const getPageNumbers = (current, total) => {
    if (!total || total <= maxPageButtons) {
      return Array.from({ length: total || 0 }, (_, i) => i + 1);
    }
    if (current <= 3) return [1, 2, 3, 4, 5];
    if (current >= total - 2) return [total - 4, total - 3, total - 2, total - 1, total];
    return [current - 2, current - 1, current, current + 1, current + 2];
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-2xl font-heading font-bold text-foreground mb-0.5 sm:mb-1">Squads Overview</h2>
          <p className="text-muted-foreground text-xs sm:text-sm">Monitor community growth and performance</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          className="text-primary hover:bg-primary/10 h-8 sm:h-9 px-2 sm:px-3"
          disabled={squadsLoading}
        >
          <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${squadsLoading ? "animate-spin" : ""}`} />
          <span className="hidden sm:inline ml-2">Refresh</span>
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search squads..." 
          value={squadSearch}
          onChange={(e) => setSquadSearch(e.target.value)}
          className="pl-9 sm:pl-11 bg-card/50 border-border/50 rounded-xl h-10 sm:h-12 text-sm"
        />
        {squadSearch && (
          <button
            onClick={() => setSquadSearch("")}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
        <select
          value={squadStatusFilter}
          onChange={(e) => setSquadStatusFilter(e.target.value)}
          className="h-10 rounded-xl bg-card/50 border border-border/50 px-3 text-sm"
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Full">Full</option>
        </select>
        <select
          value={squadPlanFilter}
          onChange={(e) => setSquadPlanFilter(e.target.value)}
          className="h-10 rounded-xl bg-card/50 border border-border/50 px-3 text-sm"
        >
          <option value="all">All Plans</option>
          <option value="Growth">Growth</option>
          <option value="Pro">Pro</option>
          <option value="Momentum">Momentum</option>
        </select>
        <select
          value={squadNicheFilter}
          onChange={(e) => setSquadNicheFilter(e.target.value)}
          className="h-10 rounded-xl bg-card/50 border border-border/50 px-3 text-sm"
        >
          <option value="all">All Niches</option>
          <option value="Technology">Technology</option>
          <option value="Gaming">Gaming</option>
          <option value="Education">Education</option>
          <option value="Business & Finance">Business & Finance</option>
          <option value="Health & Fitness">Health & Fitness</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {squadsError && (
        <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-destructive/30 bg-destructive/5">
          <div className="flex items-center gap-2 sm:gap-3">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-destructive shrink-0" />
            <p className="text-destructive text-xs sm:text-sm flex-1 line-clamp-2">{squadsError}</p>
          </div>
        </div>
      )}

      {squadsLoading ? (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 gap-3 sm:gap-4">
          <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-spin" />
          <p className="text-muted-foreground text-xs sm:text-sm">Loading squads...</p>
        </div>
      ) : adminSquads.length === 0 ? (
        <div className="text-center py-12 sm:py-16">
          <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50 mx-auto mb-3 sm:mb-4" />
          <p className="text-muted-foreground text-base sm:text-lg font-heading">No squads found</p>
          <p className="text-muted-foreground/70 text-xs sm:text-sm">
            {squadSearch ? "Try adjusting your search query" : "No squads have been created yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {adminSquads.map((squad, index) => (
          <motion.div 
            key={squad._id} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: index * 0.1 }} 
            className="glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 gradient-border hover:bg-card/60 transition-all group"
          >
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="min-w-0 flex-1">
                <h3 className="font-heading font-bold text-sm sm:text-lg text-foreground mb-0.5 sm:mb-1 group-hover:text-primary transition-colors truncate">{squad.name}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm">{squad.niche}</p>
              </div>
              <Badge className={`text-[10px] sm:text-xs shrink-0 ml-2 ${squad.status === "Active" ? "bg-primary/20 text-primary border-primary/30" : "bg-secondary text-muted-foreground"}`}>
                {squad.status}
              </Badge>
            </div>

            <div className="mb-3 sm:mb-4">
              <div className="flex justify-between text-xs sm:text-sm mb-1.5 sm:mb-2">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  Capacity
                </span>
                <span className="font-semibold text-foreground">
                  {squad.memberCount}/{squad.maxMembers}
                </span>
              </div>
              <Progress value={(squad.memberCount / squad.maxMembers) * 100} className="h-1.5 sm:h-2 bg-secondary/50 rounded-full" />
            </div>

            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border/20">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                <span className="text-[10px] sm:text-xs font-semibold text-foreground">{squad.plan}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5 text-primary">
                <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                <span className="text-xs sm:text-sm font-bold">{Math.round((squad.memberCount / squad.maxMembers) * 100)}% full</span>
              </div>
            </div>

              <div className="mt-3 sm:mt-4 flex items-center justify-end gap-1.5">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:bg-primary/10"
                  onClick={() => onViewSquadDetails(squad._id, {
                    memberPage: 1,
                    memberSearch: "",
                    memberRole: "all",
                    blockedPage: 1,
                    blockedSearch: "",
                    logsPage: 1,
                  })}
                  disabled={squadDetailsLoading || isLoadingAction(`delete-${squad._id}`)}
                >
                  {squadDetailsLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    setSquadToDelete(squad);
                    setDeleteDialogOpen(true);
                  }}
                  disabled={isLoadingAction(`delete-${squad._id}`)}
                >
                  {isLoadingAction(`delete-${squad._id}`) ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
          </motion.div>
          ))}
        </div>
      )}

      {!squadsLoading && squadsPagination?.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Page {squadsPagination.currentPage} of {squadsPagination.totalPages} · {squadsPagination.totalSquads} squads
          </p>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSquadCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={!squadsPagination.hasPrevPage}
              className="text-primary hover:bg-primary/10 h-8 sm:h-9 px-2 sm:px-3"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {getPageNumbers(squadCurrentPage, squadsPagination.totalPages).map((page) => (
              <Button
                key={page}
                size="sm"
                variant={page === squadCurrentPage ? "default" : "ghost"}
                onClick={() => setSquadCurrentPage(page)}
                className="h-8 w-8 sm:h-9 sm:w-9 p-0 text-xs"
              >
                {page}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSquadCurrentPage((prev) => Math.min(squadsPagination.totalPages, prev + 1))}
              disabled={!squadsPagination.hasNextPage}
              className="text-primary hover:bg-primary/10 h-8 sm:h-9 px-2 sm:px-3"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <Dialog open={squadDetailsOpen} onOpenChange={setSquadDetailsOpen}>
        <DialogContent className="max-w-4xl glass border-border/50 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-foreground flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              {selectedSquad?.squad?.name || "Squad Details"}
            </DialogTitle>
            <DialogDescription>
              Full squad controls: performance, member engagement, block/unblock, remove members.
            </DialogDescription>
          </DialogHeader>

          {!selectedSquad ? (
            <div className="py-10 text-center text-muted-foreground text-sm">No squad selected.</div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-secondary/30 rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">Members</div>
                  <div className="text-lg font-heading font-bold text-foreground">
                    {selectedSquad.metrics?.totalMembers || 0}
                  </div>
                </div>
                <div className="bg-secondary/30 rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">Total Posts</div>
                  <div className="text-lg font-heading font-bold text-foreground">
                    {selectedSquad.metrics?.totalPosts || 0}
                  </div>
                </div>
                <div className="bg-secondary/30 rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">Avg Engagement</div>
                  <div className="text-lg font-heading font-bold text-foreground">
                    {selectedSquad.squad?.avgEngagement || 0}%
                  </div>
                </div>
                <div className="bg-secondary/30 rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">Blocked Users</div>
                  <div className="text-lg font-heading font-bold text-foreground">
                    {selectedSquad.metrics?.blockedUsersCount || 0}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Activity className="h-4 w-4 text-primary" />
                Squad engagement rate:{" "}
                <span className="text-foreground font-semibold">
                  {selectedSquad.metrics?.squadEngagementRate || 0}%
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h4 className="font-heading text-foreground font-semibold">Members Performance</h4>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search member..."
                      value={squadDetailQuery.memberSearch}
                      onChange={(e) =>
                        openDetailsWithQuery({ memberSearch: e.target.value, memberPage: 1 })
                      }
                      className="h-9 text-xs sm:text-sm"
                    />
                    <select
                      value={squadDetailQuery.memberRole}
                      onChange={(e) => openDetailsWithQuery({ memberRole: e.target.value, memberPage: 1 })}
                      className="h-9 rounded-lg bg-card/50 border border-border/50 px-2 text-xs sm:text-sm"
                    >
                      <option value="all">All</option>
                      <option value="admin">Admins</option>
                      <option value="member">Members</option>
                    </select>
                  </div>
                </div>
                {selectedSquad.members?.length ? (
                  selectedSquad.members.map((member) => (
                    <div
                      key={member._id}
                      className="bg-secondary/20 border border-border/30 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {member.user?.username || "Unknown user"}
                          </p>
                          <Badge className="text-[10px] bg-primary/20 text-primary border-primary/30">
                            {member.role}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{member.user?.email}</p>
                        <div className="text-[11px] text-muted-foreground mt-1">
                          Joined: {formatDate(member.joinedAt)} · Member engagement: {member.engagementPercentage || 0}% ·
                          Post engagement: {member.engagedPosts || 0}/{member.totalPosts || 0} ({member.engagementRate || 0}%)
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:bg-primary/10"
                          onClick={() => onTransferOwnership(selectedSquad.squad._id, member.user?._id)}
                          disabled={!member.user?._id || isLoadingAction(`transfer-${member.user?._id}`)}
                        >
                          {isLoadingAction(`transfer-${member.user?._id}`) ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Crown className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => onRemoveMember(selectedSquad.squad._id, member.user?._id)}
                          disabled={!member.user?._id || isLoadingAction(`remove-${member.user?._id}`)}
                        >
                          {isLoadingAction(`remove-${member.user?._id}`) ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <UserMinus className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-amber-400 hover:bg-amber-500/10"
                          onClick={() => onSetMemberBlock(selectedSquad.squad._id, member.user?._id, true)}
                          disabled={!member.user?._id || isLoadingAction(`block-${member.user?._id}`)}
                        >
                          {isLoadingAction(`block-${member.user?._id}`) ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Ban className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground py-6 text-center border border-border/20 rounded-xl">
                    No active members in this squad.
                  </div>
                )}
                {memberPagination.totalPages > 1 && (
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-xs text-muted-foreground">
                      Page {memberPagination.currentPage} of {memberPagination.totalPages}
                    </p>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        disabled={!memberPagination.hasPrevPage}
                        onClick={() =>
                          openDetailsWithQuery({ memberPage: Math.max(1, memberPagination.currentPage - 1) })
                        }
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        disabled={!memberPagination.hasNextPage}
                        onClick={() =>
                          openDetailsWithQuery({ memberPage: memberPagination.currentPage + 1 })
                        }
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-heading text-foreground font-semibold">Blocked Users</h4>
                  <Input
                    placeholder="Search blocked user..."
                    value={squadDetailQuery.blockedSearch}
                    onChange={(e) =>
                      openDetailsWithQuery({ blockedSearch: e.target.value, blockedPage: 1 })
                    }
                    className="h-9 max-w-56 text-xs sm:text-sm"
                  />
                </div>
                {selectedSquad.blockedUsers?.length ? (
                  selectedSquad.blockedUsers.map((user) => (
                    <div
                      key={user._id}
                      className="bg-secondary/20 border border-border/30 rounded-xl p-3 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{user.username}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:bg-primary/10"
                        onClick={() => onSetMemberBlock(selectedSquad.squad._id, user._id, false)}
                        disabled={isLoadingAction(`unblock-${user._id}`)}
                      >
                        {isLoadingAction(`unblock-${user._id}`) ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Unlock className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground py-6 text-center border border-border/20 rounded-xl">
                    No blocked users.
                  </div>
                )}
                {blockedPagination.totalPages > 1 && (
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-xs text-muted-foreground">
                      Page {blockedPagination.currentPage} of {blockedPagination.totalPages}
                    </p>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        disabled={!blockedPagination.hasPrevPage}
                        onClick={() =>
                          openDetailsWithQuery({ blockedPage: Math.max(1, blockedPagination.currentPage - 1) })
                        }
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        disabled={!blockedPagination.hasNextPage}
                        onClick={() =>
                          openDetailsWithQuery({ blockedPage: blockedPagination.currentPage + 1 })
                        }
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h4 className="font-heading text-foreground font-semibold flex items-center gap-2">
                  <History className="h-4 w-4 text-primary" />
                  Admin Action Logs
                </h4>
                {selectedSquad.auditLogs?.length ? (
                  <div className="space-y-2">
                    {selectedSquad.auditLogs.map((log) => (
                      <div
                        key={log._id}
                        className="bg-secondary/20 border border-border/30 rounded-xl p-3"
                      >
                        <p className="text-sm text-foreground font-semibold">{log.action.replaceAll("_", " ")}</p>
                        <p className="text-xs text-muted-foreground">
                          By {log.admin?.username || "Admin"} · {formatDate(log.createdAt)}
                        </p>
                        {log.targetUser?.username && (
                          <p className="text-xs text-muted-foreground">
                            Target: {log.targetUser.username}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground py-6 text-center border border-border/20 rounded-xl">
                    No audit entries yet.
                  </div>
                )}
                {auditLogsPagination.totalPages > 1 && (
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-xs text-muted-foreground">
                      Page {auditLogsPagination.currentPage} of {auditLogsPagination.totalPages}
                    </p>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        disabled={!auditLogsPagination.hasPrevPage}
                        onClick={() =>
                          openDetailsWithQuery({ logsPage: Math.max(1, auditLogsPagination.currentPage - 1) })
                        }
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        disabled={!auditLogsPagination.hasNextPage}
                        onClick={() =>
                          openDetailsWithQuery({ logsPage: auditLogsPagination.currentPage + 1 })
                        }
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-destructive/5 border border-destructive/25 rounded-xl p-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <FileText className="h-4 w-4 text-destructive" />
                    Delete Squad
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Permanently removes this squad and all related posts, engagements, and memberships.
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setSquadToDelete(selectedSquadData);
                    setDeleteDialogOpen(true);
                  }}
                  disabled={isLoadingAction(`delete-${selectedSquadData?._id}`)}
                >
                  {isLoadingAction(`delete-${selectedSquadData?._id}`) ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="glass border-border/50">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Squad</AlertDialogTitle>
            <AlertDialogDescription>
              Delete <span className="font-semibold text-foreground">{squadToDelete?.name}</span>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoadingAction(`delete-${squadToDelete?._id}`)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isLoadingAction(`delete-${squadToDelete?._id}`)}
              onClick={() => {
                if (!squadToDelete?._id) return;
                onDeleteSquad(squadToDelete._id);
                setDeleteDialogOpen(false);
              }}
            >
              {isLoadingAction(`delete-${squadToDelete?._id}`) ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminSquads;
