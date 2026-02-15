"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Shield,
  Zap,
  Target,
  Clock,
  Award,
  ChevronRight,
  Search,
  Filter,
  Star,
  ArrowRight,
  Eye,
  Loader2,
  TrendingUp,
  CheckCircle2,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DemoSquadSection from "@/components/squads/DemoSquadSection";

const formationSteps = [
  {
    step: 1,
    title: "Choose Your Niche",
    description:
      "Select your content niche, platform, and follower range. We match you with creators who share your audience.",
    icon: Target,
  },
  {
    step: 2,
    title: "Pick Your Squad Plan",
    description:
      "Growth (1 post/day), Pro (2 posts/day), or Momentum (3 posts/day) — choose based on your posting frequency.",
    icon: Users,
  },
  {
    step: 3,
    title: "Join Instantly",
    description:
      "Click to join any open squad. No payments, no credits — just tap Join and you're in.",
    icon: Zap,
  },
  {
    step: 4,
    title: "Engage & Grow",
    description:
      "Engage with squad posts authentically. Your engagement percentage drives accountability — stay active or get warned.",
    icon: Award,
  },
];

const niches = [
  "Technology",
  "Health & Fitness",
  "Fashion & Beauty",
  "Food & Cooking",
  "Travel",
  "Business & Finance",
  "Art & Creativity",
  "Photography & Videography",
  "Music",
  "Gaming",
  "Education",
  "Lifestyle",
  "Entertainment",
  "Sports",
  "Other",
];

const ALL_NICHES = [
  "Art & Creativity", "Technology", "Gaming", "Education", "Business & Finance",
  "Health & Fitness", "Lifestyle", "Fashion & Beauty", "Food & Cooking", "Travel",
  "Self Improvement", "Entertainment", "Music", "Photography & Videography",
  "Podcasting", "News & Commentary", "DIY & Crafts", "Sports", "Science",
  "Pets & Animals", "Nature & Environment", "Spirituality", "Parenting & Family",
  "Vlogs", "Automotive", "Real Estate", "Politics", "Non Profit & Social Impact", "Other",
];

