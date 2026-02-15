import React from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  Users,
  X,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SquadCard from "./SquadCard";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

const SquadList = ({
  loading,
  squads,
  viewMode,
  activeFilterCount,
  clearAllFilters,
  totalPages,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  joiningId,
  onJoin,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground text-sm">Loading squads...</p>
      </div>
    );
  }

  return (
    <>
      {/* Squad Grid/List */}
      {squads.length > 0 && (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
              : "space-y-4"
          }
        >
          {squads.map((squad, index) => (
            <SquadCard
              key={squad._id}
              squad={squad}
              viewMode={viewMode}
              index={index}
              joiningId={joiningId}
              onJoin={onJoin}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {squads.length === 0 && (
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
      {totalPages > 1 && (
        <motion.div
          {...fadeUp}
          className="glass rounded-2xl p-4 gradient-border mt-6"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Page Size Selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show:</span>
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => setPageSize(Number(value))}
              >
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
    </>
  );
};

export default SquadList;
