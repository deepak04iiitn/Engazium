"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Shield,
  Zap,
  Target,
  Award,
  ChevronRight,
  Search,
  Filter,
  Star,
  ArrowRight,
  Eye,
  Loader2,
  TrendingUp,
  CheckCircle2,
  Plus,
  Grid3x3,
  List,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



const niches = [
  "Technology",
  "Health & Fitness",
  "Fashion & Beauty",
  "Food & Cooking",
  "Travel",
  "Business & Finance",
  "Art & Creativity",
  "Photography & Videography",
  "Music",
  "Gaming",
  "Education",
  "Lifestyle",
  "Entertainment",
  "Sports",
  "Other",
];

const ALL_NICHES = [
  "Art & Creativity", "Technology", "Gaming", "Education", "Business & Finance",
  "Health & Fitness", "Lifestyle", "Fashion & Beauty", "Food & Cooking", "Travel",
  "Self Improvement", "Entertainment", "Music", "Photography & Videography",
  "Podcasting", "News & Commentary", "DIY & Crafts", "Sports", "Science",
  "Pets & Animals", "Nature & Environment", "Spirituality", "Parenting & Family",
  "Vlogs", "Automotive", "Real Estate", "Politics", "Non Profit & Social Impact", "Other",
];

const PLANS = [
  { value: "Growth", label: "Growth", desc: "1 post/day", icon: Shield },
  { value: "Pro", label: "Pro", desc: "2 posts/day", icon: Zap },
  { value: "Momentum", label: "Momentum", desc: "3 posts/day", icon: Star },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

const Squads = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiches, setSelectedNiches] = useState([]);
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [memberRangeFilter, setMemberRangeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("members");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [viewMode, setViewMode] = useState("list");
  const [showFilters, setShowFilters] = useState(true);
  const [squads, setSquads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joiningId, setJoiningId] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const router = useRouter();

  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Create Squad State
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createSquadForm, setCreateSquadForm] = useState({
    name: "",
    niche: "",
    plan: "Growth",
    description: "",
  });
  const [createSquadLoading, setCreateSquadLoading] = useState(false);

  const fetchSquads = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      // Pagination
      params.set("page", currentPage.toString());
      params.set("limit", pageSize.toString());
      
      // Search
      if (searchQuery) params.set("search", searchQuery);
      
      // Multi-select filters (comma-separated)
      if (selectedNiches.length > 0) params.set("niches", selectedNiches.join(","));
      if (selectedPlans.length > 0) params.set("plans", selectedPlans.join(","));
      
      // Single-select filters
      if (statusFilter && statusFilter !== "all") params.set("status", statusFilter);
      if (memberRangeFilter && memberRangeFilter !== "all") params.set("memberRange", memberRangeFilter);
      
      // Sorting
      params.set("sortBy", sortBy);
      params.set("sortOrder", sortOrder);

      const res = await fetch(`/api/squads?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setSquads(data.squads);
        setTotalResults(data.pagination.total);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (err) {
      console.error("Failed to fetch squads:", err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, searchQuery, selectedNiches, selectedPlans, statusFilter, memberRangeFilter, sortBy, sortOrder]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchSquads();
    }, 300);
    return () => clearTimeout(debounce);
  }, [fetchSquads]);

  // Reset to page 1 when filters change (but not when page changes)
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedNiches, selectedPlans, statusFilter, memberRangeFilter, sortBy, sortOrder, pageSize]);

  // Helper functions
  const toggleNiche = (niche) => {
    setSelectedNiches((prev) =>
      prev.includes(niche) ? prev.filter((n) => n !== niche) : [...prev, niche]
    );
  };

  const togglePlan = (plan) => {
    setSelectedPlans((prev) =>
      prev.includes(plan) ? prev.filter((p) => p !== plan) : [...prev, plan]
    );
  };

  const clearAllFilters = () => {
    setSelectedNiches([]);
    setSelectedPlans([]);
    setStatusFilter("all");
    setMemberRangeFilter("all");
    setSearchQuery("");
  };

  const activeFilterCount = 
    selectedNiches.length + 
    selectedPlans.length + 
    (statusFilter !== "all" ? 1 : 0) + 
    (memberRangeFilter !== "all" ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const handleJoinSquad = async (squadId) => {
    if (!currentUser) {
      router.push("/sign-in");
      return;
    }
    setJoiningId(squadId);
    try {
      const res = await fetch(`/api/squads/${squadId}/join`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to join squad");
      toast.success("Successfully joined the squad!");
      router.push(`/squads/${squadId}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setJoiningId(null);
    }
  };

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
      setIsCreateDialogOpen(false);
      router.push(`/squads/${data.squad._id}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setCreateSquadLoading(false);
    }
  };

  const openCreateDialog = () => {
    if (!currentUser) {
      router.push("/sign-in");
      return;
    }
    setIsCreateDialogOpen(true);
  };

  const getPlanIcon = (plan) => {
    if (plan === "Momentum") return <Star className="h-3.5 w-3.5 text-primary" />;
    if (plan === "Pro") return <Zap className="h-3.5 w-3.5 text-primary" />;
    return <Shield className="h-3.5 w-3.5 text-muted-foreground" />;
  };

  const getPlanPostLimit = (plan) => {
    const limits = { Growth: 1, Pro: 2, Momentum: 3 };
    return limits[plan] || 1;
  };

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-glow-secondary/5 rounded-full blur-[120px]" />

          <div className="container relative z-10 mx-auto px-6 text-center">
            <motion.div {...fadeUp}>
              <Badge
                variant="outline"
                className="mb-6 border-primary/30 text-primary px-4 py-1.5"
              >
                <Users className="h-3.5 w-3.5 mr-1.5" />
                Engagement-Based Squads
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                Find Your{" "}
                <span className="text-gradient">Perfect Squad</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
                Join a niche-matched squad of real creators. Engage
                authentically, grow together, and boost your reach — no credits,
                just real engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box rounded-xl px-8 font-heading font-semibold"
                  onClick={() =>
                    document
                      .getElementById("browse-squads")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Browse Squads
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                 <Button
                  size="lg"
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-xl px-8 font-heading font-semibold border border-primary/20"
                  onClick={openCreateDialog}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Squad
                </Button>
              </div>
            </motion.div>
          </div>
        </section>



        {/* Browse Squads */}
        <section id="browse-squads" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

          <div className="container relative z-10 mx-auto px-6">
            {/* Header */}
            <motion.div {...fadeUp} className="text-center mb-12">
              <span className="text-primary font-heading text-sm font-semibold uppercase tracking-wider">
                Explore
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-4">
                Browse{" "}
                <span className="text-gradient">Active Squads</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Find open squads in your niche or create your own from the dashboard.
              </p>
            </motion.div>

            {/* Main Content Area */}
            <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
              {/* Filter Sidebar */}
              <motion.div 
                {...fadeUp}
                className={`lg:w-80 flex-shrink-0 transition-all duration-300 ${
                  showFilters ? "block" : "hidden lg:block"
                }`}
              >
                <div className="glass rounded-2xl p-6 gradient-border sticky top-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="h-5 w-5 text-primary" />
                      <h3 className="font-heading font-semibold text-lg">Filters</h3>
                    </div>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={clearAllFilters}
                        className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1"
                      >
                        <X className="h-3 w-3" />
                        Clear All
                      </button>
                    )}
                  </div>

                  {/* Active Filters Count */}
                  {activeFilterCount > 0 && (
                    <div className="mb-4 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg">
                      <p className="text-xs text-primary font-medium">
                        {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} active
                      </p>
                    </div>
                  )}

                  {/* Search */}
                  <div className="mb-6">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                      Search
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search squads..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-secondary/30 border-border/40 rounded-xl h-10"
                      />
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div className="mb-6">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">
                      Status
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: "all", label: "All Squads", icon: LayoutGrid },
                        { value: "recruiting", label: "Recruiting", icon: Users },
                        { value: "active", label: "Active", icon: TrendingUp },
                        { value: "full", label: "Full", icon: CheckCircle2 },
                      ].map((status) => (
                        <button
                          key={status.value}
                          onClick={() => setStatusFilter(status.value)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                            statusFilter === status.value
                              ? "bg-primary/20 text-primary border border-primary/40"
                              : "bg-secondary/20 text-muted-foreground border border-border/30 hover:border-primary/30 hover:bg-secondary/40"
                          }`}
                        >
                          <status.icon className="h-4 w-4" />
                          <span className="text-sm font-medium">{status.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Plan Filter */}
                  <div className="mb-6">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">
                      Plan Type
                    </label>
                    <div className="space-y-2">
                      {PLANS.map((plan) => (
                        <button
                          key={plan.value}
                          onClick={() => togglePlan(plan.value)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                            selectedPlans.includes(plan.value)
                              ? "bg-primary/20 text-primary border border-primary/40"
                              : "bg-secondary/20 text-muted-foreground border border-border/30 hover:border-primary/30 hover:bg-secondary/40"
                          }`}
                        >
                          <plan.icon className="h-4 w-4" />
                          <div className="flex-1 text-left">
                            <span className="text-sm font-medium block">{plan.label}</span>
                            <span className="text-xs text-muted-foreground">{plan.desc}</span>
                          </div>
                          {selectedPlans.includes(plan.value) && (
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Member Range Filter */}
                  <div className="mb-6">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">
                      Member Count
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: "all", label: "All Sizes" },
                        { value: "0-5", label: "0-5 Members" },
                        { value: "5-10", label: "5-10 Members" },
                        { value: "10+", label: "10+ Members" },
                      ].map((range) => (
                        <button
                          key={range.value}
                          onClick={() => setMemberRangeFilter(range.value)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${
                            memberRangeFilter === range.value
                              ? "bg-primary/20 text-primary border border-primary/40"
                              : "bg-secondary/20 text-muted-foreground border border-border/30 hover:border-primary/30 hover:bg-secondary/40"
                          }`}
                        >
                          <span className="text-sm font-medium">{range.label}</span>
                          {memberRangeFilter === range.value && (
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Niche Filter */}
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">
                      Niches ({selectedNiches.length} selected)
                    </label>
                    <div className="max-h-64 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar">
                      {ALL_NICHES.map((niche) => (
                        <button
                          key={niche}
                          onClick={() => toggleNiche(niche)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 text-left ${
                            selectedNiches.includes(niche)
                              ? "bg-primary/20 text-primary border border-primary/40"
                              : "bg-secondary/20 text-muted-foreground border border-transparent hover:border-primary/30 hover:bg-secondary/40"
                          }`}
                        >
                          <span className="text-sm">{niche}</span>
                          {selectedNiches.includes(niche) && (
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                {/* Controls Bar */}
                <motion.div {...fadeUp} className="glass rounded-2xl p-4 gradient-border mb-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Results Info */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden p-2 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-colors"
                      >
                        <SlidersHorizontal className="h-4 w-4 text-primary" />
                      </button>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {totalResults} Squad{totalResults !== 1 ? "s" : ""}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Showing {squads.length} of {totalResults}
                        </p>
                      </div>
                    </div>

                    {/* View & Sort Controls */}
                    <div className="flex items-center gap-3">
                      {/* View Mode Toggle */}
                      <div className="flex items-center gap-1 p-1 bg-secondary/30 rounded-lg">
                        <button
                          onClick={() => setViewMode("grid")}
                          className={`p-2 rounded-md transition-all duration-200 ${
                            viewMode === "grid"
                              ? "bg-primary/20 text-primary"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Grid3x3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setViewMode("list")}
                          className={`p-2 rounded-md transition-all duration-200 ${
                            viewMode === "list"
                              ? "bg-primary/20 text-primary"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <List className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Sort Dropdown */}
                      <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                        const [newSortBy, newSortOrder] = value.split("-");
                        setSortBy(newSortBy);
                        setSortOrder(newSortOrder);
                      }}>
                        <SelectTrigger className="w-[180px] bg-secondary/30 border-border/40 rounded-lg h-9">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="members-desc">Most Members</SelectItem>
                          <SelectItem value="members-asc">Least Members</SelectItem>
                          <SelectItem value="engagement-desc">High Engagement</SelectItem>
                          <SelectItem value="engagement-asc">Low Engagement</SelectItem>
                          <SelectItem value="date-desc">Newest First</SelectItem>
                          <SelectItem value="date-asc">Oldest First</SelectItem>
                          <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                          <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>

                {/* Loading State */}
                {loading && (
                  <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                    <p className="text-muted-foreground text-sm">Loading squads...</p>
                  </div>
                )}

                {/* Squad Grid/List */}
                {!loading && squads.length > 0 && (
                  <div className={viewMode === "grid" 
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" 
                    : "space-y-4"
                  }>
                    {squads.map((squad, index) => (
                      <motion.div
                        key={squad._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`glass rounded-2xl gradient-border group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 ${
                          viewMode === "grid" ? "p-5" : "p-6 flex items-center gap-6"
                        }`}
                        whileHover={{ scale: viewMode === "grid" ? 1.02 : 1.01 }}
                      >
                        {viewMode === "grid" ? (
                          // Grid View
                          <>
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-heading font-semibold text-foreground text-base truncate">
                                  {squad.name}
                                </h3>
                                <p className="text-muted-foreground text-xs mt-1 truncate">
                                  {squad.niche}{squad.platform ? ` · ${squad.platform}` : ""}
                                </p>
                              </div>
                              <Badge
                                variant={squad.status === "Recruiting" ? "default" : "secondary"}
                                className={`ml-2 text-[10px] flex-shrink-0 ${
                                  squad.status === "Recruiting"
                                    ? "bg-primary/20 text-primary border-primary/40"
                                    : "bg-secondary text-muted-foreground"
                                }`}
                              >
                                {squad.status}
                              </Badge>
                            </div>

                            <div className="grid grid-cols-3 gap-3 mb-4">
                              <div className="text-center p-2 bg-secondary/20 rounded-lg">
                                <div className="text-foreground font-heading font-bold text-base">
                                  {squad.memberCount}/{squad.maxMembers}
                                </div>
                                <div className="text-muted-foreground text-[9px] uppercase tracking-wider mt-0.5">
                                  Members
                                </div>
                              </div>
                              <div className="text-center p-2 bg-secondary/20 rounded-lg">
                                <div className="text-foreground font-heading font-bold text-base flex items-center justify-center gap-1">
                                  <TrendingUp className="h-3 w-3 text-primary" />
                                  {squad.avgEngagement || 0}%
                                </div>
                                <div className="text-muted-foreground text-[9px] uppercase tracking-wider mt-0.5">
                                  Engagement
                                </div>
                              </div>
                              <div className="text-center p-2 bg-secondary/20 rounded-lg">
                                <div className="text-foreground font-heading font-bold text-base flex items-center justify-center gap-1">
                                  {getPlanIcon(squad.plan)}
                                  <span className="text-xs">{squad.plan}</span>
                                </div>
                                <div className="text-muted-foreground text-[9px] uppercase tracking-wider mt-0.5">
                                  {getPlanPostLimit(squad.plan)} post/day
                                </div>
                              </div>
                            </div>

                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs text-muted-foreground">Capacity</span>
                                <span className="text-xs font-semibold text-foreground">
                                  {Math.round((squad.memberCount / squad.maxMembers) * 100)}%
                                </span>
                              </div>
                              <div className="w-full h-2 bg-secondary/50 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(squad.memberCount / squad.maxMembers) * 100}%` }}
                                  transition={{ duration: 0.8, delay: index * 0.05 }}
                                  className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full"
                                />
                              </div>
                              <p className="text-muted-foreground text-[10px] mt-1">
                                {squad.maxMembers - squad.memberCount} spot{squad.maxMembers - squad.memberCount !== 1 ? "s" : ""} remaining
                              </p>
                            </div>

                            <Button
                              size="sm"
                              className={`w-full rounded-xl font-heading font-semibold transition-all duration-200 ${
                                squad.status === "Recruiting"
                                  ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
                                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                              }`}
                              disabled={squad.status !== "Recruiting" || joiningId === squad._id}
                              onClick={() => handleJoinSquad(squad._id)}
                            >
                              {joiningId === squad._id ? (
                                <>
                                  <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                                  Joining...
                                </>
                              ) : squad.status === "Recruiting" ? (
                                <>
                                  Join Squad
                                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </>
                              ) : (
                                <span>Squad Full</span>
                              )}
                            </Button>
                          </>
                        ) : (
                          // List View
                          <>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-heading font-semibold text-foreground text-lg truncate">
                                    {squad.name}
                                  </h3>
                                  <p className="text-muted-foreground text-sm mt-1">
                                    {squad.niche}{squad.platform ? ` · ${squad.platform}` : ""}
                                  </p>
                                </div>
                                <Badge
                                  variant={squad.status === "Recruiting" ? "default" : "secondary"}
                                  className={`ml-3 ${
                                    squad.status === "Recruiting"
                                      ? "bg-primary/20 text-primary border-primary/40"
                                      : "bg-secondary text-muted-foreground"
                                  }`}
                                >
                                  {squad.status}
                                </Badge>
                              </div>

                              <div className="flex items-center gap-6 mb-3">
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm font-semibold text-foreground">
                                    {squad.memberCount}/{squad.maxMembers}
                                  </span>
                                  <span className="text-xs text-muted-foreground">members</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4 text-primary" />
                                  <span className="text-sm font-semibold text-foreground">
                                    {squad.avgEngagement || 0}%
                                  </span>
                                  <span className="text-xs text-muted-foreground">engagement</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  {getPlanIcon(squad.plan)}
                                  <span className="text-sm font-semibold text-foreground">
                                    {squad.plan}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    ({getPlanPostLimit(squad.plan)} post/day)
                                  </span>
                                </div>
                              </div>

                              <div className="w-full max-w-md">
                                <div className="w-full h-2 bg-secondary/50 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(squad.memberCount / squad.maxMembers) * 100}%` }}
                                    transition={{ duration: 0.8 }}
                                    className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full"
                                  />
                                </div>
                                <p className="text-muted-foreground text-xs mt-1.5">
                                  {squad.maxMembers - squad.memberCount} spot{squad.maxMembers - squad.memberCount !== 1 ? "s" : ""} remaining
                                </p>
                              </div>
                            </div>

                            <Button
                              size="default"
                              className={`flex-shrink-0 rounded-xl font-heading font-semibold px-8 ${
                                squad.status === "Recruiting"
                                  ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
                                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                              }`}
                              disabled={squad.status !== "Recruiting" || joiningId === squad._id}
                              onClick={() => handleJoinSquad(squad._id)}
                            >
                              {joiningId === squad._id ? (
                                <>
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                  Joining...
                                </>
                              ) : squad.status === "Recruiting" ? (
                                <>
                                  Join Squad
                                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                </>
                              ) : (
                                <span>Squad Full</span>
                              )}
                            </Button>
                          </>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Empty State */}
                {!loading && squads.length === 0 && (
                  <motion.div 
                    {...fadeUp}
                    className="glass rounded-2xl p-12 text-center gradient-border"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <Users className="h-10 w-10 text-primary/50" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                      No squads found
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                      {activeFilterCount > 0
                        ? "Try adjusting your filters to see more results"
                        : "Be the first to create a squad from your dashboard!"}
                    </p>
                    {activeFilterCount > 0 && (
                      <Button
                        onClick={clearAllFilters}
                        variant="outline"
                        className="border-primary/30 text-primary hover:bg-primary/10 rounded-xl"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Clear All Filters
                      </Button>
                    )}
                  </motion.div>
                )}

                {/* Pagination */}
                {!loading && totalPages > 1 && (
                  <motion.div 
                    {...fadeUp}
                    className="glass rounded-2xl p-4 gradient-border mt-6"
                  >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      {/* Page Size Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Show:</span>
                        <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                          <SelectTrigger className="w-[100px] bg-secondary/30 border-border/40 rounded-lg h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="12">12</SelectItem>
                            <SelectItem value="24">24</SelectItem>
                            <SelectItem value="48">48</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-sm text-muted-foreground">per page</span>
                      </div>

                      {/* Page Navigation */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(1)}
                          disabled={currentPage === 1}
                          className="rounded-lg border-border/40"
                        >
                          <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="rounded-lg border-border/40"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        
                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }
                            
                            return (
                              <Button
                                key={pageNum}
                                variant={currentPage === pageNum ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(pageNum)}
                                className={`w-9 h-9 rounded-lg ${
                                  currentPage === pageNum
                                    ? "bg-primary text-primary-foreground"
                                    : "border-border/40"
                                }`}
                              >
                                {pageNum}
                              </Button>
                            );
                          })}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="rounded-lg border-border/40"
                        >
                          <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(totalPages)}
                          disabled={currentPage === totalPages}
                          className="rounded-lg border-border/40"
                        >
                          <ChevronsRight className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Page Info */}
                      <div className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>


      </main>

      {/* Create Squad Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[540px] bg-background border-border/30 max-h-[90vh] overflow-y-auto p-0">
          {/* Header with gradient accent */}
          <div className="relative px-8 pt-8 pb-6 border-b border-border/20">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-primary/20 rounded-t-lg" />
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="font-heading font-bold text-xl text-foreground">
                  Create Your Squad
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm mt-0.5">
                  Lead your own community and grow together.
                </DialogDescription>
              </div>
            </div>
          </div>

          <form onSubmit={handleCreateSquad} className="px-8 py-6 space-y-6">
            {/* Squad Name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Users className="h-3 w-3" />
                Squad Name <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="e.g. Tech Innovators"
                value={createSquadForm.name}
                onChange={(e) => setCreateSquadForm({ ...createSquadForm, name: e.target.value })}
                className="bg-secondary/30 border-border/40 rounded-xl focus:border-primary/50 h-11"
                maxLength={60}
              />
            </div>

            {/* Niche */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Target className="h-3 w-3" />
                Niche <span className="text-destructive">*</span>
              </label>
              <Select 
                value={createSquadForm.niche} 
                onValueChange={(value) => setCreateSquadForm({ ...createSquadForm, niche: value })}
              >
                <SelectTrigger className="bg-secondary/30 border-border/40 rounded-xl focus:border-primary/50 h-11">
                  <SelectValue placeholder="Select your niche" />
                </SelectTrigger>
                <SelectContent>
                  {ALL_NICHES.map((n) => (
                    <SelectItem key={n} value={n}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Plan Selection — visual cards */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="h-3 w-3" />
                Plan Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {PLANS.map((plan) => (
                  <button
                    key={plan.value}
                    type="button"
                    onClick={() => setCreateSquadForm({ ...createSquadForm, plan: plan.value })}
                    className={`relative flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all duration-200 ${
                      createSquadForm.plan === plan.value
                        ? "border-primary bg-primary/10 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]"
                        : "border-border/40 bg-secondary/20 hover:border-primary/30 hover:bg-secondary/40"
                    }`}
                  >
                    {createSquadForm.plan === plan.value && (
                      <div className="absolute -top-1.5 -right-1.5">
                        <CheckCircle2 className="h-4 w-4 text-primary fill-primary/20" />
                      </div>
                    )}
                    <plan.icon className={`h-5 w-5 ${createSquadForm.plan === plan.value ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`text-sm font-semibold ${createSquadForm.plan === plan.value ? "text-primary" : "text-foreground"}`}>
                      {plan.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{plan.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="h-3 w-3" />
                Description <span className="text-muted-foreground/50 font-normal normal-case">(optional)</span>
              </label>
              <Input
                placeholder="Briefly describe what your squad is about..."
                value={createSquadForm.description}
                onChange={(e) => setCreateSquadForm({ ...createSquadForm, description: e.target.value })}
                className="bg-secondary/30 border-border/40 rounded-xl focus:border-primary/50 h-11"
                maxLength={300}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setIsCreateDialogOpen(false)}
                className="flex-1 rounded-xl h-11 text-muted-foreground hover:text-foreground"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createSquadLoading || !createSquadForm.name || !createSquadForm.niche}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 glow-box rounded-xl h-11 font-semibold"
              >
                {createSquadLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Create Squad
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Squads;
