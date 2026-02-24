"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Bug, Lightbulb, Loader2, MessageCircleWarning, MessageSquare, SendHorizonal } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const feedbackCopy = {
  bug: {
    title: "Report a bug",
    subtitle: "Tell us what broke. We will triage it quickly.",
    titlePlaceholder: "Example: Unable to join squad from mobile",
    descriptionPlaceholder: "What happened, what you expected, and steps to reproduce...",
  },
  feature: {
    title: "Request a feature",
    subtitle: "Share ideas that make Engazium better for creators.",
    titlePlaceholder: "Example: Add weekly PDF growth reports",
    descriptionPlaceholder: "What problem this solves and how you imagine it should work...",
  },
};

export default function FloatingFeedbackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [type, setType] = useState("bug");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const copy = useMemo(() => feedbackCopy[type], [type]);

  const openDialog = () => {
    if (!currentUser) {
      toast.info("Please sign in to submit a report or feature request.");
      const redirect = pathname || "/";
      router.push(`/sign-in?redirect=${encodeURIComponent(redirect)}`);
      return;
    }
    setOpen(true);
  };

  const resetForm = () => {
    setType("bug");
    setTitle("");
    setDescription("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim().length < 5) {
      toast.error("Title must be at least 5 characters.");
      return;
    }
    if (description.trim().length < 10) {
      toast.error("Description must be at least 10 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          type,
          title: title.trim(),
          description: description.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit feedback");

      toast.success(type === "bug" ? "Bug report submitted. Thank you!" : "Feature request submitted. Thank you!");
      setOpen(false);
      resetForm();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-50">
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          if (!nextOpen) resetForm();
        }}
      >
        <DialogTrigger asChild>
          <button
            type="button"
            onClick={openDialog}
            className="group relative inline-flex items-center gap-2 rounded-full border border-primary/30 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.75)] px-4 py-3 sm:px-5 sm:py-3.5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <span className="absolute -inset-1 -z-10 rounded-full bg-primary/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
            <MessageCircleWarning className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide">Report / Request</span>
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-2xl overflow-hidden rounded-3xl border-border/60 bg-background/95 p-0 backdrop-blur-2xl shadow-[0_32px_100px_-28px_hsl(var(--primary)/0.45)]">
          <div className="relative">
            <div className="pointer-events-none absolute -top-24 -left-16 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 top-12 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl" />

            <DialogHeader className="relative px-6 pt-6 pb-4 border-b border-border/40">
              <div className="flex items-center justify-between gap-3">
                <DialogTitle className="font-heading text-xl flex items-center gap-2.5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 border border-primary/30">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </span>
                  Product Feedback Hub
                </DialogTitle>
                <span className="hidden sm:inline-flex items-center rounded-full border border-border/50 bg-card/60 px-3 py-1 text-[11px] font-medium text-muted-foreground">
                  Signed in as {currentUser?.email}
                </span>
              </div>

              <DialogDescription className="text-sm mt-2">
                Report issues or request features. Every submission reaches your admin queue instantly.
              </DialogDescription>
            </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 p-6 pt-5">
            <Tabs value={type} onValueChange={setType}>
              <TabsList className="grid w-full grid-cols-2 rounded-xl bg-secondary/70 p-1 h-auto">
                <TabsTrigger value="bug" className="gap-2 rounded-lg py-2.5">
                  <Bug className="h-4 w-4" />
                  Bug Report
                </TabsTrigger>
                <TabsTrigger value="feature" className="gap-2 rounded-lg py-2.5">
                  <Lightbulb className="h-4 w-4" />
                  Feature Request
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                {type === "bug" ? <Bug className="h-4 w-4 text-rose-500" /> : <Lightbulb className="h-4 w-4 text-violet-500" />}
                {copy.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">{copy.subtitle}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={120}
                placeholder={copy.titlePlaceholder}
                className="h-11 rounded-xl bg-background/70 border-border/60 focus-visible:ring-primary/50"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Details</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={2000}
                placeholder={copy.descriptionPlaceholder}
                className="min-h-36 rounded-xl bg-background/70 border-border/60 focus-visible:ring-primary/50 resize-none"
                required
              />
              <p className="text-xs text-muted-foreground text-right">{description.length}/2000</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1 border-t border-border/40">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={submitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting} className="rounded-xl px-5">
                {submitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <SendHorizonal className="h-4 w-4 mr-2" />}
                Submit
              </Button>
            </div>
          </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

