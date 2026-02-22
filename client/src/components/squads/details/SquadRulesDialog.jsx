import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  Loader2,
  Handshake,
  ChartNoAxesCombined,
  Ban,
  Heart,
  CalendarClock,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const SQUAD_RULES = [
  {
    icon: Handshake,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    title: "Engage Authentically",
    description:
      "Meaningful likes, comments, and shares only. No bots or fake engagement.",
  },
  {
    icon: ChartNoAxesCombined,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    title: "Maintain 30%+ Engagement",
    description:
      "Keep your engagement above 30%. Dropping below for 7 days may lead to removal.",
  },
  {
    icon: Ban,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    title: "No Spam",
    description:
      "Share quality content and engage with others' posts in return.",
  },
  {
    icon: Heart,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    title: "Respect Everyone",
    description:
      "No hate speech, harassment, or toxic behaviour of any kind.",
  },
  {
    icon: CalendarClock,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    title: "Stay Consistent",
    description:
      "Regular participation keeps the squad healthy for everyone.",
  },
];

const SquadRulesDialog = ({ open, onOpenChange, onAccept, loading }) => {
  const [agreed, setAgreed] = useState(false);

  const handleAccept = () => {
    if (agreed) {
      onAccept();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[680px] p-0 gap-0 overflow-hidden border-border/30 bg-background/95 backdrop-blur-xl">
        {/* Top gradient accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-emerald-500 to-blue-500" />

        <div className="px-6 md:px-8 pt-6 pb-2">
          <DialogHeader className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-4"
            >
              <ShieldCheck className="h-6 w-6 text-primary" />
            </motion.div>
            <DialogTitle className="font-heading text-xl md:text-2xl font-bold text-foreground tracking-tight">
              Squad Rules & Guidelines
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm mt-1.5 max-w-md mx-auto">
              Accept these rules before sharing your first post.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Rules Grid */}
        <div className="px-6 md:px-8 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SQUAD_RULES.map((rule, index) => {
              const Icon = rule.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.3 }}
                  className={`flex items-start gap-3 p-3 rounded-xl border border-border/10 bg-secondary/20 hover:bg-secondary/35 transition-colors ${
                    index === SQUAD_RULES.length - 1 && SQUAD_RULES.length % 2 !== 0
                      ? "sm:col-span-2 sm:max-w-[50%] sm:mx-auto sm:w-full"
                      : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg ${rule.bg} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`h-4 w-4 ${rule.color}`} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-heading font-semibold text-[13px] text-foreground leading-tight">
                      {rule.title}
                    </h4>
                    <p className="text-muted-foreground text-[11px] leading-relaxed mt-0.5">
                      {rule.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom section with warning + agreement + buttons */}
        <div className="px-6 md:px-8 pb-6 space-y-4">
          {/* Warning */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-destructive/8 border border-destructive/15"
          >
            <div className="w-8 h-8 rounded-lg bg-destructive/15 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
            <p className="text-[12px] text-destructive/90 leading-snug">
              <span className="font-semibold">Termination Warning:</span>{" "}
              Engagement below 30% for 7 continuous days will result in automatic
              removal from the squad.
            </p>
          </motion.div>

          {/* Agreement */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => setAgreed(!agreed)}
          >
            <Checkbox
              id="accept-rules"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(!!checked)}
            />
            <label
              htmlFor="accept-rules"
              className="text-[13px] text-muted-foreground leading-snug cursor-pointer"
            >
              I agree to follow all squad rules and understand the termination
              policy.
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <Button
              variant="ghost"
              className="flex-1 rounded-xl h-11 text-sm border border-border/20 hover:bg-secondary/40"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 rounded-xl h-11 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-40"
              onClick={handleAccept}
              disabled={!agreed || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Accepting...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Accept & Continue
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SquadRulesDialog;
