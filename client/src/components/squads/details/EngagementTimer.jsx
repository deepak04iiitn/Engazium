"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Pause, CheckCircle2, ExternalLink } from "lucide-react";

const MIN_ENGAGEMENT_SECONDS = 20;
const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const EngagementTimer = ({
  engagingPostId,
  activeEngagementId,
  timerSeconds,
  isTabVisible,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const isActive = !!(engagingPostId && activeEngagementId);
  const isReady = timerSeconds >= MIN_ENGAGEMENT_SECONDS;
  // isPaused = user is back on this tab but timer hasn't finished
  const isPaused = isTabVisible && !isReady;
  const progress = Math.min(timerSeconds / MIN_ENGAGEMENT_SECONDS, 1);
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/65 backdrop-blur-xl" />

          {/* Ambient glow */}
          <div
            className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-700 ${
              isReady
                ? "bg-primary"
                : isPaused
                ? "bg-slate-400"
                : "bg-amber-500"
            }`}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.82, opacity: 0, y: 28 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 16 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="relative z-10 w-full max-w-sm mx-4"
          >
            <div className="relative rounded-3xl bg-background/95 border border-border/40 shadow-2xl overflow-hidden px-8 pt-8 pb-7 text-center">

              {/* Top status pill */}
              <div className="flex items-center justify-center mb-7">
                <motion.span
                  key={isReady ? "ready" : isPaused ? "paused" : "active"}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`inline-flex items-center gap-1.5 text-[11px] font-heading font-semibold tracking-wide px-3.5 py-1.5 rounded-full border ${
                    isReady
                      ? "bg-primary/15 text-primary border-primary/30"
                      : isPaused
                      ? "bg-muted text-muted-foreground border-border/50"
                      : "bg-amber-500/15 text-amber-500 border-amber-500/30"
                  }`}
                >
                  {isReady ? (
                    <><CheckCircle2 className="h-3 w-3" /> Complete</>
                  ) : isPaused ? (
                    <><Pause className="h-3 w-3" /> Paused</>
                  ) : (
                    <><Clock className="h-3 w-3 animate-pulse" /> Tracking</>
                  )}
                </motion.span>
              </div>

              {/* Circular timer ring */}
              <div className="relative flex items-center justify-center mb-7">
                {/* Outer glow ring */}
                <div
                  className={`absolute rounded-full transition-all duration-700 ${
                    isReady
                      ? "opacity-30 shadow-[0_0_32px_8px] shadow-primary"
                      : isPaused
                      ? "opacity-0"
                      : "opacity-20 shadow-[0_0_24px_6px] shadow-amber-500"
                  }`}
                  style={{ width: 140, height: 140 }}
                />

                <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
                  {/* Track circle */}
                  <circle
                    cx="70"
                    cy="70"
                    r={RADIUS}
                    fill="none"
                    strokeWidth="7"
                    stroke="currentColor"
                    className="text-border/30"
                  />
                  {/* Progress arc */}
                  <motion.circle
                    cx="70"
                    cy="70"
                    r={RADIUS}
                    fill="none"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={CIRCUMFERENCE}
                    style={{ strokeDashoffset }}
                    stroke={isReady ? "hsl(var(--primary))" : isPaused ? "hsl(var(--muted-foreground) / 0.35)" : "#f59e0b"}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </svg>

                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    key={timerSeconds}
                    initial={{ scale: 1.15, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`text-[2.6rem] font-heading font-bold leading-none tabular-nums ${
                      isReady
                        ? "text-primary"
                        : isPaused
                        ? "text-muted-foreground"
                        : "text-amber-500"
                    }`}
                  >
                    {timerSeconds}
                  </motion.span>
                  <span className="text-[11px] text-muted-foreground font-heading mt-1">
                    / {MIN_ENGAGEMENT_SECONDS}s
                  </span>
                </div>
              </div>

              {/* Heading & description */}
              <motion.h3
                key={isReady ? "h-ready" : isPaused ? "h-paused" : "h-active"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-heading font-bold text-lg text-foreground mb-1.5"
              >
                {isReady
                  ? "You're all set!"
                  : isPaused
                  ? "Go back to the content"
                  : "Viewing content…"}
              </motion.h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {isReady
                  ? "Engagement validated. This will close automatically."
                  : isPaused && timerSeconds === 0
                  ? "Switch to the content tab to start the timer."
                  : isPaused
                  ? `Switch back! ${MIN_ENGAGEMENT_SECONDS - timerSeconds}s remaining.`
                  : `${MIN_ENGAGEMENT_SECONDS - timerSeconds}s more to validate your engagement.`}
              </p>

              {/* Footer hint */}
              <div className="mt-6 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground/50 font-heading">
                <ExternalLink className="h-3 w-3" />
                <span>Timer runs while you&apos;re on the content tab</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default EngagementTimer;
