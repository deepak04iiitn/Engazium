import React from "react";
import { MessageCircle, Users, BarChart3, Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const SquadTabsNavbar = ({
  activeTab,
  setActiveTab,
  isMember,
  onLeave,
  leaveLoading,
}) => {
  return (
    <div className="px-6 pt-3 border-b border-border/30 flex items-center justify-between">
      <div className="flex gap-1">
        {["feed", "members", "stats"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-heading font-medium rounded-t-lg transition-all duration-200 capitalize ${
              activeTab === tab
                ? "bg-primary/10 text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "feed" && (
              <MessageCircle className="h-3.5 w-3.5 inline mr-1.5" />
            )}
            {tab === "members" && (
              <Users className="h-3.5 w-3.5 inline mr-1.5" />
            )}
            {tab === "stats" && (
              <BarChart3 className="h-3.5 w-3.5 inline mr-1.5" />
            )}
            {tab}
          </button>
        ))}
      </div>

      {/* Leave / Actions */}
      {isMember && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onLeave}
          disabled={leaveLoading}
          className="text-muted-foreground hover:text-destructive text-xs"
        >
          {leaveLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <>
              <LogOut className="h-3.5 w-3.5 mr-1.5" />
              Leave
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default SquadTabsNavbar;
