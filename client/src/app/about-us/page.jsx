"use client"

import { motion } from "framer-motion";
import { Users, Target, Heart, Zap, Globe, Shield } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const values = [
  {
    icon: Users,
    title: "Community First",
    description:
      "We believe growth is a collective effort. Engazium brings creators together in squads so no one grows alone.",
  },
  {
    icon: Shield,
    title: "Safety & Trust",
    description:
      "Every interaction is verified through our credit system. No bots, no fake engagement — only real creators helping each other.",
  },
  {
    icon: Zap,
    title: "Smart Engagement",
    description:
      "Our algorithm ensures fair, meaningful interactions. Credits keep the ecosystem balanced and rewarding for everyone.",
  },
  {
    icon: Target,
    title: "Goal-Oriented Growth",
    description:
      "Whether you want 1K followers or 100K, our squad system scales with your ambitions and keeps you accountable.",
  },
  {
    icon: Globe,
    title: "Platform Agnostic",
    description:
      "Instagram, YouTube, X, LinkedIn — Engazium works across every major social platform so you can grow everywhere.",
  },
  {
    icon: Heart,
    title: "Creator Empathy",
    description:
      "Built by creators, for creators. We understand the struggle of low reach and designed every feature to solve it.",
  },
];

const milestones = [
  { year: "2025", event: "Engazium idea born from creator frustration with declining organic reach" },
  { year: "2025", event: "Squad-based engagement system designed and prototyped" },
  { year: "2026", event: "Beta launch with early creator community" },
  { year: "2026", event: "Credit-based engagement verification system goes live" },
  { year: "2026", event: "Multi-platform support across Instagram, YouTube, X & LinkedIn" },
];

const About = () => {
  return (
    <>
        {/* Hero */}
        <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[250px] sm:w-[400px] md:w-[500px] h-[250px] sm:h-[400px] md:h-[500px] bg-primary/5 rounded-full blur-[80px] md:blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-glow-secondary/5 rounded-full blur-[60px] md:blur-[100px]" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 mb-4 sm:mb-6">
                Our Story
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
                Empowering Creators to{" "}
                <span className="text-gradient">Grow Together</span>
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed px-2">
                Engazium was born from a simple truth — social media algorithms
                don't favour small creators. We built a platform where creators
                help each other rise through genuine, squad-based engagement.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-12 sm:py-16 md:py-20 relative">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={0}
              >
                <span className="text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2 sm:mb-3 block">
                  Our Mission
                </span>
                <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                  Democratising Social Media Growth
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                  Social media growth shouldn't be reserved for those who can
                  afford expensive ads or already have a massive following.
                  Engazium levels the playing field through its innovative
                  squad-based engagement system.
                </p>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  By connecting creators into focused squads and using a
                  credit-based verification system, we ensure that every like,
                  comment, and share is genuine — creating a ripple effect that
                  algorithms can't ignore.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={2}
                className="glass rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 gradient-border"
              >
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-1 text-sm sm:text-base">
                        Vision
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        A world where every creator — regardless of follower
                        count — has the tools and community to reach their
                        audience authentically.
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-border/30" />
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground mb-1 text-sm sm:text-base">
                        Purpose
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        To replace the isolation of solo content creation with
                        the power of collective growth — one squad at a time.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12 sm:py-16 md:py-20 relative">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/3 rounded-full blur-[100px] md:blur-[150px]" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="text-center mb-8 sm:mb-12 md:mb-16"
            >
              <span className="text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2 sm:mb-3 block">
                What Drives Us
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold">
                Our Core Values
              </h2>
            </motion.div>

            {/* Mobile: 2-col compact | Desktop: 3-col */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-20px" }}
                  variants={fadeUp}
                  custom={i}
                  className="glass rounded-lg sm:rounded-xl p-3.5 sm:p-5 md:p-6 gradient-border group hover:bg-card/80 transition-colors duration-300"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-2 sm:mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors">
                    <value.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-1 sm:mb-2 text-xs sm:text-sm md:text-base">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-[10px] sm:text-xs md:text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-12 sm:py-16 md:py-20 relative">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="text-center mb-8 sm:mb-12 md:mb-16"
            >
              <span className="text-primary text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2 sm:mb-3 block">
                Our Journey
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold">
                Key Milestones
              </h2>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-20px" }}
                  variants={fadeUp}
                  custom={i}
                  className="flex gap-4 sm:gap-6 relative"
                >
                  {/* Line */}
                  <div className="flex flex-col items-center">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary shrink-0 mt-1.5 glow-box" />
                    {i < milestones.length - 1 && (
                      <div className="w-px flex-1 bg-border/50" />
                    )}
                  </div>

                  <div className="pb-6 sm:pb-8 md:pb-10">
                    <span className="text-primary text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
                      {milestone.year}
                    </span>
                    <p className="text-foreground text-xs sm:text-sm mt-0.5 sm:mt-1 leading-relaxed">
                      {milestone.event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16 md:py-20 relative">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="glass rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center gradient-border max-w-3xl mx-auto"
            >
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                Ready to Join the Movement?
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mb-6 sm:mb-8 max-w-lg mx-auto px-2">
                Thousands of creators are already growing together on Engazium.
                Be part of the community that's rewriting the rules of social
                media growth.
              </p>
              <a
                href="/"
                className="inline-flex items-center justify-center h-10 sm:h-11 rounded-md px-6 sm:px-8 bg-primary text-primary-foreground text-sm sm:text-base font-medium hover:bg-primary/90 transition-colors glow-box"
              >
                Get Started Free
              </a>
            </motion.div>
          </div>
        </section>
    </>
  );
};

export default About;
