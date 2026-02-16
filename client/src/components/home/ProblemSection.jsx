"use client";

import { motion } from "framer-motion";
import { AlertTriangle, MessageCircleOff, ShieldOff, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: TrendingDown,
    title: "Low Early Engagement",
    description:
      "Algorithms prioritize posts with strong initial engagement. Without it, your content never gets seen.",
  },
  {
    icon: MessageCircleOff,
    title: "Unsafe Engagement Pods",
    description:
      "WhatsApp & Telegram pods have no rules, no accountability, and risk shadowbans from spammy activity.",
  },
  {
    icon: ShieldOff,
    title: "Fake Engagement Services",
    description:
      "Paid bots and fake likes destroy your account credibility and violate platform terms of service.",
  },
  {
    icon: AlertTriangle,
    title: "Freeloaders Drain Value",
    description:
      "Unstructured groups are plagued by members who take engagement but never give back.",
  },
];

const ProblemSection = () => {
  return (
    <section className="relative py-14 sm:py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
            The Problem
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2 sm:mt-3 mb-3 sm:mb-4">
            Why Micro Creators{" "}
            <span className="text-gradient">Struggle to Grow</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
            Great content alone isn't enough. Without early engagement, the algorithm buries your posts.
          </p>
        </motion.div>

        {/* Mobile: stacked compact cards | Desktop: 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 gradient-border group hover:bg-card/60 transition-all duration-300"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-destructive/10 flex items-center justify-center">
                  <problem.icon className="h-4 w-4 sm:h-5 sm:w-5 text-destructive" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">
                    {problem.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
