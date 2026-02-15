import React from "react";
import { motion } from "framer-motion";
import {
  SlidersHorizontal,
  Grid3x3,
  List,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

const SquadControls = ({
  totalResults,
  currentCount,
  showFilters,
  setShowFilters,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) => {
  return (
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
              Showing {currentCount} of {totalResults}
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
          <Select
            value={`${sortBy}-${sortOrder}`}
            onValueChange={(value) => {
              const [newSortBy, newSortOrder] = value.split("-");
              setSortBy(newSortBy);
              setSortOrder(newSortOrder);
            }}
          >
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
  );
};

export default SquadControls;
