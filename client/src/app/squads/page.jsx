"use client"

import { useState } from "react";
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
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
    title: "Pick Your Squad Size",
    description:
      "Start with a 10-member Starter Squad or go bigger with a 20-member Growth Squad for wider engagement.",
    icon: Users,
  },
  {
    step: 3,
    title: "Get Matched",
    description:
      "Our smart matching pairs you with creators in your niche. Every member is verified and committed.",
    icon: Zap,
  },
  {
    step: 4,
    title: "Start Engaging",
    description:
      "Earn credits by engaging with squad posts. Spend credits when you post. Fair, balanced, and organic.",
    icon: Award,
  },
];

const niches = [
  "Tech & SaaS",
  "Fitness",
  "Fashion",
  "Food & Cooking",
  "Travel",
  "Finance",
  "Art & Design",
  "Photography",
  "Music",
  "Gaming",
  "Education",
  "Lifestyle",
];

const sampleSquads = [
  {
    name: "Tech Creators Hub",
    niche: "Tech & SaaS",
    members: 10,
    maxMembers: 10,
    platform: "Instagram",
    avgEngagement: "4.2%",
    status: "Active",
    type: "Starter",
  },
  {
    name: "Fitness Growth Circle",
    niche: "Fitness",
    members: 17,
    maxMembers: 20,
    platform: "Instagram",
    avgEngagement: "5.8%",
    status: "Recruiting",
    type: "Growth",
  },
  {
    name: "Foodie Network",
    niche: "Food & Cooking",
    members: 9,
    maxMembers: 10,
    platform: "Instagram",
    avgEngagement: "6.1%",
    status: "Recruiting",
    type: "Starter",
  },
  {
    name: "Fashion Forward",
    niche: "Fashion",
    members: 20,
    maxMembers: 20,
    platform: "Instagram",
    avgEngagement: "7.3%",
    status: "Active",
    type: "Growth",
  },
  {
    name: "Travel Storytellers",
    niche: "Travel",
    members: 8,
    maxMembers: 10,
    platform: "Instagram",
    avgEngagement: "5.5%",
    status: "Recruiting",
    type: "Starter",
  },
  {
    name: "Finance Gurus",
    niche: "Finance",
    members: 15,
    maxMembers: 20,
    platform: "Instagram",
    avgEngagement: "3.9%",
    status: "Recruiting",
    type: "Growth",
  },
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

  const filteredSquads = sampleSquads.filter((squad) => {
    const matchesSearch = squad.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesNiche = selectedNiche ? squad.niche === selectedNiche : true;
    return matchesSearch && matchesNiche;
  });

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
                Squad-Based Engagement
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                Find Your{" "}
                <span className="text-gradient">Perfect Squad</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
                Join a niche-matched squad of real creators. Engage
                authentically, grow together, and boost your reach — the safe
                way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box rounded-xl px-8 font-heading font-semibold"
                  asChild
                >
                  <Link href="/sign-up">
                    Create Your Squad
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
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
        <section
          id="browse-squads"
          className="relative py-24 overflow-hidden"
        >
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
                Find open squads in your niche or create your own.
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

            {/* Squad Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {filteredSquads.map((squad, index) => (
                <motion.div
                  key={squad.name}
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
                        {squad.niche}
                      </p>
                    </div>
                    <Badge
                      variant={squad.status === "Recruiting" ? "default" : "secondary"}
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
                        {squad.members}/{squad.maxMembers}
                      </div>
                      <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                        Members
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-foreground font-heading font-bold text-lg">
                        {squad.avgEngagement}
                      </div>
                      <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                        Avg Eng
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-foreground font-heading font-bold text-lg flex items-center justify-center gap-1">
                        {squad.type === "Growth" ? (
                          <Star className="h-3.5 w-3.5 text-primary" />
                        ) : (
                          <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                        {squad.type}
                      </div>
                      <div className="text-muted-foreground text-[10px] uppercase tracking-wider">
                        Type
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-500"
                        style={{
                          width: `${(squad.members / squad.maxMembers) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-muted-foreground text-[10px] mt-1.5">
                      {squad.maxMembers - squad.members} spots remaining
                    </p>
                  </div>

                  <Button
                    size="sm"
                    className={`w-full rounded-xl font-heading font-semibold ${
                      squad.status === "Recruiting"
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                    disabled={squad.status === "Active"}
                    asChild={squad.status === "Recruiting"}
                  >
                    {squad.status === "Recruiting" ? (
                      <Link href="/sign-up">
                        Join Squad
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Link>
                    ) : (
                      <span>Squad Full</span>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>

            {filteredSquads.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground font-heading font-medium">
                  No squads found for this filter
                </p>
                <p className="text-muted-foreground/70 text-sm mt-1">
                  Try a different niche or search term
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
                  title: "Size-Limited Squads",
                  desc: "Small squad sizes keep engagement authentic and below platform radar.",
                },
                {
                  icon: Award,
                  title: "Quality Standards",
                  desc: "Comment and engagement guidelines ensure every interaction feels genuine.",
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
                Start engaging with real creators in your niche today. Your
                growth journey begins here.
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box rounded-xl px-10 font-heading font-semibold"
                asChild
              >
                <Link href="/sign-up">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default Squads;
