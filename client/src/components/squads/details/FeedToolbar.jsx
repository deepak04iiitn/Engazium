import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  X,
  Clock,
  CalendarDays,
  CalendarRange,
  User,
  CheckCircle2,
  Circle,
  ArrowDown,
  ArrowUp,
  TrendingUp,
  TrendingDown,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const SORT_OPTIONS = [
  { value: "pending_first", label: "Pending First", icon: Eye },
  { value: "newest", label: "Newest First", icon: ArrowDown },
  { value: "oldest", label: "Oldest First", icon: ArrowUp },
  { value: "most_engaged", label: "Most Engaged", icon: TrendingUp },
  { value: "least_engaged", label: "Least Engaged", icon: TrendingDown },
];

const FILTER_OPTIONS = [
  { value: "mine", label: "My Posts", icon: User },
  { value: "engaged", label: "Engaged", icon: CheckCircle2 },
  { value: "not_engaged", label: "Not Engaged", icon: Circle },
];

const TIME_RANGE_OPTIONS = [
  { value: "today", label: "Today", icon: Clock },
  { value: "week", label: "This Week", icon: CalendarDays },
  { value: "month", label: "This Month", icon: CalendarRange },
];

const FeedToolbar = ({
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  filter,
  onFilterChange,
  timeRange,
  onTimeRangeChange,
  totalResults,
  pendingCount = 0,
}) => {
  const [localSearch, setLocalSearch] = useState(search || "");
  const [showFilters, setShowFilters] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const sortRef = useRef(null);
  const debounceRef = useRef(null);

  // Debounce search input
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearchChange(localSearch);
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [localSearch]);

  // Close sort dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setShowSortMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const activeSort = SORT_OPTIONS.find((o) => o.value === sortBy) || SORT_OPTIONS[0];
  const hasActiveFilters = !!filter || !!timeRange;
  const activeCount = (filter ? 1 : 0) + (timeRange ? 1 : 0);

  const clearAll = () => {
    setLocalSearch("");
    onSearchChange("");
    onFilterChange("");
    onTimeRangeChange("");
    onSortChange("pending_first");
  };

  return (
    <div className="space-y-3">
      {/* Main bar */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
          <Input
            placeholder="Search posts or members..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="bg-secondary/30 dark:bg-secondary/20 border-border/50 dark:border-border/20 focus:border-primary/40 rounded-xl text-sm h-10 pl-9 pr-9 transition-colors"
          />
          {localSearch && (
            <button
              onClick={() => {
                setLocalSearch("");
                onSearchChange("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Sort dropdown */}
        <div className="relative" ref={sortRef}>
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className={`flex items-center gap-1.5 px-3 h-10 rounded-xl border text-xs font-heading font-medium transition-all duration-200 ${
              sortBy !== "pending_first"
                ? "border-primary/30 bg-primary/8 text-primary"
                : "border-border/50 dark:border-border/20 bg-secondary/30 dark:bg-secondary/20 text-muted-foreground hover:text-foreground hover:border-border/60 dark:hover:border-border/40"
            }`}
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{activeSort.label}</span>
          </button>

          <AnimatePresence>
            {showSortMenu && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 z-50 w-48 bg-background border border-border/60 dark:border-border/30 rounded-xl shadow-xl overflow-hidden"
              >
                {SORT_OPTIONS.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => {
                      onSortChange(value);
                      setShowSortMenu(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-heading transition-colors ${
                      sortBy === value
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground/80 hover:bg-secondary/30"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                    {value === "pending_first" && pendingCount > 0 && (
                      <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary font-bold">
                        {pendingCount}
                      </span>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`relative flex items-center gap-1.5 px-3 h-10 rounded-xl border text-xs font-heading font-medium transition-all duration-200 ${
            hasActiveFilters
              ? "border-primary/30 bg-primary/8 text-primary"
              : "border-border/50 dark:border-border/20 bg-secondary/30 dark:bg-secondary/20 text-muted-foreground hover:text-foreground hover:border-border/60 dark:hover:border-border/40"
          }`}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Filters</span>
          {activeCount > 0 && (
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] font-bold">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Expanded filter panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-secondary/30 dark:bg-secondary/15 border border-border/50 dark:border-border/15 rounded-xl p-3.5 space-y-3">
              {/* Post filter */}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-heading font-semibold mb-2">
                  Show
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {FILTER_OPTIONS.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() =>
                        onFilterChange(filter === value ? "" : value)
                      }
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-medium transition-all duration-200 ${
                        filter === value
                          ? "bg-primary/15 text-primary border border-primary/25"
                          : "bg-secondary/30 text-muted-foreground border border-transparent hover:bg-secondary/50 hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time range */}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-heading font-semibold mb-2">
                  Time Range
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {TIME_RANGE_OPTIONS.map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() =>
                        onTimeRangeChange(timeRange === value ? "" : value)
                      }
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-medium transition-all duration-200 ${
                        timeRange === value
                          ? "bg-primary/15 text-primary border border-primary/25"
                          : "bg-secondary/30 text-muted-foreground border border-transparent hover:bg-secondary/50 hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active filters + clear */}
              {hasActiveFilters && (
                <div className="flex items-center justify-between pt-1 border-t border-border/10">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {filter && (
                      <Badge
                        variant="outline"
                        className="text-[10px] border-primary/20 text-primary px-2 py-0.5 rounded-md gap-1 cursor-pointer hover:bg-primary/10 transition-colors"
                        onClick={() => onFilterChange("")}
                      >
                        {FILTER_OPTIONS.find((f) => f.value === filter)?.label}
                        <X className="h-2.5 w-2.5" />
                      </Badge>
                    )}
                    {timeRange && (
                      <Badge
                        variant="outline"
                        className="text-[10px] border-primary/20 text-primary px-2 py-0.5 rounded-md gap-1 cursor-pointer hover:bg-primary/10 transition-colors"
                        onClick={() => onTimeRangeChange("")}
                      >
                        {TIME_RANGE_OPTIONS.find((t) => t.value === timeRange)?.label}
                        <X className="h-2.5 w-2.5" />
                      </Badge>
                    )}
                  </div>
                  <button
                    onClick={clearAll}
                    className="text-[11px] text-muted-foreground hover:text-foreground font-heading font-medium transition-colors"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results count when filtering */}
      {(search || hasActiveFilters || sortBy !== "pending_first") && totalResults !== undefined && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between"
        >
          <p className="text-muted-foreground text-xs font-heading">
            {totalResults} {totalResults === 1 ? "post" : "posts"} found
          </p>
          {(search || hasActiveFilters) && (
            <button
              onClick={clearAll}
              className="text-xs text-primary hover:text-primary/80 font-heading font-medium transition-colors"
            >
              Clear filters
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default FeedToolbar;

