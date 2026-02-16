import React from "react";
import { MessageCircle, Users, BarChart3, Loader2, LogOut, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const tabs = [
  { key: "feed", label: "Feed", icon: MessageCircle },
  { key: "share", label: "Share Post", icon: PenSquare },
  { key: "members", label: "Members", icon: Users },
  { key: "stats", label: "Stats", icon: BarChart3 },
];

const SquadTabsNavbar = ({
  activeTab,
  setActiveTab,
  isMember,
  onLeave,
  leaveLoading,
}) => {
  return (
    <div className="px-5 sm:px-8 lg:px-10 border-b border-border/20">
      <div className="flex items-center justify-between">
        {/* Tab buttons */}
        <div className="flex gap-1">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`
                relative px-4 sm:px-6 py-4 text-sm font-heading font-medium transition-all duration-200
                flex items-center gap-2
                ${activeTab === key
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
              {/* Active indicator */}
              {activeTab === key && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full" />
              )}
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
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs rounded-xl px-4 py-2 h-auto"
          >
            {leaveLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Leave Squad</span>
                <span className="sm:hidden">Leave</span>
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SquadTabsNavbar;
