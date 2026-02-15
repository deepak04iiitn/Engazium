import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  Users,
  TrendingUp,
  LayoutGrid,
  CheckCircle2,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

const SquadFilters = ({
  showFilters,
  selectedNiches,
  toggleNiche,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  selectedPlans,
  togglePlan,
  memberRangeFilter,
  setMemberRangeFilter,
  activeFilterCount,
  clearAllFilters,
  allNiches,
  plans,
}) => {
  return (
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
            {plans.map((plan) => (
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
            {allNiches.map((niche) => (
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
  );
};

export default SquadFilters;
