"use client";

import {
  AlertTriangle,
  Bug,
  CheckCircle2,
  Filter,
  Inbox,
  Lightbulb,
  Loader2,
  Mail,
  MessageCircleWarning,
  PencilRuler,
  RefreshCw,
  Search,
  Timer,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusOptions = [
  { key: "pending", label: "Pending" },
  { key: "all", label: "All" },
  { key: "resolved", label: "Resolved" },
  { key: "implemented", label: "Implemented" },
];

const typeOptions = [
  { key: "all", label: "All" },
  { key: "bug", label: "Bug" },
  { key: "feature", label: "Feature" },
];

const statusLabel = {
  pending: "Pending",
  resolved: "Resolved",
  implemented: "Implemented",
};

const statusClass = {
  pending: "bg-amber-500/15 text-amber-500 border-amber-500/25",
  resolved: "bg-emerald-500/15 text-emerald-500 border-emerald-500/25",
  implemented: "bg-primary/15 text-primary border-primary/25",
};

const typeClass = {
  bug: "bg-rose-500/10 text-rose-500 border-rose-500/25",
  feature: "bg-violet-500/10 text-violet-500 border-violet-500/25",
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function AdminFeedback({
  feedbackItems,
  loading,
  error,
  setError,
  stats,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  pagination,
  setCurrentPage,
  onRefresh,
  onUpdateStatus,
  actionLoadingId,
}) {
  const totalItems = pagination?.totalItems || 0;
  const perPage = pagination?.limit || 10;
  const currentPage = pagination?.currentPage || 1;
  const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const rangeEnd = totalItems === 0 ? 0 : Math.min(currentPage * perPage, totalItems);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-2xl font-heading font-bold text-foreground">Feedback Hub</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Bug reports and feature requests from users</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRefresh}
          disabled={loading}
          className="text-primary hover:bg-primary/10"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-border/50 bg-card/40 p-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Pending</div>
          <div className="text-2xl font-heading font-bold mt-1">{stats.pendingCount || 0}</div>
        </div>
        <div className="rounded-xl border border-border/50 bg-card/40 p-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Bugs</div>
          <div className="text-2xl font-heading font-bold mt-1">{stats.bugCount || 0}</div>
        </div>
        <div className="rounded-xl border border-border/50 bg-card/40 p-4">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Features</div>
          <div className="text-2xl font-heading font-bold mt-1">{stats.featureCount || 0}</div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/40 p-3 sm:p-4">
        <div className="overflow-x-auto">
          <div className="flex w-full min-w-[760px] items-center gap-2.5">
            <div className="relative flex-1 min-w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => {
                  setCurrentPage(1);
                  setSearch(e.target.value);
                }}
                placeholder="Search by title or description..."
                className="h-10 pl-9 rounded-xl bg-background/70 border-border/60"
              />
            </div>

            <div className="flex items-center gap-1.5 rounded-xl border border-border/50 bg-background/70 px-2 py-1.5">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground hidden sm:inline">Status</span>
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setCurrentPage(1);
                  setStatusFilter(value);
                }}
              >
                <SelectTrigger className="h-8 w-[130px] rounded-lg border-border/50 bg-transparent text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((item) => (
                    <SelectItem key={item.key} value={item.key}>{item.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-1.5 rounded-xl border border-border/50 bg-background/70 px-2 py-1.5">
              <MessageCircleWarning className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground hidden sm:inline">Type</span>
              <Select
                value={typeFilter}
                onValueChange={(value) => {
                  setCurrentPage(1);
                  setTypeFilter(value);
                }}
              >
                <SelectTrigger className="h-8 w-[120px] rounded-lg border-border/50 bg-transparent text-xs">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((item) => (
                    <SelectItem key={item.key} value={item.key}>{item.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="ml-auto text-xs text-muted-foreground whitespace-nowrap px-2">
              Showing {rangeStart}-{rangeEnd} of {totalItems}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
          <p className="text-sm text-destructive flex-1">{error}</p>
          <Button variant="ghost" size="sm" onClick={() => setError(null)}>
            Clear
          </Button>
        </div>
      )}

      {loading ? (
        <div className="py-16 flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading feedback...</p>
        </div>
      ) : feedbackItems.length === 0 ? (
        <div className="py-16 flex flex-col items-center gap-3">
          <Inbox className="h-10 w-10 text-muted-foreground/60" />
          <p className="text-lg font-heading font-semibold">No feedback found</p>
          <p className="text-sm text-muted-foreground">Try changing filters or search terms.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border/50 bg-card/35 overflow-hidden">
          <Table className="min-w-[980px]">
            <TableHeader className="bg-secondary/40">
              <TableRow className="hover:bg-secondary/40">
                <TableHead className="w-[70px]">#</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Title & Summary</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedbackItems.map((item, index) => {
                const rowNumber = (currentPage - 1) * perPage + index + 1;
                const isActionLoading = actionLoadingId === item._id;
                return (
                  <TableRow key={item._id} className="hover:bg-primary/[0.03]">
                    <TableCell className="text-muted-foreground font-medium">{rowNumber}</TableCell>
                    <TableCell>
                      <Badge className={typeClass[item.type]}>
                        {item.type === "bug" ? <Bug className="h-3 w-3 mr-1" /> : <Lightbulb className="h-3 w-3 mr-1" />}
                        {item.type === "bug" ? "Bug" : "Feature"}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[380px]">
                      <div className="font-semibold text-foreground truncate">{item.title}</div>
                      <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm truncate max-w-[210px]">{item.reportedBy?.email || "Unknown user"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatDate(item.createdAt)}</TableCell>
                    <TableCell>
                      <Badge className={statusClass[item.status]}>
                        <Timer className="h-3 w-3 mr-1" />
                        {statusLabel[item.status] || item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-2">
                        {item.type === "bug" && item.status !== "resolved" && (
                          <Button
                            size="sm"
                            onClick={() => onUpdateStatus(item._id, "resolved")}
                            disabled={isActionLoading}
                            className="h-8"
                          >
                            {isActionLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
                            Resolve
                          </Button>
                        )}
                        {item.type === "feature" && item.status !== "implemented" && (
                          <Button
                            size="sm"
                            onClick={() => onUpdateStatus(item._id, "implemented")}
                            disabled={isActionLoading}
                            className="h-8"
                          >
                            {isActionLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <PencilRuler className="h-4 w-4 mr-2" />}
                            Implement
                          </Button>
                        )}
                        {item.status !== "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onUpdateStatus(item._id, "pending")}
                            disabled={isActionLoading}
                            className="h-8"
                          >
                            Back To Pending
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {!loading && pagination.totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/40 bg-card/25 px-4 py-3">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Page {pagination.currentPage} of {pagination.totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={!pagination.hasPrevPage}
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(pagination.totalPages, prev + 1))}
              disabled={!pagination.hasNextPage}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

