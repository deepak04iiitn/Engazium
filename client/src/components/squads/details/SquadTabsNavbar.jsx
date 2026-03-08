import React from "react";
import { MessageCircle, Users, BarChart3, Loader2, LogOut, PenSquare, Link2 } from "lucide-react";
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
  shareDisabled = false,
  onShareDisabled,
  onInvite,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {/* Tab buttons */}
        <div className="flex gap-0.5">
          {tabs.map(({ key, label, icon: Icon }) => {
            const isShareTab = key === "share";
            const isDisabled = isShareTab && shareDisabled;

            return (
            <button
              key={key}
              onClick={() => {
                if (isDisabled) {
                  onShareDisabled?.();
                  return;
                }
                setActiveTab(key);
              }}
              disabled={isDisabled}
              className={`
                relative px-4 lg:px-5 py-3 text-[13px] font-heading font-medium transition-all duration-200
                flex items-center gap-2 rounded-lg
                ${activeTab === key
                  ? "text-primary bg-primary/12 dark:bg-primary/8"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50 dark:hover:bg-secondary/30"
                }
                ${isDisabled ? "opacity-50 cursor-not-allowed hover:text-muted-foreground hover:bg-transparent" : "cursor-pointer"}
              `}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
              {/* Active indicator */}
              {activeTab === key && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full" />
              )}
            </button>
            );
          })}
        </div>

        {/* Right actions */}
        {isMember && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onInvite}
              className="text-muted-foreground hover:text-primary hover:bg-primary/10 text-xs rounded-lg px-3 py-2 h-auto"
            >
              <Link2 className="h-3.5 w-3.5 mr-1.5" />
              <span className="hidden lg:inline">Invite</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLeave}
              disabled={leaveLoading}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 text-xs rounded-lg px-3 py-2 h-auto"
            >
              {leaveLoading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <>
                  <LogOut className="h-3.5 w-3.5 mr-1.5" />
                  <span className="hidden lg:inline">Leave Squad</span>
                  <span className="lg:hidden">Leave</span>
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SquadTabsNavbar;
