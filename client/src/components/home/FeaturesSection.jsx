"use client";

import { motion } from "framer-motion";
import { Shield, Users, Percent, Clock, BarChart3, Heart } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Niche-Based Squads",
    description:
      "Join squads matched by niche, format, and follower range for the most relevant engagement.",
  },
  {
    icon: Percent,
    title: "Engagement % Tracking",
    description:
      "Your engagement percentage is tracked in real time — stay consistent to stay visible and accountable.",
  },
  {
    icon: Shield,
    title: "Platform Safe",
    description:
      "Time-distributed engagement, quality guidelines, and squad size limits protect your account.",
  },
  {
    icon: Clock,
    title: "Organic Timing",
    description:
      "Engagement is spread over time to mimic natural behavior and avoid algorithmic penalties.",
  },
  {
    icon: BarChart3,
    title: "Weekly Accountability",
    description:
      "Track follower growth, reach, and engagement metrics weekly to stay accountable and motivated.",
  },
  {
    icon: Heart,
    title: "Real Human Engagement",
    description:
      "No bots, no automation. Every like, comment, and save comes from a real creator in your niche.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24 sm:py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      {/* Glow */}
      <div className="absolute top-1/2 left-0 w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-primary/5 rounded-full blur-[80px] md:blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[150px] h-[150px] md:w-[300px] md:h-[300px] bg-glow-secondary/5 rounded-full blur-[60px] md:blur-[100px]" />

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-16 md:mb-20"
        >
          <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
            Features
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-4">
            Built for{" "}
            <span className="text-gradient">Serious Creators</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
            Every feature is designed to keep engagement safe, fair, and effective.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass rounded-xl sm:rounded-2xl p-3.5 sm:p-5 md:p-6 gradient-border group hover:bg-card/60 transition-all duration-300"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-2 sm:mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1 sm:mb-2 text-xs sm:text-sm md:text-lg leading-tight">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-[10px] sm:text-xs md:text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
