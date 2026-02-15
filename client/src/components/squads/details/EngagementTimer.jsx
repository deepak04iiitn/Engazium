import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const EngagementTimer = ({
  engagingPostId,
  activeEngagementId,
  timerSeconds,
  onValidate,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      {engagingPostId && activeEngagementId && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-xl px-4 py-3"
        >
          <Clock className="h-5 w-5 text-primary flex-shrink-0 animate-pulse" />
          <div className="flex-1">
            <p className="text-sm font-heading font-semibold text-foreground">
              Engaging... {timerSeconds}s elapsed
            </p>
            <p className="text-xs text-muted-foreground">
              {timerSeconds < 25
                ? `Spend at least ${25 - timerSeconds}s more on the content`
                : "Ready to validate!"}
            </p>
          </div>
          <div className="flex gap-2">
            {timerSeconds >= 25 && (
              <Button
                size="sm"
                onClick={onValidate}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-xs h-8"
              >
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                Validate
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={onCancel}
              className="text-muted-foreground hover:text-foreground rounded-lg text-xs h-8"
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EngagementTimer;
