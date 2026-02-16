import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const EngagementTimer = ({
  engagingPostId,
  activeEngagementId,
  timerSeconds,
  onValidate,
  onCancel,
}) => {
  const isReady = timerSeconds >= 25;

  return (
    <AnimatePresence>
      {engagingPostId && activeEngagementId && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={`rounded-xl md:rounded-2xl px-4 md:px-6 py-4 md:py-5 border transition-colors ${
            isReady
              ? "bg-primary/10 border-primary/30"
              : "bg-amber-500/10 border-amber-500/30"
          }`}
        >
          <div className="flex items-center gap-3 mb-3 md:mb-0 md:flex-1">
            <div className={`w-9 h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 ${
              isReady ? "bg-primary/20" : "bg-amber-500/20"
            }`}>
              <Clock className={`h-4 w-4 md:h-5 md:w-5 ${isReady ? "text-primary" : "text-amber-500"} animate-pulse`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-heading font-semibold text-foreground">
                Engaging... {timerSeconds}s
              </p>
              <p className="text-[11px] md:text-xs text-muted-foreground mt-0.5">
                {!isReady
                  ? `${25 - timerSeconds}s more needed`
                  : "Ready to validate!"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {isReady && (
              <Button
                size="sm"
                onClick={onValidate}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg md:rounded-xl text-xs md:text-sm h-9 md:h-10 px-4 md:px-5 flex-1 md:flex-none"
              >
                <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5" />
                Validate
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={onCancel}
              className="text-muted-foreground hover:text-foreground rounded-lg md:rounded-xl text-xs md:text-sm h-9 md:h-10 px-3 md:px-4 flex-1 md:flex-none"
            >
              <X className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1" />
              Cancel
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EngagementTimer;