const PLANS = [
  { value: "Growth", label: "Growth", desc: "1 post/day", icon: Shield },
  { value: "Pro", label: "Pro", desc: "2 posts/day", icon: Zap },
  { value: "Momentum", label: "Momentum", desc: "3 posts/day", icon: Star },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

const Squads = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNiche, setSelectedNiche] = useState(null);
  const [squads, setSquads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joiningId, setJoiningId] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const router = useRouter();

  // Create Squad State
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [createSquadForm, setCreateSquadForm] = useState({
    name: "",
    niche: "",
    plan: "Growth",
    description: "",
  });
  const [createSquadLoading, setCreateSquadLoading] = useState(false);

  const fetchSquads = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);
      if (selectedNiche) params.set("niche", selectedNiche);
      params.set("limit", "30");

      const res = await fetch(`/api/squads?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setSquads(data.squads);
      }
    } catch (err) {
      console.error("Failed to fetch squads:", err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedNiche]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchSquads();
    }, 300);
    return () => clearTimeout(debounce);
  }, [fetchSquads]);

  const handleJoinSquad = async (squadId) => {
    if (!currentUser) {
      router.push("/sign-in");
      return;
    }
    setJoiningId(squadId);
    try {
      const res = await fetch(`/api/squads/${squadId}/join`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to join squad");
      toast.success("Successfully joined the squad!");
      router.push(`/squads/${squadId}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setJoiningId(null);
    }
  };

  const handleCreateSquad = async (e) => {
    e.preventDefault();
    if (!createSquadForm.name || !createSquadForm.niche) {
      toast.error("Please fill in all required fields");
      return;
    }
    setCreateSquadLoading(true);
    try {
      const res = await fetch("/api/squads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(createSquadForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create squad");
      
      toast.success("Squad created successfully!");
      setCreateSquadForm({ name: "", niche: "", plan: "Growth", description: "" });
      setIsCreateDialogOpen(false);
      router.push(`/squads/${data.squad._id}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setCreateSquadLoading(false);
    }
  };

  const openCreateDialog = () => {
    if (!currentUser) {
      router.push("/sign-in");
      return;
    }
    setIsCreateDialogOpen(true);
  };

  const getPlanIcon = (plan) => {
    if (plan === "Momentum") return <Star className="h-3.5 w-3.5 text-primary" />;
    if (plan === "Pro") return <Zap className="h-3.5 w-3.5 text-primary" />;
    return <Shield className="h-3.5 w-3.5 text-muted-foreground" />;
  };

  const getPlanPostLimit = (plan) => {
    const limits = { Growth: 1, Pro: 2, Momentum: 3 };
    return limits[plan] || 1;
  };

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-glow-secondary/5 rounded-full blur-[120px]" />

          <div className="container relative z-10 mx-auto px-6 text-center">
            <motion.div {...fadeUp}>
              <Badge
                variant="outline"
                className="mb-6 border-primary/30 text-primary px-4 py-1.5"
              >
                <Users className="h-3.5 w-3.5 mr-1.5" />
                Engagement-Based Squads
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                Find Your{" "}
                <span className="text-gradient">Perfect Squad</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
                Join a niche-matched squad of real creators. Engage
                authentically, grow together, and boost your reach — no credits,
                just real engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box rounded-xl px-8 font-heading font-semibold"
                  onClick={() =>
                    document
                      .getElementById("browse-squads")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Browse Squads
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                 <Button
                  size="lg"
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-xl px-8 font-heading font-semibold border border-primary/20"
                  onClick={openCreateDialog}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Squad
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary/30 text-primary hover:bg-primary/10 rounded-xl px-8 font-heading font-semibold"
                  onClick={() =>
                    document
                      .getElementById("demo-squad")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <Eye className="mr-2 h-4 w-4" />
                  See Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How Squad Formation Works */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

          <div className="container relative z-10 mx-auto px-6">
            <motion.div {...fadeUp} className="text-center mb-16">
              <span className="text-primary font-heading text-sm font-semibold uppercase tracking-wider">
                Squad Formation
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-4">
                How Squads{" "}
                <span className="text-gradient">Come Together</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Four simple steps from sign-up to your first squad engagement.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {formationSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-start gap-6 mb-12 last:mb-0"
                >
                  {index < formationSteps.length - 1 && (
                    <div className="absolute left-7 top-16 w-px h-[calc(100%-2rem)] bg-gradient-to-b from-primary/40 to-transparent" />
                  )}

                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center relative z-10">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>

                  <div className="glass rounded-2xl p-6 gradient-border flex-1 group hover:bg-card/60 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-primary font-heading font-bold text-sm">
                        Step {step.step}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-heading font-semibold text-foreground text-lg">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Squad Section */}
        <div id="demo-squad">
          <DemoSquadSection />
        </div>

        {/* Browse Squads */}
        <section id="browse-squads" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

          <div className="container relative z-10 mx-auto px-6">
            <motion.div {...fadeUp} className="text-center mb-12">
              <span className="text-primary font-heading text-sm font-semibold uppercase tracking-wider">
                Explore
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-4">
                Browse{" "}
                <span className="text-gradient">Active Squads</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Find open squads in your niche or create your own from the dashboard.
              </p>
            </motion.div>

            {/* Filters */}
            <motion.div {...fadeUp} className="max-w-4xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search squads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-card/50 border-border/50 rounded-xl"
                  />
                </div>
                <Button
                  variant="outline"
                  className="border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 rounded-xl gap-2"
                  onClick={() => setSelectedNiche(null)}
                >
                  <Filter className="h-4 w-4" />
                  {selectedNiche || "All Niches"}
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {niches.map((niche) => (
                  <button
                    key={niche}
                    onClick={() =>
                      setSelectedNiche(selectedNiche === niche ? null : niche)
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                      selectedNiche === niche
                        ? "bg-primary/20 text-primary border border-primary/40"
                        : "bg-secondary/50 text-muted-foreground border border-border/30 hover:border-primary/30 hover:text-primary"
                    }`}
                  >
                    {niche}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
            )}

            {/* Squad Grid */}
            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {squads.map((squad, index) => (
                  <motion.div
                    key={squad._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="glass rounded-2xl p-6 gradient-border group hover:bg-card/60 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-heading font-semibold text-foreground text-base">
                          {squad.name}
                        </h3>
                        <p className="text-muted-foreground text-xs mt-0.5">
                          {squad.niche}{squad.platform ? ` · ${squad.platform}` : ""}
                        </p>
                      </div>
                      <Badge
                        variant={
                          squad.status === "Recruiting" ? "default" : "secondary"
                        }
                        className={`text-[10px] ${
                          squad.status === "Recruiting"
                            ? "bg-primary/20 text-primary border-primary/30"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {squad.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-5">
                      <div className="text-center">
                        <div className="text-foreground font-heading font-bold text-lg">
                          {squad.memberCount}/{squad.maxMembers}
                        </div>
                        <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                          Members
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-foreground font-heading font-bold text-lg flex items-center justify-center gap-1">
                          <TrendingUp className="h-3.5 w-3.5 text-primary" />
                          {squad.avgEngagement || 0}%
                        </div>
                        <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                          Avg Eng
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-foreground font-heading font-bold text-lg flex items-center justify-center gap-1">
                          {getPlanIcon(squad.plan)}
                          {squad.plan}
                        </div>
                        <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                          {getPlanPostLimit(squad.plan)} post/day
                        </div>
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-500"
                          style={{
                            width: `${(squad.memberCount / squad.maxMembers) * 100}%`,
                          }}
                        />
                      </div>
                      <p className="text-muted-foreground text-[10px] mt-1.5">
                        {squad.maxMembers - squad.memberCount} spots remaining
                      </p>
                    </div>

                    <Button
                      size="sm"
                      className={`w-full rounded-xl font-heading font-semibold ${
                        squad.status === "Recruiting"
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                      disabled={squad.status !== "Recruiting" || joiningId === squad._id}
                      onClick={() => handleJoinSquad(squad._id)}
                    >
                      {joiningId === squad._id ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                          Joining...
                        </>
                      ) : squad.status === "Recruiting" ? (
                        <>
                          Join Squad
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </>
                      ) : (
                        <span>Squad Full</span>
                      )}
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}

            {!loading && squads.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground font-heading font-medium">
                  No squads found
                </p>
                <p className="text-muted-foreground/70 text-sm mt-1">
                  {searchQuery || selectedNiche
                    ? "Try a different niche or search term"
                    : "Be the first to create a squad from your dashboard!"}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Safety Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="container relative z-10 mx-auto px-6">
            <motion.div {...fadeUp} className="text-center mb-16">
              <span className="text-primary font-heading text-sm font-semibold uppercase tracking-wider">
                Safety First
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-4">
                Your Account,{" "}
                <span className="text-gradient">Always Protected</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: Clock,
                  title: "Time-Distributed",
                  desc: "Engagement is spread naturally over time — never sudden spikes that flag algorithms.",
                },
                {
                  icon: Shield,
                  title: "Anti-Fake Engagement",
                  desc: "Smart validation ensures every engagement is real — minimum time thresholds and activity tracking.",
                },
                {
                  icon: Award,
                  title: "Quality Standards",
                  desc: "Engagement percentages enforce accountability. Low engagers get warned and removed automatically.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass rounded-2xl p-6 gradient-border text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-background" />
          <div className="container relative z-10 mx-auto px-6 text-center">
            <motion.div {...fadeUp}>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Ready to{" "}
                <span className="text-gradient">Join a Squad?</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
                Start engaging with real creators in your niche today. No credits
                needed — just join and start growing.
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box rounded-xl px-10 font-heading font-semibold"
                onClick={() =>
                  currentUser
                    ? document
                        .getElementById("browse-squads")
                        ?.scrollIntoView({ behavior: "smooth" })
                    : router.push("/sign-up")
                }
              >
                {currentUser ? "Browse Squads" : "Get Started Now"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Create Squad Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
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

          <form onSubmit={handleCreateSquad} className="px-8 py-6 space-y-6">
            {/* Squad Name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Users className="h-3 w-3" />
                Squad Name <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="e.g. Tech Innovators"
                value={createSquadForm.name}
                onChange={(e) => setCreateSquadForm({ ...createSquadForm, name: e.target.value })}
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
                value={createSquadForm.niche} 
                onValueChange={(value) => setCreateSquadForm({ ...createSquadForm, niche: value })}
              >
                <SelectTrigger className="bg-secondary/30 border-border/40 rounded-xl focus:border-primary/50 h-11">
                  <SelectValue placeholder="Select your niche" />
                </SelectTrigger>
                <SelectContent>
                  {ALL_NICHES.map((n) => (
                    <SelectItem key={n} value={n}>{n}</SelectItem>
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
                {PLANS.map((plan) => (
                  <button
                    key={plan.value}
                    type="button"
                    onClick={() => setCreateSquadForm({ ...createSquadForm, plan: plan.value })}
                    className={`relative flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all duration-200 ${
                      createSquadForm.plan === plan.value
                        ? "border-primary bg-primary/10 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]"
                        : "border-border/40 bg-secondary/20 hover:border-primary/30 hover:bg-secondary/40"
                    }`}
                  >
                    {createSquadForm.plan === plan.value && (
                      <div className="absolute -top-1.5 -right-1.5">
                        <CheckCircle2 className="h-4 w-4 text-primary fill-primary/20" />
                      </div>
                    )}
                    <plan.icon className={`h-5 w-5 ${createSquadForm.plan === plan.value ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`text-sm font-semibold ${createSquadForm.plan === plan.value ? "text-primary" : "text-foreground"}`}>
                      {plan.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{plan.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="h-3 w-3" />
                Description <span className="text-muted-foreground/50 font-normal normal-case">(optional)</span>
              </label>
              <Input
                placeholder="Briefly describe what your squad is about..."
                value={createSquadForm.description}
                onChange={(e) => setCreateSquadForm({ ...createSquadForm, description: e.target.value })}
                className="bg-secondary/30 border-border/40 rounded-xl focus:border-primary/50 h-11"
                maxLength={300}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setIsCreateDialogOpen(false)}
                className="flex-1 rounded-xl h-11 text-muted-foreground hover:text-foreground"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createSquadLoading || !createSquadForm.name || !createSquadForm.niche}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 glow-box rounded-xl h-11 font-semibold"
              >
                {createSquadLoading ? (
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
    </div>
  );
};

export default Squads;
