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
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-heading text-sm font-semibold uppercase tracking-wider">
            The Problem
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-4">
            Why Micro Creators{" "}
            <span className="text-gradient">Struggle to Grow</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Great content alone isn't enough. Without early engagement, the algorithm buries your posts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl p-6 gradient-border group hover:bg-card/60 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <problem.icon className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
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
