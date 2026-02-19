"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Star,
  Send,
  Edit3,
  Trash2,
  Loader2,
  Quote,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const statusConfig = {
  pending: {
    label: "Pending Review",
    icon: Clock,
    color: "bg-amber-500/20 text-amber-600 border-amber-500/30",
    description: "Your testimonial is awaiting admin approval.",
  },
  approved: {
    label: "Approved",
    icon: CheckCircle2,
    color: "bg-primary/20 text-primary border-primary/30",
    description: "Your testimonial is live on the homepage!",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    color: "bg-destructive/20 text-destructive border-destructive/30",
    description: "Your testimonial was not approved. You can edit and resubmit.",
  },
};

const UserTestimonial = ({ currentUser }) => {
  const [testimonial, setTestimonial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [form, setForm] = useState({
    name: currentUser?.username || "",
    handle: "",
    niche: currentUser?.niche || "Other",
    quote: "",
    rating: 5,
    metric: "",
  });

  // Fetch existing testimonial
  const fetchTestimonial = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials/mine", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok && data.testimonial) {
        setTestimonial(data.testimonial);
        setForm({
          name: data.testimonial.name || "",
          handle: data.testimonial.handle || "",
          niche: data.testimonial.niche || "",
          quote: data.testimonial.quote || "",
          rating: data.testimonial.rating || 5,
          metric: data.testimonial.metric || "",
        });
      }
    } catch {
      // No testimonial yet — that's fine
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonial();
  }, [fetchTestimonial]);

  // Submit / Create
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.niche || !form.quote) {
      toast.error("Please fill in your name, niche, and testimonial");
      return;
    }
    setSubmitting(true);
    try {
      const isUpdate = !!testimonial;
      const res = await fetch(
        isUpdate ? "/api/testimonials/mine" : "/api/testimonials",
        {
          method: isUpdate ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit");
      toast.success(data.message);
      setTestimonial(data.testimonial);
      setIsEditing(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete
  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const res = await fetch("/api/testimonials/mine", {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete");
      toast.success(data.message);
      setTestimonial(null);
      setForm({
        name: currentUser?.username || "",
        handle: "",
        niche: currentUser?.niche || "Other",
        quote: "",
        rating: 5,
        metric: "",
      });
      setDeleteDialogOpen(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  // Star rating input component
  const StarRating = ({ value, onChange, disabled }) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          onClick={() => onChange(star)}
          className={`transition-all duration-200 ${
            disabled ? "cursor-default" : "cursor-pointer hover:scale-125"
          }`}
        >
          <Star
            className={`h-5 w-5 ${
              star <= value
                ? "fill-primary text-primary"
                : "text-muted-foreground/30"
            }`}
          />
        </button>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  // ═══════ Has existing testimonial — show preview ═══════
  if (testimonial && !isEditing) {
    const status = statusConfig[testimonial.status] || statusConfig.pending;
    const StatusIcon = status.icon;

    return (
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2">
            Your Testimonial
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Share your Engazium experience with the community.
          </p>
        </motion.div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-5 gradient-border"
        >
          <div className="flex items-center gap-3 mb-2">
            <Badge className={`${status.color} gap-1.5`}>
              <StatusIcon className="h-3 w-3" />
              {status.label}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">{status.description}</p>
        </motion.div>

        {/* Testimonial Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 sm:p-8 gradient-border"
        >
          <Quote className="h-8 w-8 text-primary/20 mb-4" />
          <p className="text-foreground text-base sm:text-lg leading-relaxed mb-6">
            &ldquo;{testimonial.quote}&rdquo;
          </p>

          <div className="flex items-center gap-1 mb-5">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-primary text-primary"
              />
            ))}
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-border/30 flex items-center justify-center">
                <span className="text-xs font-bold text-primary font-heading">
                  {testimonial.name
                    ?.split(" ")
                    .map((w) => w[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2) || "??"}
                </span>
              </div>
              <div>
                <p className="font-heading font-semibold text-foreground text-sm">
                  {testimonial.name}
                </p>
                <p className="text-muted-foreground text-xs">
                  {testimonial.niche}
                  {testimonial.handle && ` · ${testimonial.handle}`}
                </p>
              </div>
            </div>
            {testimonial.metric && (
              <span className="text-xs font-heading font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                {testimonial.metric}
              </span>
            )}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10 rounded-xl"
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Edit Testimonial
          </Button>
          <Button
            onClick={() => setDeleteDialogOpen(true)}
            variant="outline"
            className="border-destructive/30 text-destructive hover:bg-destructive/10 rounded-xl"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </motion.div>

        {/* Delete Confirmation */}
        <AlertDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Delete Testimonial?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently remove your testimonial. You can always
                submit a new one later.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={deleteLoading}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleteLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Delete"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  // ═══════ Create / Edit Form ═══════
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2">
          {testimonial ? "Edit Your Testimonial" : "Share Your Experience"}
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          {testimonial
            ? "Update your testimonial below. It will be re-reviewed after editing."
            : "Tell others how Engazium has helped your creator journey. Your testimonial will appear on the homepage once approved."}
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSubmit}
        className="glass rounded-2xl p-6 sm:p-8 gradient-border space-y-6"
      >
        {/* Name & Handle — side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Display Name <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="e.g. Priya Sharma"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-secondary/30 border-border/40 rounded-xl focus:border-primary/50 h-11"
              maxLength={100}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Social Handle{" "}
              <span className="text-muted-foreground/50 font-normal normal-case">
                (optional)
              </span>
            </label>
            <Input
              placeholder="e.g. @priyacreates"
              value={form.handle}
              onChange={(e) => setForm({ ...form, handle: e.target.value })}
              className="bg-secondary/30 border-border/40 rounded-xl focus:border-primary/50 h-11"
              maxLength={60}
            />
          </div>
        </div>

        {/* Niche & Metric — side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Your Niche <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="e.g. Tech Reviewer, Fitness Creator"
              value={form.niche}
              onChange={(e) => setForm({ ...form, niche: e.target.value })}
              className="bg-secondary/30 border-border/40 rounded-xl focus:border-primary/50 h-11"
              maxLength={60}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Key Metric{" "}
              <span className="text-muted-foreground/50 font-normal normal-case">
                (optional)
              </span>
            </label>
            <Input
              placeholder="e.g. 10x views, 3x followers"
              value={form.metric}
              onChange={(e) => setForm({ ...form, metric: e.target.value })}
              className="bg-secondary/30 border-border/40 rounded-xl focus:border-primary/50 h-11"
              maxLength={30}
            />
          </div>
        </div>

        {/* Quote */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Your Testimonial <span className="text-destructive">*</span>
          </label>
          <Textarea
            placeholder="Share how Engazium has helped your growth as a creator..."
            value={form.quote}
            onChange={(e) => setForm({ ...form, quote: e.target.value })}
            className="bg-secondary/30 border-border/40 rounded-xl focus:border-primary/50 min-h-[120px] resize-none"
            maxLength={500}
          />
          <p className="text-xs text-muted-foreground text-right">
            {form.quote.length}/500
          </p>
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Rating
          </label>
          <StarRating
            value={form.rating}
            onChange={(val) => setForm({ ...form, rating: val })}
            disabled={false}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          {testimonial && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setIsEditing(false);
                // Reset form to existing testimonial data
                setForm({
                  name: testimonial.name || "",
                  handle: testimonial.handle || "",
                  niche: testimonial.niche || "",
                  quote: testimonial.quote || "",
                  rating: testimonial.rating || 5,
                  metric: testimonial.metric || "",
                });
              }}
              className="rounded-xl text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={submitting || !form.name || !form.niche || !form.quote}
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box rounded-xl h-11 font-semibold px-6"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                {testimonial ? "Update Testimonial" : "Submit Testimonial"}
              </>
            )}
          </Button>
        </div>
      </motion.form>
    </div>
  );
};

export default UserTestimonial;

