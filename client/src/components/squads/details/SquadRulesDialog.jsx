import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  Loader2,
  Handshake,
  ChartNoAxesCombined,
  Ban,
  Heart,
  CalendarClock,
  Check,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const SQUAD_RULES = [
  {
    icon: Handshake,
    color: "text-emerald-400",
    bg: "from-emerald-500/15 to-emerald-500/5",
    border: "border-emerald-500/10",
    title: "Engage Authentically",
    description: "Meaningful likes, comments & shares only. No bots.",
  },
  {
    icon: ChartNoAxesCombined,
    color: "text-sky-400",
    bg: "from-sky-500/15 to-sky-500/5",
    border: "border-sky-500/10",
    title: "Keep 30%+ Engagement",
    description: "Stay above 30% or face removal after 7 days.",
  },
  {
    icon: Ban,
    color: "text-amber-400",
    bg: "from-amber-500/15 to-amber-500/5",
    border: "border-amber-500/10",
    title: "No Spam",
    description: "Quality content only. Engage with others in return.",
  },
  {
    icon: Heart,
    color: "text-pink-400",
    bg: "from-pink-500/15 to-pink-500/5",
    border: "border-pink-500/10",
    title: "Respect Everyone",
    description: "Zero tolerance for hate speech or harassment.",
  },
  {
    icon: CalendarClock,
    color: "text-violet-400",
    bg: "from-violet-500/15 to-violet-500/5",
    border: "border-violet-500/10",
    title: "Stay Consistent",
    description: "Regular activity keeps the squad thriving.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1 },
};

// ── Shared inner content used by both Dialog and Drawer ──
const RulesContent = ({ agreed, setAgreed, onAccept, onClose, loading }) => (
  <div className="relative glass rounded-2xl gradient-border overflow-hidden">
    {/* Background mesh */}
    <div className="absolute inset-0 mesh-gradient opacity-60 pointer-events-none" />
    <div className="absolute inset-0 noise-overlay pointer-events-none rounded-2xl" />

    {/* Accent glow blobs */}
    <div className="absolute -top-16 -right-16 w-40 h-40 bg-primary/10 rounded-full blur-[70px] pointer-events-none" />
    <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-glow-secondary/8 rounded-full blur-[50px] pointer-events-none" />

    {/* Top gradient bar */}
    <div className="h-[2px] w-full bg-gradient-to-r from-primary/80 via-glow-secondary/60 to-primary/80" />

    <div className="relative z-10">
      {/* Header */}
      <div className="px-5 sm:px-6 pt-5 pb-0 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto w-11 h-11 rounded-xl bg-gradient-to-br from-primary/25 to-primary/5 border border-primary/15 flex items-center justify-center mb-3 glow-box"
        >
          <ShieldCheck className="h-5 w-5 text-primary" />
        </motion.div>

        <h3 className="font-heading text-lg md:text-xl font-bold tracking-tight">
          <span className="text-gradient">Squad Rules</span>
        </h3>
        <p className="text-muted-foreground text-xs mt-1 max-w-xs mx-auto">
          Accept these guidelines before sharing your first post.
        </p>
      </div>

      {/* Rules Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="px-4 sm:px-6 pt-4 pb-3"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SQUAD_RULES.map((rule, index) => {
            const Icon = rule.icon;
            const isLast =
              index === SQUAD_RULES.length - 1 &&
              SQUAD_RULES.length % 2 !== 0;

            return (
              <motion.div
                key={index}
                variants={item}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg border ${rule.border} bg-gradient-to-br ${rule.bg} hover:scale-[1.02] transition-transform duration-200 ${
                  isLast ? "sm:col-span-2 sm:max-w-[calc(50%-4px)] sm:mx-auto" : ""
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-background/50 border border-border/20 flex items-center justify-center flex-shrink-0">
                  <Icon className={`h-3.5 w-3.5 ${rule.color}`} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-heading font-semibold text-[13px] text-foreground leading-tight">
                    {rule.title}
                  </h4>
                  <p className="text-muted-foreground text-[11px] leading-snug mt-0.5">
                    {rule.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Footer section */}
      <div className="px-4 sm:px-6 pb-5 space-y-2.5">
        {/* Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative flex items-center gap-3 px-3.5 py-2.5 rounded-lg bg-destructive/[0.06] border border-destructive/10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-destructive/[0.03] to-transparent pointer-events-none" />
          <div className="relative w-6 h-6 rounded-md bg-destructive/10 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="h-3 w-3 text-destructive" />
          </div>
          <p className="relative text-[11px] text-muted-foreground leading-snug">
            <span className="font-semibold text-destructive">Warning:</span>{" "}
            Below 30% engagement for 7 days → automatic removal.
          </p>
        </motion.div>

        {/* Agreement toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          type="button"
          onClick={() => setAgreed(!agreed)}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg border transition-all duration-200 cursor-pointer select-none ${
            agreed
              ? "border-primary/30 bg-primary/[0.06]"
              : "border-border/20 bg-secondary/15 hover:border-border/40 hover:bg-secondary/25"
          }`}
        >
          <div
            className={`w-[18px] h-[18px] rounded-[5px] border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
              agreed
                ? "bg-primary border-primary"
                : "border-muted-foreground/30"
            }`}
          >
            {agreed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Check className="h-2.5 w-2.5 text-primary-foreground" strokeWidth={3} />
              </motion.div>
            )}
          </div>
          <span className="text-[12px] text-foreground/80 leading-snug text-left">
            I agree to follow all squad rules and understand the termination policy.
          </span>
        </motion.button>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="flex gap-2.5 pt-0.5"
        >
          <Button
            variant="ghost"
            className="flex-1 rounded-xl h-10 text-[13px] font-medium border border-border/15 hover:bg-secondary/30 transition-all"
            onClick={() => onClose(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            className={`flex-1 rounded-xl h-10 text-[13px] font-semibold transition-all duration-300 ${
              agreed && !loading
                ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-box"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
            onClick={() => agreed && onAccept()}
            disabled={!agreed || loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                Accepting...
              </>
            ) : (
              <>
                <ShieldCheck className="h-3.5 w-3.5 mr-1.5" />
                Accept & Continue
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  </div>
);

const SquadRulesDialog = ({ open, onOpenChange, onAccept, loading }) => {
  const [agreed, setAgreed] = useState(false);
  const isMobile = useIsMobile();

  // ── Mobile: use Drawer (slides up from bottom, scrollable) ──
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="p-0 border-0 bg-transparent shadow-none max-h-[92dvh]">
          {/* Visually hidden accessible title & description for the drawer */}
          <DrawerTitle className="sr-only">Squad Rules</DrawerTitle>
          <DrawerDescription className="sr-only">
            Accept these guidelines before sharing your first post.
          </DrawerDescription>

          <div className="overflow-y-auto max-h-[85dvh] px-2 pb-2">
            <RulesContent
              agreed={agreed}
              setAgreed={setAgreed}
              onAccept={onAccept}
              onClose={onOpenChange}
              loading={loading}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // ── Desktop: use Dialog (centered modal) ──
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[680px] p-0 gap-0 overflow-hidden border-0 bg-transparent shadow-none [&>button]:hidden">
        {/* Visually hidden accessible title & description for the dialog */}
        <DialogTitle className="sr-only">Squad Rules</DialogTitle>
        <DialogDescription className="sr-only">
          Accept these guidelines before sharing your first post.
        </DialogDescription>

        <RulesContent
          agreed={agreed}
          setAgreed={setAgreed}
          onAccept={onAccept}
          onClose={onOpenChange}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SquadRulesDialog;
