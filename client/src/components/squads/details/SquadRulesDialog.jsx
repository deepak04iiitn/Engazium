import React, { useEffect, useState } from "react";
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
  Lock,
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
  {
    icon: Lock,
    color: "text-rose-400",
    bg: "from-rose-500/15 to-rose-500/5",
    border: "border-rose-500/10",
    title: "Posting Locks Below 30%",
    description:
      "If your engagement drops below 30%, posting is disabled until you engage and recover to 30%+.",
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
  <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-24 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-glow-secondary/10 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-transparent to-primary/[0.02]" />
    </div>
    <div className="relative z-10 border-t border-primary/40" />

    <div className="relative z-10 px-5 sm:px-6 pb-5 pt-5 sm:pt-6">
      <div className="mb-4 sm:mb-5 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 16 }}
          className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10"
        >
          <ShieldCheck className="h-6 w-6 text-primary" />
        </motion.div>
        <p className="mx-auto mb-2 inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
          Required before posting
        </p>
        <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-foreground">
          Accept Squad Rules
        </h3>
        <p className="mx-auto mt-1.5 max-w-md text-xs sm:text-sm text-muted-foreground">
          Keep the squad healthy and high-performing by following these shared rules.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
      >
        {SQUAD_RULES.map((rule, index) => {
          const Icon = rule.icon;
          return (
            <motion.div
              key={index}
              variants={item}
              className={`group rounded-xl border ${rule.border} bg-gradient-to-br ${rule.bg} p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-border/40`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/30 bg-background/70">
                  <Icon className={`h-4 w-4 ${rule.color}`} />
                </div>
                <div>
                  <p className="font-heading text-[13px] sm:text-sm font-semibold text-foreground leading-tight">
                    {rule.title}
                  </p>
                  <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground leading-snug">
                    {rule.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-3.5 flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/[0.07] px-3.5 py-3"
      >
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-destructive/15">
          <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
        </div>
        <p className="text-[11px] sm:text-xs text-muted-foreground leading-snug">
          <span className="font-semibold text-destructive">Important:</span> If engagement stays
          below 30% for 7 days, automatic squad removal applies.
        </p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        type="button"
        onClick={() => setAgreed(!agreed)}
        className={`mt-3.5 w-full cursor-pointer select-none rounded-xl border px-3.5 py-3 text-left transition-all duration-200 ${
          agreed
            ? "border-primary/35 bg-primary/[0.08]"
            : "border-border/35 bg-secondary/20 hover:border-border/60 hover:bg-secondary/30"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
              agreed ? "border-primary bg-primary" : "border-muted-foreground/35"
            }`}
          >
            {agreed ? <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} /> : null}
          </div>
          <span className="text-[12px] sm:text-[13px] text-foreground/90 leading-snug">
            I agree to follow these squad rules and understand the engagement policy.
          </span>
        </div>
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 flex gap-2.5"
      >
        <Button
          variant="ghost"
          className="h-10 flex-1 rounded-xl border border-border/30 bg-background/40 text-[13px] font-medium hover:bg-secondary/35"
          onClick={() => onClose(false)}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          className="h-10 flex-1 rounded-xl bg-primary text-primary-foreground text-[13px] font-semibold hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
          onClick={() => agreed && onAccept()}
          disabled={!agreed || loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              Accepting...
            </>
          ) : (
            <>
              <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
              Accept & Continue
            </>
          )}
        </Button>
      </motion.div>
    </div>
  </div>
);

const SquadRulesDialog = ({ open, onOpenChange, onAccept, loading }) => {
  const [agreed, setAgreed] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (open) {
      setAgreed(false);
    }
  }, [open]);

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
