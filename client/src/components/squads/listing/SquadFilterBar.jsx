import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  Users,
  TrendingUp,
  LayoutGrid,
  CheckCircle2,
  ChevronDown,
  Filter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const SquadFilterBar = ({
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
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  totalResults,
}) => {
  return (
    <div className="w-full space-y-4 mb-8">
      {/* Desktop Filter Bar */}
      <div className="hidden lg:flex items-center gap-3 glass p-3 rounded-2xl border border-white/10 shadow-xl">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search squads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/30 border-none rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-primary/50"
          />
        </div>

        <div className="h-8 w-[1px] bg-white/10 mx-1" />

        {/* Niche Multi-select Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className={`h-11 rounded-xl px-4 flex items-center gap-2 hover:bg-white/5 transition-all ${
                selectedNiches.length > 0 ? "text-primary bg-primary/5" : "text-muted-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4" />
                <span>Niches</span>
                {selectedNiches.length > 0 && (
                  <Badge variant="default" className="ml-1 h-5 min-w-[20px] px-1 bg-primary text-primary-foreground text-[10px] rounded-full">
                    {selectedNiches.length}
                  </Badge>
                )}
              </div>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0 glass border-white/10 shadow-2xl" align="start">
            <div className="p-3 border-b border-white/5 font-semibold text-xs text-muted-foreground uppercase tracking-wider">
              Select Niches
            </div>
            <ScrollArea className="h-72">
              <div className="p-2 space-y-1">
                {allNiches.map((niche) => (
                  <button
                    key={niche}
                    onClick={() => toggleNiche(niche)}
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm text-foreground"
                  >
                    <div className={`flex items-center justify-center h-4 w-4 rounded border transition-colors ${selectedNiches.includes(niche) ? "bg-primary border-primary" : "border-white/20"}`}>
                      {selectedNiches.includes(niche) && <CheckCircle2 className="h-3 w-3 text-white" />}
                    </div>
                    <span className={selectedNiches.includes(niche) ? "text-primary font-medium" : ""}>
                      {niche}
                    </span>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>

        {/* Status Dropdown */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className={`h-11 w-[140px] border-none bg-transparent hover:bg-white/5 rounded-xl px-4 focus:ring-0 transition-all ${statusFilter !== 'all' ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className="flex items-center gap-2">
              {statusFilter === 'all' ? <Filter className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
              <SelectValue placeholder="Status" />
            </div>
          </SelectTrigger>
          <SelectContent className="glass border-white/10 shadow-2xl">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="full">Full</SelectItem>
          </SelectContent>
        </Select>

        {/* Plan Multi-select (or simplified select) */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className={`h-11 rounded-xl px-4 flex items-center gap-2 hover:bg-white/5 transition-all ${
                selectedPlans.length > 0 ? "text-primary bg-primary/5" : "text-muted-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Plans</span>
                {selectedPlans.length > 0 && (
                  <Badge variant="default" className="ml-1 h-5 min-w-[20px] px-1 bg-primary text-primary-foreground text-[10px] rounded-full">
                    {selectedPlans.length}
                  </Badge>
                )}
              </div>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2 glass border-white/10 shadow-2xl" align="start">
            <div className="space-y-1">
              {plans.map((p) => (
                <button
                  key={p.value}
                  onClick={() => togglePlan(p.value)}
                  className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-sm"
                >
                  <div className="flex items-center gap-3">
                    <p.icon className={`h-4 w-4 ${selectedPlans.includes(p.value) ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={selectedPlans.includes(p.value) ? "text-primary font-medium" : ""}>{p.label}</span>
                  </div>
                  {selectedPlans.includes(p.value) && <CheckCircle2 className="h-4 w-4 text-primary" />}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <div className="h-8 w-[1px] bg-white/10 mx-1" />

        {/* Members Range */}
        <Select value={memberRangeFilter} onValueChange={setMemberRangeFilter}>
          <SelectTrigger className={`h-11 w-[150px] border-none bg-transparent hover:bg-white/5 rounded-xl px-4 focus:ring-0 transition-all ${memberRangeFilter !== 'all' ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <SelectValue placeholder="Size" />
            </div>
          </SelectTrigger>
          <SelectContent className="glass border-white/10 shadow-2xl">
            <SelectItem value="all">Any Size</SelectItem>
            <SelectItem value="0-5">0-5 Members</SelectItem>
            <SelectItem value="5-10">5-10 Members</SelectItem>
            <SelectItem value="10+">10+ Members</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex-1" />

        {/* Sort */}
        <Select
          value={`${sortBy}-${sortOrder}`}
          onValueChange={(value) => {
            const [newSortBy, newSortOrder] = value.split("-");
            setSortBy(newSortBy);
            setSortOrder(newSortOrder);
          }}
        >
          <SelectTrigger className="h-11 w-[170px] border-none bg-secondary/40 hover:bg-secondary/60 rounded-xl px-4 focus:ring-0 transition-all text-sm font-medium">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="glass border-white/10 shadow-2xl" align="end">
            <SelectItem value="members-desc">Most Members</SelectItem>
            <SelectItem value="members-asc">Least Members</SelectItem>
            <SelectItem value="engagement-desc">High Engagement</SelectItem>
            <SelectItem value="engagement-asc">Low Engagement</SelectItem>
            <SelectItem value="date-desc">Newest First</SelectItem>
            <SelectItem value="date-asc">Oldest First</SelectItem>
            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Mobile Filter Bar & Sheet */}
      <div className="lg:hidden flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary/30 border-none rounded-xl h-11"
          />
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="h-11 w-11 p-0 rounded-xl glass border-white/10 relative">
              <SlidersHorizontal className="h-5 w-5 text-primary" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-background">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="glass border-l-white/10 w-full sm:max-w-md p-0 overflow-y-auto">
            <div className="p-6 space-y-8">
              <SheetHeader className="text-left py-2 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-xl font-bold flex items-center gap-2">
                    <Filter className="h-5 w-5 text-primary" />
                    Filters
                  </SheetTitle>
                  {activeFilterCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-primary text-xs h-7 px-2 hover:bg-primary/10">
                      Clear All
                    </Button>
                  )}
                </div>
              </SheetHeader>

              {/* Mobile Filter Sections */}
              <div className="space-y-8">
                {/* Status */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: "all", label: "All Squads" },
                      { value: "active", label: "Active" },
                      { value: "full", label: "Full" },
                    ].map((status) => (
                      <button
                        key={status.value}
                        onClick={() => setStatusFilter(status.value)}
                        className={`px-4 py-3 rounded-xl border text-sm transition-all ${
                          statusFilter === status.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Plans */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Plan Type</label>
                  <div className="grid grid-cols-1 gap-2">
                    {plans.map((p) => (
                      <button
                        key={p.value}
                        onClick={() => togglePlan(p.value)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all ${
                          selectedPlans.includes(p.value)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"
                        }`}
                      >
                         <div className="flex items-center gap-3">
                          <p.icon className="h-4 w-4" />
                          <span>{p.label}</span>
                         </div>
                         {selectedPlans.includes(p.value) && <CheckCircle2 className="h-4 w-4" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Niches */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Niches</label>
                  <div className="grid grid-cols-2 gap-2">
                    {allNiches.slice(0, 10).map((niche) => (
                       <button
                        key={niche}
                        onClick={() => toggleNiche(niche)}
                        className={`px-3 py-2 rounded-xl border text-xs transition-all text-left truncate ${
                          selectedNiches.includes(niche)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-white/10 bg-white/5 text-muted-foreground"
                        }`}
                      >
                        {niche}
                      </button>
                    ))}
                    {/* Simplified for mobile: only showing first 10 or just a scrollable list */}
                  </div>
                  {allNiches.length > 10 && (
                    <Popover>
                      <PopoverTrigger asChild>
                         <Button variant="link" className="p-0 h-auto text-primary text-xs">View all {allNiches.length} niches</Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64 glass border-white/10 p-0 shadow-2xl">
                         <ScrollArea className="h-64 p-2">
                            {allNiches.map((niche) => (
                              <button
                                key={niche}
                                onClick={() => toggleNiche(niche)}
                                className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-white/5 text-sm"
                              >
                                <span>{niche}</span>
                                {selectedNiches.includes(niche) && <CheckCircle2 className="h-3 w-3 text-primary" />}
                              </button>
                            ))}
                         </ScrollArea>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>

                {/* Sort (Mobile) */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Sort Result</label>
                   <Select
                    value={`${sortBy}-${sortOrder}`}
                    onValueChange={(value) => {
                      const [newSortBy, newSortOrder] = value.split("-");
                      setSortBy(newSortBy);
                      setSortOrder(newSortOrder);
                    }}
                  >
                    <SelectTrigger className="h-12 w-full border-white/10 bg-white/5 rounded-xl px-4 focus:ring-0">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="glass border-white/10 shadow-2xl">
                      <SelectItem value="members-desc">Most Members</SelectItem>
                      <SelectItem value="members-asc">Least Members</SelectItem>
                      <SelectItem value="engagement-desc">High Engagement</SelectItem>
                      <SelectItem value="engagement-asc">Low Engagement</SelectItem>
                      <SelectItem value="date-desc">Newest First</SelectItem>
                      <SelectItem value="date-asc">Oldest First</SelectItem>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filter Badges (Desktop) */}
      <AnimatePresence>
        {activeFilterCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="hidden lg:flex flex-wrap items-center gap-2 overflow-hidden"
          >
            {selectedNiches.map((niche) => (
              <Badge key={niche} variant="secondary" className="pl-3 pr-1.5 py-1 gap-1 bg-primary/10 border-primary/20 text-primary rounded-full hover:bg-primary/20 group transition-all">
                {niche}
                <button onClick={() => toggleNiche(niche)} className="p-0.5 rounded-full hover:bg-primary/20">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {selectedPlans.map((plan) => (
               <Badge key={plan} variant="secondary" className="pl-3 pr-1.5 py-1 gap-1 bg-primary/10 border-primary/20 text-primary rounded-full hover:bg-primary/20 group transition-all">
                {plan} Plan
                <button onClick={() => togglePlan(plan)} className="p-0.5 rounded-full hover:bg-primary/20">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {statusFilter !== 'all' && (
               <Badge variant="secondary" className="pl-3 pr-1.5 py-1 gap-1 bg-primary/10 border-primary/20 text-primary rounded-full hover:bg-primary/20 group transition-all">
                Status: {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                <button onClick={() => setStatusFilter('all')} className="p-0.5 rounded-full hover:bg-primary/20">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
             {memberRangeFilter !== 'all' && (
               <Badge variant="secondary" className="pl-3 pr-1.5 py-1 gap-1 bg-primary/10 border-primary/20 text-primary rounded-full hover:bg-primary/20 group transition-all">
                Size: {memberRangeFilter}
                <button onClick={() => setMemberRangeFilter('all')} className="p-0.5 rounded-full hover:bg-primary/20">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs text-muted-foreground hover:text-foreground h-7 px-2 border-l border-white/10 ml-2 rounded-none">
              Reset all
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SquadFilterBar;
