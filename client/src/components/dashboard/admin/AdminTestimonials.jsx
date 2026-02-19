"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Loader2,
  Star,
  Quote,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const statusStyles = {
  pending: {
    label: "Pending",
    icon: Clock,
    color: "bg-amber-500/20 text-amber-600 border-amber-500/30",
  },
  approved: {
    label: "Approved",
    icon: CheckCircle2,
    color: "bg-primary/20 text-primary border-primary/30",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    color: "bg-destructive/20 text-destructive border-destructive/30",
  },
};

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
  });
  const [actionLoading, setActionLoading] = useState(null); // testimonial id being actioned
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch testimonials
  const fetchTestimonials = useCallback(
    async (searchVal = "", status = "all", page = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          search: searchVal,
          page: page.toString(),
          limit: "10",
        });
        if (status !== "all") params.set("status", status);

        const res = await fetch(
          `${API_BASE}/api/testimonials/admin/all?${params}`,
          { credentials: "include" }
        );
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || "Failed to fetch testimonials");
        setTestimonials(data.testimonials);
        setPagination(data.pagination);
      } catch (err) {
        toast.error(err.message);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Initial fetch
  useEffect(() => {
    fetchTestimonials("", "all", 1);
  }, [fetchTestimonials]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchTestimonials(search, statusFilter, 1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search, statusFilter, fetchTestimonials]);

  // Page change
  useEffect(() => {
    fetchTestimonials(search, statusFilter, currentPage);
  }, [currentPage]);

  // Approve / Reject
  const handleStatusChange = async (id, newStatus) => {
    setActionLoading(id);
    try {
      const res = await fetch(
        `${API_BASE}/api/testimonials/admin/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update status");
      toast.success(data.message);
      fetchTestimonials(search, statusFilter, currentPage);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  // Delete
  const handleDelete = async () => {
    if (!testimonialToDelete) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/api/testimonials/admin/${testimonialToDelete._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete");
      toast.success(data.message);
      setDeleteDialogOpen(false);
      setTestimonialToDelete(null);
      fetchTestimonials(search, statusFilter, currentPage);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleteLoading(false);
    }
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

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2">
          Testimonials
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Review and manage user testimonials. Approved ones appear on the homepage.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-3"
      >
        {[
          {
            label: "Pending",
            count: testimonials.filter((t) => t.status === "pending").length,
            icon: Clock,
            color: "text-amber-600",
            bg: "bg-amber-500/10",
          },
          {
            label: "Approved",
            count: testimonials.filter((t) => t.status === "approved").length,
            icon: CheckCircle2,
            color: "text-primary",
            bg: "bg-primary/10",
          },
          {
            label: "Rejected",
            count: testimonials.filter((t) => t.status === "rejected").length,
            icon: XCircle,
            color: "text-destructive",
            bg: "bg-destructive/10",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="glass rounded-2xl p-4 gradient-border text-center"
          >
            <div
              className={`h-9 w-9 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-2 ${stat.color}`}
            >
              <stat.icon className="h-4 w-4" />
            </div>
            <div className="text-xl font-heading font-bold text-foreground">
              {stat.count}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Search & Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search testimonials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary/30 border-border/40 rounded-xl focus:border-primary/50 h-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] bg-secondary/30 border-border/40 rounded-xl h-10">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-xl border-border/40"
            onClick={() => fetchTestimonials(search, statusFilter, currentPage)}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Testimonials List */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-16">
          <MessageSquare className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="text-muted-foreground">No testimonials found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((t, index) => {
            const status = statusStyles[t.status] || statusStyles.pending;
            const StatusIcon = status.icon;
            const isActioning = actionLoading === t._id;

            return (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-2xl p-5 sm:p-6 gradient-border"
              >
                {/* Top: User info + status */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-border/30 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary font-heading">
                        {getInitials(t.name)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-heading font-semibold text-foreground text-sm truncate">
                        {t.name}
                        {t.handle && (
                          <span className="text-muted-foreground font-normal ml-1.5">
                            {t.handle}
                          </span>
                        )}
                      </p>
                      <p className="text-muted-foreground text-xs truncate">
                        {t.niche}
                        {t.user && ` · ${t.user.email}`}
                      </p>
                    </div>
                  </div>
                  <Badge className={`${status.color} gap-1 shrink-0`}>
                    <StatusIcon className="h-3 w-3" />
                    {status.label}
                  </Badge>
                </div>

                {/* Quote */}
                <div className="mb-4 pl-1">
                  <Quote className="h-5 w-5 text-primary/20 mb-2" />
                  <p className="text-foreground/80 text-sm leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Rating + metric */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  {t.metric && (
                    <span className="text-xs font-heading font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                      {t.metric}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-border/20">
                  {t.status !== "approved" && (
                    <Button
                      size="sm"
                      disabled={isActioning}
                      onClick={() => handleStatusChange(t._id, "approved")}
                      className="bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-xs h-8"
                    >
                      {isActioning ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <>
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Approve
                        </>
                      )}
                    </Button>
                  )}
                  {t.status !== "rejected" && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isActioning}
                      onClick={() => handleStatusChange(t._id, "rejected")}
                      className="border-destructive/30 text-destructive hover:bg-destructive/10 rounded-lg text-xs h-8"
                    >
                      {isActioning ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <>
                          <XCircle className="h-3 w-3 mr-1" />
                          Reject
                        </>
                      )}
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={isActioning}
                    onClick={() => {
                      setTestimonialToDelete(t);
                      setDeleteDialogOpen(true);
                    }}
                    className="text-muted-foreground hover:text-destructive rounded-lg text-xs h-8 ml-auto"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            Page {pagination.currentPage} of {pagination.totalPages} ·{" "}
            {pagination.total} total
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="h-8 rounded-lg"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= pagination.totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="h-8 rounded-lg"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Delete Testimonial?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the testimonial from{" "}
              <strong>{testimonialToDelete?.name}</strong>. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminTestimonials;

