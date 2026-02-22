"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  Eye,
  ChevronRight,
  ChevronLeft,
  Check,
  Loader2,
  Sparkles,
  CalendarCheck,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const platformIcons = {
  Instagram: "📸",
  YouTube: "🎬",
  TikTok: "🎵",
  Facebook: "📘",
  X: "𝕏",
  LinkedIn: "💼",
  Twitch: "🎮",
  Snapchat: "👻",
  Other: "🌐",
};

const platformColors = {
  Instagram: "from-pink-500/20 to-purple-500/20 border-pink-500/30",
  YouTube: "from-red-500/20 to-red-600/20 border-red-500/30",
  TikTok: "from-slate-500/20 to-pink-500/20 border-slate-500/30",
  Facebook: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
  X: "from-slate-500/20 to-slate-600/20 border-slate-500/30",
  LinkedIn: "from-blue-600/20 to-sky-500/20 border-blue-600/30",
  Twitch: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
  Snapchat: "from-yellow-400/20 to-yellow-500/20 border-yellow-400/30",
  Other: "from-primary/20 to-primary/10 border-primary/30",
};

const WeeklyCheckInDialog = ({ open, onOpenChange, platforms, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1..n = platforms, n+1 = success
  const [platformData, setPlatformData] = useState(
    platforms.map((p) => ({
      platform: p,
      followers: "",
      avgLikes: "",
      avgComments: "",
      avgReach: "",
    }))
  );
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = platforms.length + 2; // intro + platforms + success
  const isIntro = currentStep === 0;
  const isSuccess = currentStep === totalSteps - 1;
  const currentPlatformIndex = currentStep - 1;

  const updateField = (index, field, value) => {
    setPlatformData((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/growth/snapshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          platforms: platformData.map((p) => ({
            platform: p.platform,
            followers: parseInt(p.followers) || 0,
            avgLikes: parseInt(p.avgLikes) || 0,
            avgComments: parseInt(p.avgComments) || 0,
            avgReach: parseInt(p.avgReach) || 0,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit growth data");
      setSubmitted(true);
      setCurrentStep(totalSteps - 1);
      toast.success("Weekly check-in completed! 🎉");
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    if (isIntro) return true;
    if (currentPlatformIndex >= 0 && currentPlatformIndex < platforms.length) {
      const data = platformData[currentPlatformIndex];
      return data.followers !== "" && parseInt(data.followers) >= 0;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === totalSteps - 2) {
      // Last platform — submit
      handleSubmit();
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset after close animation
    setTimeout(() => {
      setCurrentStep(0);
      setSubmitted(false);
    }, 300);
  };

  const progress = ((currentStep) / (totalSteps - 1)) * 100;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[520px] p-0 gap-0 overflow-hidden border-border/30 bg-background rounded-3xl">
        {/* Progress bar */}
        <div className="h-1 bg-secondary/50 w-full">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-r-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <div className="p-6 sm:p-8">
          {/* Close button for dismissed */}
          {!isSuccess && (
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-secondary/50"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          <AnimatePresence mode="wait">
            {/* ── INTRO STEP ── */}
            {isIntro && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mx-auto mb-5">
                  <CalendarCheck className="h-8 w-8 text-primary" />
                </div>
                <DialogHeader className="space-y-2 mb-6">
                  <DialogTitle className="text-2xl font-heading font-bold text-foreground text-center">
                    Weekly Check-In Time! ✨
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground text-center text-sm sm:text-base leading-relaxed">
                    Help us track your growth journey! Enter your latest stats for each platform. This takes less than a minute.
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                  {platforms.map((p) => (
                    <Badge
                      key={p}
                      variant="secondary"
                      className="px-3 py-1.5 text-sm bg-secondary/50 border border-border/30"
                    >
                      <span className="mr-1.5">{platformIcons[p]}</span>
                      {p}
                    </Badge>
                  ))}
                </div>

                <Button
                  onClick={handleNext}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-12 font-heading font-semibold text-base glow-box group"
                >
                  Let&apos;s Go
                  <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <button
                  onClick={handleClose}
                  className="mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  I&apos;ll do this later
                </button>
              </motion.div>
            )}

            {/* ── PLATFORM STEPS ── */}
            {!isIntro && !isSuccess && currentPlatformIndex >= 0 && currentPlatformIndex < platforms.length && (
              <motion.div
                key={`platform-${currentPlatformIndex}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Platform {currentPlatformIndex + 1} of {platforms.length}
                    </span>
                  </div>
                </div>

                {/* Platform Header Card */}
                <div className={`rounded-2xl p-5 mb-6 bg-gradient-to-br border ${platformColors[platforms[currentPlatformIndex]] || platformColors.Other}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">
                      {platformIcons[platforms[currentPlatformIndex]]}
                    </span>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-foreground">
                        {platforms[currentPlatformIndex]}
                      </h3>
                      <p className="text-muted-foreground text-xs">
                        Enter your current stats
                      </p>
                    </div>
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-primary" />
                      Total Followers / Subscribers
                      <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="e.g. 5000"
                      value={platformData[currentPlatformIndex].followers}
                      onChange={(e) =>
                        updateField(currentPlatformIndex, "followers", e.target.value)
                      }
                      className="h-11 rounded-xl bg-secondary/30 border-border/40 focus:border-primary/50 text-base"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Heart className="h-3.5 w-3.5 text-pink-500" />
                        Avg Likes
                      </label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="e.g. 200"
                        value={platformData[currentPlatformIndex].avgLikes}
                        onChange={(e) =>
                          updateField(currentPlatformIndex, "avgLikes", e.target.value)
                        }
                        className="h-11 rounded-xl bg-secondary/30 border-border/40 focus:border-primary/50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <MessageCircle className="h-3.5 w-3.5 text-blue-500" />
                        Avg Comments
                      </label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="e.g. 30"
                        value={platformData[currentPlatformIndex].avgComments}
                        onChange={(e) =>
                          updateField(currentPlatformIndex, "avgComments", e.target.value)
                        }
                        className="h-11 rounded-xl bg-secondary/30 border-border/40 focus:border-primary/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Eye className="h-3.5 w-3.5 text-primary" />
                      Avg Reach / Views
                    </label>
                    <Input
                      type="number"
                      min="0"
                      placeholder="e.g. 10000"
                      value={platformData[currentPlatformIndex].avgReach}
                      onChange={(e) =>
                        updateField(currentPlatformIndex, "avgReach", e.target.value)
                      }
                      className="h-11 rounded-xl bg-secondary/30 border-border/40 focus:border-primary/50"
                    />
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex-1 h-11 rounded-xl border-border/40 hover:bg-secondary/50"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed() || loading}
                    className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 glow-box font-semibold"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : currentStep === totalSteps - 2 ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Submit All
                      </>
                    ) : (
                      <>
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ── SUCCESS STEP ── */}
            {isSuccess && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-center py-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mx-auto mb-6"
                >
                  <Sparkles className="h-10 w-10 text-primary" />
                </motion.div>

                <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                  Check-In Complete! 🎉
                </h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                  Your growth data has been recorded. Check your Analytics tab to see your progress over time!
                </p>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {platformData.map((p) => (
                    <Badge
                      key={p.platform}
                      className="bg-primary/10 text-primary border-primary/20 px-3 py-1.5"
                    >
                      <Check className="h-3 w-3 mr-1.5" />
                      {platformIcons[p.platform]} {p.platform}
                    </Badge>
                  ))}
                </div>

                <Button
                  onClick={handleClose}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-12 font-heading font-semibold glow-box"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View My Growth
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step indicators */}
          {!isSuccess && (
            <div className="flex items-center justify-center gap-1.5 mt-5">
              {Array.from({ length: totalSteps - 1 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i <= currentStep
                      ? "w-6 bg-primary"
                      : "w-1.5 bg-muted-foreground/20"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WeeklyCheckInDialog;

