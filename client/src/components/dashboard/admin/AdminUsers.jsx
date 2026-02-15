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

const AdminUsers = ({
  pagination,
  fetchUsers,
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
  setViewUser
}) => {
  return (
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
                    <div className="text-foreground font-heading font-bold text-lg">{user.platformStats?.reduce((sum, ps) => sum + (ps.numberOfFollowers || 0), 0).toLocaleString() || 0}</div>
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
                    <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Total Followers</div>
                    <div className="text-foreground text-sm font-medium">{viewUser?.platformStats?.reduce((sum, ps) => sum + (ps.numberOfFollowers || 0), 0).toLocaleString() || 0}</div>
                  </div>
                  <div className="bg-secondary/30 rounded-xl p-3">
                    <div className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Joined</div>
                    <div className="text-foreground text-sm font-medium">{formatJoinDate(viewUser?.createdAt)}</div>
                  </div>
                </div>
                {viewUser?.platformStats?.length > 0 && (
                  <div className="space-y-3">
                    <div className="text-muted-foreground text-xs uppercase tracking-wider">Platform Stats</div>
                    {viewUser.platformStats.map((ps) => (
                      <div key={ps.platform} className="bg-secondary/20 rounded-xl p-3 border border-border/20">
                        <Badge className="text-xs bg-primary/20 text-primary border-primary/30 mb-2">{ps.platform}</Badge>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div>
                            <div className="text-foreground text-sm font-bold">{ps.numberOfFollowers?.toLocaleString() || 0}</div>
                            <div className="text-muted-foreground text-[10px] uppercase">Followers</div>
                          </div>
                          <div>
                            <div className="text-foreground text-sm font-bold">{ps.avgLikes?.toLocaleString() || 0}</div>
                            <div className="text-muted-foreground text-[10px] uppercase">Avg Likes</div>
                          </div>
                          <div>
                            <div className="text-foreground text-sm font-bold">{ps.avgComments?.toLocaleString() || 0}</div>
                            <div className="text-muted-foreground text-[10px] uppercase">Avg Comments</div>
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
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminUsers;
