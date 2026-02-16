"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Shield,
  Zap,
  Target,
  Award,
  ChevronRight,
  ArrowRight,
  Clock,
  Rocket,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          <div className="absolute top-20 right-1/4 w-[250px] sm:w-[400px] md:w-[500px] h-[250px] sm:h-[400px] md:h-[500px] bg-primary/5 rounded-full blur-[80px] md:blur-[150px]" />
          <div className="absolute bottom-0 left-1/4 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-glow-secondary/5 rounded-full blur-[60px] md:blur-[120px]" />

          <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center">
            <motion.div {...fadeUp}>
              <Badge
                variant="outline"
                className="mb-4 sm:mb-6 border-primary/30 text-primary px-3 sm:px-4 py-1 sm:py-1.5 text-xs"
              >
                <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 sm:mr-1.5" />
                Simple & Effective
              </Badge>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold mb-4 sm:mb-6">
                How Engazium <span className="text-gradient">Works</span>
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-6 sm:mb-10 px-2">
                A simple, engagement-first platform designed to help creators grow together. 
                No bots, no fake likes—just real people supporting real content.
              </p>
            </motion.div>
          </div>
        </section>

        {/* How Squad Formation Works */}
        <section className="relative py-14 sm:py-20 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

          <div className="container relative z-10 mx-auto px-4 sm:px-6">
            <motion.div {...fadeUp} className="text-center mb-8 sm:mb-12 md:mb-16">
              <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Squad Formation
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2 sm:mt-3 mb-3 sm:mb-4">
                How Squads <span className="text-gradient">Come Together</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
                Four simple steps from sign-up to your first squad engagement.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {formationSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-start gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12 last:mb-0"
                >
                  {index < formationSteps.length - 1 && (
                    <div className="absolute left-5 sm:left-6 md:left-7 top-12 sm:top-14 md:top-16 w-px h-[calc(100%-1.5rem)] sm:h-[calc(100%-2rem)] bg-gradient-to-b from-primary/40 to-transparent" />
                  )}

                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center relative z-10">
                    <step.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                  </div>

                  <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 gradient-border flex-1 group hover:bg-card/60 transition-all duration-300">
                    <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                      <span className="text-primary font-heading font-bold text-xs sm:text-sm">
                        Step {step.step}
                      </span>
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                      <h3 className="font-heading font-semibold text-foreground text-sm sm:text-base md:text-lg">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
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

        {/* Safety Section */}
        <section className="relative py-14 sm:py-20 md:py-24 overflow-hidden">
          <div className="container relative z-10 mx-auto px-4 sm:px-6">
            <motion.div {...fadeUp} className="text-center mb-8 sm:mb-12 md:mb-16">
              <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Safety First
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2 sm:mt-3 mb-3 sm:mb-4">
                Your Account, <span className="text-gradient">Always Protected</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
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
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 gradient-border text-center"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative py-14 sm:py-20 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-background to-background" />
          <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center">
             <motion.div {...fadeUp}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 sm:mb-6">
                  Ready to Join the <span className="text-gradient">Revolution?</span>
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-7 sm:mb-10 px-2">
                  Join hundreds of creators who are growing their audience authentically.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                  <Link href="/sign-up">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 glow-box rounded-xl px-6 sm:px-8 font-heading font-semibold w-full sm:w-auto text-sm sm:text-base"
                    >
                      <Rocket className="mr-2 h-4 w-4" />
                      Get Started Now
                    </Button>
                  </Link>
                  <Link href="/squads">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary/30 text-primary hover:bg-primary/10 rounded-xl px-6 sm:px-8 font-heading font-semibold w-full sm:w-auto text-sm sm:text-base"
                    >
                      Browse Squads
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
             </motion.div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default HowItWorks;
