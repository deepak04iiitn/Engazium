"use client";

import { motion } from "framer-motion";
import { UserPlus, Users, Share2, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    num: "01",
    title: "Sign Up & Pick Your Niche",
    description:
      "Create your account and select your content niche, format, and language preferences.",
  },
  {
    icon: Users,
    num: "02",
    title: "Join a Squad",
    description:
      "Get matched into a squad of 10–20 creators in your niche with similar follower ranges.",
  },
  {
    icon: Share2,
    num: "03",
    title: "Share & Engage",
    description:
      "Post your content link. Squad members engage with meaningful comments, likes, and saves.",
  },
  {
    icon: TrendingUp,
    num: "04",
    title: "Watch Your Reach Grow",
    description:
      "Early engagement signals boost your algorithmic reach organically and safely.",
  },
];

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay },
});

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="relative py-20 sm:py-28 md:py-36 overflow-hidden"
    >
      <div className="container mx-auto px-5 sm:px-6">
        {/* Header */}
        <motion.div {...anim()} className="mb-12 sm:mb-16 md:mb-20 max-w-2xl">
          <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mt-3 tracking-tight">
            Four steps to{" "}
            <span className="text-gradient">better engagement</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-sm sm:text-base md:text-lg max-w-lg">
            A simple, structured process that turns engagement from a struggle
            into a system.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              {...anim(0.08 * i)}
              className="relative group"
            >
              <div className="bg-card rounded-3xl p-6 sm:p-7 border border-border/50 shadow-sm dark:shadow-none dark:border-border/30 h-full hover:border-primary/20 dark:hover:border-primary/20 transition-colors duration-300">
                {/* Large step number */}
                <span className="block text-6xl sm:text-7xl font-heading font-bold text-primary/[0.07] dark:text-primary/[0.1] group-hover:text-primary/[0.12] dark:group-hover:text-primary/[0.18] transition-colors leading-none mb-2">
                  {step.num}
                </span>

                <div className="w-10 h-10 rounded-xl bg-primary/8 dark:bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/12 dark:group-hover:bg-primary/15 transition-colors">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>

                <h3 className="font-heading font-semibold text-foreground mb-1.5 text-[15px] sm:text-base leading-snug">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector — desktop only */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-[14px] w-[22px] h-px bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
