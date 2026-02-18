"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Core",
    size: "10 Members",
    price: "₹50",
    period: "/month",
    description: "Perfect for creators starting their engagement journey.",
    features: [
      "Up to 10 members per squad",
      "1 post per day per person",
      "Credit-based engagement system",
      "Meaningful comment guidelines",
      "Weekly progress tracking",
      "Community support access",
    ],
    popular: false,
  },
  {
    name: "Growth",
    size: "20 Members",
    price: "₹100",
    period: "/month",
    description: "Ideal for active creators who post frequently.",
    features: [
      "Up to 20 members per squad",
      "2 posts per day per person",
      "Credit-based engagement system",
      "Meaningful comment guidelines",
      "Priority squad matching",
      "Advanced engagement analytics",
    ],
    popular: true,
  },
  {
    name: "Momentum",
    size: "30 Members",
    price: "₹150",
    period: "/month",
    description: "Maximum reach for power creators and brands.",
    features: [
      "Up to 30 members per squad",
      "3 posts per day per person",
      "Credit-based engagement system",
      "Meaningful comment guidelines",
      "Priority squad matching",
      "Advanced engagement analytics",
      "Dedicated support",
    ],
    popular: false,
  },
];

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay },
});

const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6">
        {/* Header */}
        <motion.div {...anim()} className="text-center mb-12 sm:mb-16 md:mb-20">
          <span className="text-primary font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mt-3 tracking-tight">
            Simple,{" "}
            <span className="text-gradient">creator-friendly</span> pricing
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm sm:text-base md:text-lg">
            Pay per squad. No hidden fees. Cancel anytime.
          </p>
        </motion.div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 scrollbar-none">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                {...anim(0.08 * i)}
                className={`relative rounded-2xl p-5 min-w-[280px] snap-center shrink-0 border ${
                  plan.popular
                    ? "bg-card border-primary/30 shadow-md dark:shadow-none"
                    : "bg-card border-border/50 shadow-sm dark:shadow-none dark:border-border/30"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-[10px] font-heading font-semibold px-3 py-0.5 rounded-full">
                      <Zap className="h-2.5 w-2.5" />
                      Popular
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="font-heading font-semibold text-foreground text-base">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {plan.size}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-3xl font-heading font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                        <Check className="h-2.5 w-2.5 text-primary" />
                      </div>
                      <span className="text-xs text-secondary-foreground leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full rounded-xl py-4 text-sm font-heading font-semibold ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-box"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Join {plan.name}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              {...anim(0.1 * i)}
              className={`relative rounded-3xl p-7 lg:p-8 border transition-shadow duration-300 ${
                plan.popular
                  ? "bg-card border-primary/30 shadow-lg dark:shadow-none dark:border-primary/25 -mt-2 mb-[-8px]"
                  : "bg-card border-border/50 shadow-sm dark:shadow-none dark:border-border/30 hover:shadow-md dark:hover:shadow-none"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs font-heading font-semibold px-4 py-1 rounded-full shadow-sm">
                    <Zap className="h-3 w-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-heading font-semibold text-foreground text-xl">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {plan.size} · {plan.description}
                </p>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-heading font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="text-muted-foreground text-sm">
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-secondary-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-xl py-5 font-heading font-semibold ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 glow-box"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                Join {plan.name}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
