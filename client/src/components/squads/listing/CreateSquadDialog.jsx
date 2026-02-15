import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Target,
  Zap,
  CheckCircle2,
  Eye,
  Loader2,
  Plus,
} from "lucide-react";

const CreateSquadDialog = ({
  open,
  onOpenChange,
  form,
  setForm,
  onSubmit,
  loading,
  allNiches,
  plans,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] bg-background border-border/30 max-h-[90vh] overflow-y-auto p-0">
        {/* Header with gradient accent */}
        <div className="relative px-8 pt-8 pb-6 border-b border-border/20">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-primary/20 rounded-t-lg" />
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="font-heading font-bold text-xl text-foreground">
                Create Your Squad
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm mt-0.5">
                Lead your own community and grow together.
              </DialogDescription>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="px-8 py-6 space-y-6">
          {/* Squad Name */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Users className="h-3 w-3" />
              Squad Name <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="e.g. Tech Innovators"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-secondary/30 border-border/40 rounded-xl focus:border-primary/50 h-11"
              maxLength={60}
            />
          </div>

          {/* Niche */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Target className="h-3 w-3" />
              Niche <span className="text-destructive">*</span>
            </label>
            <Select
              value={form.niche}
              onValueChange={(value) => setForm({ ...form, niche: value })}
            >
              <SelectTrigger className="bg-secondary/30 border-border/40 rounded-xl focus:border-primary/50 h-11">
                <SelectValue placeholder="Select your niche" />
              </SelectTrigger>
              <SelectContent>
                {allNiches.map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Plan Selection — visual cards */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="h-3 w-3" />
              Plan Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {plans.map((plan) => (
                <button
                  key={plan.value}
                  type="button"
                  onClick={() => setForm({ ...form, plan: plan.value })}
                  className={`relative flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all duration-200 ${
                    form.plan === plan.value
                      ? "border-primary bg-primary/10 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]"
                      : "border-border/40 bg-secondary/20 hover:border-primary/30 hover:bg-secondary/40"
                  }`}
                >
                  {form.plan === plan.value && (
                    <div className="absolute -top-1.5 -right-1.5">
                      <CheckCircle2 className="h-4 w-4 text-primary fill-primary/20" />
                    </div>
                  )}
                  <plan.icon
                    className={`h-5 w-5 ${
                      form.plan === plan.value
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={`text-sm font-semibold ${
                      form.plan === plan.value
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {plan.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {plan.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="h-3 w-3" />
              Description{" "}
              <span className="text-muted-foreground/50 font-normal normal-case">
                (optional)
              </span>
            </label>
            <Input
              placeholder="Briefly describe what your squad is about..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="bg-secondary/30 border-border/40 rounded-xl focus:border-primary/50 h-11"
              maxLength={300}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="flex-1 rounded-xl h-11 text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !form.name || !form.niche}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 glow-box rounded-xl h-11 font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Create Squad
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSquadDialog;
