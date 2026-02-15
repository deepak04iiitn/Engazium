"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Shield, Zap, Star, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Components
import SquadsHero from "@/components/squads/listing/SquadsHero";
import SquadFilterBar from "@/components/squads/listing/SquadFilterBar";
import SquadList from "@/components/squads/listing/SquadList";
import CreateSquadDialog from "@/components/squads/listing/CreateSquadDialog";
import { Button } from "@/components/ui/button";

const ALL_NICHES = [
  "Art & Creativity",
  "Technology",
  "Gaming",
  "Education",
  "Business & Finance",
  "Health & Fitness",
  "Lifestyle",
  "Fashion & Beauty",
  "Food & Cooking",
  "Travel",
  "Self Improvement",
  "Entertainment",
  "Music",
  "Photography & Videography",
  "Podcasting",
  "News & Commentary",
  "DIY & Crafts",
  "Sports",
  "Science",
  "Pets & Animals",
  "Nature & Environment",
  "Spirituality",
  "Parenting & Family",
  "Vlogs",
  "Automotive",
  "Real Estate",
  "Politics",
  "Non Profit & Social Impact",
  "Other",
];

const PLANS = [
  { value: "Growth", label: "Growth", desc: "1 post/day · 10 members", icon: Shield },
  { value: "Pro", label: "Pro", desc: "2 posts/day · 20 members", icon: Zap },
  { value: "Momentum", label: "Momentum", desc: "3 posts/day · 30 members", icon: Star },
];

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
      if (selectedNiches.length > 0)
        params.set("niches", selectedNiches.join(","));
      if (selectedPlans.length > 0)
        params.set("plans", selectedPlans.join(","));

      // Single-select filters
      if (statusFilter && statusFilter !== "all")
        params.set("status", statusFilter);
      if (memberRangeFilter && memberRangeFilter !== "all")
        params.set("memberRange", memberRangeFilter);

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
  }, [
    currentPage,
    pageSize,
    searchQuery,
    selectedNiches,
    selectedPlans,
    statusFilter,
    memberRangeFilter,
    sortBy,
    sortOrder,
  ]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchSquads();
    }, 300);
    return () => clearTimeout(debounce);
  }, [fetchSquads]);

  // Reset to page 1 when filters change (but not when page changes)
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedNiches,
    selectedPlans,
    statusFilter,
    memberRangeFilter,
    sortBy,
    sortOrder,
    pageSize,
  ]);

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
      setCreateSquadForm({
        name: "",
        niche: "",
        plan: "Growth",
        description: "",
      });
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

  const handleBrowseClick = () => {
    document
      .getElementById("browse-squads")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero */}
        <SquadsHero
          onBrowseClick={handleBrowseClick}
          onCreateClick={openCreateDialog}
        />

        {/* Browse Squads */}
        <section id="browse-squads" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

          <div className="container relative z-10 mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-12">
              <span className="text-primary font-heading text-sm font-semibold uppercase tracking-wider">
                Explore
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-4">
                Browse <span className="text-gradient">Active Squads</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Find open squads in your niche or create your own from the
                dashboard.
              </p>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto">
              <SquadFilterBar
                selectedNiches={selectedNiches}
                toggleNiche={toggleNiche}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                selectedPlans={selectedPlans}
                togglePlan={togglePlan}
                memberRangeFilter={memberRangeFilter}
                setMemberRangeFilter={setMemberRangeFilter}
                activeFilterCount={activeFilterCount}
                clearAllFilters={clearAllFilters}
                allNiches={ALL_NICHES}
                plans={PLANS}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                totalResults={totalResults}
              />

              {/* Squad List */}
              <SquadList
                loading={loading}
                squads={squads}
                activeFilterCount={activeFilterCount}
                clearAllFilters={clearAllFilters}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                joiningId={joiningId}
                onJoin={handleJoinSquad}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 lg:hidden"
      >
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="h-16 w-16 rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 flex items-center justify-center p-0 hover:bg-primary/90 group"
        >
          <Plus className="h-8 w-8 transition-transform group-hover:rotate-90 duration-300" />
        </Button>
      </motion.div>

      {/* Desktop Floating Button (Optional but nice, maybe just keep it for mobile or all) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed bottom-8 right-8 z-50 hidden lg:block"
      >
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="h-14 px-6 rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 flex items-center gap-3 hover:bg-primary/90 group transition-all duration-300"
        >
          <div className="bg-white/20 rounded-lg p-1 group-hover:rotate-90 transition-transform duration-300">
            <Plus className="h-5 w-5" />
          </div>
          <span className="font-heading font-bold tracking-wide">CREATE SQUAD</span>
        </Button>
      </motion.div>

      {/* Create Squad Dialog */}
      <CreateSquadDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        form={createSquadForm}
        setForm={setCreateSquadForm}
        onSubmit={handleCreateSquad}
        loading={createSquadLoading}
        allNiches={ALL_NICHES}
        plans={PLANS}
      />
    </div>
  );
};

export default Squads;
