"use client";

import { motion } from "framer-motion";
import { UserPlus, Users, Share2, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Sign Up & Pick Your Niche",
    description:
      "Create your account and select your content niche, format, and language preferences.",
  },
  {
    icon: Users,
    step: "02",
    title: "Join a Squad",
    description:
      "Get matched into a squad of 10–20 creators in your niche with similar follower ranges.",
  },
  {
    icon: Share2,
    step: "03",
    title: "Share & Engage",
    description:
      "Post your content link, squad members engage with meaningful comments, likes, and saves.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Watch Your Reach Grow",
    description:
      "Early engagement signals boost your algorithmic reach organically and safely.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-heading text-sm font-semibold uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-3 mb-4">
            Four Steps to{" "}
            <span className="text-gradient">Better Engagement</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A simple, structured process that turns engagement from a struggle into a system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative group"
            >
              <div className="glass rounded-2xl p-6 h-full gradient-border hover:bg-card/60 transition-all duration-300">
                <span className="text-5xl font-heading font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mt-3 mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2 text-lg">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-primary/40 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
